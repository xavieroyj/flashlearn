-- CreateTable
CREATE TABLE "quiz_history" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "quiz_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz_history" ADD CONSTRAINT "quiz_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_history" ADD CONSTRAINT "quiz_history_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
