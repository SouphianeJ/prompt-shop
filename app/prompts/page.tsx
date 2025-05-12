'use client';

import PromptList from '@/components/PromptList';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import Link from 'next/link';
import usePrompts from '@/hooks/usePrompts';
import { Prompt } from '@/types/prompt';

export default function PromptsPage() {
  const { prompts, loading, error } = usePrompts();

  // Extract unique tags for the filter. 'All' can be prepended manually.
  const allTags = Array.from(new Set(prompts.flatMap(p => p.tags)));

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="w-full sm:flex-grow">
          <SearchBar />
        </div>
        <Link
          href="/prompts/new"
          className="w-full sm:w-auto bg-neon-blue text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-150 whitespace-nowrap text-center"
        >
          Add Prompt
        </Link>
      </div>
      
      <TagFilter tags={allTags} />
      
      {loading && <p className="text-center text-light-gray mt-8">Loading prompts...</p>}
      {error && <p className="text-center text-red-400 mt-8">Error: {error}</p>}
      {!loading && !error && <PromptList prompts={prompts} />}
      {!loading && !error && prompts.length === 0 && <p className="text-center text-gray-500 mt-8">No prompts yet. Why not add one?</p>}
    </div>
  );
}