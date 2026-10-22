

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import PasswordField from "@/features/auth/shared/components/password-field";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import type { IApiError } from "@/shared/types/api";
import type { IChangePassword } from "../types/user";
import { changePasswordSchema } from "../schemas/changePasswordschema";
import { useChangePassword } from "../apis/mutations/useChangePassword";
import { toast } from "@/components/ui/toast";
import useLogout from "@/hooks/logOut";


export default function ChangePassword() {
          const { handleLogout } = useLogout();
  

  const { mutate: changePassword, error, isPending } = useChangePassword();
  const apiError = error as IApiError | null;

  const form = useForm<IChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const bannerErrors = useApiFormErrors(apiError, form);

  const onSubmit: SubmitHandler<IChangePassword> = (values) => {
    changePassword(values, {
      onSuccess: () => {
        toast.add({
          title: "Your password has been updated.",
          type: "success",
          timeout: 3000
        });
        form.reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
        handleLogout();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4 bg-white p-6">
        <PasswordField name="currentPassword" label="Current Password" placeholder="Enter your current password" />
        <PasswordField name="newPassword" label="New Password" placeholder="Enter your new password" />
        <PasswordField name="confirmPassword" label="Confirm New Password" placeholder="Re-enter your new password" />

        <FormFeedback
          errors={bannerErrors.length ? bannerErrors : apiError && !apiError.errors?.length ? [apiError.message] : []}
        />



        <Button type="submit" className="mt-2 w-full" isLoading={isPending}>
          Update Password
        </Button>
      </form>
    </FormProvider>
  );
}