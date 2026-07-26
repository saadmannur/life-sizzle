
import { getLessonById } from "@/lib/api/lesson";
import { notFound } from "next/navigation";
import LessonForm from "../../../new/page";
;

const UpdateLessonPage = async ({ params }) => {
    const { id } = await params; 
    const lesson = await getLessonById(id);

    if (!lesson) {
        notFound();
    }

    return (
        <LessonForm
            initialData={lesson}
            isEdit={true}
        />
    );
};

export default UpdateLessonPage;