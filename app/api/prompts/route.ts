import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import type { Prompt } from '@/types/prompt';

// Placeholder data - 'let' allows modification.
let prompts: Prompt[] = [
  { id: uuidv4(), title: 'Futuristic Cityscape', content: 'Describe a sprawling metropolis in the year 2242, focusing on its unique transportation and architecture.', tags: ['Sci-Fi', 'Worldbuilding'] },
  { id: uuidv4(), title: 'Minimalist Logo Design', content: 'Generate three concepts for a minimalist logo for a sustainable coffee brand.', tags: ['Design', 'Branding'] },
];

export async function GET() {
  return NextResponse.json(prompts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ message: 'Missing required fields: title and content are required.' }, { status: 400 });
    }
    if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string')) {
        return NextResponse.json({ message: 'Tags must be an array of strings.' }, { status: 400 });
    }

    const newPrompt: Prompt = {
      id: uuidv4(),
      title,
      content,
      tags: tags.map((tag: string) => tag.trim()).filter((tag: string) => tag !== ''), // Clean up tags
    };

    prompts.push(newPrompt);
    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}