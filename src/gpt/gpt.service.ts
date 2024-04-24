import * as path from 'path';
import * as fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsDicusserStreamUseCase,
  translateUseCase,
  textToAudioUseCase,
  audioToTextUseCase,
  imageGenerationUseCase,
  generateImageVariationUseCase,
} from './use-cases';
import {
  AudioToTextDto,
  ImageGenerationDto,
  ImageVariationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async translate({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios',
      `${fileId}.mp3`,
    );
    const wasFound = fs.existsSync(filePath);
    if (!wasFound) throw new NotFoundException(`File ${fileId} no found`);

    return filePath;
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToText?: AudioToTextDto,
  ) {
    return await audioToTextUseCase(this.openai, { audioToText, audioFile });
  }

  async imageGeneration(imageGeneration: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, { ...imageGeneration });
  }

  async getGeneratedImage(fileName: string) {
    const filePath = path.resolve('./', './generated/images/', fileName);
    const exists = fs.existsSync(filePath);

    if (!exists) throw new NotFoundException(`File ${fileName} not found`);

    return filePath;
  }

  async imageVariation({ baseImage }: ImageVariationDto) {
    return generateImageVariationUseCase(this.openai, { baseImage });
  }
}
