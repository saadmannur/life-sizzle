
import ReportedLessonsTable from "@/components/dashboard/admin/ReportedLessonsTable";
import { getReportedLessons } from "@/lib/api/forAdmin";
import { PiFlagFill } from "react-icons/pi";

const ReportedLessonsPage = async () => {
    const result = await getReportedLessons();
    const reportedLessons = Array.isArray(result) ? result : result?.data || [];
    const totalReportedLessons = result?.totalReportedLessons ?? reportedLessons.length;

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Admin
            </span>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">Reported Lessons</h1>
                    <p className="mt-1 text-sm text-[#8A93A0]">Review flagged lessons, then delete or clear the reports.</p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#26313B]/8 bg-white px-5 py-3 shadow-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                        <PiFlagFill className="h-5 w-5" />
                    </span>
                    <div>
                        <p className="text-xl font-extrabold leading-tight text-[#26313B]">{totalReportedLessons}</p>
                        <p className="text-xs text-[#8A93A0]">Reported Lessons</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <ReportedLessonsTable initialReports={reportedLessons} />
            </div>
        </div>
    );
};

export default ReportedLessonsPage;