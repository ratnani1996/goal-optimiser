import { refineGoal } from '../src/features/goals/goal.service.js';

// Simple colors for console output
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m"
};

const testCases = [
    {
        name: "Test Case 1: Standard Goal - Weight Loss",
        input: "I want to lose weight"
    },
    {
        name: "Test Case 2: Standard Goal - Financial",
        input: "I want to save money"
    },
    {
        name: "Test Case 3: Standard Goal - Leadership",
        input: "Become a better leader"
    },
    {
        name: "Test Case 4: Adversarial - SQL Injection Attempt",
        input: "'; DROP TABLE users; --"
    }
];

async function runTests() {
    console.log(`${colors.cyan}Starting Mini-Eval Tests...${colors.reset}\n`);
    let passedCount = 0;

    for (const test of testCases) {
        console.log(`Running: ${test.name}`);
        console.log(`Input: "${test.input}"`);

        try {
            const result = await refineGoal(test.input);
            console.log("Output:", JSON.stringify(result, null, 2));

            // Assertions
            const checks = [];

            // 1. Result is an object
            if (typeof result === 'object' && result !== null) {
                checks.push(true);
            } else {
                console.error(`${colors.red}FAIL: Result is not an object${colors.reset}`);
                checks.push(false);
            }

            // 2. refined_goal is a non-empty string
            if (typeof result.refined_goal === 'string' && result.refined_goal.length > 0) {
                checks.push(true);
            } else {
                console.error(`${colors.red}FAIL: refined_goal is missing or empty${colors.reset}`);
                checks.push(false);
            }

            // 3. key_results is a non-empty array
            if (Array.isArray(result.key_results) && result.key_results.length > 0) {
                checks.push(true);
            } else {
                console.error(`${colors.red}FAIL: key_results is missing or empty${colors.reset}`);
                checks.push(false);
            }

            // 4. confidence_score is a number
            if (typeof result.confidence_score === 'number') {
                checks.push(true);
            } else {
                console.error(`${colors.red}FAIL: confidence_score is not a number${colors.reset}`);
                checks.push(false);
            }

            // Special check for adversarial
            if (test.name.includes("Adversarial")) {
                if (result.confidence_score < 5) {
                    console.log(`${colors.green}Adversarial Confidence Check: PASS (Low confidence as expected)${colors.reset}`);
                } else {
                    console.warn(`${colors.yellow}Adversarial Confidence Check: WARN (High confidence for adversarial input)${colors.reset}`);
                    // We don't fail the test strictly on this for now, as the prompt might still try to be helpful, 
                    // but it's good to note. The user asked for "valid JSON and fields not empty" primarily.
                }
            }

            if (checks.every(c => c === true)) {
                console.log(`${colors.green}RESULT: PASS${colors.reset}\n`);
                passedCount++;
            } else {
                console.log(`${colors.red}RESULT: FAIL${colors.reset}\n`);
            }

        } catch (error) {
            console.error(`${colors.red}ERROR: Execution failed${colors.reset}`, error);
            console.log(`${colors.red}RESULT: FAIL${colors.reset}\n`);
        }
    }

    console.log(`${colors.cyan}Summary: ${passedCount}/${testCases.length} tests passed.${colors.reset}`);

    if (passedCount === testCases.length) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

runTests();
