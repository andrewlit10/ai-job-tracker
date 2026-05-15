import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { company, title, status } = await request.json();

  if (!company || !title || !status) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
  const prompt = `Write a short, professional follow-up message for a job application.

Job title: ${title}
Company: ${company}
Current status: ${status}

Requirements:
- Keep it under 120 words
- Sound polite and professional
- Do not invent details
- Return only the message, no explanation`;

  const response = await client.responses.create({
    model: "gpt-5.4-mini",
    input: prompt,
    max_output_tokens: 180,
  });
  const message = response.output_text;
  return NextResponse.json({ message });
}
