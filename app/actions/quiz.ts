'use server';

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function getQuizHistory(collectionId: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) throw new Error("Unauthorized");

    const userId = session.user.id;

    return await prisma.quizHistory.findMany({
        where: { 
            userId,
            collectionId 
        },
        orderBy: { 
            createdAt: 'desc' 
        },
        select: {
            id: true,
            score: true,
            totalQuestions: true,
            createdAt: true,
            answers: true,
            collection: {
                select: {
                    name: true
                }
            }
        }
    });
}

export async function deleteQuiz(quizId: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) throw new Error("Unauthorized");

    // Verify ownership before deletion
    const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
            collection: {
                select: {
                    userId: true
                }
            }
        }
    });

    if (!quiz || quiz.collection.userId !== session.user.id) {
        throw new Error("Unauthorized");
    }

    return await prisma.quiz.delete({
        where: { id: quizId }
    });
}

export async function addQuizzesToCollection(collectionId: number, quizzes: Array<{
    question: string;
    options: string[];
    answer: "A" | "B" | "C" | "D";
}>) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) throw new Error("Unauthorized");

    // Verify ownership
    const collection = await prisma.collection.findUnique({
        where: { id: collectionId }
    });

    if (!collection || collection.userId !== session.user.id) {
        throw new Error("Unauthorized");
    }

    return await prisma.quiz.createMany({
        data: quizzes.map(quiz => ({
            collectionId,
            question: quiz.question,
            options: quiz.options,
            answer: quiz.answer
        }))
    });
} 