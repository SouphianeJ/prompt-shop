'use client';

import { useState } from 'react';

interface TagFilterProps {
  tags: string[];
}

const TagFilter: React.FC<TagFilterProps> = ({ tags }) => {
  const [activeTag, setActiveTag] = useState('All');

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    // Implement filtering logic here based on the selected tag
  };

  return (
    <div className="mb-4">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full mr-2 ${
            activeTag === tag ? 'bg-neon-blue text-white' : ''
          }`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;