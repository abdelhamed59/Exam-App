import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";
import { useAdminExam } from "@/features/admin/exam/apis/queries/use-admin-exam";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import { CopyPlus, PlusIcon, Save, X, XIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import AdminQuestionAnswers from "../../components/admin-question-answers";
import { useFieldArray, useForm } from "react-hook-form";
import type { IAdminBulkQuestionFormValues } from "../../types/admin-question";
import { adminBulkQuestionSchema } from "../../schemas/adminQuestion.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import FormFeedback from "@/shared/components/form-feedback";
import { useCreateBulkQuestions } from "../../apis/mutations/use-creatBulk-question";

export default function AdminAddBulkQuestions() {
    const { examId } = useParams<{ examId: string }>();
    const navigate = useNavigate();
    const { data: exam } = useAdminExam(examId!);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const ADMIN_QUESTIONS_FORM = "admin-questions-form";
    const {mutate, isPending , error} = useCreateBulkQuestions(examId!);
    // form
    const form = useForm<IAdminBulkQuestionFormValues>({
        resolver: zodResolver(adminBulkQuestionSchema),

        defaultValues: {
            questions: [],
        },
    });

    //   field array for questions
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "questions",
    });
    //  add a new question to the field array
    const addQuestion = () => {
        const newIndex = fields.length;

        append({
            text: "",
            answers: [],
        });

        setActiveQuestion(newIndex);
    };
// delete a question from the field array
    const deleteQuestion = (index: number) => {
        if (fields.length <= 1) return;

        remove(index);

        setActiveQuestion((current) => {
            if (index < current) return current - 1;
            if (index === current) return Math.max(0, current - 1);
            return current;
        });
    };
// handle form submission
    const handleSubmit = (values: IAdminBulkQuestionFormValues) => {
        console.log("Exam ID:", examId);
        console.log("Bulk questions:", values.questions);
        mutate(values,{
      onSuccess: () => {
        form.reset({
            questions: [],
        });
        navigate(`/dashboard/exams/${examId}`);
      },
    });

    };

// handle cancel action
    const handleCancel = () => {
      navigate(`/dashboard/exams/${examId}`);
  };



    return (
        <div className="flex h-full flex-col bg-gray-100">
            <Breadcrumb breadcrumb={["Exams", "Create New Questions"]} />
            {/* header */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-2">
                <Button type="button" className="px-4">
                    <CopyPlus size={18} />
                    Bulk Add Mode
                </Button>

                <div className="flex items-center gap-2.5 p-2.5">
                    <Button onClick={handleCancel} type="button" variant="secondary" className="px-4">
                        <X size={18} />
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        form={ADMIN_QUESTIONS_FORM}
                        className="bg-emerald-500 px-4 text-white hover:bg-emerald-600"
                    >
                        <Save size={18} />
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>


            {/* Exam Info */}
            <section className="flex flex-col  p-6">
                <div className="bg-blue-600 p-2.5">
                    <p className="font-mono font-semibold text-white">Exam Info</p>
                </div>

                <div className="flex flex-col gap-6 bg-white p-6">
                    {/* Exam */}

                    <Field>
                        <FieldLabel>Exam</FieldLabel>

                        <Input value={exam?.title ?? ""} placeholder="Select exam" readOnly />
                    </Field>
                </div>
            </section>




            {/* Questions */}



            <form
                id={ADMIN_QUESTIONS_FORM}
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col px-6 gap-6"
            >
                <section>
                    <header className="p-2.5 bg-blue-600 font-mono font-semibold text-white">Questions</header>
                    {/* tabs */}
                    <ul className="flex flex-wrap">
                        {fields.map((field, index) => (
                            <Button
                                key={field.id}
                                size="icon-lg"
                                className={`grow group relative px-10 max-w-40 ${activeQuestion === index ? null : "border-r border-gray-200 bg-white"}`}
                                variant={activeQuestion === index ? "outline" : "secondary"}
                                onClick={() => setActiveQuestion(index)}
                            >
                                Q{index + 1}
                                {/* delete question button */}
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteQuestion(index)
                                    }}
                                    className="text-red-500 absolute top-1 right-1 hidden group-hover:block"><XIcon size={16} /></span>
                            </Button>
                        ))}

                        {/* add question tab */}
                        <Button className="ml-auto" size="icon-lg" variant="secondary" onClick={addQuestion}>
                            <PlusIcon size={40} />
                        </Button>
                    </ul>
                    {/* question content */}
                    {fields.map((field, index) => (
                        // only show the active question
                        <div
                            key={field.id}
                            hidden={activeQuestion !== index}

                            className="flex flex-col py-4 gap-4">
                            <Field>
                                <FieldLabel>Question Headline</FieldLabel>
                                <Input
                                    {...form.register(`questions.${activeQuestion}.text`)}
                                    aria-invalid={!!form.formState.errors.questions?.[index]?.text}
                                />
                                {form.formState.errors.questions?.[index]?.text?.message && (
                                    <FieldError>
                                        {form.formState.errors.questions[index].text.message}
                                    </FieldError>
                                )}
                            </Field>

                            <AdminQuestionAnswers form={form} name={`questions.${index}.answers`}
                            />

                        </div>
                    ))}

                </section>
{form.formState.errors.questions?.message && (
          <FormFeedback>{form.formState.errors.questions?.message}</FormFeedback>
        )}
            </form>
          {error && (
            <FormFeedback className="bg-red-100 text-red-700">{error.message}</FormFeedback>
          )}
        </div>
    )
}



















 
