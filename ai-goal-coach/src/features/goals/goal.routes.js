import { Router } from 'express';
import { refineGoalHandler } from './goal.controller.js';

const router = Router();

// POST /api/goals/refine
/**
 * @swagger
 * /api/goals/refine:
 *   post:
 *     summary: Refine a vague goal into a SMART goal
 *     tags: [Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - input
 *             properties:
 *               input:
 *                 type: string
 *                 description: The user's vague goal
 *                 example: "I want to get better at sales"
 *     responses:
 *       200:
 *         description: Successfully refined goal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     refined_goal:
 *                       type: string
 *                       example: "Increase monthly sales revenue by 20% within Q3..."
 *                     key_results:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Close 5 new enterprise deals", "..."]
 *                     confidence_score:
 *                       type: integer
 *                       example: 9
 *                     feedback:
 *                       type: string
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/refine', refineGoalHandler);

export const goalRoutes = router;
