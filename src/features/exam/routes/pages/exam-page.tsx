import { useParams } from "react-router";
import { useExams } from "../../apis/queries/use-exams";
import FormFeedback from "@/shared/components/form-feedback";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import PageHeader from "@/shared/components/page-header/page-header";
import { BookOpenCheck } from "lucide-react";
import ExamCard from "../../components/ExamCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function ExamPage() {
  const { diplomaId } = useParams<{ diplomaId: string }>();
    const { ref, inView } = useInView({
    threshold: 0,
  });

  const { 
    data, 
    error, 
    isPending,
     isError, 
     fetchNextPage,
      hasNextPage, 
      isFetchingNextPage } = useExams(diplomaId!);


      useEffect(()=>{
        if(inView && hasNextPage &&!isFetchingNextPage){
          fetchNextPage()
        }
      },[inView, hasNextPage, isFetchingNextPage, fetchNextPage])

 


  return  (<>
          <Breadcrumb breadcrumb={["Diplomas",data?.pages[0].data[0]?.diploma?.title ? `${data.pages[0].data[0].diploma.title} / Exams` : "Exams"]} />

    <div className="flex flex-col gap-6 p-4 sm:p-6">

      <PageHeader
        icon={BookOpenCheck}
        title={ data?.pages[0].data[0]?.diploma?.title ? `${data.pages[0].data[0].diploma.title} Exams` : "Exams" }
        backTo="/"
      />

  {isPending && <p className="font-mono text-gray-500">Loading...</p>}
  {isError && <FormFeedback errors={[error.message]} />}
<div className="flex-1 bg-white p-6 overflow-auto">
   <div className="grid grid-cols-1 gap-4 ">
        {data?.pages.map((page) => (
          page.data.length === 0 ? (
            <p className="py-8 text-center font-mono text-gray-500">No exams found for this diploma.</p>
          ) : (
            page.data.map((exam) => (
             < ExamCard key={exam.id} exam={exam} />
            ))
          )
          ))
        }
      </div>
<div
        ref={ref}
        className="py-3 text-center font-mono text-gray-500"
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll to view more"
          : "End of list"}
      </div>
</div>
     
    </div>
  </>);;
}
