# AI Goal Coach

AI Goal Coach is an intelligent goal-setting application designed to help users refine vague aspirations into concrete, actionable SMART goals using AI. The project consists of a React frontend and an Express backend powered by OpenAI.

## Project Structure

The repository is organized into two main directories:

- **`ai-goal-coach`**: The backend server built with Node.js, Express, and OpenAI. It handles API requests, validates input, and communicates with the AI service.
- **`Client`**: The frontend application built with React and Vite. It provides a user-friendly interface for interacting with the AI coach.

## Architecture

The application follows a client-server architecture where the React frontend communicates with the Express backend via a proxy. The backend processes requests and leverages OpenAI's API to generate goal refinements.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation & Running

You will need to run both the backend and frontend servers simultaneously.

### 1. Backend Setup (`ai-goal-coach`)

1.  Navigate to the backend directory:
    ```bash
    cd ai-goal-coach
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    - Create a `.env` file in the `ai-goal-coach` directory.
    - Add your OpenAI API key and (optional) port configuration:
      ```env
      OPENAI_API_KEY=your_openai_api_key_here
      PORT=3000
      ```

4.  Start the development server:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000`. The Swagger API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

### 2. Frontend Setup (`Client`)

1.  Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd Client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will typically start on `http://localhost:5173` (check the terminal output for the exact URL).

## Usage

1.  Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  Enter a vague goal (e.g., "I want to be healthier").
3.  Click "Architect My Goal".
4.  The AI will generate a refined SMART goal, key results, and helpful feedback.

## API Documentation

The backend includes Swagger UI for API documentation. Once the backend server is running, you can access it at:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Features

-   **Goal Refinement**: Transforms vague inputs into structured SMART goals.
-   **Key Results**: Generates actionable steps to achieve the goal.
-   **Confidence Score**: AI Provides a confidence rating for the generated plan.
-   **Interactive UI**: Modern, responsive interface with real-time feedback.
