import OpenAI from 'openai';

export class Options {
  baseImage: string;
}

export const generateImageVariationUseCase = async (
  openai: OpenAI,
  { baseImage }: Options,
) => {
  console.log(openai);
  console.log(baseImage);
  return {};
};
