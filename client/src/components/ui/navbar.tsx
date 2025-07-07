import React from 'react';
import { Button } from './button';

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">
              AI<span className="text-blue-400">Globe</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
              Solutions
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
              Industries
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
              About
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm rounded-full transition-all duration-300"
              onClick={() => console.log('Get Started clicked')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-400 transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}