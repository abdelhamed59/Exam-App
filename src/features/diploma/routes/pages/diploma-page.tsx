import { GraduationCap } from "lucide-react";
import PageHeader from "@/shared/components/page-header/page-header";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FormFeedback from "@/shared/components/form-feedback";
import { useDiplomas } from "../../apis/queries/use-diplomas";
import DiplomaCard from "../../components/diploma-card";
export default function DiplomaPage() {
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
    isFetchingNextPage,
  } = useDiplomas();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (<>
        <Breadcrumb breadcrumb={["Diplomas"]} />

    <div className="flex  flex-col gap-6 p-6">
      <PageHeader
        icon={GraduationCap}
        title="Diplomas"
      />
 {isPending && <p>Loading...</p>}
  {isError && <FormFeedback errors={[error.message]} />}
    <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.pages.map((page) =>
              page.data.map((diploma) => (
                <DiplomaCard
                  key={diploma.id}
                  diploma={diploma}
                />
              ))
            )}
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
    </>
  );
}