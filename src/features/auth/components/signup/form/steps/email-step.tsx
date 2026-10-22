import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import { signupEmailSchema } from "@/features/auth/schemas/signup-email.schema";
import type { ISignupEmailFormValues } from "@/features/auth/types/signup";
import { useSignupEmail } from "@/features/auth/apis/mutations/use-signup-email";
import { useSignup } from "@/features/auth/context/use-signup";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import type { IApiError } from "@/shared/types/api";

export default function EmailStep() {
  const { setEmail, goNext } = useSignup();

  const { mutate: signupEmail, error, isPending } = useSignupEmail();
  const apiError = error as IApiError | null;

  const form = useForm<ISignupEmailFormValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(signupEmailSchema),
  });

  const bannerErrors = useApiFormErrors(apiError, form);

  const onSubmit: SubmitHandler<ISignupEmailFormValues> = (values) => {
    signupEmail(values, {
      onSuccess: () => {
        setEmail(values.email);
        goNext();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <Field>
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

        <Button type="submit" variant="outline" className="mt-2 w-full" isLoading={isPending}>
          Next
          <ChevronRight className="size-4" />
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
