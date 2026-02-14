import { z } from 'zod';

export const RefinedGoalSchema = z.object({
    refined_goal: z.string().describe("The SMART version of the user's goal"),
    key_results: z.array(z.string()).min(3).max(5).describe("3-5 measurable key results"),
    confidence_score: z.number().int().min(1).max(10).describe("Confidence score (1-10) that the input was a valid goal"),
    feedback: z.string().optional().describe("Explanation if confidence is low or suggestions for improvement"),
});

export const GoalInputSchema = z.object({
    input: z.string().min(3).max(500).describe("The user's vague goal"),
});
