// lib/prompts-fs.ts
import fs from 'fs/promises';
import path from 'path';
import { Prompt } from '@/types/prompt'; // Assuming your Prompt type is here 
import { v4 as uuidv4 } from 'uuid';

const promptsDirectory = path.join(process.cwd(), 'data', 'prompts');

// Ensure the prompts directory exists
async function ensurePromptsDirectory(): Promise<void> {
  try {
    await fs.access(promptsDirectory);
  } catch {
    await fs.mkdir(promptsDirectory, { recursive: true });
  }
}

export async function getAllPrompts(): Promise<Prompt[]> {
  await ensurePromptsDirectory();
  try {
    const filenames = await fs.readdir(promptsDirectory);
    const promptPromises = filenames
      .filter(filename => filename.endsWith('.json'))
      .map(async (filename) => {
        const filePath = path.join(promptsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContents) as Prompt;
      });
    return Promise.all(promptPromises);
  } catch (error) {
    console.error('Error fetching all prompts:', error);
    return [];
  }
}

export async function getPromptById(id: string): Promise<Prompt | null> {
  await ensurePromptsDirectory();
  const filePath = path.join(promptsDirectory, `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents) as Prompt;
  } catch (error) {
    // If file not found, it's not an error, just means no such prompt
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    console.error(`Error fetching prompt by ID ${id}:`, error);
    return null;
  }
}

export async function savePrompt(promptData: Omit<Prompt, 'id'> & { id?: string }): Promise<Prompt> {
  await ensurePromptsDirectory();
  const id = promptData.id || uuidv4();
  const prompt: Prompt = { ...promptData, id };
  const filePath = path.join(promptsDirectory, `${id}.json`);
  try {
    await fs.writeFile(filePath, JSON.stringify(prompt, null, 2), 'utf-8');
    return prompt;
  } catch (error) {
    console.error(`Error saving prompt ${id}:`, error);
    throw new Error('Failed to save prompt.');
  }
}

export async function updatePrompt(id: string, updates: Partial<Omit<Prompt, 'id'>>): Promise<Prompt | null> {
  await ensurePromptsDirectory();
  const existingPrompt = await getPromptById(id);
  if (!existingPrompt) {
    return null;
  }
  const updatedPrompt: Prompt = { ...existingPrompt, ...updates };
  const filePath = path.join(promptsDirectory, `${id}.json`);
  try {
    await fs.writeFile(filePath, JSON.stringify(updatedPrompt, null, 2), 'utf-8');
    return updatedPrompt;
  } catch (error) {
    console.error(`Error updating prompt ${id}:`, error);
    throw new Error('Failed to update prompt.');
  }
}

export async function deletePromptById(id: string): Promise<boolean> {
  await ensurePromptsDirectory();
  const filePath = path.join(promptsDirectory, `${id}.json`);
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false; // File didn't exist
    }
    console.error(`Error deleting prompt ${id}:`, error);
    return false;
  }
}