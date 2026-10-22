import Heading from "../../shared/components/heading";
import Stepper from "../../shared/components/stepper";
import { SignupProvider } from "../../context/signup.context";
import { useSignup } from "../../context/use-signup";
import EmailStep from "../../components/signup/form/steps/email-step";
import OtpStep from "../../components/signup/form/steps/otp-step";
import UserInfoStep from "../../components/signup/form/steps/user-info-step";
import PasswordStep from "../../components/signup/form/steps/password-step";
// Subtitles for each step in the sign up process.
const STEP_SUBTITLES: Partial<Record<string, string>> = {
  otp: "Verify OTP",
  userInfo: "Tell us more about you",
  password: "Create a strong password",
};

function SignupWizard() { 
  const { step, stepIndex } = useSignup();
  const subtitle = STEP_SUBTITLES[step];

  return (
    <div className="flex w-full max-w-113 flex-col gap-6">
      {/* Stepper */}
      {stepIndex > 1 && <Stepper step={stepIndex} totalSteps={4} />}
      {/* <Stepper step={stepIndex} totalSteps={4} /> */}

      {/* Heading */}
      <div>
        <Heading>Create Account</Heading>
        {subtitle && <p className="mt-1 text-2xl font-bold text-blue-600">{subtitle}</p>}
      </div>

      {/* Active step */}
      {step === "email" && <EmailStep />}
      {step === "otp" && <OtpStep />}
      {step === "userInfo" && <UserInfoStep />}
      {step === "password" && <PasswordStep />}
    </div>
  );
}

export default function SignupPage() {
  return (
    <SignupProvider>
      <SignupWizard />
    </SignupProvider>
  );
}
