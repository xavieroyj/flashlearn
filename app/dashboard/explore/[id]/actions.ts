'use server';

import { copyQuizToCollection } from "@/app/actions/collection";
import { revalidatePath } from "next/cache";

export async function addQuizToCollection(quizId: number, targetCollectionId: number) {
    await copyQuizToCollection(quizId, targetCollectionId);
    revalidatePath('/dashboard/collection');
}