import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe('Component Rendering', () => {
    it('renders button with text prop', () => {
      render(<Button text="Test Button" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Button');
    });

    it('renders button with correct CSS class', () => {
      render(<Button text="Test Button" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
    });

    it('renders button element with button tag', () => {
      render(<Button text="Test Button" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Props Handling', () => {
    it('displays different text values correctly', () => {
      const { rerender } = render(<Button text="First Text" onClick={mockOnClick} />);
      expect(screen.getByText('First Text')).toBeInTheDocument();

      rerender(<Button text="Second Text" onClick={mockOnClick} />);
      expect(screen.getByText('Second Text')).toBeInTheDocument();
      expect(screen.queryByText('First Text')).not.toBeInTheDocument();
    });

    it('handles empty text prop', () => {
      render(<Button text="" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('');
    });

    it('handles text with special characters', () => {
      const specialText = "Click Me! @#$%^&*()";
      render(<Button text={specialText} onClick={mockOnClick} />);
      
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('handles multiline text rendering', () => {
      const multilineText = "Line 1\nLine 2";
      render(<Button text={multilineText} onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe(multilineText);
    });
  });

  describe('User Interactions - Click Events', () => {
    it('calls onClick when clicked with mouse', () => {
      render(<Button text="Click Me" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick multiple times for multiple clicks', () => {
      render(<Button text="Click Me" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('calls onClick with userEvent click', async () => {
      render(<Button text="Click Me" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Keyboard Accessibility', () => {
    it('calls onClick when Enter key is pressed', async () => {
      render(<Button text="Press Enter" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      button.focus();
      await userEvent.keyboard('{Enter}');
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when Space key is pressed', async () => {
      render(<Button text="Press Space" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      button.focus();
      await userEvent.keyboard(' ');
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick for other keys', async () => {
      render(<Button text="Other Keys" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      button.focus();
      await userEvent.keyboard('{Escape}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('a');
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('is focusable', () => {
      render(<Button text="Focusable" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid successive clicks', () => {
      render(<Button text="Rapid Click" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      
      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        fireEvent.click(button);
      }
      
      expect(mockOnClick).toHaveBeenCalledTimes(10);
    });

    it('calls onClick function that logs errors', () => {
      const errorOnClick = jest.fn(() => {
        console.error('Function executed with error side effect');
      });
      
      render(<Button text="Error Button" onClick={errorOnClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(errorOnClick).toHaveBeenCalledTimes(1);
    });

    it('works with async onClick function', async () => {
      const asyncOnClick = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });
      
      render(<Button text="Async Button" onClick={asyncOnClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(asyncOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('is accessible by screen readers', () => {
      render(<Button text="Screen Reader Test" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button', { name: 'Screen Reader Test' });
      expect(button).toBeInTheDocument();
    });

    it('maintains accessibility with long text', () => {
      const longText = "This is a very long button text that might wrap to multiple lines and should still be accessible";
      render(<Button text={longText} onClick={mockOnClick} />);
      
      const button = screen.getByRole('button', { name: longText });
      expect(button).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(<Button text="Keyboard Navigation" onClick={mockOnClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeVisible();
      expect(button.tabIndex).toBe(0);
    });
  });
});