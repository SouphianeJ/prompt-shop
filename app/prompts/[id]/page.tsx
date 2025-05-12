import React from 'react';

interface Props {
  params: { id: string };
}

const PromptDetailPage: React.FC<Props> = ({ params }) => {
  const { id } = params;

  // Placeholder data - replace with actual data fetching logic
  const prompt = {
    id: id,
    title: 'Sample Prompt',
    content: 'This is the content of the sample prompt.',
    tags: ['AI', 'Example'],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{prompt.title}</h2>
      <p className="mb-4">{prompt.content}</p>
      <div>
        Tags: {prompt.tags.join(', ')}
      </div>
    </div>
  );
};

export default PromptDetailPage;