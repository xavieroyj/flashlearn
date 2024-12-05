import { questionSchema, questionsSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;

  const result = await streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content: `
          You are a teacher. Your job is to take a document, and create a multiple choice test (AS MANY UNIQUE QUESTIONS AS POSSIBLE) based on the content of the document.
          Do NOT make up questions, they should be based on the content of the document.
          Do NOT come up with questions that such as "What is the title of the document?" OR "What is the author's name?", "What is the title in page 2?", 
          Questions generated should ALWAYS be in the same language as the bulk of the content of the document. 
          For example, if the document is in English, the questions should be in English. Likewise, if the document is in Spanish, the questions and answersshould be in Spanish.
          Each option should be roughly equal in length.
        `,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a multiple choice test based on this document.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: questionSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = questionsSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}
