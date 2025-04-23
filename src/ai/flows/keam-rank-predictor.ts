
/**
 * @fileOverview Predicts potential college admissions based on KEAM rank and category.
 *
 * - predictCollege - A function that handles the college prediction process.
 * - KeamRankInput - The input type for the predictCollege function.
 * - KeamRankOutput - The return type for the predictCollege function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getColleges, College} from '@/services/college-directory';

const KeamRankInputSchema = z.object({
  keamRank: z.number().describe('The KEAM rank of the student.'),
  category: z
    .string()
    .describe(
      'The category of the student as per Kerala sector (e.g., General, OBC, SC, ST).' // TODO: Enumerate with z.enum
    ),
});
export type KeamRankInput = z.infer<typeof KeamRankInputSchema>;

const KeamRankOutputSchema = z.object({
  possibleColleges: z
    .array(
      z.object({
        collegeName: z.string().describe('The name of the possible college.'),
        probability: z
          .number()
          .describe(
            'The probability of getting admission to the college (0 to 1).' // TODO: Is this the right output? What constitutes correctness.
          ),
      })
    )
    .describe(
      'A list of possible colleges with the probability of getting admission.'
    ),
});
export type KeamRankOutput = z.infer<typeof KeamRankOutputSchema>;

export async function predictCollege(input: KeamRankInput): Promise<KeamRankOutput> {
  return keamRankPredictorFlow(input);
}

const predictKeamRank = ai.definePrompt({
  name: 'predictKeamRankPrompt',
  input: {
    schema: z.object({
      keamRank: z.number().describe('The KEAM rank of the student.'),
      category: z
        .string()
        .describe(
          'The category of the student as per Kerala sector (e.g., General, OBC, SC, ST).'
        ),
      colleges: z.array(
        z.object({
          name: z.string(),
          url: z.string(),
          cutoff: z.string()
        })
      ).describe('List of colleges in kerala'),
    }),
  },
  output: {
    schema: z.object({
      possibleColleges: z
        .array(
          z.object({
            collegeName: z.string().describe('The name of the possible college.'),
            probability: z
              .number()
              .describe(
                'The probability of getting admission to the college (0 to 1).'
              ),
          })
        )
        .describe(
          'A list of possible colleges with the probability of getting admission.'
        ),
    }),
  },
  prompt: `Given the student's KEAM rank and category, predict the possible colleges they might get into based on the last five years' cutoff ranks.

Consider the following list of colleges in Kerala, including their cutoff details (last five years' last rank admitted):\n{{#each colleges}}\n- {{this.name}} ({{this.url}}) - Cutoff: {{this.cutoff}}\n{{/each}}\n\nStudent's KEAM Rank: {{{keamRank}}}\nStudent's Category: {{{category}}}\n\nBased on these details, provide a list of possible colleges along with the probability of admission (0 to 1). Consider the category while calculating the probability.\n\nEnsure that the output is a JSON object with the 'possibleColleges' field containing an array of college names and admission probabilities. Return an empty array if there are no suitable colleges.\n`,
});

const keamRankPredictorFlow = ai.defineFlow<
  typeof KeamRankInputSchema,
  typeof KeamRankOutputSchema
>(
  {
    name: 'keamRankPredictorFlow',
    inputSchema: KeamRankInputSchema,
    outputSchema: KeamRankOutputSchema,
  },
  async input => {
    const colleges: College[] = await getCollegesWithCutoff();
    const {output} = await predictKeamRank({
      ...input,
      colleges,
    });
    return output!;
  }
);

async function getCollegesWithCutoff(): Promise<College[]> {
  return [
    {
      name: 'College of Engineering Trivandrum',
      url: 'https://www.cet.ac.in/',
      cutoff: 'General: 5000, OBC: 7000, SC: 25000, ST: 40000',
    },
    {
      name: 'Government Engineering College Thrissur',
      url: 'http://gectcr.ac.in/',
      cutoff: 'General: 8000, OBC: 10000, SC: 30000, ST: 45000',
    },
  ];
}
