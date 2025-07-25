import { useState, useEffect } from 'react';
import { GlowButton } from './glow-button';

interface MatrixTextProps {
  texts: string[];
  baseText: string;
  description: string;
  ctaText: string;
}

export function MatrixText({ texts, baseText, description, ctaText }: MatrixTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText !== currentFullText) {
      // Typing forward
      setIsTyping(true);
      timeout = setTimeout(() => {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
      }, Math.random() * 100 + 50); // Random typing speed for matrix effect
    } else if (!isDeleting && displayText === currentFullText) {
      // Pause at end
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsTyping(false);
      }, 2000);
    } else if (isDeleting && displayText !== '') {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, Math.random() * 50 + 25);
    } else if (isDeleting && displayText === '') {
      // Move to next text
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
      <div className="text-center px-4 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {baseText}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-[#4746a4]">
            {displayText}
          </span>
          <span className={`inline-block w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-[#4746a4] ml-1 ${isTyping ? 'animate-pulse' : 'animate-ping'}`}></span>
        </h1>
        
        <p className="text-white text-base sm:text-lg md:text-xl mb-8 leading-relaxed px-4 font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)' }}>
          {description}
        </p>
        
        <GlowButton 
          to="/ai-analyse"
          className="pointer-events-auto"
          showArrow={true}
        >
          {ctaText}
        </GlowButton>
      </div>
    </div>
  );
}