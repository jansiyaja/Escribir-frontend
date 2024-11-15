import React from 'react';

interface TagFilterProps {
  uniqueTags: string[];
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ uniqueTags, activeTag, onTagClick }) => (
  <div className="flex justify-center gap-4 mb-6 flex-wrap  border-b-2 p-4">
    {uniqueTags.map(tag => (
      <button
        key={tag}
        className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${activeTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
        onClick={() => onTagClick(tag)}
      >
        {tag}
      </button>
    ))}
    <button
      className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${!activeTag ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
      onClick={() => onTagClick(null)}
    >
      All
    </button>
  </div>
);

export default TagFilter;
