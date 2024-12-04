import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


type QuizHistoryParams = Promise<{
    id: string;
}>;

export async function GET(req: Request,{ params }: { params: QuizHistoryParams }
) {
    try {
        let props = await params;
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const quizHistory = await prisma.quizHistory.findFirst({
            where: {
                id: Number(props.id),
                userId: session.user.id, // Ensure user can only access their own quiz history
            },
            include: {
                collection: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!quizHistory) {
            return new NextResponse("Quiz history not found", { status: 404 });
        }

        // Parse answers if it's a string
        let parsedAnswers = quizHistory.answers;
        if (typeof parsedAnswers === 'string') {
            try {
                parsedAnswers = JSON.parse(parsedAnswers);
            } catch (e) {
                console.error('Error parsing answers:', e);
                parsedAnswers = [];
            }
        }

        // Ensure answers is an array
        if (!Array.isArray(parsedAnswers)) {
            parsedAnswers = [];
        }

        return NextResponse.json({
            id: quizHistory.id,
            score: quizHistory.score,
            totalQuestions: quizHistory.totalQuestions,
            createdAt: quizHistory.createdAt,
            answers: parsedAnswers,
            collection: quizHistory.collection
        });
    } catch (error) {
        console.error("Error fetching quiz history:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
