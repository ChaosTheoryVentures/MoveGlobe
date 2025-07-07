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
      <div className="text-center px-4 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ 
          textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(59, 130, 246, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3)' 
        }}>
          {baseText}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400" style={{
            filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))'
          }}>
            {displayText}
          </span>
          <span className={`inline-block w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-green-400 ml-1 ${isTyping ? 'animate-pulse' : 'animate-ping'}`} style={{
            boxShadow: '0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.4)'
          }}></span>
        </h1>
        
        <p className="text-white/90 text-sm sm:text-base md:text-lg mb-8 leading-relaxed px-4" style={{
          textShadow: '0 0 15px rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
          We help organisations achieve their financial and operational goals by implementing agentic AI and automations. We create deep insights, understanding and autonomy for the future of business.
        </p>
        
        <button className="pointer-events-auto px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 text-white text-sm sm:text-base font-medium">
          Get ready for AI within 24 hrs
        </button>
      </div>
    </div>
  );
}