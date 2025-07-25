import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  href?: string;
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  variant?: 'default' | 'small';
  target?: string;
  rel?: string;
}

export function GlowButton({ 
  href, 
  to, 
  onClick, 
  children, 
  className, 
  showArrow = false,
  variant = 'default',
  target,
  rel
}: GlowButtonProps) {
  const baseClasses = cn(
    "relative inline-block overflow-hidden rounded-full text-white font-medium tracking-wider uppercase transition-all duration-300 group",
    variant === 'default' ? "px-8 py-4 text-sm sm:text-base" : "px-3 py-1 text-xs",
    className
  );

  const content = (
    <>
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 rounded-full"></div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-cyan-400/20 to-[#4746a4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      
      {/* Animated shine effect */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000 ease-out"></div>
      
      {/* Hover scale effect on border */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-full transform group-hover:scale-105 transition-all duration-300"></div>
      
      {/* Button text */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </span>
      
      {/* Bottom glow on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#4746a4] to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}