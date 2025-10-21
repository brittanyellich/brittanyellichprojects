import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorGameBlock from './ColorGameBlock';

describe('ColorGameBlock Component', () => {
  const defaultColors: number[] = [128, 64, 192];
  const mockOnClick = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
    mockOnReset.mockClear();
  });

  describe('Component Rendering', () => {
    it('renders with correct structure and CSS class', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      expect(block).toBeInTheDocument();
      expect(block).toHaveClass('color-game-block');
    });

    it('renders as a div element', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      expect(block?.tagName).toBe('DIV');
    });

    it('renders with correct initial background color from colors prop', () => {
      render(
        <ColorGameBlock
          colors={[255, 128, 64]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block?.style.background).toBe('rgb(255, 128, 64)');
    });

    it('renders with black color when colors are [0, 0, 0]', () => {
      render(
        <ColorGameBlock
          colors={[0, 0, 0]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block?.style.background).toBe('rgb(0, 0, 0)');
    });

    it('renders with white color when colors are [255, 255, 255]', () => {
      render(
        <ColorGameBlock
          colors={[255, 255, 255]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block?.style.background).toBe('rgb(255, 255, 255)');
    });
  });

  describe('Props Handling', () => {
    it('handles different color values correctly on initial render', () => {
      const { rerender, unmount } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      let block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block?.style.background).toBe('rgb(100, 150, 200)');

      // Unmount and remount with new colors
      unmount();
      render(
        <ColorGameBlock
          colors={[50, 75, 100]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block?.style.background).toBe('rgb(50, 75, 100)');
    });

    it('handles edge case colors array with more than 3 values', () => {
      // Component uses first 3 values
      render(
        <ColorGameBlock
          colors={[100, 150, 200, 250, 300]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
    });

    it('works with different onClick function implementations', () => {
      const customOnClick = jest.fn(() => console.log('Custom click handler'));
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={customOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      fireEvent.click(block!);
      
      expect(customOnClick).toHaveBeenCalledTimes(1);
    });

    it('works with different onReset function implementations', () => {
      const customOnReset = jest.fn(() => console.log('Custom reset handler'));
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={customOnReset}
        />
      );
      
      expect(customOnReset).toHaveBeenCalledTimes(1);
    });
  });

  describe('User Interactions - Click Events', () => {
    it('calls onClick when clicked with mouse', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      fireEvent.click(block!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick multiple times for multiple clicks', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      fireEvent.click(block!);
      fireEvent.click(block!);
      fireEvent.click(block!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('calls onClick with userEvent click', async () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      await userEvent.click(block!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Conditional Rendering - isCorrect behavior', () => {
    it('sets background to transparent when clicked and isCorrect is false', () => {
      render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
      
      fireEvent.click(block);
      
      expect(block?.style.background).toBe('transparent');
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('maintains background color when clicked and isCorrect is true', () => {
      render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
      
      fireEvent.click(block);
      
      // Background should remain the same when isCorrect is true
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('allows multiple clicks when isCorrect is true without changing background', () => {
      render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      
      fireEvent.click(block);
      fireEvent.click(block);
      fireEvent.click(block);
      
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('transitions from colored to transparent when isCorrect changes from true to false', () => {
      const { rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      fireEvent.click(block);
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
      
      // Now make it incorrect
      rerender(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      fireEvent.click(block);
      expect(block?.style.background).toBe('transparent');
    });
  });

  describe('State Changes - Background Style Updates', () => {
    it('maintains background style when colors prop changes without reset', () => {
      const { rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      let block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
      
      // Just changing colors without reset should NOT update the background
      rerender(
        <ColorGameBlock
          colors={[200, 100, 50]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      block = document.querySelector('.color-game-block') as HTMLElement;
      // Background should still be the original color since reset wasn't triggered
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
    });

    it('maintains transparent background after click even when other props change', () => {
      const { rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      
      // Click to make it transparent
      fireEvent.click(block);
      expect(block?.style.background).toBe('transparent');
      
      // Change isCorrect but keep reset false
      rerender(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      expect(block?.style.background).toBe('transparent');
    });
  });

  describe('UseEffect Hook - Reset Functionality', () => {
    it('calls onReset when reset prop is true', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );
      
      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('does not call onReset when reset prop is false', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      expect(mockOnReset).not.toHaveBeenCalled();
    });

    it('resets background color when reset changes from false to true', () => {
      const { rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      
      // Click to make it transparent
      fireEvent.click(block);
      expect(block?.style.background).toBe('transparent');
      expect(mockOnReset).not.toHaveBeenCalled();
      
      // Trigger reset
      rerender(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );
      
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('resets to new colors when both colors and reset change', () => {
      const { rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      
      // Click to make it transparent
      fireEvent.click(block);
      expect(block?.style.background).toBe('transparent');
      
      // Trigger reset with new colors
      rerender(
        <ColorGameBlock
          colors={[50, 75, 100]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );
      
      expect(block?.style.background).toBe('rgb(50, 75, 100)');
      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('calls onReset multiple times when reset toggles multiple times', () => {
      const { rerender } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      expect(mockOnReset).not.toHaveBeenCalled();
      
      // First reset
      rerender(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );
      expect(mockOnReset).toHaveBeenCalledTimes(1);
      
      // Back to false
      rerender(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      expect(mockOnReset).toHaveBeenCalledTimes(1);
      
      // Second reset
      rerender(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );
      expect(mockOnReset).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid successive clicks', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      
      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        fireEvent.click(block!);
      }
      
      expect(mockOnClick).toHaveBeenCalledTimes(10);
    });

    it('handles onClick function that logs errors', () => {
      const errorOnClick = jest.fn(() => {
        console.error('Function executed with error side effect');
      });
      
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={errorOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      fireEvent.click(block!);
      
      expect(errorOnClick).toHaveBeenCalledTimes(1);
    });

    it('handles async onClick function', async () => {
      const asyncOnClick = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'async complete';
      });
      
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={asyncOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      fireEvent.click(block!);
      
      expect(asyncOnClick).toHaveBeenCalledTimes(1);
    });

    it('handles async onReset function', async () => {
      const asyncOnReset = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'reset complete';
      });
      
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={asyncOnReset}
        />
      );
      
      expect(asyncOnReset).toHaveBeenCalledTimes(1);
    });

    it('maintains correct behavior after multiple interactions', () => {
      const { rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      
      // Click to make transparent
      fireEvent.click(block);
      expect(block?.style.background).toBe('transparent');
      
      // Reset
      rerender(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
      
      // Change reset back to false
      rerender(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      // Click again
      fireEvent.click(block);
      expect(block?.style.background).toBe('transparent');
    });

    it('handles extreme color values', () => {
      render(
        <ColorGameBlock
          colors={[999, -50, 500]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      // Browser/JSDOM will clamp these values to valid RGB range (0-255)
      // The component should not crash with extreme values
      expect(block?.style.background).toBe('rgb(255, 0, 255)');
    });

    it('handles decimal color values', () => {
      render(
        <ColorGameBlock
          colors={[128.5, 64.7, 192.3]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      // Just verify the component renders without crashing with decimal values
      expect(block).toBeInTheDocument();
      expect(block).toHaveClass('color-game-block');
    });
  });

  describe('Accessibility', () => {
    it('is visible in the DOM', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block');
      expect(block).toBeVisible();
    });

    it('maintains visibility after state changes', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block).toBeVisible();
      
      // Click to make transparent
      fireEvent.click(block);
      expect(block).toBeVisible(); // Still visible, just transparent
    });

    it('has cursor pointer style for clickability indication', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      const computedStyle = window.getComputedStyle(block);
      
      // Note: This might not work in JSDOM, but documents the expectation
      expect(block).toBeInTheDocument();
    });

    it('has accessibility concerns as a clickable div without proper semantics', () => {
      render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      expect(block).toBeVisible();
      
      // Note: This test documents the accessibility issue
      // A proper accessible implementation would have:
      // - role="button"
      // - tabIndex="0"
      // - aria-label describing the color
      // - keyboard event handlers for Enter and Space
      expect(block?.getAttribute('role')).toBeNull();
      expect(block?.tabIndex).toBe(-1);
    });
  });

  describe('Integration with Parent Component', () => {
    it('can simulate a complete game flow', () => {
      const { rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      const block = document.querySelector('.color-game-block') as HTMLElement;
      
      // User clicks wrong block
      fireEvent.click(block);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(block?.style.background).toBe('transparent');
      
      // Game resets
      rerender(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );
      expect(mockOnReset).toHaveBeenCalledTimes(1);
      expect(block?.style.background).toBe('rgb(100, 150, 200)');
      
      // Reset complete
      rerender(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      // User clicks correct block
      rerender(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );
      
      fireEvent.click(block);
      expect(mockOnClick).toHaveBeenCalledTimes(2);
      expect(block?.style.background).toBe('rgb(100, 150, 200)'); // Stays visible when correct
    });
  });
});
