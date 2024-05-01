import OpenAI from "openai";
import { downloadImageAsPng, downloadBase64ImageAsPng } from "../../helpers";
import * as path from "path";
import * as fs from "fs";
import * as process from "node:process";

export class Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  { prompt, originalImage, maskImage }: Options
) => {
  // TODO : Verificar original image
  if (!originalImage || !maskImage) {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url"
    });

    //Todo : Guardar la imagen en File System
    const fileName = await downloadImageAsPng(response.data[0].url);
    const publicUrl = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;
    return {
      url: publicUrl,
      openAIUrl: response.data[0].url,
      revised_prompt: response.data[0].revised_prompt
    };
  }
  const pngImagePath = await downloadImageAsPng(originalImage, true);
  const maskPath = await downloadBase64ImageAsPng(maskImage, true);
  const response = await openai.images.edit({
    model: "dall-e-2",
    prompt: prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskPath),
    n: 1,
    size: "1024x1024",
    response_format: "url"
  });

  const fileName = await downloadImageAsPng(response.data[0].url);
  const publicUrl = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

  return {
    url: publicUrl,
    openAIUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt
  };
};
