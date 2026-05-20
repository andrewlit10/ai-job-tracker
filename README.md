# AI Job Tracker

A frontend-focused job application tracker built with Next.js, React, TypeScript, and Tailwind CSS. The app helps users save job applications, track statuses, view job details, edit saved jobs, and generate AI-powered follow-up messages.

## Live Demo

[View the live app](https://ai-job-tracker-alitten.vercel.app)

## Features

- Add new job applications with company, title, location, description, and status
- View saved jobs in a clean dashboard-style layout
- Search/filter jobs by title, company, location, or status
- View individual job detail pages with dynamic routing
- Edit saved job information
- Delete saved jobs
- Generate AI follow-up messages based on job title, company, and application status
- Persist saved jobs in `localStorage`
- Display loading and error states
- Format job statuses and dates with helper functions
- Basic helper tests with Vitest

## Tech Stack

- **Next.js** — App Router, routing, API route
- **React** — state, controlled forms, conditional rendering
- **TypeScript** — typed job data and status values
- **Tailwind CSS** — responsive styling and UI layout
- **OpenAI API** — AI-generated follow-up messages
- **Vercel** — deployment
- **Vitest** — helper function tests

## Technical Highlights

This project focuses on core frontend application patterns:

- Managing job data with React state
- Using controlled form inputs for creating and editing jobs
- Updating arrays immutably with `map` and `filter`
- Finding individual jobs by ID with `find`
- Persisting data in the browser with `localStorage`
- Using dynamic routes for job detail pages
- Calling a server-side API route from the client with `fetch`
- Keeping the OpenAI API key server-side through environment variables

## AI Follow-Up Feature

The app includes an AI follow-up message generator. When a user clicks the generate button on a job detail page, the client sends the job title, company, and status to a Next.js API route.

The API route calls the OpenAI API on the server and returns a short professional follow-up message. The API key is never exposed to the browser because it is stored as an environment variable and only accessed server-side.

## Persistence

Saved jobs are currently stored in `localStorage`, which keeps the app simple and usable without requiring a login or database.

In a production version, I would move persistence to a database such as Supabase or Postgres and add authentication so each user could securely access their own saved jobs across devices.

## Testing

The project includes basic Vitest tests for formatter helper functions, including:

- Status formatting
- Date formatting
- Status badge class selection

Run tests with:

```bash
npm test
