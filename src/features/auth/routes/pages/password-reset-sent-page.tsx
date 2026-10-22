import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import Heading from "../../shared/components/heading";

export default function PasswordResetSentPage() {
  // Navigation
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? "your email";

  return (
    <div className="flex w-full max-w-113 flex-col gap-6">
      {/* Back */}
      <Button size="icon" variant="outline" onClick={() => navigate(-1)} aria-label="Go back">
        <ArrowLeft className="size-4" />
      </Button>

      {/* Heading */}
      <Heading>Password Reset Sent</Heading>

      {/* Description */}
      <div className="flex flex-col gap-3 text-sm text-gray-600">
        <p>
          We have sent a password reset link to: <span className="text-blue-600">{email}</span>.
        </p>
        <p>Please check your inbox and follow the instructions to reset your password.</p>
        <p className="text-gray-400">If you don&apos;t see the email within a few minutes, check your spam or junk folder.</p>
      </div>

      {/* Create account */}
      <p className="text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Create yours
        </Link>
      </p>
    </div>
  );
}
