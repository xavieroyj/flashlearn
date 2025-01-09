'use server';

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function getStats() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) throw new Error("Unauthorized");

    const userId = session.user.id;

    // Parallel fetch all required data
    const [
        collectionsCount,
        quizHistoryData,
    ] = await Promise.all([
        // Get collections count
        prisma.collection.count({
            where: { userId }
        }),
        // Get quiz history with scores in a single query
        prisma.quizHistory.findMany({
            where: { userId },
            select: {
                score: true,
                totalQuestions: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    ]);

    // Calculate derived stats
    const quizzesTaken = quizHistoryData.length;
    
    // Calculate average score
    const averageScore = quizHistoryData.length > 0
        ? Math.round(
            quizHistoryData.reduce(
                (acc, curr) => acc + (curr.score / curr.totalQuestions * 100),
                0
            ) / quizHistoryData.length
        )
        : 0;

    // Calculate streak more efficiently
    const uniqueDates = [...new Set(
        quizHistoryData.map(quiz => new Date(quiz.createdAt).toDateString())
    )].sort();

    let currentStreak = 0;
    const today = new Date().toDateString();
    
    for (let i = uniqueDates.length - 1; i >= 0; i--) {
        const date = new Date(uniqueDates[i]);
        const previousDate = i > 0 ? new Date(uniqueDates[i - 1]) : null;
        
        if (i === uniqueDates.length - 1 && date.toDateString() !== today) {
            break;
        }
        
        if (previousDate) {
            const diffDays = Math.floor((date.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays !== 1) break;
        }
        
        currentStreak++;
    }

    return {
        collectionsCount,
        quizzesTaken,
        averageScore,
        currentStreak,
    };
} 