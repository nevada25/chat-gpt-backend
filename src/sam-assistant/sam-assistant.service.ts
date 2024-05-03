import { Body, Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { createThreadUseCase } from "./use-cases/create-thread.use-case";
import { QuestionDto } from "./dtos/question.dto";
import { createMessageUseCase } from "./use-cases/create-message.use-case";
import { createRunUseCase } from "./use-cases/create-run.use-case";
import { CheckCompleteStatusUseCase } from "./use-cases/check-complete-status.use-case";
import { getMessageListUseCase } from "./use-cases/get-message-list.use-case";

@Injectable()
export class SamAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const message = await createMessageUseCase(this.openai, {
      question: questionDto.question,
      threadId: questionDto.threadID
    });
    const run = await createRunUseCase(this.openai, {
      threadId: questionDto.threadID
    });
    await CheckCompleteStatusUseCase(this.openai, { runId: run.id, threadId: questionDto.threadID });

    return getMessageListUseCase(this.openai, {
      threadId: questionDto.threadID
    });
  }


}
