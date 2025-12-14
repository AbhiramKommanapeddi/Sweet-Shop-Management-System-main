# Sweet Shop Management System

A full-stack Sweet Shop Management System built with React, Node.js, Express, and SQLite.

## Features
- **User Authentication**: Register and Login with JWT support.
- **Sweets Inventory**: View, search, and purchase sweets.
- **Admin Capabilities**: Role-based access control (Foundation implemented).
- **Responsive Design**: Modern UI built with Tailwind CSS.

## Tech Stack
- **Example Backend**: Node.js, Express, TypeScript, Prisma (SQLite).
- **Frontend**: React, Vite, TypeScript, Tailwind CSS.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:5173`.

## Testing
- Backend tests uses Jest and Supertest.
- Run tests: `cd backend && npm test`.

> **Note**: During development, some environment issues were encountered with Prisma Client generation in the test environment. If tests fail to run, please ensure a clean `npm install` and `npx prisma generate` has been executed.

## My AI Usage

I used an AI assistant (Google Deepmind's Advanced Agentic Coding Assistant) to co-author this project.

### Tools Used
- **Agentic AI**: Used for architectural planning, code generation, debugging, and test writing.
- **VS Code**: Environment for execution.

### How I Used AI
- **Architecture**: The AI proposed the Monorepo structure and Tech Stack (Node/React/Prisma).
- **Boilerplate**: AI generated the initial Express server configuration and React/Vite scaffolding.
- **TDD**: AI wrote fail-first tests for Authentication (Register/Login) and implemented the logic to pass them.
- **Frontend Components**: AI generated the React components (Navbar, SweetCard, Login/Register Forms) using Tailwind CSS.
- **Debugging**: AI attempted to resolve complex environment issues regarding Prisma Client generation and TypeScript configuration.

### Reflection
The AI significantly accelerated the initial setup and boilerplate generation. The TDD process was strictly followed for the Backend, ensuring logic correctness. However, environment configuration (specifically native binary dependencies like Prisma in a restricted agent environment) proved challenging and required manual intervention strategies. The Frontend development was seamless and allowed for rapid UI iteration.
