import { NextResponse } from 'next/server'; 
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: Request,{ params }: { params: PostCollectionHistoryParams }
) {
  let props = await params;

  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const collectionId = parseInt(props.id);
    if (isNaN(collectionId)) {
      return new NextResponse('Invalid collection ID', { status: 400 });
    }

    const history = await prisma.quizHistory.findMany({
      where: {
        userId: session.user.id,
        collectionId: collectionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Parse the answers JSON for each history item
    const parsedHistory = history.map(item => {
      try {
        let parsedAnswers;
        if (typeof item.answers === 'string') {
          parsedAnswers = item.answers ? JSON.parse(item.answers) : [];
        } else {
          parsedAnswers = item.answers || [];
        }
        return {
          ...item,
          answers: parsedAnswers
        };
      } catch (e) {
        console.error('Failed to parse answers for history item:', e);
        return {
          ...item,
          answers: []
        };
      }
    });

    return NextResponse.json(parsedHistory);
  } catch (error) {
    console.error('[QUIZ_HISTORY_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}


type PostCollectionHistoryParams = Promise<{ 
  id: string 
}>

export async function POST(request: Request,{ params }: { params: PostCollectionHistoryParams }) {
  try {
    let props = await params;

    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const collectionId = parseInt(props.id);
    if (isNaN(collectionId)) {
      return new NextResponse('Invalid collection ID', { status: 400 });
    }

    const body = await request.json();
    const { score, totalQuestions, answers } = body;

    // Ensure answers is stored as a JSON array
    const answersJson = JSON.stringify(answers);

    const history = await prisma.quizHistory.create({
      data: {
        score,
        totalQuestions,
        answers: answersJson,
        userId: session.user.id,
        collectionId,
      },
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error('[QUIZ_HISTORY_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
