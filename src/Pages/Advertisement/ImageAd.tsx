import React, { useEffect, useState } from "react";

interface ImageAdProps {
  title: string;
  link: string;
  thumbnailPreview: string;
  onSkip?: () => void; 
}

const ImageAd: React.FC<ImageAdProps> = ({ title, link, thumbnailPreview, onSkip }) => {
  const [canSkip, setCanSkip] = useState(false); 

  useEffect(() => {

    const timer = setTimeout(() => {
      setCanSkip(true);
    }, 8000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg relative">
      <h3 className="text-lg font-bold">{title}</h3>
      <img
        src={thumbnailPreview}
        alt="Ad Preview"
        className="w-full max-h-64 object-cover rounded-lg"
      />
      <div className="mt-4 text-center">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Learn More
        </a>
      </div>

   
      {canSkip && (
        <button
          onClick={onSkip}
          className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition"
        >
          Skip
        </button>
      )}
    </div>
  );
};

export default ImageAd;
