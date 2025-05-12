// app/api/prompts/[id]/route.ts
import { NextResponse } from 'next/server';
import { getPromptById, updatePrompt, deletePromptById } from '@/lib/prompt-fs';
import type { Prompt } from '@/types/prompt'; // 

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const { id } = params;
  try {
    const prompt = await getPromptById(id);
    if (!prompt) {
      return NextResponse.json({ message: 'Prompt not found' }, { status: 404 });
    }
    return NextResponse.json(prompt);
  } catch (error) {
    console.error(`API GET (by ID ${id}) Error:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = params;
  try {
    const body = await request.json();
    // Ensure id from body is not used, only from URL param
    const { id: bodyId, ...updateData } = body as Partial<Prompt>;

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'No update data provided.' }, { status: 400 });
    }
    if (updateData.tags && (!Array.isArray(updateData.tags) || !updateData.tags.every(tag => typeof tag === 'string'))) {
        return NextResponse.json({ message: 'Tags must be an array of strings.' }, { status: 400 });
    }
     if (updateData.tags) {
        updateData.tags = updateData.tags.map((tag: string) => tag.trim()).filter((tag: string) => tag !== '');
    }


    const updatedPromptItem = await updatePrompt(id, updateData);
    if (!updatedPromptItem) {
      return NextResponse.json({ message: 'Prompt not found or failed to update' }, { status: 404 });
    }
    return NextResponse.json(updatedPromptItem);
  } catch (error) {
    console.error(`API PUT (by ID ${id}) Error:`, error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;
  try {
    const success = await deletePromptById(id);
    if (!success) {
      // Could be because it didn't exist, or an actual delete error.
      // Check logs from deletePromptById for specifics if needed.
      return NextResponse.json({ message: 'Prompt not found or could not be deleted' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Prompt deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`API DELETE (by ID ${id}) Error:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}