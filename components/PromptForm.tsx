'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PromptFormProps {
  promptId?: string;
  // Add initialData for editing if needed
  // initialData?: { title: string; content: string; tags: string[] };
}

const PromptForm: React.FC<PromptFormProps> = ({ promptId }) => {
  const [title, setTitle] = useState(''); // Populate with initialData if editing
  const [content, setContent] = useState(''); // Populate with initialData if editing
  const [tags, setTags] = useState(''); // Populate with initialData if editing
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const tagsArray = tags.split(',').map((tag) => tag.trim()).filter(tag => tag !== '');

    const promptData = {
      title,
      content,
      tags: tagsArray,
    };

    // Determine method and endpoint
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
        router.push('/prompts');
        router.refresh();
      } else {
        const errorData = await res.json().catch(() => ({ message: `Failed to ${promptId ? 'update' : 'create'} prompt. Server returned an error.` }));
        setError(errorData.message || `Failed to ${promptId ? 'update' : 'create'} prompt. Please try again.`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6"> {/* Added space-y for brutalist spacing */}
      {error && <div className="my-4 p-3 bg-red-900 text-red-200 border border-red-700 rounded-md">{error}</div>}
      <div>
        <label htmlFor="title" className="block text-sm font-bold mb-1 text-neon-green"> {/* Neon label */}
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 leading-tight" // Class for global styling
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-bold mb-1 text-neon-green"> {/* Neon label */}
          Content:
        </label>
        <textarea
          id="content"
          rows={5} // Increased rows
          className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 leading-tight" // Class for global styling
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-bold mb-1 text-neon-green"> {/* Neon label */}
          Tags (comma-separated):
        </label>
        <input
          type="text"
          id="tags"
          className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 leading-tight" // Class for global styling
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-neon-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:opacity-70 transition-colors" // Full width, larger padding
          disabled={isSubmitting}
        >
          {isSubmitting ? (promptId ? 'Updating...' : 'Creating...') : (promptId ? 'Update Prompt' : 'Create Prompt')}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PromptFormProps {
  promptId?: string;
}

const PromptForm: React.FC<PromptFormProps> = ({ promptId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = tags.split(',').map((tag) => tag.trim());

    const promptData = {
      title,
      content,
      tags: tagsArray,
    };

    try {
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promptData),
      });

      if (res.ok) {
        router.push('/prompts');
        router.refresh();
      } else {
        console.error('Failed to create prompt');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
          Content:
        </label>
        <textarea
          id="content"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
          Tags (comma-separated):
        </label>
        <input
          type="text"
          id="tags"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-neon-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {promptId ? 'Update Prompt' : 'Create Prompt'}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;