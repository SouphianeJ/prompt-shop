import PromptList from '@/components/PromptList';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';

export default function Home() {
  return (
    <div>
      <SearchBar />
      <TagFilter tags={['All', 'AI', 'Marketing', 'Design']} />
      <PromptList prompts={[]} />
    </div>
  );
}