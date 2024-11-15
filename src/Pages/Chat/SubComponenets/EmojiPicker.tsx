import React from "react";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  const emojis = ["😊", "😂", "😍", "😢", "😡", "😱", "👍", "👎", "🎉", "❤️"];

  return (
    <div className="  bg-white border rounded-lg shadow-lg p-2">
      <div className="grid grid-cols-5 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className="text-xl hover:bg-gray-200 p-1 rounded"
            onClick={() => onSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
