import React from 'react';

interface MoveLogoProps {
  className?: string;
}

export function MoveLogo({ className = "" }: MoveLogoProps) {
  return (
    <svg
      viewBox="0 0 240 60"
      className={`${className}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* M */}
      <path d="M10 50 L10 10 L25 10 L35 35 L45 10 L60 10 L60 50 L45 50 L45 25 L37 45 L33 45 L25 25 L25 50 Z" fill="white"/>
      
      {/* o */}
      <circle cx="80" cy="35" r="15" fill="none" stroke="white" strokeWidth="8"/>
      
      {/* v */}
      <path d="M110 20 L125 20 L135 45 L145 20 L160 20 L145 55 L125 55 Z" fill="white"/>
      
      {/* e */}
      <path d="M175 50 L175 20 L210 20 L210 30 L185 30 L185 35 L205 35 L205 40 L185 40 L185 45 L210 45 L210 50 Z" fill="white"/>
      
      {/* Arrow pointing up and right */}
      <path d="M115 5 L135 15 L125 15 L125 25 L115 25 L115 15 L105 15 Z" fill="white"/>
    </svg>
  );
}