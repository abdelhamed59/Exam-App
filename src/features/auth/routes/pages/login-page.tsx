import Heading from "../../shared/components/heading";
import LoginForm from "../../components/login/form/login-form";

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-113 flex-col gap-10">
      {/* Heading */}
      <Heading>Login</Heading>

      {/* Form */}
      <LoginForm />
    </div>
  );
}
