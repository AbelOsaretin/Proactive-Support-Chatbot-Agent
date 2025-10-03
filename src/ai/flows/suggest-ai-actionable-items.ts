// use server'

/**
 * @fileOverview This flow suggests actionable items for the AI chat interface.
 *
 * - suggestAiActionableItems - A function that suggests actionable items.
 * - SuggestAiActionableItemsOutput - The output type for the suggestAiActionableItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAiActionableItemsOutputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the suggested action.'),
    description: z.string().describe('A brief description of the action.'),
  })
);
export type SuggestAiActionableItemsOutput = z.infer<typeof SuggestAiActionableItemsOutputSchema>;

export async function suggestAiActionableItems(): Promise<SuggestAiActionableItemsOutput> {
  return suggestAiActionableItemsFlow();
}

const prompt = ai.definePrompt({
  name: 'suggestAiActionableItemsPrompt',
  output: {schema: SuggestAiActionableItemsOutputSchema},
  prompt: `You are an AI assistant that suggests actionable items for a user starting a new chat session. Provide a list of suggestions to help the user get started.

  Return the suggestions as a JSON array of objects, each with a title and description.
  `,
});

const suggestAiActionableItemsFlow = ai.defineFlow(
  {
    name: 'suggestAiActionableItemsFlow',
    outputSchema: SuggestAiActionableItemsOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
