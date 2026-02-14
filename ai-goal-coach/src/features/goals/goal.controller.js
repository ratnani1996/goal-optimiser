import { GoalInputSchema } from './goal.schema.js';
import { refineGoal } from './goal.service.js';
import { z } from 'zod';

export const refineGoalHandler = async (req, res, next) => {
    try {
        // 1. Validate Input
        const validatedBody = GoalInputSchema.parse(req.body);

        // 2. Call Service
        const refinedGoal = await refineGoal(validatedBody.input);

        // 3. Check Logic/Guardrails (optional, service already indicates confidence)
        if (refinedGoal.confidence_score < 7) {
            // We can still return success but with a different message or status if desired.
            // For now, return as is, frontend handles low confidence.
        }

        // 4. Send Response
        res.status(200).json({
            success: true,
            data: refinedGoal
        });
    } catch (error) {
        next(error);
    }
};
