import Heading from "../../shared/components/heading";
import ResetPasswordForm from "../../components/reset-password/form/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex w-full max-w-113 flex-col gap-6">
      {/* Heading */}
      <div>
        <Heading>Create a New Password</Heading>
        <p className="mt-2 text-sm text-gray-500">Create a new strong password for your account.</p>
      </div>

      {/* Form */}
      <ResetPasswordForm />
    </div>
  );
}
