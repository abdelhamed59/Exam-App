import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import { forgotPasswordSchema } from "@/features/auth/schemas/forgot-password.schema";
import type { IForgotPasswordFormValues } from "@/features/auth/types/forgot-password";
import { useForgotPassword } from "@/features/auth/apis/mutations/use-forgot-password";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import type { IApiError } from "@/shared/types/api";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const { mutate: forgotPassword, error, isPending } = useForgotPassword();
  const apiError = error as IApiError | null;

  const form = useForm<IForgotPasswordFormValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const bannerErrors = useApiFormErrors(apiError, form);

  const onSubmit: SubmitHandler<IForgotPasswordFormValues> = (values) => {
    forgotPassword(values, {
      onSuccess: () => navigate("/forgot-password/sent", { state: { email: values.email } }),
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="user@example.com"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          {form.formState.errors.email && <FieldError>{form.formState.errors.email.message}</FieldError>}
        </Field>

        <FormFeedback
          errors={bannerErrors.length ? bannerErrors : apiError && !apiError.errors?.length ? [apiError.message] : []}
        />

        <Button type="submit" className="mt-2 w-full" isLoading={isPending}>
          Next
          <ChevronRight className="size-4" />
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
