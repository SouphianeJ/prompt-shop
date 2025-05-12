import PromptList from '@/components/PromptList';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import Link from 'next/link';

export default function PromptsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SearchBar />
        <Link href="/prompts/new" className="bg-neon-blue text-white py-2 px-4 rounded hover:bg-blue-700">
          Add Prompt
        </Link>
      </div>
      <TagFilter tags={['All', 'AI', 'Marketing', 'Design']} />
      <PromptList prompts={[]} />
    </div>
  );
}