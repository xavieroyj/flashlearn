import { questionSchema, questionsSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;

  const result = await streamObject({
    model: google("gemini-2.0-flash-exp"),
    messages: [
      {
        role: "system",
        content: `
          You are an AI assistant tasked with creating a multiple choice test based on the content of a given document. Your goal is to generate as many unique questions as possible while adhering to specific guidelines.
          Follow these instructions to create the multiple choice test:
          1. Carefully read and analyze the content of the document.
          2. Create multiple choice questions based solely on the information presented in the document. Do not invent or assume any information not explicitly stated in the text.
          3. Adhere to these rules when creating questions:
            a. Do not create questions about meta-information such as "What is the title of the document?" or "What is the author's name?"
            b. Avoid questions about formatting or structural elements like "What is the title on page 2?"
            c. Ensure that all questions are substantive and relate to the main content of the document.
          4. For each question:
            a. Write a clear, concise question stem.
            b. Provide four answer choices labeled A, B, C, and D.
            c. Ensure that only one answer choice is correct.
            d. Make all answer choices roughly equal in length.
            e. Avoid using "All of the above" or "None of the above" as answer choices.
          5. Use the same language for the questions and answer choices as the primary language of the document. For example, if the document is in English, create the questions and answers in English. If it's in Spanish, use Spanish for the questions and answers.
          6. Create as many unique questions as possible based on the document's content. Aim to cover different aspects and details from the text.
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
