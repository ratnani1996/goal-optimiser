import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'ai_telemetry.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

export const logger = {
    logAI: (entry) => {
        const logEntry = JSON.stringify(entry) + '\n';

        fs.appendFile(LOG_FILE, logEntry, (err) => {
            if (err) {
                console.error('Failed to write to AI log file:', err);
            }
        });
    }
};
