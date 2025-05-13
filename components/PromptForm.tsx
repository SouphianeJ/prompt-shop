// components/PromptForm.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react'; // Added FormEvent
import { useRouter } from 'next/navigation';
import { Prompt } from '@/types/prompt'; // 

interface PromptFormProps {
  promptId?: string;
}

const PromptForm: React.FC<PromptFormProps> = ({ promptId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // Comma-separated string
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false); // For loading initial data
  const router = useRouter();

  useEffect(() => {
    if (promptId) {
      setIsLoadingData(true);
      const fetchPromptData = async () => {
        try {
          const res = await fetch(`/api/prompts/${promptId}`);
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: `Failed to fetch prompt data. Status: ${res.status}` }));
            throw new Error(errorData.message);
          }
          const prompt: Prompt = await res.json();
          setTitle(prompt.title);
          setContent(prompt.content);
          setTags(prompt.tags.join(', '));
        } catch (err: any) {
          setError(err.message || 'Failed to load prompt data for editing.');
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchPromptData();
    }
  }, [promptId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Typed event
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const tagsArray = tags.split(',').map((tag) => tag.trim()).filter(tag => tag !== '');
    const promptData = {
      title,
      content,
      tags: tagsArray,
    };

    const method = promptId ? 'PUT' : 'POST';
    const endpoint = promptId ? `/api/prompts/${promptId}` : '/api/prompts';

    try {
      const res = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promptData),
      });

      if (res.ok) {
        router.push('/prompts'); // Navigate to the list page
        router.refresh(); // Important to refresh server components and refetch data
      } else {
        const errorData = await res.json().catch(() => ({ message: `Failed to ${promptId ? 'update' : 'create'} prompt. Server returned an error.` }));
        setError(errorData.message || `Failed to ${promptId ? 'update' : 'create'} prompt. Please try again.`);
      }
    } catch (err: any) { // Catch any type of error
      setError(err.message || 'An unexpected error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoadingData) {
    return <p className="text-center text-light-gray mt-8">Loading form data...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
      {error && <div className="my-4 p-3 bg-red-900 text-red-200 border border-red-700 rounded-md">{error}</div>}
      <div>
        <label htmlFor="title" className="block text-sm font-bold mb-1 text-neon-green">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 leading-tight bg-gray-700 border-gray-600 text-light-gray placeholder-gray-400 focus:ring-2 focus:ring-neon-blue focus:border-neon-blue focus:outline-none" // 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-bold mb-1 text-neon-green">
          Content:
        </label>
        <textarea
          id="content"
          rows={8} // Increased rows
          className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 leading-tight bg-gray-700 border-gray-600 text-light-gray placeholder-gray-400 focus:ring-2 focus:ring-neon-blue focus:border-neon-blue focus:outline-none" // 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-bold mb-1 text-neon-green">
          Tags (comma-separated):
        </label>
        <input
          type="text"
          id="tags"
          className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 leading-tight bg-gray-700 border-gray-600 text-light-gray placeholder-gray-400 focus:ring-2 focus:ring-neon-blue focus:border-neon-blue focus:outline-none" // 
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-neon-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:opacity-70 transition-colors"
          disabled={isSubmitting || isLoadingData}
        >
          {isSubmitting ? (promptId ? 'Updating...' : 'Creating...') : (promptId ? 'Update Prompt' : 'Create Prompt')}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;