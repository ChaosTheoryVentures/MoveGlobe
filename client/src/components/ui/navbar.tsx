import React from 'react';
import { Button } from './button';

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              AI<span className="text-blue-400">Globe</span>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200 text-sm">
              Solutions
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200 text-sm">
              Industries
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200 text-sm">
              About
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200 text-sm">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-all duration-300"
              onClick={() => console.log('Get Started clicked')}
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-2">
            <button className="text-white hover:text-blue-400 transition-colors duration-200 p-1">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}