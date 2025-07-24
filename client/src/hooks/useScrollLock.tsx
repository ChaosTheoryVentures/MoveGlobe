import { useEffect } from 'react';

/**
 * Custom hook to lock/unlock body scroll
 * Prevents scrolling when enabled (e.g., for modal overlays or full-screen experiences)
 * 
 * @param isLocked - Whether scroll should be locked
 */
export function useScrollLock(isLocked: boolean = true) {
  useEffect(() => {
    // Store original body styles
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    if (isLocked) {
      // Get current scroll position
      const scrollY = window.scrollY;

      // Apply styles to lock scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }

    // Cleanup function to restore original styles
    return () => {
      if (isLocked) {
        // Calculate how much we need to scroll back
        const scrollY = document.body.style.top;
        
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;

        // Restore scroll position
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY.replace('-', ''), 10));
        }
      }
    };
  }, [isLocked]);
}

/**
 * Alternative hook that uses CSS classes instead of direct style manipulation
 * This is more React-friendly and works better with existing styles
 * 
 * @param isLocked - Whether scroll should be locked
 * @param className - Optional custom class name (defaults to 'no-scroll')
 */
export function useScrollLockWithClass(isLocked: boolean = true, className: string = 'no-scroll') {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    
    if (isLocked) {
      document.body.classList.add(className);
      rootElement?.classList.add('fixed-root');
    } else {
      document.body.classList.remove(className);
      rootElement?.classList.remove('fixed-root');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove(className);
      rootElement?.classList.remove('fixed-root');
    };
  }, [isLocked, className]);
}