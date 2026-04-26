'use server';
/**
 * @fileOverview An AI tool for drivers to identify high-demand areas and suggest optimal next ride locations.
 *
 * - driverEarningsOptimizer - A function that optimizes driver earnings by providing demand heatmaps and location suggestions.
 * - DriverEarningsOptimizerInput - The input type for the driverEarningsOptimizer function.
 * - DriverEarningsOptimizerOutput - The return type for the driverEarningsOptimizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DriverEarningsOptimizerInputSchema = z.object({
  driverLatitude: z
    .number()
    .describe('The current latitude of the driver (e.g., 34.0522).'),
  driverLongitude: z
    .number()
    .describe('The current longitude of the driver (e.g., -118.2437).'),
  currentTime: z
    .string()
    .describe('The current time, in ISO 8601 format (e.g., "2024-07-20T10:30:00Z").'),
});
export type DriverEarningsOptimizerInput = z.infer<
  typeof DriverEarningsOptimizerInputSchema
>;

const DriverEarningsOptimizerOutputSchema = z.object({
  highDemandAreas: z
    .array(
      z.object({
        latitude: z.number().describe('Latitude of the high-demand area.'),
        longitude: z.number().describe('Longitude of the high-demand area.'),
        demandScore: z
          .number()
          .min(0)
          .max(100)
          .describe('A score from 0-100 indicating demand level.'),
      })
    )
    .describe('A list of predicted high-demand areas with their coordinates and demand scores.'),
  optimalNextLocation: z
    .object({
      latitude: z.number().describe('Latitude of the suggested optimal next location.'),
      longitude: z.number().describe('Longitude of the suggested optimal next location.'),
      reason: z
        .string()
        .describe('Explanation for why this is the optimal next location.'),
    })
    .describe('The suggested optimal location for the driver to move to next.'),
  explanation: z
    .string()
    .describe('A general explanation of the demand patterns and suggestions provided.'),
});
export type DriverEarningsOptimizerOutput = z.infer<
  typeof DriverEarningsOptimizerOutputSchema
>;

export async function driverEarningsOptimizer(
  input: DriverEarningsOptimizerInput
): Promise<DriverEarningsOptimizerOutput> {
  return driverEarningsOptimizerFlow(input);
}

const driverEarningsOptimizerPrompt = ai.definePrompt({
  name: 'driverEarningsOptimizerPrompt',
  input: {schema: DriverEarningsOptimizerInputSchema},
  output: {schema: DriverEarningsOptimizerOutputSchema},
  prompt: `You are an AI-powered ride-sharing strategist for AetherGo drivers. Your goal is to help drivers maximize their earnings by identifying high-demand areas and suggesting optimal next ride locations.

Based on the driver's current latitude ({{{driverLatitude}}}), longitude ({{{driverLongitude}}}), and the current time ({{{currentTime}}}), predict areas with high ride demand and recommend the best next location for the driver to go to.

Consider factors like typical peak hours, local events, business districts, residential areas during commute times, and entertainment zones during evenings and weekends. Simulate having access to real-time and historical demand data to make informed predictions.

Provide at least 3 distinct high-demand areas if possible, each with a latitude, longitude, and a demand score from 0 to 100. Then, suggest one optimal next location with its latitude, longitude, and a clear reason for the recommendation.

Ensure your output strictly adheres to the JSON schema provided.`,
});

const driverEarningsOptimizerFlow = ai.defineFlow(
  {
    name: 'driverEarningsOptimizerFlow',
    inputSchema: DriverEarningsOptimizerInputSchema,
    outputSchema: DriverEarningsOptimizerOutputSchema,
  },
  async input => {
    const {output} = await driverEarningsOptimizerPrompt(input);
    return output!;
  }
);
