import { Controller, FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";
import { Button } from "@/components/ui/button/button";
import { signupUserInfoSchema } from "@/features/auth/schemas/signup-user-info.schema";
import type { ISignupUserInfoFormValues } from "@/features/auth/types/signup";
import { useSignup } from "@/features/auth/context/use-signup";
import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";
export default function UserInfoStep() {
  const { setUserInfo, goNext } = useSignup();

  const form = useForm<ISignupUserInfoFormValues>({
    defaultValues: { firstName: "", lastName: "", username: "", phone: "" },
    resolver: zodResolver(signupUserInfoSchema),
  });

  const onSubmit: SubmitHandler<ISignupUserInfoFormValues> = (values) => {
    setUserInfo(values);
    goNext();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <Input
              id="firstName"
              placeholder="Ahmed"
              aria-invalid={!!form.formState.errors.firstName}
              {...form.register("firstName")}
            />
            {form.formState.errors.firstName && <FieldError>{form.formState.errors.firstName.message}</FieldError>}
          </Field>

          <Field>
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

        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            placeholder="user123"
            aria-invalid={!!form.formState.errors.username}
            {...form.register("username")}
          />
          {form.formState.errors.username && <FieldError>{form.formState.errors.username.message}</FieldError>}
        </Field>

      <Field>
  <FieldLabel htmlFor="phone">Phone</FieldLabel>

  <Controller
    control={form.control}
    name="phone"
    render={({ field }) => (
      <IntlTelInput
        initialCountry="eg"
        value={field.value}
        onChangeNumber={(phone: string) => field.onChange(phone)} 
        loadUtils={() => import("intl-tel-input/utils")}
        inputProps={{
          id: "phone",
          placeholder: "Enter your phone number",
          className: `
            h-[46px]
            w-full
            rounded-md
            border
            px-3
            outline-none
            transition-colors
            ${
              form.formState.errors.phone
                ? "border-red-500"
                : "border-gray-300 hover:border-blue-600 focus:border-blue-600"
            }
          `,
        }}
      />
    )}
  />

  {form.formState.errors.phone && (
    <FieldError>{form.formState.errors.phone.message}</FieldError>
  )}
</Field>

        <Button type="submit" variant="outline" className="mt-2 w-full">
          Next
          <ChevronRight className="size-4" />
        </Button>
      </form>
    </FormProvider>
  );
}