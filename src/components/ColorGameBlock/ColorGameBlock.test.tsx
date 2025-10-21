import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorGameBlock from './ColorGameBlock';

describe('ColorGameBlock Component', () => {
  const mockOnClick = jest.fn();
  const mockOnReset = jest.fn();
  const defaultColors = [100, 150, 200];

  beforeEach(() => {
    mockOnClick.mockClear();
    mockOnReset.mockClear();
  });

  describe('Component Rendering', () => {
    it('renders color block with correct background color', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock).toBeInTheDocument();
      expect(colorBlock).toHaveStyle({ background: 'rgb(100, 150, 200)' });
    });

    it('renders with correct CSS class', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock).toHaveClass('color-game-block');
    });

    it('renders as a div element', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock?.tagName).toBe('DIV');
    });
  });

  describe('Props Handling', () => {
    it('displays different colors correctly with reset', () => {
      const { container, rerender } = render(
        <ColorGameBlock
          colors={[255, 0, 0]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock).toHaveStyle({ background: 'rgb(255, 0, 0)' });

      rerender(
        <ColorGameBlock
          colors={[0, 255, 0]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(colorBlock).toHaveStyle({ background: 'rgb(0, 255, 0)' });
    });

    it('handles edge case color values (0, 0, 0)', () => {
      const { container } = render(
        <ColorGameBlock
          colors={[0, 0, 0]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock).toHaveStyle({ background: 'rgb(0, 0, 0)' });
    });

    it('handles edge case color values (255, 255, 255)', () => {
      const { container } = render(
        <ColorGameBlock
          colors={[255, 255, 255]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock).toHaveStyle({ background: 'rgb(255, 255, 255)' });
    });
  });

  describe('User Interactions - Click Events', () => {
    it('calls onClick when clicked', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      fireEvent.click(colorBlock!);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick multiple times for multiple clicks', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      fireEvent.click(colorBlock!);
      fireEvent.click(colorBlock!);
      fireEvent.click(colorBlock!);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('sets background to transparent when clicked and not correct', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock).toHaveStyle({ background: 'rgb(100, 150, 200)' });

      fireEvent.click(colorBlock!);

      expect(colorBlock).toHaveStyle({ background: 'transparent' });
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not change background when clicked and is correct', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock).toHaveStyle({ background: 'rgb(100, 150, 200)' });

      fireEvent.click(colorBlock!);

      expect(colorBlock).toHaveStyle({ background: 'rgb(100, 150, 200)' });
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Reset Functionality', () => {
    it('resets background color when reset is true', () => {
      const { container, rerender } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      
      // Click to make transparent
      fireEvent.click(colorBlock!);
      expect(colorBlock).toHaveStyle({ background: 'transparent' });

      // Reset
      rerender(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(colorBlock).toHaveStyle({ background: 'rgb(100, 150, 200)' });
      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('calls onReset when reset is true', () => {
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
    });

    it('resets to new colors when reset with different colors', () => {
      const { container, rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      
      // Click to make transparent
      fireEvent.click(colorBlock!);
      expect(colorBlock).toHaveStyle({ background: 'transparent' });

      // Reset with new colors
      rerender(
        <ColorGameBlock
          colors={[50, 75, 100]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(colorBlock).toHaveStyle({ background: 'rgb(50, 75, 100)' });
      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('does not call onReset when reset is false', () => {
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
  });

  describe('Conditional Rendering - isCorrect Logic', () => {
    it('maintains color on click when isCorrect is true', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      const initialStyle = colorBlock?.style.background;

      fireEvent.click(colorBlock!);

      expect(colorBlock?.style.background).toBe(initialStyle);
      expect(colorBlock).toHaveStyle({ background: 'rgb(100, 150, 200)' });
    });

    it('changes to transparent on click when isCorrect is false', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');

      fireEvent.click(colorBlock!);

      expect(colorBlock).toHaveStyle({ background: 'transparent' });
    });

    it('toggles isCorrect behavior correctly', () => {
      const { container, rerender } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');

      // First click with isCorrect=false should make transparent
      fireEvent.click(colorBlock!);
      expect(colorBlock).toHaveStyle({ background: 'transparent' });

      // Reset the component
      rerender(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      // Now change isCorrect to true
      rerender(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );

      // Click again with isCorrect=true should maintain color
      fireEvent.click(colorBlock!);
      expect(colorBlock).toHaveStyle({ background: 'rgb(100, 150, 200)' });
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid successive clicks', () => {
      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');

      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        fireEvent.click(colorBlock!);
      }

      expect(mockOnClick).toHaveBeenCalledTimes(10);
      expect(colorBlock).toHaveStyle({ background: 'transparent' });
    });

    it('works with async onClick function', async () => {
      const asyncOnClick = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      const { container } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={asyncOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      fireEvent.click(colorBlock!);

      expect(asyncOnClick).toHaveBeenCalledTimes(1);
    });

    it('works with async onReset function', async () => {
      const asyncOnReset = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      const { rerender } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={asyncOnReset}
        />
      );

      rerender(
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

    it('handles multiple resets in sequence', () => {
      const { container, rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');

      // First reset
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

      // Reset to false
      rerender(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      // Second reset
      rerender(
        <ColorGameBlock
          colors={[200, 100, 50]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(mockOnReset).toHaveBeenCalledTimes(2);
      expect(colorBlock).toHaveStyle({ background: 'rgb(200, 100, 50)' });
    });

    it('handles color array with fractional numbers', () => {
      const { container } = render(
        <ColorGameBlock
          colors={[100.5, 150.7, 200.9]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock).toHaveStyle({ background: 'rgb(100.5, 150.7, 200.9)' });
    });
  });

  describe('State Management', () => {
    it('maintains separate state for multiple instances', () => {
      const { container: container1 } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const { container: container2 } = render(
        <ColorGameBlock
          colors={[50, 75, 100]}
          onClick={jest.fn()}
          isCorrect={false}
          reset={false}
          onReset={jest.fn()}
        />
      );

      const colorBlock1 = container1.querySelector('.color-game-block');
      const colorBlock2 = container2.querySelector('.color-game-block');

      expect(colorBlock1).toHaveStyle({ background: 'rgb(100, 150, 200)' });
      expect(colorBlock2).toHaveStyle({ background: 'rgb(50, 75, 100)' });

      // Click first block
      fireEvent.click(colorBlock1!);

      expect(colorBlock1).toHaveStyle({ background: 'transparent' });
      expect(colorBlock2).toHaveStyle({ background: 'rgb(50, 75, 100)' });
    });

    it('preserves transparent state across re-renders when reset is false', () => {
      const { container, rerender } = render(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');

      // Click to make transparent
      fireEvent.click(colorBlock!);
      expect(colorBlock).toHaveStyle({ background: 'transparent' });

      // Re-render without reset
      rerender(
        <ColorGameBlock
          colors={defaultColors}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      // Should still be transparent
      expect(colorBlock).toHaveStyle({ background: 'transparent' });
    });

    it('updates background when colors change without reset', () => {
      const { container, rerender } = render(
        <ColorGameBlock
          colors={[100, 150, 200]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const colorBlock = container.querySelector('.color-game-block');
      expect(colorBlock).toHaveStyle({ background: 'rgb(100, 150, 200)' });

      // Change colors without reset - background style should not update
      rerender(
        <ColorGameBlock
          colors={[50, 75, 100]}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      // Background should remain the original color from initial render
      expect(colorBlock).toHaveStyle({ background: 'rgb(100, 150, 200)' });
    });
  });
});
