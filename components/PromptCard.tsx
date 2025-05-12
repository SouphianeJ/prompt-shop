import Link from 'next/link';
import CopyButton from './CopyButton';
import { Prompt } from '@/types/prompt'; // Import Prompt type

interface PromptCardProps {
  prompt: Prompt; // Use the imported Prompt type
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  return (
    <div className="border border-gray-700 rounded-md p-4 mb-4 hover:border-neon-blue transition-colors duration-150"> {/* Subtle border, neon on hover */}
      <h3 className="text-xl font-semibold mb-2">
        <Link href={`/prompts/${prompt.id}`} className="text-neon-blue hover:underline">
          {prompt.title}
        </Link>
      </h3>
      <p className="mb-3 text-gray-400 line-clamp-3">{prompt.content}</p> {/* Slightly dimmer text, line-clamp for brevity */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2"> {/* Use flex-wrap and gap for tags */}
          {prompt.tags.map((tag) => (
            <span key={tag} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-xs font-semibold text-neon-green"> {/* Adjusted tag style - smaller, darker bg */}
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