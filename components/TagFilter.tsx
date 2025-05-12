'use client';

import { useState } from 'react';

interface TagFilterProps {
  tags: string[];
  // onTagSelect: (tag: string) => void; // Callback for filtering
}

const TagFilter: React.FC<TagFilterProps> = ({ tags /*, onTagSelect */ }) => {
  const [activeTag, setActiveTag] = useState('All');

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    // onTagSelect(tag); // Call filtering logic
    // Implement filtering logic here based on the selected tag
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2"> {/* Use flex-wrap and gap */}
      {['All', ...tags].map((tag) => ( // Assuming 'All' is always an option distinct from fetched tags
        <button
          key={tag}
          className={`font-semibold py-2 px-4 rounded-full text-sm transition-colors duration-150 ${
            activeTag === tag
              ? 'bg-neon-blue text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-light-gray'
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