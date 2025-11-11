/**
 * Cursor Helper Utilities
 * Functions to enhance cursor interactions and effects
 */

/**
 * Add special cursor hover class to elements
 * @param selector - CSS selector for elements to enhance
 * @param className - Custom class name to add (default: 'cursor-hover')
 */
export const addCursorHover = (selector: string, className = 'cursor-hover'): void => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.classList.add(className);
  });
};

/**
 * Add magnetic cursor effect to specific elements
 * @param selector - CSS selector for magnetic elements
 */
export const addMagneticCursor = (selector: string): void => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
      const target = e.target as HTMLElement;
      target.style.setProperty('--cursor-magnetic', 'true');
    });
    
    element.addEventListener('mouseleave', (e) => {
      const target = e.target as HTMLElement;
      target.style.removeProperty('--cursor-magnetic');
    });
  });
};

/**
 * Initialize enhanced cursor effects for common elements
 */
export const initCursorEffects = (): void => {
  // Add hover effects to navigation items
  addCursorHover('.nav-hover-btn', 'cursor-nav');
  
  // Add hover effects to buttons
  addCursorHover('button, .button', 'cursor-button');
  
  // Add hover effects to links
  addCursorHover('a[href]', 'cursor-link');
  
  // Add magnetic effect to important elements
  addMagneticCursor('.hero-heading, .special-font');
  
  // Add video hover effects
  addCursorHover('video', 'cursor-video');
};

/**
 * Cursor color themes for different sections
 */
export const cursorThemes = {
  default: {
    primary: '#00BFFF',
    accent: '#FFD700'
  },
  hero: {
    primary: '#4fb7dd',
    accent: '#edff66'
  },
  products: {
    primary: '#5724ff',
    accent: '#00BFFF'
  },
  dark: {
    primary: '#FFFFFF',
    accent: '#00BFFF'
  }
} as const;

/**
 * Apply cursor theme
 * @param theme - Theme name from cursorThemes
 */
export const applyCursorTheme = (theme: keyof typeof cursorThemes): void => {
  const selectedTheme = cursorThemes[theme];
  document.documentElement.style.setProperty('--cursor-primary', selectedTheme.primary);
  document.documentElement.style.setProperty('--cursor-accent', selectedTheme.accent);
};
