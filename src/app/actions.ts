'use server';

import { generateServiceRequestBids, GenerateServiceRequestBidsInput } from '@/ai/flows/generate-service-request-bids';

export async function getBidSuggestions(input: GenerateServiceRequestBidsInput) {
  try {
    const result = await generateServiceRequestBids(input);
    return { success: true, bids: result.bidSuggestions };
  } catch (error) {
    console.error('Error generating bid suggestions:', error);
    return { success: false, error: 'Failed to generate bid suggestions.' };
  }
}
