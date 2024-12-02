import { getCollection } from "@/app/actions/collection";
import { notFound } from "next/navigation";
import { Question } from "@/lib/schemas";
import { CollectionContent } from "./collection-content";

type CollectionPageParams = Promise<{ 
    id: string 
}>

export default async function CollectionPage({ params }: { params: CollectionPageParams }) {
    let props = await params;
    const parsedId = parseInt(props.id);
    
    if (isNaN(parsedId)) {
        notFound();
    }

    const collection = await getCollection(parsedId);
    if (!collection) {
        notFound();
    }

    const quizzes: (Question & { id: number })[] = collection.Quiz.map(quiz => ({
        id: quiz.id,
        question: quiz.question,
        options: quiz.options,
        answer: quiz.answer as "A" | "B" | "C" | "D"
    }));

    return <CollectionContent collection={collection} quizzes={quizzes} />;
}