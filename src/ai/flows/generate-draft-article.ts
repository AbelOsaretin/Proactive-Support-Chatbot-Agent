'use server';

/**
 * @fileOverview Generates a draft article for a given unanswered question.
 *
 * - generateDraftArticle - A function that generates a draft article.
 * - GenerateDraftArticleInput - The input type for the generateDraftArticle function.
 * - GenerateDraftArticleOutput - The return type for the generateDraftArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDraftArticleInputSchema = z.object({
  userPrompt: z.string().describe('The user prompt that the AI could not answer.'),
  promptSummary: z.string().describe('A summary of the user prompt theme.'),
});
export type GenerateDraftArticleInput = z.infer<typeof GenerateDraftArticleInputSchema>;

const GenerateDraftArticleOutputSchema = z.object({
  draftTitle: z.string().describe('The title of the draft article.'),
  draftContent: z.string().describe('The content of the draft article in Markdown format.'),
});
export type GenerateDraftArticleOutput = z.infer<typeof GenerateDraftArticleOutputSchema>;

export async function generateDraftArticle(input: GenerateDraftArticleInput): Promise<GenerateDraftArticleOutput> {
  return generateDraftArticleFlow(input);
}

const generateDraftArticlePrompt = ai.definePrompt({
  name: 'generateDraftArticlePrompt',
  input: {schema: GenerateDraftArticleInputSchema},
  output: {schema: GenerateDraftArticleOutputSchema},
  prompt: `You are an AI assistant that generates draft articles based on unanswered user questions and their themes. 

  Given the following user prompt and its summary, generate a draft article in Markdown format. 

  User Prompt: {{{userPrompt}}}
  Theme: {{{promptSummary}}}

  The draft article should have a title and content that addresses the user's question based on the theme.  The article should be informative, helpful, and easy to understand.
  `,
});

const generateDraftArticleFlow = ai.defineFlow(
  {
    name: 'generateDraftArticleFlow',
    inputSchema: GenerateDraftArticleInputSchema,
    outputSchema: GenerateDraftArticleOutputSchema,
  },
  async input => {
    const {output} = await generateDraftArticlePrompt(input);
    return output!;
  }
);
