import { useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";
import type { ILoginFormValues } from "@/features/auth/types/login";

export default function UsernameField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ILoginFormValues>();

  return (
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input
        id="username"
        type="text"
        placeholder="Enter your username"
        aria-invalid={!!errors.username}
        {...register("username")}
      />
      {errors.username && <FieldError>{errors.username.message}</FieldError>}
    </Field>
  );
}