import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch collections with their associated quizzes and quiz history
        const [collections, quizHistory] = await Promise.all([
            prisma.collection.findMany({
                where: {
                    userId: session.user.id
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    Quiz: {
                        select: {
                            id: true,
                            question: true,
                            createdAt: true
                        }
                    }
                }
            }),
            prisma.quizHistory.findMany({
                where: {
                    userId: session.user.id
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    collection: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
        ]);

        // Transform the data into history items
        const history = [
            // Collection and quiz creation history
            ...collections.flatMap(collection => {
                // Create history item for collection creation
                const collectionItem = {
                    id: `collection-${collection.id}`,
                    type: 'collection_creation' as const,
                    title: collection.name,
                    description: collection.description || 'Created a new collection',
                    createdAt: collection.createdAt.toISOString()
                };

                // Create history items for each quiz in the collection
                const quizItems = collection.Quiz.map(quiz => ({
                    id: `quiz-${quiz.id}`,
                    type: 'quiz_generation' as const,
                    title: 'Generated Quiz',
                    description: `Added quiz to collection "${collection.name}"`,
                    createdAt: quiz.createdAt.toISOString()
                }));

                return [collectionItem, ...quizItems];
            }),

            // Quiz attempt history
            ...quizHistory.map(history => ({
                id: history.id.toString(), // Changed to use numeric ID for consistency
                type: 'quiz_attempt' as const,
                title: `Completed Quiz in "${history.collection.name}"`,
                description: `Scored ${history.score}/${history.totalQuestions} (${Math.round(history.score / history.totalQuestions * 100)}%)`,
                createdAt: history.createdAt.toISOString(),
                metadata: {
                    score: history.score,
                    totalQuestions: history.totalQuestions,
                    answers: history.answers,
                    collectionName: history.collection.name,
                    collectionId: history.collection.id
                }
            }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}
