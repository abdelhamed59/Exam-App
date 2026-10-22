import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import PasswordField from "@/features/auth/shared/components/password-field";
import { signupPasswordSchema } from "@/features/auth/schemas/signup-password.schema";
import type { ISignupPasswordFormValues } from "@/features/auth/types/signup";
import { useRegister } from "@/features/auth/apis/mutations/use-register";
import { useSignup } from "@/features/auth/context/use-signup";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import type { IApiError } from "@/shared/types/api";

export default function PasswordStep() {
  const { email, userInfo } = useSignup();

  const { mutate: register, error, isPending } = useRegister();
  const apiError = error as IApiError | null;

  const form = useForm<ISignupPasswordFormValues>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(signupPasswordSchema),
  });


  const bannerErrors = useApiFormErrors(apiError, form);

  const onSubmit: SubmitHandler<ISignupPasswordFormValues> = (values) => {
    if (!userInfo) return;

    register({
      email,
      ...userInfo,
      phone: userInfo.phone ?? "",
      ...values,
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <PasswordField name="password" label="Password" />
        <PasswordField name="confirmPassword" label="Confirm Password" />

        <FormFeedback
          errors={bannerErrors.length ? bannerErrors : apiError && !apiError.errors?.length ? [apiError.message] : []}
        />

        <Button type="submit" className="mt-2 w-full" isLoading={isPending}>
          Create Account
        </Button>
      </form>
    </FormProvider>
  );
}
