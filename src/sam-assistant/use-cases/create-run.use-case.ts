import OpenAI from "openai";

interface Option {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, option: Option) => {
  const { threadId, assistantId = "asst_4ireAL1uZhqUIjKUGXG3T84u" } = option;
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId
    //instructions: // Ojo: Sobre escribe el asistente
  });
  console.log({ run });
  return run;
};