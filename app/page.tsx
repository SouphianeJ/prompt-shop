'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import PromptList from '@/components/PromptList';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import Link from 'next/link';
import usePrompts from '@/hooks/usePrompts';
// import { Prompt } from '@/types/prompt'; // Prompt type is likely used by usePrompts or PromptList

export default function HomePage() {
  const { user, loadingAuth } = useAuth();
  const router = useRouter();

  // Call all hooks at the top level, unconditionally
  const { prompts, loading: promptsLoading, error: promptsError } = usePrompts();
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = useMemo(() => {
    if (!prompts) return [];
    return Array.from(new Set(prompts.flatMap(p => p.tags)));
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    if (!prompts) return [];
    if (selectedTag === 'All') {
      return prompts;
    }
    return prompts.filter(prompt => prompt.tags.includes(selectedTag));
  }, [prompts, selectedTag]);

  // useEffect for redirection can remain as is, as it's a hook itself.
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push('/auth');
    }
  }, [user, loadingAuth, router]);

  // Conditional rendering logic starts after all hooks have been called.
  if (loadingAuth) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return <p>Redirection vers la page de connexion...</p>;
  }

  // User is authenticated, render the page content
  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className="space-y-6">
      <p className="mb-4">Bonjour, {user.email} !</p> {/* Welcome message */}
      
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="w-full">
          <SearchBar />
        </div>
        <Link href="/prompts/new" className="button primary">
          Add Prompt
        </Link>
      </div>
      
      <TagFilter tags={allTags} onTagSelect={handleTagSelect} />
      
      {promptsLoading && <p className="text-center mt-4">Loading prompts...</p>}
      {promptsError && (
        <p className="text-center error-message mt-4">
          Error:{" "}
          {(promptsError as unknown) instanceof Error
            ? ((promptsError as unknown) as Error).message
            : String(promptsError)}
        </p>
      )}
      
      {!promptsLoading && !promptsError && <PromptList prompts={filteredPrompts} />}
      {!promptsLoading && !promptsError && prompts && prompts.length > 0 && filteredPrompts.length === 0 && (
        <p className="text-center mt-4">
          No prompts found for the tag "{selectedTag}".
        </p>
      )}
      {!promptsLoading && !promptsError && (!prompts || prompts.length === 0) && (
        <p className="text-center mt-4">
          No prompts yet. Why not <Link href="/prompts/new" className="underline">add one</Link>?
        </p>
      )}
    </div>
  );
}