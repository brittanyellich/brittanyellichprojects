import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavToggle from './NavToggle';

describe('NavToggle Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe('Component Rendering', () => {
    it('renders with correct structure and CSS classes', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      expect(navToggle).toBeInTheDocument();
      expect(navToggle).toHaveClass('nav-toggle');
    });

    it('displays hamburger state when isToggled is false', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      const spans = navToggle?.querySelectorAll('span');
      
      expect(spans).toHaveLength(3);
      spans?.forEach(span => {
        expect(span).toHaveClass('nav-toggle__span');
        expect(span).toHaveClass('nav-toggle__span-hamburger');
        expect(span).not.toHaveClass('nav-toggle__span-close');
      });
    });

    it('displays close state when isToggled is true', () => {
      render(<NavToggle isToggled={true} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      const spans = navToggle?.querySelectorAll('span');
      
      expect(spans).toHaveLength(3);
      spans?.forEach(span => {
        expect(span).toHaveClass('nav-toggle__span');
        expect(span).toHaveClass('nav-toggle__span-close');
        expect(span).not.toHaveClass('nav-toggle__span-hamburger');
      });
    });

    it('renders as a div element', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      expect(navToggle?.tagName).toBe('DIV');
    });
  });

  describe('Props Handling', () => {
    it('handles isToggled prop changes correctly', () => {
      const { rerender } = render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      let navToggle = document.querySelector('.nav-toggle');
      let spans = navToggle?.querySelectorAll('span');
      
      // Initially hamburger state
      spans?.forEach(span => {
        expect(span).toHaveClass('nav-toggle__span-hamburger');
      });

      // Change to close state
      rerender(<NavToggle isToggled={true} onClick={mockOnClick} />);
      
      navToggle = document.querySelector('.nav-toggle');
      spans = navToggle?.querySelectorAll('span');
      
      spans?.forEach(span => {
        expect(span).toHaveClass('nav-toggle__span-close');
      });
    });

    it('works with different onClick function implementations', () => {
      const customOnClick = jest.fn(() => console.log('Custom click handler'));
      render(<NavToggle isToggled={false} onClick={customOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      fireEvent.click(navToggle!);
      
      expect(customOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('User Interactions - Click Events', () => {
    it('calls onClick when clicked with mouse', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      fireEvent.click(navToggle!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick multiple times for multiple clicks', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      fireEvent.click(navToggle!);
      fireEvent.click(navToggle!);
      fireEvent.click(navToggle!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('calls onClick with userEvent click', async () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      await userEvent.click(navToggle!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when clicked on span elements', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      const spans = navToggle?.querySelectorAll('span');
      
      // Click on first span - should trigger parent div's onClick
      fireEvent.click(spans![0]);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      
      // Click on second span
      fireEvent.click(spans![1]);
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Keyboard Accessibility', () => {
    it('does not respond to keyboard events by default (div without button role)', async () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle') as HTMLElement;
      navToggle?.focus();
      
      // Simulate keyboard events - should not trigger onClick since it's a div
      fireEvent.keyDown(navToggle!, { key: 'Enter', code: 'Enter' });
      fireEvent.keyDown(navToggle!, { key: ' ', code: 'Space' });
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('is not naturally focusable as a div element', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle') as HTMLElement;
      expect(navToggle?.tabIndex).toBe(-1); // div elements are not naturally focusable
    });

    it('can be made focusable if tabIndex is added programmatically', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle') as HTMLElement;
      navToggle.tabIndex = 0; // Make it focusable
      navToggle.focus();
      
      expect(navToggle).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid successive clicks', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      
      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        fireEvent.click(navToggle!);
      }
      
      expect(mockOnClick).toHaveBeenCalledTimes(10);
    });

    it('calls onClick function that logs errors', () => {
      const errorOnClick = jest.fn(() => {
        console.error('Function executed with error side effect');
      });
      
      render(<NavToggle isToggled={false} onClick={errorOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      fireEvent.click(navToggle!);
      
      expect(errorOnClick).toHaveBeenCalledTimes(1);
    });

    it('works with async onClick function', async () => {
      const asyncOnClick = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'async complete';
      });
      
      render(<NavToggle isToggled={false} onClick={asyncOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      fireEvent.click(navToggle!);
      
      expect(asyncOnClick).toHaveBeenCalledTimes(1);
    });

    it('handles prop changes during interaction', () => {
      const { rerender } = render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      fireEvent.click(navToggle!);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      
      // Change props and click again
      rerender(<NavToggle isToggled={true} onClick={mockOnClick} />);
      const navToggleAfterRerender = document.querySelector('.nav-toggle');
      fireEvent.click(navToggleAfterRerender!);
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Accessibility', () => {
    it('is visible in the DOM', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle');
      expect(navToggle).toBeVisible();
    });

    it('maintains visibility in both states', () => {
      const { rerender } = render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      let navToggle = document.querySelector('.nav-toggle');
      expect(navToggle).toBeVisible();
      
      rerender(<NavToggle isToggled={true} onClick={mockOnClick} />);
      
      navToggle = document.querySelector('.nav-toggle');
      expect(navToggle).toBeVisible();
    });

    it('has accessibility concerns as a clickable div without proper semantics', () => {
      render(<NavToggle isToggled={false} onClick={mockOnClick} />);
      
      const navToggle = document.querySelector('.nav-toggle') as HTMLElement;
      expect(navToggle).toBeVisible();
      
      // Note: This test documents the accessibility issue
      // A proper accessible implementation would have:
      // - role="button"
      // - tabIndex="0"
      // - aria-label or aria-labelledby
      // - keyboard event handlers for Enter and Space
      expect(navToggle?.getAttribute('role')).toBeNull();
      expect(navToggle?.tabIndex).toBe(-1);
    });
  });
});