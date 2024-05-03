import OpenAI from "openai";

interface Option {
  threadId: string;
  question: string;
}

export const createMessageUseCase = async (openai: OpenAI, { question, threadId }: Option) => {
  return openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: question
  });
};