'use server';

/**
 * @fileOverview AI-powered bid generator for service requests.
 *
 * - generateServiceRequestBids - Generates bid suggestions based on service request details.
 * - GenerateServiceRequestBidsInput - The input type for the generateServiceRequestBids function.
 * - GenerateServiceRequestBidsOutput - The return type for the generateServiceRequestBids function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateServiceRequestBidsInputSchema = z.object({
  budget: z
    .number()
    .describe('The budget for the service request in US dollars.'),
  urgency: z
    .string()
    .describe(
      'The urgency of the service request (e.g., ASAP, within a week, flexible).' + 
      'Use one of these options: ASAP, within a week, flexible'
    ),
  location: z
    .string()
    .describe(
      'The location of the service request (e.g., city, neighborhood).' + 
      'The location should be as specific as possible.'
    ),
  serviceDescription: z
    .string()
    .describe('A detailed description of the service required.'),
  customerRequirements: z
    .string()
    .optional()
    .describe('Any specific requirements from the customer.'),
});

export type GenerateServiceRequestBidsInput = z.infer<
  typeof GenerateServiceRequestBidsInputSchema
>;

const GenerateServiceRequestBidsOutputSchema = z.object({
  bidSuggestions: z
    .array(z.string())
    .describe('A list of bid suggestions to attract service providers.'),
});

export type GenerateServiceRequestBidsOutput = z.infer<
  typeof GenerateServiceRequestBidsOutputSchema
>;

export async function generateServiceRequestBids(
  input: GenerateServiceRequestBidsInput
): Promise<GenerateServiceRequestBidsOutput> {
  return generateServiceRequestBidsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateServiceRequestBidsPrompt',
  input: {schema: GenerateServiceRequestBidsInputSchema},
  output: {schema: GenerateServiceRequestBidsOutputSchema},
  prompt: `You are an expert in crafting compelling bid suggestions for local service requests.

  Based on the following service request details, generate a list of bid suggestions that would attract quality service providers.  The bid suggestions should be strings with dollar amounts, and be tailored to the urgency and the budget.

  Service Description: {{{serviceDescription}}}
  Budget: {{{budget}}} USD
  Urgency: {{{urgency}}}
  Location: {{{location}}}
  Customer Requirements: {{{customerRequirements}}}

  Return the bid suggestions as a JSON array of strings.
  `,
});

const generateServiceRequestBidsFlow = ai.defineFlow(
  {
    name: 'generateServiceRequestBidsFlow',
    inputSchema: GenerateServiceRequestBidsInputSchema,
    outputSchema: GenerateServiceRequestBidsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
