'use server';

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUserCollections() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    return prisma.collection.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            Quiz: true
        },
        orderBy: [
            { isPinned: 'desc' },
            { createdAt: 'desc' }
        ]
    });
}

export async function createCollection(name: string, description?: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    return prisma.collection.create({
        data: {
            name,
            description,
            userId: session.user.id,
        }
    });
}

export async function addQuizzesToCollection(collectionId: number, questions: { question: string; options: string[]; answer: string }[]) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    // Verify collection belongs to user
    const collection = await prisma.collection.findFirst({
        where: {
            id: collectionId,
            userId: session.user.id
        }
    });

    if (!collection) {
        throw new Error("Collection not found or access denied");
    }

    // Add all quizzes in a transaction
    await prisma.$transaction(
        questions.map(question => 
            prisma.quiz.create({
                data: {
                    ...question,
                    collectionId,
                }
            })
        )
    );

    // Revalidate both dashboard and collection pages
    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/collection/${collectionId}`);
}

export async function getCollection(id: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    return prisma.collection.findFirst({
        where: {
            id,
            userId: session.user.id
        },
        include: {
            Quiz: true
        }
    });
}

export async function toggleCollectionPin(collectionId: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    // Verify collection belongs to user
    const collection = await prisma.collection.findFirst({
        where: {
            id: collectionId,
            userId: session.user.id
        }
    });

    if (!collection) {
        throw new Error("Collection not found or access denied");
    }

    return prisma.collection.update({
        where: { id: collectionId },
        data: { isPinned: !collection.isPinned }
    });
}

export async function deleteCollection(id: number) {
    'use server';
    
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    await prisma.collection.delete({
        where: {
            id,
            userId: session.user.id
        }
    });

    revalidatePath('/dashboard');
}

export async function deleteQuiz(quizId: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    // Verify quiz belongs to user's collection
    const quiz = await prisma.quiz.findFirst({
        where: {
            id: quizId,
            collection: {
                userId: session.user.id
            }
        },
        include: {
            collection: true
        }
    });

    if (!quiz) {
        throw new Error("Quiz not found or access denied");
    }

    await prisma.quiz.delete({
        where: {
            id: quizId
        }
    });

    // Revalidate both dashboard and collection pages
    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/collection/${quiz.collectionId}`);
}

export async function editQuiz(
    quizId: number,
    data: { question: string; options: string[]; answer: string }
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    // Verify quiz belongs to user's collection
    const quiz = await prisma.quiz.findFirst({
        where: {
            id: quizId,
            collection: {
                userId: session.user.id
            }
        },
        include: {
            collection: true
        }
    });

    if (!quiz) {
        throw new Error("Quiz not found or access denied");
    }

    await prisma.quiz.update({
        where: {
            id: quizId
        },
        data
    });

    // Revalidate both dashboard and collection pages
    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/collection/${quiz.collectionId}`);
}
