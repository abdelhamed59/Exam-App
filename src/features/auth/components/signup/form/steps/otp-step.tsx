import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import OtpInput from "@/features/auth/shared/components/otp-input";
import { signupOtpSchema } from "@/features/auth/schemas/signup-otp.schema";
import { useVerifyOtp } from "@/features/auth/apis/mutations/use-verify-otp";
import { useResendOtp } from "@/features/auth/apis/mutations/use-resend-otp";
import { useSignup } from "@/features/auth/context/use-signup";

const RESEND_SECONDS = 60;

export default function OtpStep() {
  // Context
  const { email, goNext, goToStep } = useSignup();

  // Mutations
  const { mutate: verifyOtp, error, isPending } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  // State
  const [code, setCode] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Functions
  const handleVerify = () => {
    const result = signupOtpSchema.safeParse({ code });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }
    setValidationError(null);
    verifyOtp({ code, email }, { onSuccess: goNext });
  };

  const handleResend = () => {
    resendOtp(email, { onSuccess: () => setSecondsLeft(RESEND_SECONDS) });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Description */}
      <p className="text-sm text-gray-600">
        Please enter the 6-digits code we have sent to: {email}.{" "}
        <button type="button" onClick={() => goToStep("email")} className="text-blue-600 underline">
          Edit
        </button>
      </p>

      {/* OTP */}
      <OtpInput value={code} onChange={setCode} />

      {/* Feedback */}
      <FormFeedback>{validationError ?? error?.message}</FormFeedback>

      {/* Resend */}
      <p className="text-sm text-gray-500">
        {secondsLeft > 0 ? (
          <>You can request another code in: {secondsLeft}s</>
        ) : (
          <button type="button" onClick={handleResend} disabled={isResending} className="text-blue-600 underline">
            {isResending ? "Sending..." : "Resend code"}
          </button>
        )}
      </p>

      {/* Submit */}
      <Button type="button" onClick={handleVerify} variant="outline" className="mt-2 w-full" isLoading={isPending}>
        Verify Code
      </Button>
    </div>
  );
}
