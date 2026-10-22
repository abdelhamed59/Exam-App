import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine } from "lucide-react";
import IntlTelInput from "@intl-tel-input/react";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";
import FormFeedback from "@/shared/components/form-feedback";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import type { IApiError } from "@/shared/types/api";
import { useCurrentUser } from "../apis/queries/use-current-user";
import { useUpdateProfile } from "../apis/mutations/useUpdateProfile";
import { profile } from "../schemas/profile.schema";
import type { IProfileValues } from "../types/user";
import { toast } from "@/components/ui/toast";
import ChangeEmailDialog from "./ChangeEmailDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

export default function Porfile() {
  const [changeEmailOpen, setChangeEmailOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const { data: currentUser, isPending: isLoadingUser } = useCurrentUser();
  const user = currentUser?.user;

  const { mutate: updateProfile, error, isPending: isSaving } = useUpdateProfile();
  const apiError = error as IApiError | null;

  const form = useForm<IProfileValues>({
    resolver: zodResolver(profile),
    defaultValues: { firstName: "", lastName: "", phone: "" },
  });

  // Populate the form once the real user data arrives — defaultValues alone
  // won't pick this up since the data loads asynchronously after mount.
  useEffect(() => {
    if (!user) return;
    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      
      
      
    });
  }, [user, form]);

  const bannerErrors = useApiFormErrors(apiError, form);

  const onSubmit = (values: IProfileValues) => {
    updateProfile(values, {
      onSuccess: () => {
        toast.add({
          title: "Profile updated",
          type: "success",
          timeout:3000
        });
      },
    });
  };

  if (isLoadingUser) {
    return <p className="p-6 font-mono text-sm text-gray-500">Loading profile...</p>;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4 bg-white p-6">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.firstName}>
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <Input
              id="firstName"
              placeholder="Ahmed"
              aria-invalid={!!form.formState.errors.firstName}
              {...form.register("firstName")}
            />
            {form.formState.errors.firstName && <FieldError>{form.formState.errors.firstName.message}</FieldError>}
          </Field>

          <Field data-invalid={!!form.formState.errors.lastName}>
            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
            <Input
              id="lastName"
              placeholder="Abdullah"
              aria-invalid={!!form.formState.errors.lastName}
              {...form.register("lastName")}
            />
            {form.formState.errors.lastName && <FieldError>{form.formState.errors.lastName.message}</FieldError>}
          </Field>
        </div>

        {/* Username isn't part of PATCH /users/profile — display only */}
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" disabled value={user?.username ?? ""} readOnly />
        </Field>

        {/* Email isn't part of PATCH /users/profile either — changed via its own flow */}
        <Field>
          <div className="flex justify-between">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <span onClick={() => setChangeEmailOpen(true)} className="flex cursor-pointer items-center gap-1.5 font-mono text-sm font-medium text-blue-600">
              <PencilLine size={16} /> Change
            </span>
          </div>
          <Input
            id="email"
            readOnly
            value={user?.email ?? ""}
            className="hover:border hover:border-gray-200 focus-visible:border-gray-200 focus-visible:ring-0"
          />
        </Field>

        <Field data-invalid={!!form.formState.errors.phone}>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Controller
            control={form.control}
            name="phone"
            render={({ field }) => (
              <IntlTelInput
                initialCountry="eg"
                value={field.value}
                onChangeNumber={(phone: string) => {
                  const localPhone = phone.startsWith("+20") ? `0${phone.slice(3)}` : phone;

                  field.onChange(localPhone);
                }}
                loadUtils={() => import("intl-tel-input/utils")}
                inputProps={{
                  id: "phone",
                  placeholder: "Enter your phone number",
                  "aria-invalid": !!form.formState.errors.phone,
                  className: `h-[46px] w-full rounded-md border px-3 outline-none transition-colors ${
                    form.formState.errors.phone
                      ? "border-red-500"
                      : "border-gray-300 hover:border-blue-600 focus:border-blue-600"
                  }`,
                }}
              />
            )}
          />
          {form.formState.errors.phone && <FieldError>{form.formState.errors.phone.message}</FieldError>}
        </Field>

        <FormFeedback
          errors={bannerErrors.length ? bannerErrors : apiError && !apiError.errors?.length ? [apiError.message] : []}
        />

        <div className="grid gap-3.5 pt-4 lg:grid-cols-2">
          {/* Not wired to the Delete Account flow yet — that's built as its own
              step. Kept as a plain button (not submit) so it can never trigger
              this form's save instead. */}
         <Button
  type="button"
  variant="destructive"
  className="mt-2 w-full"
  onClick={() => setDeleteAccountOpen(true)}
>
  Delete My Account
</Button>

          <Button type="submit" isLoading={isSaving} className="mt-2 w-full">
            Save Changes
          </Button>
        </div>
      </form>
      <ChangeEmailDialog
  open={changeEmailOpen}
  onOpenChange={setChangeEmailOpen}
/>
<DeleteAccountDialog
  open={deleteAccountOpen}
  onOpenChange={setDeleteAccountOpen}
/>
    </FormProvider>
    
  );
  
}
