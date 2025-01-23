'use server';

import { cloneCollection, copyQuizToCollection } from "./collection";
import { revalidatePath } from "next/cache";

export async function cloneCollectionAction(sourceId: number, name: string, description?: string) {
    await cloneCollection(sourceId, name, description);
    revalidatePath('/dashboard/collection');
}

export async function copyQuizAction(quizId: number, targetCollectionId: number) {
    await copyQuizToCollection(quizId, targetCollectionId);
    revalidatePath('/dashboard/collection');
}