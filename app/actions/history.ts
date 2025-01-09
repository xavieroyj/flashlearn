'use server';

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export type QuizAnswer = {
    questionId: number;
    question: string;
    options: string[];
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
};

export type HistoryItem = {
    id: string;
    type: 'quiz_generation' | 'collection_creation' | 'quiz_attempt';
    title: string;
    description: string;
    createdAt: string;
    metadata?: {
        score: number;
        totalQuestions: number;
        answers: QuizAnswer[];
        collectionName: string;
        collectionId: string;
    };
};

export async function getUserHistory() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) throw new Error("Unauthorized");

    const userId = session.user.id;

    // Fetch all data in parallel
    const [quizAttempts, collections] = await Promise.all([
        // Get quiz attempts
        prisma.quizHistory.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                score: true,
                totalQuestions: true,
                createdAt: true,
                answers: true,
                collection: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }),
        // Get collection creations
        prisma.collection.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                createdAt: true
            }
        })
    ]);

    // Format quiz attempts
    const quizAttemptHistory: HistoryItem[] = quizAttempts.map(attempt => ({
        id: attempt.id.toString(),
        type: 'quiz_attempt',
        title: `Quiz Attempt: ${attempt.collection.name}`,
        description: `Scored ${attempt.score} out of ${attempt.totalQuestions} questions correctly`,
        createdAt: attempt.createdAt.toISOString(),
        metadata: {
            score: attempt.score,
            totalQuestions: attempt.totalQuestions,
            answers: attempt.answers as QuizAnswer[],
            collectionName: attempt.collection.name,
            collectionId: attempt.collection.id.toString()
        }
    }));

    // Format collection creations
    const collectionHistory: HistoryItem[] = collections.map(collection => ({
        id: collection.id.toString(),
        type: 'collection_creation',
        title: `Created Collection: ${collection.name}`,
        description: `New flashcard collection created`,
        createdAt: collection.createdAt.toISOString()
    }));

    // Combine and sort all history items
    const allHistory = [...quizAttemptHistory, ...collectionHistory]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return allHistory;
} 