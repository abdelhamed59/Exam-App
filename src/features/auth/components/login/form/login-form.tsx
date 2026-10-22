import type { ILoginFormValues } from "@/features/auth/types/login";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schemas/login.schema";
import { FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button/button";
import { Link } from "react-router";
import { useLogin } from "@/features/auth/apis/mutations/use-login";
import FormFeedback from "@/shared/components/form-feedback";
import PasswordField from "@/features/auth/shared/components/password-field";
import UsernameField from "./fields/username/field";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import type { IApiError } from "@/shared/types/api";

export default function LoginForm() {
  const { mutate: login, error, isPending } = useLogin();
  const apiError = error as IApiError | null;

  const form = useForm<ILoginFormValues>({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const bannerErrors = useApiFormErrors(apiError, form);

  const onSubmit: SubmitHandler<ILoginFormValues> = (values) => {
    login(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full w-full flex-col gap-4">
        <UsernameField />

        <div className="flex flex-col gap-2">
          <PasswordField />

          <FieldDescription className="flex justify-end">
            <Button
              nativeButton={false}
              variant="link"
              className="p-0"
              render={<Link to="/forgot-password">Forgot your password?</Link>}
            />
          </FieldDescription>
        </div>

        <FormFeedback
          errors={bannerErrors.length ? bannerErrors : apiError && !apiError.errors?.length ? [apiError.message] : []}
        />

        <Button
          type="submit"
          className="mt-2 w-full self-end"
          disabled={form.formState.isSubmitted && !form.formState.isValid}
          isLoading={isPending}
        >
          Login
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create yours
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
