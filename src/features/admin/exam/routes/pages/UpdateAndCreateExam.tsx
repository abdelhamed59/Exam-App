import { useNavigate, useParams } from "react-router"
import { useAdminExam } from "../../apis/queries/use-admin-exam";
import { useCreateExam } from "../../apis/mutations/use-create-exam";
import { useUpdateExam } from "../../apis/mutations/use-update-exam";
import type { IApiError } from "@/shared/types/api";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { IAdminExamFormValues } from "../../types/admin-exam";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminExamSchema } from "../../schemas/adminExam-schema";
import { useEffect, useState } from "react";
import { useApiFormErrors } from "@/hooks/use-api-form-errors";
import FormFeedback from "@/shared/components/form-feedback";
import UpdateAndCreateExamHeader, { ADMIN_EXAM_FORM_ID } from "../../components/update&createExam/admin-uc-exam";

import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import { useAdminDiplomas } from "@/features/admin/diploma/apis/queries/use-admin-diplomas";
import ImageDrop from "@/shared/uploadImg/components/ImageDrop";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button/button";
import { Plus } from "lucide-react";
import AdminExamQuestions from "../../components/admin-exam-questions";


export default function UpdateAndCreateExam() {
    const { id } = useParams<{ id: string }>()
    const isUpdateMode = !!id
    const navigate = useNavigate()
    const { data: existingExam, error: examError, isPending: isLoadingExam } = useAdminExam(id ?? "");
    const createExam = useCreateExam()
    const updateExam = useUpdateExam(id ?? "")
    const { mutate, error, isPending } = isUpdateMode ? updateExam : createExam
    const apiError = error as IApiError | null;

    const form = useForm<IAdminExamFormValues>({
        resolver: zodResolver(adminExamSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            duration: 0,
            diplomaId: ""
        }
    })

    useEffect(() => {
        if (!existingExam) return;
        form.reset(existingExam ? {
            title: existingExam.title,
            description: existingExam.description,
            image: existingExam.image,
            duration: existingExam.duration,
            diplomaId: existingExam.diplomaId
        } : {
            title: "",
            description: "",
            image: "",
            duration: 0,
            diplomaId: ""
        });
    }, [existingExam, form]);



    const [diplomaSearch, setDiplomaSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // --------------------------------------------------
    // Debounce diploma search
    // --------------------------------------------------

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(diplomaSearch);
        }, 300);

        return () => clearTimeout(timer);
    }, [diplomaSearch]);

    // --------------------------------------------------
    // Get diplomas
    // --------------------------------------------------

    const { data, isLoading: isDiplomasLoading } = useAdminDiplomas({
        page: 1,
        limit: 12,
        sortBy: "title",
        sortOrder: "asc",
        search: debouncedSearch || undefined,
    });

    const diplomas = data?.data ?? [];

    const items = existingExam?.diploma && !diplomas.some((d) => d.id === existingExam.diploma.id)
        ? [existingExam.diploma, ...diplomas]
        : diplomas;





    const handleCancel = () => {
        navigate("/dashboard/exams")

    };
    const onSubmit: SubmitHandler<IAdminExamFormValues> = (vlues) => mutate(vlues);

    const bannerErrors = useApiFormErrors(apiError, form);

    if (isUpdateMode && isLoadingExam) {
        return <p className="p-6 font-mono text-sm text-gray-500">Loading diploma...</p>;
    }
    if (examError)
        return (
            <div className="flex items-center justify-center h-full w-full px-6">
                <FormFeedback className="w-full"
                    errors={examError.message ? [examError.message] : []}
                />
            </div>
        );



    return (
        <div className="flex min-h-full min-w-0 flex-col bg-gray-100">
            <Breadcrumb breadcrumb={["Exams", isUpdateMode ? "Update Exam" : "Create New Exam"]} />
            <UpdateAndCreateExamHeader title={existingExam?.title} diploma={existingExam?.diploma} isSaving={isPending} onCancel={handleCancel} />
           
<form
  id={ADMIN_EXAM_FORM_ID}
  onSubmit={form.handleSubmit(onSubmit)}
  className="flex min-w-0 flex-col gap-4 p-3 sm:p-4 lg:p-6"
>
  <span className="bg-blue-600 p-3 text-sm font-semibold text-white sm:text-base">
    Exam Information
  </span>

  <div className="grid min-w-0 grid-cols-1 gap-4 bg-white p-3 sm:p-4 md:grid-cols-2">
    {/* Title */}
    <Field data-invalid={!!form.formState.errors.title}>
      <FieldLabel htmlFor="title">Title</FieldLabel>
      <Input
        className="h-11 w-full min-w-0"
        id="title"
        {...form.register("title")}
        aria-invalid={!!form.formState.errors.title}
      />
      {form.formState.errors.title && (
        <FieldError>
          {form.formState.errors.title.message}
        </FieldError>
      )}
    </Field>

    {/* Diploma */}
    <Field data-invalid={!!form.formState.errors.diplomaId}>
      <FieldLabel htmlFor="diploma">Diploma</FieldLabel>

      <Controller
        control={form.control}
        name="diplomaId"
        render={({ field }) => {
          const selectedDiploma =
            items.find((d) => d.id === field.value) ?? null;

          return (
            <Combobox
              items={items}
              value={selectedDiploma}
              itemToStringLabel={(d) => d?.title ?? ""}
              isItemEqualToValue={(item, value) =>
                item.id === value.id
              }
              filter={null}
              onValueChange={(diploma) => {
                field.onChange(diploma?.id ?? "");
              }}
              onInputValueChange={setDiplomaSearch}
            >
              <ComboboxInput
                id="diploma"
                className="h-11 w-full min-w-0 rounded-md border border-gray-200 bg-white p-2.5 text-gray-800 hover:border-blue-600"
                placeholder="Diploma"
              />

              <ComboboxContent>
                <ComboboxEmpty>
                  {isDiplomasLoading
                    ? "Loading..."
                    : "No diploma found."}
                </ComboboxEmpty>

                <ComboboxList>
                  {(diploma) => (
                    <ComboboxItem
                      key={diploma.id}
                      value={diploma}
                    >
                      {diploma.title}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          );
        }}
      />

      {form.formState.errors.diplomaId && (
        <FieldError>
          {form.formState.errors.diplomaId.message}
        </FieldError>
      )}
    </Field>

    {/* Image */}
    <Field data-invalid={!!form.formState.errors.image}>
      <FieldLabel>Image</FieldLabel>
      <Controller
        control={form.control}
        name="image"
        render={({ field }) => (
          <ImageDrop
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {form.formState.errors.image && (
        <FieldError>
          {form.formState.errors.image.message}
        </FieldError>
      )}
    </Field>

    {/* Description */}
    <Field data-invalid={!!form.formState.errors.description}>
      <FieldLabel htmlFor="description">
        Description
      </FieldLabel>
      <Textarea
        className="min-h-24 w-full resize-none"
        id="description"
        {...form.register("description")}
        aria-invalid={!!form.formState.errors.description}
      />
      {form.formState.errors.description && (
        <FieldError>
          {form.formState.errors.description.message}
        </FieldError>
      )}
    </Field>

    {/* Duration */}
    <Field data-invalid={!!form.formState.errors.duration}>
      <FieldLabel htmlFor="duration">
        Duration (min)
      </FieldLabel>
      <Input
        type="number"
        className="h-11 w-full"
        id="duration"
        {...form.register("duration", {
          valueAsNumber: true,
        })}
        aria-invalid={!!form.formState.errors.duration}
      />
      {form.formState.errors.duration && (
        <FieldError>
          {form.formState.errors.duration.message}
        </FieldError>
      )}
    </Field>

    <div className="min-w-0 md:col-span-2">
      <FormFeedback
        errors={
          bannerErrors.length
            ? bannerErrors
            : apiError && !apiError.errors?.length
              ? [apiError.message]
              : []
        }
      />
    </div>
  </div>
</form>

 
            {isUpdateMode&&<>
            <div className="px-6">
        <div className="flex items-center justify-between bg-blue-600 px-2.5">
          <h2 className="font-inter text-base font-semibold text-white">
            Exam Questions
          </h2>

          <Button
            type="button"
            className="gap-2 font-mono text-base font-medium text-white"
            onClick={() => {
              navigate(`/dashboard/questions/exam/${id}/create`)
            }}
          >
            <Plus  size={18} />

            Add Question
          </Button>
        </div>
       </div>
       <AdminExamQuestions examId={id}/>
           </> }
         </div>
    )
}
