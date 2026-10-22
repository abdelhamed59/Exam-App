
import { useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";
import FormFeedback from "@/shared/components/form-feedback";
import Stepper from "@/features/auth/shared/components/stepper";
import OtpInput from "@/features/auth/shared/components/otp-input";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import type { IApiError } from "@/shared/types/api";

import { changeEmailSchema } from "../schemas/changeEmailSchema";
import { emailOtpSchema } from "../schemas/emailOtpSchema";
import { useRequestEmailChange } from "../apis/mutations/useRequestEmailChange";
import { useConfirmEmailChange } from "../apis/mutations/useConfirmEmailChange";
import type { IChangeEmailFormValues } from "../types/user";

interface ChangeEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RESEND_SECONDS = 60;

export default function ChangeEmailDialog({ open, onOpenChange }: ChangeEmailDialogProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpValidationError, setOtpValidationError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const requestEmailChange = useRequestEmailChange();
  const confirmEmailChange = useConfirmEmailChange();
  const requestError = requestEmailChange.error as IApiError | null;
  const confirmError = confirmEmailChange.error as IApiError | null;

  const form = useForm<IChangeEmailFormValues>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { newEmail: "" },
  });

  const bannerErrors = useApiFormErrors(requestError, form);

  useEffect(() => {
    if (step !== 2 || secondsLeft === 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [step, secondsLeft]);

  const resetDialog = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setOtpValidationError(null);
    setSecondsLeft(RESEND_SECONDS);
    form.reset({ newEmail: "" });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) resetDialog();
  };

  const handleEmailSubmit: SubmitHandler<IChangeEmailFormValues> = (values) => {
    requestEmailChange.mutate(values, {
      onSuccess: () => {
        setEmail(values.newEmail);
        setStep(2);
        setSecondsLeft(RESEND_SECONDS);
      },
    });
  };

  const handleVerify = () => {
    const result = emailOtpSchema.safeParse({ code: otp });
    if (!result.success) {
      setOtpValidationError(result.error.issues[0].message);
      return;
    }
    setOtpValidationError(null);
    confirmEmailChange.mutate(
      { code: otp },
      {
        onSuccess: () => handleOpenChange(false),
      },
    );
  };

  const handleResend = () => {
    requestEmailChange.mutate({ newEmail: email }, { onSuccess: () => setSecondsLeft(RESEND_SECONDS) });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-7.5 p-9 sm:max-w-105">
        <Stepper
  step={step}
  totalSteps={2}
  fullWidth
/>

        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Change Email</DialogTitle>
            </DialogHeader>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="flex w-full flex-col gap-4">
                <Field data-invalid={!!form.formState.errors.newEmail}>
                  <FieldLabel htmlFor="newEmail">Email</FieldLabel>
                  <Input
                    id="newEmail"
                    type="email"
                    placeholder="user@example.com"
                    aria-invalid={!!form.formState.errors.newEmail}
                    {...form.register("newEmail")}
                  />
                  {form.formState.errors.newEmail && (
                    <FieldError>{form.formState.errors.newEmail.message}</FieldError>
                  )}
                </Field>

                <FormFeedback
                  errors={
                    bannerErrors.length ? bannerErrors : requestError && !requestError.errors?.length ? [requestError.message] : []
                  }
                />

                <Button type="submit" className="mt-2 w-full" isLoading={requestEmailChange.isPending}>
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </form>
            </FormProvider>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Verify OTP</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <p className="font-mono text-sm text-gray-600">
                Please enter the 6-digits code we have sent to: {email}.{" "}
                <button type="button" onClick={() => setStep(1)} className="text-blue-600 underline">
                  Edit
                </button>
              </p>

              <OtpInput value={otp} onChange={setOtp} />

              <FormFeedback
                errors={
                  otpValidationError
                    ? [otpValidationError]
                    : confirmError
                      ? [confirmError.message]
                      : []
                }
              />

              <p className="font-mono text-sm text-gray-500">
                {secondsLeft > 0 ? (
                  <>You can request another code in: {secondsLeft}s</>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={requestEmailChange.isPending}
                    className="text-blue-600 underline"
                  >
                    {requestEmailChange.isPending ? "Sending..." : "Resend code"}
                  </button>
                )}
              </p>

              <Button type="button" onClick={handleVerify} className="w-full" isLoading={confirmEmailChange.isPending}>
                Verify Code
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}