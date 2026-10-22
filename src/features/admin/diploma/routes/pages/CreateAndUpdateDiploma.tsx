import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import { useNavigate, useParams } from "react-router";
import UpdateDiplomaHeader, { ADMIN_DIPLOMA_FORM_ID } from "../../components/update&createDiploma/admin-update-header";
import { useAdminDiploma } from "../../apis/queries/use-admin-diploma";
import { useCreateDiploma } from "../../apis/mutations/use-create-diploma";
import { useUpdateDiploma } from "../../apis/mutations/use-update-diploma";
import type { IApiError } from "@/shared/types/api";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { IAdminDiplomaFormValues } from "../../types/admin-diploma";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminDiplomaSchema } from "../../schemas/adminDiploma-schema";
import { useEffect } from "react";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import ImageDrop from "@/shared/uploadImg/components/ImageDrop";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea";
import FormFeedback from "@/shared/components/form-feedback";

export default function CreateAndUpdateDiploma() {
  const navigate=useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const { data: existingDiploma,error:diplomaError ,isPending: isLoadingDiploma } = useAdminDiploma(id ?? "");
  const createDiploma = useCreateDiploma();
  const updateDiploma = useUpdateDiploma(id ?? "");
  const { mutate, error, isPending: isSaving } = isEditMode ? updateDiploma : createDiploma;
  const apiError = error as IApiError | null;

  const form = useForm<IAdminDiplomaFormValues>({
    resolver: zodResolver(adminDiplomaSchema),
    defaultValues: {
      image: "",
      title: "",
      description: "",
    },
  });

  const resetValues = (): IAdminDiplomaFormValues =>
    existingDiploma
      ? { image: existingDiploma.image??"", title: existingDiploma.title, description: existingDiploma.description }
      : { image: "", title: "", description: "" };

  useEffect(() => {
    if (!existingDiploma) return;
    form.reset(resetValues());
  }, [existingDiploma]);

  const handleCancel = () => {
    form.reset(resetValues());
    navigate("/dashboard/diplomas")
    
  };
  const onSubmit: SubmitHandler<IAdminDiplomaFormValues> = (vlues) => mutate(vlues);

  const bannerErrors = useApiFormErrors(apiError, form);

  if (isEditMode && isLoadingDiploma) {
    return <p className="p-6 font-mono text-sm text-gray-500">Loading diploma...</p>;
  }
if (diplomaError)
  return (
<div className="flex items-center justify-center h-full w-full px-6">
 <FormFeedback className="w-full"
      errors={diplomaError.message ? [diplomaError.message] : []}
    />
</div>
  );
  
  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Breadcrumb breadcrumb={["Diplomas", isEditMode ? "Update Diploma" : "Create New Diploma"]} />
      <UpdateDiplomaHeader title={existingDiploma?.title} isSaving={isSaving} onCancel={handleCancel} />

      <form id={ADMIN_DIPLOMA_FORM_ID} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-6">
        <span className="bg-blue-600 p-2.5 font-mono text-base font-semibold text-white">Diploma Information</span>
        <div className="flex flex-col gap-4 bg-white p-4">
          <Field data-invalid={!!form.formState.errors.image}>
            <FieldLabel>Image</FieldLabel>
            <Controller
              control={form.control}
              name="image"
              render={({ field }) => <ImageDrop value={field.value} onChange={field.onChange} />}
            />
            {form.formState.errors.image && <FieldError>{form.formState.errors.image.message}</FieldError>}
          </Field>
          <Field data-invalid={!!form.formState.errors.title}>
            <FieldLabel htmlFor="tilte">Title</FieldLabel>
            <Input id="title" {...form.register("title")} aria-invalid={!!form.formState.errors.title}/>
                        {form.formState.errors.title && <FieldError>{form.formState.errors.title.message}</FieldError>}
          </Field>
          <Field data-invalid={!!form.formState.errors.description}>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea className=" resize-none" rows={5} id="description" {...form.register("description")} aria-invalid={!!form.formState.errors.description}/>
                        {form.formState.errors.description && <FieldError>{form.formState.errors.description.message}</FieldError>}
          </Field>
            <FormFeedback
            errors={bannerErrors.length ? bannerErrors : apiError && !apiError.errors?.length ? [apiError.message] : []}
          />
        </div>
      </form>
    </div>
  );
}
