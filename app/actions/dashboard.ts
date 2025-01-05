'use server';

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function getDashboardStats() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) throw new Error("Unauthorized");

    const userId = session.user.id;

    // Get collections count
    const collectionsCount = await prisma.collection.count({
        where: { userId }
    });

    // Get total quizzes taken
    const quizzesTaken = await prisma.quizHistory.count({
        where: { userId }
    });

    // Calculate average score
    const scores = await prisma.quizHistory.findMany({
        where: { userId },
        select: { 
            score: true, 
            totalQuestions: true,
            createdAt: true  // Added this field
        }
    });

    const averageScore = scores.length > 0
        ? Math.round((scores.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions * 100), 0) / scores.length))
        : 0;

    // Get recent activity
    const recentActivity = await prisma.quizHistory.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            collection: {
                select: { name: true }
            }
        }
    });

    // Get pinned collections
    const pinnedCollections = await prisma.collection.findMany({
        where: { 
            userId,
            isPinned: true
        },
        take: 4,
        orderBy: { updatedAt: 'desc' },
        include: {
            Quiz: true
        }
    });

    // Calculate study streak
    const uniqueDates = [...new Set(
        scores.map(score => new Date(score.createdAt).toDateString())
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
        recentActivity,
        pinnedCollections
    };
}