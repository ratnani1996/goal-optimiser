import { openai } from '../../lib/openai.js';
import { RefinedGoalSchema } from './goal.schema.js';

export const refineGoal = async (input) => {
    const systemPrompt = `
You are an expert Goal Coach. Your task is to take a vague user goal and refine it into a SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound).
You must also generate 3-5 measurable Key Results (KRs) to track progress.

If the input is nonsense, unsafe, or not a goal, set the "confidence_score" to a low value (e.g., 1-3) and provide feedback.
If the input is a valid goal but needs refinement, set "confidence_score" high (e.g., 7-10).

You must return a valid JSON object matching the following schema:
{
  "refined_goal": "string",
  "key_results": ["string", "string", "string"], // 3 to 5 items
  "confidence_score": number, // 1-10
  "feedback": "string" // optional
}
`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: input },
            ],
            response_format: { type: "json_object" },
            temperature: 1
        });

        const content = completion.choices[0].message.content;
        if (!content) {
            throw new Error("No content received from AI");
        }

        const parsed = JSON.parse(content);

        // Validate against schema
        const result = RefinedGoalSchema.parse(parsed);
        return result;

    } catch (error) {
        console.error("Error generating goal refinement:", error);
        throw error;
    }
};
