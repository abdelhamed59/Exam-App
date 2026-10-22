import { useSearchParams } from "react-router";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import PasswordField from "@/features/auth/shared/components/password-field";
import { resetPasswordSchema } from "@/features/auth/schemas/reset-password.schema";
import type { IResetPasswordFormValues } from "@/features/auth/types/reset-password";
import { useResetPassword } from "@/features/auth/apis/mutations/use-reset-password";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import type { IApiError } from "@/shared/types/api";

export default function ResetPasswordForm() {
  // The token comes from the query string in the emailed link (?token=...)
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const { mutate: resetPassword, error, isPending } = useResetPassword(token);
  const apiError = error as IApiError | null;

  const form = useForm<IResetPasswordFormValues>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  // Any error whose `path` isn't `password`/`confirmPassword` (e.g. `token`,
  // which has no visible input) ends up here for the banner below.
  const bannerErrors = useApiFormErrors(apiError, form);

  const onSubmit: SubmitHandler<IResetPasswordFormValues> = (values) => {
    resetPassword(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <PasswordField name="password" label="New Password" />
        <PasswordField name="confirmPassword" label="Confirm New Password" />

        <FormFeedback
          errors={bannerErrors.length ? bannerErrors : apiError && !apiError.errors?.length ? [apiError.message] : []}
        />

        <Button type="submit" className="mt-2 w-full" isLoading={isPending}>
          Reset Password
        </Button>
      </form>
    </FormProvider>
  );
}
