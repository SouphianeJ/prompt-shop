// app/api/prompts/route.ts
import { NextResponse } from 'next/server';
import { getAllPrompts, savePrompt } from 'lib/prompts-fs'; // Updated import
import type { Prompt } from '@/types/prompt'; // 

export async function GET() {
  try {
    const prompts = await getAllPrompts();
    return NextResponse.json(prompts);
  } catch (error) {
    console.error('API GET (all) Error:', error);
    return NextResponse.json({ message: 'Internal Server Error while fetching prompts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, tags } = body as Omit<Prompt, 'id'>; // Type assertion

    if (!title || !content) {
      return NextResponse.json({ message: 'Missing required fields: title and content are required.' }, { status: 400 });
    }
    if (tags && (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))) {
        return NextResponse.json({ message: 'Tags must be an array of strings.' }, { status: 400 });
    }

    const newPromptData = {
      title,
      content,
      tags: tags ? tags.map((tag: string) => tag.trim()).filter((tag: string) => tag !== '') : [], // Clean up tags
    };

    const savedPrompt = await savePrompt(newPromptData);
    return NextResponse.json(savedPrompt, { status: 201 });
  } catch (error) {
    console.error('API POST Error:', error);
    // Check if it's a known error from savePrompt or a generic one
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message }, { status: 500 });
  }
}