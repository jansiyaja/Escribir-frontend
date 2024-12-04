import React from "react";

interface TextAdProps {
  title: string;
  textContent: string;
  link: string;
}

const TextAd: React.FC<TextAdProps> = ({ title, textContent, link }) => (
  <div className="p-6 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white rounded-lg shadow-xl">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-lg font-medium text-gray-100 mt-2">{textContent}</p>
    <div className="mt-6 text-center">
      <p className="text-lg font-semibold text-gray-100">👉 Visit now and let the journey begin</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-6 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition-colors">
        Learn More
      </a>
    </div>
  </div>
);

export default TextAd;
