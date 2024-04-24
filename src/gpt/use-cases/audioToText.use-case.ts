
import * as fs from 'fs'
import OpenAI from 'openai';
import { AudioToTextDto } from '../dtos';
interface Options {
    audioToText?: AudioToTextDto;
    audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openai: OpenAI, { audioToText, audioFile }: Options) => {

    const response = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream(audioFile.path),
        prompt: audioToText.prompt,
        language: 'es',
        response_format: 'verbose_json'
        //response_format: 'vtt'
    });

    console.log(response);

    return response;

}