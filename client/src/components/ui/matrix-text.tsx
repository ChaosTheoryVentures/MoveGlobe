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
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {baseText}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400">
            {displayText}
          </span>
          <span className={`inline-block w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-green-400 ml-1 ${isTyping ? 'animate-pulse' : 'animate-ping'}`}></span>
        </h1>
        
        <p className="text-white/80 text-sm sm:text-base md:text-lg mb-8 leading-relaxed px-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)' }}>
          We help organisations achieve their financial and operational goals by implementing agentic AI and automations. We create deep insights, understanding and autonomy for the future of business.
        </p>
        
        <button className="pointer-events-auto relative px-8 py-4 overflow-hidden rounded-full text-white text-sm sm:text-base font-medium tracking-wider uppercase transition-all duration-300 group">
          {/* Glass background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 rounded-full"></div>
          
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-cyan-400/20 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          
          {/* Animated shine effect */}
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000 ease-out"></div>
          
          {/* Hover scale effect on border */}
          <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-full transform group-hover:scale-105 transition-all duration-300"></div>
          
          {/* Button text */}
          <span className="relative z-10 flex items-center gap-2">
            Get ready for AI within 24 hrs
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          
          {/* Bottom glow on hover */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
}