import React, { useState, useEffect } from 'react';
import { Button } from './button';

const dynamicTexts = [
  "Healthcare",
  "Education",
  "Business",
  "Finance",
  "Marketing",
  "Technology",
  "Research",
  "Innovation"
];

export function Interface() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = dynamicTexts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (isTyping && !isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setIsTyping(false);
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setIsTyping(true);
          setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, currentTextIndex, isTyping, isDeleting]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6">
      {/* Dynamic typing text */}
      <div className="text-center mb-6 sm:mb-8 pointer-events-none max-w-4xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight">
          AI for{' '}
          <span className="text-blue-400 inline-block min-w-[120px] sm:min-w-[180px] md:min-w-[200px] text-left">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-blue-200 opacity-80 px-2">
          Intelligent solutions for your industry
        </p>
      </div>

      {/* CTA Button */}
      <div className="pointer-events-auto">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
          onClick={() => {
            // Add your CTA action here
            console.log('CTA clicked: Personalized advice in 24 hrs');
          }}
        >
          Personalized advice in 24 hrs
        </Button>
      </div>
    </div>
  );
}