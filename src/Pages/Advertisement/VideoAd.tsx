import React, { useState, useEffect } from "react";

interface VideoAdProps {
  title: string;
  link: string;
  thumbnailPreview: string;
  onSkip?: () => void; // Optional skip callback
}

const VideoAd: React.FC<VideoAdProps> = ({ title, link, thumbnailPreview, onSkip }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (secondsLeft > 0 && onSkip) {
      const timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timer); // Cleanup timer
    } else {
      setIsVisible(false); // Hide the ad after the countdown finishes
    }
  }, [secondsLeft, onSkip]);

  if (onSkip) {
    // Ad with skip functionality (second design)
    return isVisible ? (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-lg w-full">
          <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
          <video
            className="w-full h-auto rounded-lg mb-4"
            controls
            src={thumbnailPreview}
            autoPlay
            muted
          />
          <div className="flex justify-between items-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Learn More
            </a>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Skip in {secondsLeft}s</span>
              <button
                onClick={onSkip}
                className="text-red-500 font-bold hover:underline"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }

  // Ad without skip functionality (first design)
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-bold">{title}</h3>
      <video className="w-full h-auto rounded-lg" controls src={thumbnailPreview} />
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
    </div>
  );
};

export default VideoAd;
