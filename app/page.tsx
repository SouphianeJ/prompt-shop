'use client';

import PromptList from '@/components/PromptList';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import usePrompts from '@/hooks/usePrompts';
import { Prompt } from '@/types/prompt';

export default function Home() {
  const { prompts, loading, error } = usePrompts();
  
  const allTags = Array.from(new Set(prompts.flatMap(p => p.tags)));

  return (
    <div className="space-y-6"> {/* Added spacing */}
      <SearchBar />
      <TagFilter tags={allTags} />
      
      {loading && <p className="text-center text-light-gray mt-8">Loading prompts...</p>}
      {error && <p className="text-center text-red-400 mt-8">Error: {error}</p>}
      {!loading && !error && <PromptList prompts={prompts} />}
      {!loading && !error && prompts.length === 0 && <p className="text-center text-gray-500 mt-8">Welcome! No prompts found. Get started by adding a new one.</p>}
    </div>
  );
}