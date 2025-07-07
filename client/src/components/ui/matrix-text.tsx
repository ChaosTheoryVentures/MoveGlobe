import { useState, useEffect } from 'react';

interface MatrixTextProps {
  texts: string[];
  baseText: string;
}

export function MatrixText({ texts, baseText }: MatrixTextProps) {
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
      <div className="text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {baseText}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400">
            {displayText}
          </span>
          <span className={`inline-block w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-green-400 ml-1 ${isTyping ? 'animate-pulse' : 'animate-ping'}`}></span>
        </h1>
        <div className="h-1 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto opacity-50"></div>
      </div>
    </div>
  );
}