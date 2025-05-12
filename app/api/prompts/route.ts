import { NextResponse } from 'next/server';

// Placeholder data - replace with database interactions
const prompts = [
  { id: '1', title: 'Prompt 1', content: 'Content 1', tags: ['AI'] },
  { id: '2', title: 'Prompt 2', content: 'Content 2', tags: ['Marketing'] },
];

// GET all prompts
export async function GET() {
  return NextResponse.json(prompts);
}

// POST a new prompt
export async function POST(request: Request) {
  const { title, content, tags } = await request.json();

  // Basic validation
  if (!title || !content) {
    return new NextResponse('Missing required fields', { status: 400 });
  }

  const newPrompt = {
    id: String(prompts.length + 1), // Simple ID generation - replace with UUID or database ID
    title,
    content,
    tags,
  };

  prompts.push(newPrompt);

  return NextResponse.json(newPrompt, { status: 201 });
}