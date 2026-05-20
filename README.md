# AI Job Tracker

A frontend job application tracker built with Next.js, React, TypeScript, and Tailwind CSS. The app lets users save job applications, track statuses, view details, edit job information, and generate AI follow-up messages.

## Live Demo

[View the live app](https://ai-job-tracker-alitten.vercel.app)

## Features

- Add new jobs with company, title, location, description, and status
- View saved jobs in a responsive dashboard layout
- Search and filter jobs by title, company, location, or status
- View individual job detail pages with dynamic routing
- Full CRUD operations: create, read, update, and delete saved jobs
- Generate AI follow-up messages based on job title, company, and status
- Persist saved jobs locally with browser `localStorage`
- Display loading and error UI states
- Unit tests for formatting utilities using Vitest

## Tech Stack

- **Next.js** — App Router, dynamic routing, and API routes
- **React** — State management, controlled forms, and conditional rendering
- **TypeScript** — Type safety for job data and status values
- **Tailwind CSS** — Responsive UI and layout
- **OpenAI API** — AI-generated follow-up messages
- **Vercel** — Hosting and deployment
- **Vitest** — Unit testing

## Technical Highlights

- **State Management:** Handles job data updates immutably using `map`, `filter`, and `find`.
- **Dynamic Routing:** Uses Next.js file-system routing for individual job detail pages.
- **Client-to-Server API Flow:** Sends job context from the client to a Next.js API route using `fetch`.
- **API Security:** Keeps the OpenAI API key server-side with environment variables so it is never exposed to the browser.
- **Persistence:** Saves job data in `localStorage` so users can refresh the app without losing saved jobs.
- **Testing:** Uses Vitest to verify formatter utility behavior for statuses, dates, and badge classes.

## AI Follow-Up Feature

When a user clicks generate on a job detail page, the client sends the job title, company, and current status to a Next.js API route.

The API route calls the OpenAI API on the server and returns a professional follow-up message. This keeps the API key hidden from client-side code while allowing the frontend to use AI-generated content.

## Future Improvements

This project currently uses `localStorage` to keep the app lightweight and usable without requiring accounts or database setup.

Potential production-focused improvements include moving persistence to a database, adding authentication for user-specific saved jobs, saving follow-up message history, and expanding test coverage beyond utility functions.

## Testing

The project uses Vitest to test utility helper functions, including:

- Status formatting
- Date formatting
- Dynamic Tailwind badge class selection

Run tests with:

```bash
npm test
```

## Running Locally

Clone the repository:

```bash
git clone https://github.com/andrewlit10/ai-job-tracker.git
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open the app:

```bash
http://localhost:3000
```
