import { useEffect, useMemo } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { IApiError, IApiFieldError } from "@/shared/types/api";

function getFieldMessages(fieldError: IApiFieldError): string[] {
  if (fieldError.messages?.length) return fieldError.messages;
  if (fieldError.message) return [fieldError.message];
  return [];
}

/**
 * يطبّق أخطاء التحقق من جهة الخادم (IApiError، من axios interceptor)
 * على نموذج react-hook-form:
 *
 * - لكل مدخل تكون قيمة `path` فيه مطابقة لحقل مسجّل فعلاً في هذا النموذج،
 *   يتم استدعاء `form.setError(path, ...)` — هذا يجعل حدود الحقل تتحول إلى
 *   اللون الأحمر ويعرض الرسالة عبر <FieldError>، تماماً كما تَحدث أخطاء
 *   التحقق على جهة العميل.
 * - بالنسبة للمدخلات التي تكون قيمة `path` فيها غير مسجّلة في هذا النموذج
 *   (مثلاً `token`، الذي لا يملك حقل إدخال مرئي)، فسيتم إرجاع الرسائل بدلاً
 *   من ذلك، حتى يتمكن المستدعي من عرضها في شريط <FormFeedback>.
 */
export function useApiFormErrors<T extends FieldValues>(
  error: IApiError | null | undefined,
  form: Pick<UseFormReturn<T>, "setError" | "getValues">,
): string[] {
  const { setError, getValues } = form;

  useEffect(() => {
    if (!error?.errors?.length) return;

    const knownFields = Object.keys(getValues());

    for (const fieldError of error.errors) {
      const messages = getFieldMessages(fieldError);
      if (!messages.length) continue;

      if (knownFields.includes(fieldError.path)) {
        setError(fieldError.path as Path<T>, {
          type: "server",
          message: messages.join(" "),
        });
      }
    }
  }, [error, setError, getValues]);

  return useMemo(() => {
    if (!error?.errors?.length) return [];

    const knownFields = Object.keys(getValues());
    const leftover: string[] = [];

    for (const fieldError of error.errors) {
      const messages = getFieldMessages(fieldError);
      if (!messages.length) continue;

      if (!knownFields.includes(fieldError.path)) {
        leftover.push(...messages);
      }
    }

    return leftover;
  }, [error, getValues]);
}
