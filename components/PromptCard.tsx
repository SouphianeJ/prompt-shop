import Link from 'next/link';
import CopyButton from './CopyButton';

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    content: string;
    tags: string[];
  };
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">
        <Link href={`/prompts/${prompt.id}`}>{prompt.title}</Link>
      </h3>
      <p className="mb-2">{prompt.content.substring(0, 100)}...</p>
      <div className="flex items-center justify-between">
        <div>
          {prompt.tags.map((tag) => (
            <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #{tag}
            </span>
          ))}
        </div>
        <CopyButton text={prompt.content} />
      </div>
    </div>
  );
};

export default PromptCard;