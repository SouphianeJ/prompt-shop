// app/prompts/[id]/page.tsx
'use client'; // Keep if you have client-side interactions, or convert to RSC

import React, { useEffect, useState } from 'react';
import { Prompt } from '@/types/prompt'; // 
import Link from 'next/link'; // For edit button

interface Props {
  params: { id: string };
}

const PromptDetailPage: React.FC<Props> = ({ params }) => {
  const { id } = params;
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPromptDetail = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/prompts/${id}`);
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: `HTTP error! status: ${res.status}` }));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
          }
          const data: Prompt = await res.json();
          setPrompt(data);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
      fetchPromptDetail();
    }
  }, [id]);

  if (loading) return <p className="text-center text-light-gray mt-8">Loading prompt details...</p>;
  if (error) return <p className="text-center text-red-400 mt-8">Error: {error}</p>;
  if (!prompt) return <p className="text-center text-gray-500 mt-8">Prompt not found.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-neon-green">{prompt.title}</h2>
        <Link
            href={`/prompts/${prompt.id}/edit`}
            className="bg-neon-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
            Edit Prompt
        </Link>
      </div>
      <p className="mb-4 text-lg text-gray-300 whitespace-pre-wrap">{prompt.content}</p>
      {prompt.tags && prompt.tags.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-neon-green">Tags:</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {prompt.tags.map((tag) => (
              <span key={tag} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-light-gray">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Add a delete button if desired */}
      {/* <button onClick={handleDelete} className="...">Delete</button> */}
    </div>
  );
};

export default PromptDetailPage;