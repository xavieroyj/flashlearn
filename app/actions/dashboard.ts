'use server';

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function getRecentActivity() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) throw new Error("Unauthorized");

    const userId = session.user.id;

    return await prisma.quizHistory.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            collection: {
                select: { name: true }
            }
        }
    });
}

export async function getPinnedCollections() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) throw new Error("Unauthorized");

    const userId = session.user.id;

    return await prisma.collection.findMany({
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
}