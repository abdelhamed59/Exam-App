import Heading from "../../shared/components/heading";
import ForgotPasswordForm from "../../components/forgot-password/form/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex w-full max-w-113 flex-col gap-6">
      {/* Heading */}
      <div>
        <Heading>Forgot Password</Heading>
        <p className="mt-2 text-sm text-gray-500">Don&apos;t worry, we will help you recover your account.</p>
      </div>

      {/* Form */}
      <ForgotPasswordForm />
    </div>
  );
}
