# AI Goal Coach - Backend

This is the backend service for the AI Goal Coach application. It provides an API to refine vague goals into SMART goals using OpenAI.

## Prerequisites

- Node.js (v18+)
- npm

## Setup

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    - Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
    ```
    - Open `.env` and add your `OPENAI_API_KEY`.

## Running the Server

- **Development Mode**:
    ```bash
    npm run dev
    ```
- **Production**:
    ```bash
    npm start
    ```

## API Documentation

Swagger UI is available at:
`http://localhost:3000/api-docs`

## API Endpoints

### `POST /api/goals/refine`

Refines a vague goal into a structured SMART goal.

**Request Body**:
```json
{
  "input": "I want to get better at sales"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "refined_goal": "Increase monthly sales revenue by 20% within Q3...",
    "key_results": [
      "Close 5 new enterprise deals",
      "..."
    ],
    "confidence_score": 9,
    "feedback": "..."
  }
}
```
