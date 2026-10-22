import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";

interface PasswordFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
}

export default function PasswordField({
  name = "password",
  label = "Password",
  placeholder = "********",
}: PasswordFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [visible, setVisible] = useState(false);
  const error = errors[name];

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <div className="relative">
        <Input
          id={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="pr-10"
          aria-invalid={!!error}
          {...register(name)}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && <FieldError>{error.message as string}</FieldError>}
    </Field>
  );
}