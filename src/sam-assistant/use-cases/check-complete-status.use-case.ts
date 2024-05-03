import OpenAI from "openai";

interface Option {
  threadId: string;
  runId: string;
}

export const CheckCompleteStatusUseCase = async (openai: OpenAI, option: Option) => {
  const { runId, threadId } = option;

  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  console.log(runStatus.status);
  if (runStatus.status === "completed") {
    return runStatus;
  }
  await new Promise(resolve => setTimeout(resolve, 1000));
  return await CheckCompleteStatusUseCase(openai, option);

};