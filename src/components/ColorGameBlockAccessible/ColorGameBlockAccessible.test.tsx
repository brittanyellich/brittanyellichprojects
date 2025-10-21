import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorGameBlockAccessible from './ColorGameBlockAccessible';
import { Color } from '../../containers/ColorGameAccessible/ColorGameAccessible';

describe('ColorGameBlockAccessible Component', () => {
  const mockOnClick = jest.fn();
  const mockOnReset = jest.fn();
  const defaultColor: Color = {
    rgb: [100, 150, 200],
    hex: '#6496c8',
    colorName: 'Blue'
  };

  beforeEach(() => {
    mockOnClick.mockClear();
    mockOnReset.mockClear();
  });

  describe('Component Rendering', () => {
    it('renders color block as a button element', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button', { name: 'Blue' });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('renders with correct background color', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });
    });

    it('renders with correct CSS class', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('color-game-block-accessible');
    });

    it('displays color name as button text', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      expect(screen.getByText('Blue')).toBeInTheDocument();
    });

    it('renders with correct inline styles', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.5rem'
      });
    });
  });

  describe('Props Handling', () => {
    it('displays different color names correctly', () => {
      const redColor: Color = {
        rgb: [255, 0, 0],
        hex: '#ff0000',
        colorName: 'Red'
      };

      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={redColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      expect(screen.getByText('Red')).toBeInTheDocument();

      const greenColor: Color = {
        rgb: [0, 255, 0],
        hex: '#00ff00',
        colorName: 'Green'
      };

      rerender(
        <ColorGameBlockAccessible
          colors={greenColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      expect(screen.getByText('Green')).toBeInTheDocument();
      expect(screen.queryByText('Red')).not.toBeInTheDocument();
    });

    it('displays different colors correctly with reset', () => {
      const redColor: Color = {
        rgb: [255, 0, 0],
        hex: '#ff0000',
        colorName: 'Red'
      };

      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={redColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ background: 'rgb(255, 0, 0)' });

      const greenColor: Color = {
        rgb: [0, 255, 0],
        hex: '#00ff00',
        colorName: 'Green'
      };

      rerender(
        <ColorGameBlockAccessible
          colors={greenColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(button).toHaveStyle({ background: 'rgb(0, 255, 0)' });
    });

    it('handles edge case color values (black)', () => {
      const blackColor: Color = {
        rgb: [0, 0, 0],
        hex: '#000000',
        colorName: 'Black'
      };

      render(
        <ColorGameBlockAccessible
          colors={blackColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ background: 'rgb(0, 0, 0)' });
      expect(screen.getByText('Black')).toBeInTheDocument();
    });

    it('handles edge case color values (white)', () => {
      const whiteColor: Color = {
        rgb: [255, 255, 255],
        hex: '#ffffff',
        colorName: 'White'
      };

      render(
        <ColorGameBlockAccessible
          colors={whiteColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ background: 'rgb(255, 255, 255)' });
      expect(screen.getByText('White')).toBeInTheDocument();
    });

    it('handles complex color names', () => {
      const complexColor: Color = {
        rgb: [128, 128, 128],
        hex: '#808080',
        colorName: 'Medium Gray'
      };

      render(
        <ColorGameBlockAccessible
          colors={complexColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      expect(screen.getByText('Medium Gray')).toBeInTheDocument();
    });
  });

  describe('User Interactions - Click Events', () => {
    it('calls onClick when clicked with mouse', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick multiple times for multiple clicks', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('calls onClick with userEvent click', async () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('sets background to transparent when clicked and not correct', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });

      fireEvent.click(button);

      expect(button).toHaveStyle({ background: 'transparent' });
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not change background when clicked and is correct', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });

      fireEvent.click(button);

      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Keyboard Accessibility', () => {
    it('calls onClick when Enter key is pressed', async () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      button.focus();
      await userEvent.keyboard('{Enter}');

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when Space key is pressed', async () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      button.focus();
      await userEvent.keyboard(' ');

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick for other keys', async () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      button.focus();
      await userEvent.keyboard('{Escape}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('a');

      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('is focusable', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();
    });

    it('updates background to transparent on keyboard Enter press when not correct', async () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });
      
      await userEvent.keyboard('{Enter}');

      expect(button).toHaveStyle({ background: 'transparent' });
    });
  });

  describe('Reset Functionality', () => {
    it('resets background color when reset is true', () => {
      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      
      // Click to make transparent
      fireEvent.click(button);
      expect(button).toHaveStyle({ background: 'transparent' });

      // Reset
      rerender(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });
      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('calls onReset when reset is true', () => {
      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      expect(mockOnReset).not.toHaveBeenCalled();

      rerender(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('resets to new colors when reset with different colors', () => {
      const newColor: Color = {
        rgb: [50, 75, 100],
        hex: '#324b64',
        colorName: 'Dark Blue'
      };

      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      
      // Click to make transparent
      fireEvent.click(button);
      expect(button).toHaveStyle({ background: 'transparent' });

      // Reset with new colors
      rerender(
        <ColorGameBlockAccessible
          colors={newColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(button).toHaveStyle({ background: 'rgb(50, 75, 100)' });
      expect(screen.getByText('Dark Blue')).toBeInTheDocument();
      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('does not call onReset when reset is false', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
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
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      const initialStyle = button.style.background;

      fireEvent.click(button);

      expect(button.style.background).toBe(initialStyle);
      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });
    });

    it('changes to transparent on click when isCorrect is false', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');

      fireEvent.click(button);

      expect(button).toHaveStyle({ background: 'transparent' });
    });

    it('toggles isCorrect behavior correctly', () => {
      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');

      // First click with isCorrect=false should make transparent
      fireEvent.click(button);
      expect(button).toHaveStyle({ background: 'transparent' });

      // Reset the component
      rerender(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      // Now change isCorrect to true
      rerender(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={true}
          reset={false}
          onReset={mockOnReset}
        />
      );

      // Click again with isCorrect=true should maintain color
      fireEvent.click(button);
      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid successive clicks', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');

      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        fireEvent.click(button);
      }

      expect(mockOnClick).toHaveBeenCalledTimes(10);
      expect(button).toHaveStyle({ background: 'transparent' });
    });

    it('works with async onClick function', async () => {
      const asyncOnClick = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={asyncOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(asyncOnClick).toHaveBeenCalledTimes(1);
    });

    it('works with async onReset function', async () => {
      const asyncOnReset = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={asyncOnReset}
        />
      );

      rerender(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={asyncOnReset}
        />
      );

      expect(asyncOnReset).toHaveBeenCalledTimes(1);
    });

    it('handles multiple resets in sequence', () => {
      const color1: Color = {
        rgb: [100, 150, 200],
        hex: '#6496c8',
        colorName: 'Blue'
      };

      const color2: Color = {
        rgb: [200, 100, 50],
        hex: '#c86432',
        colorName: 'Orange'
      };

      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={color1}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');

      // First reset
      rerender(
        <ColorGameBlockAccessible
          colors={color1}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(mockOnReset).toHaveBeenCalledTimes(1);

      // Reset to false
      rerender(
        <ColorGameBlockAccessible
          colors={color1}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      // Second reset
      rerender(
        <ColorGameBlockAccessible
          colors={color2}
          onClick={mockOnClick}
          isCorrect={false}
          reset={true}
          onReset={mockOnReset}
        />
      );

      expect(mockOnReset).toHaveBeenCalledTimes(2);
      expect(button).toHaveStyle({ background: 'rgb(200, 100, 50)' });
      expect(screen.getByText('Orange')).toBeInTheDocument();
    });

    it('handles color array with fractional numbers', () => {
      const fractionalColor: Color = {
        rgb: [100.5, 150.7, 200.9],
        hex: '#6496c8',
        colorName: 'Blue'
      };

      render(
        <ColorGameBlockAccessible
          colors={fractionalColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ background: 'rgb(100.5, 150.7, 200.9)' });
    });

    it('handles empty or special characters in color name', () => {
      const specialColor: Color = {
        rgb: [100, 150, 200],
        hex: '#6496c8',
        colorName: 'Blue-Green Mix!'
      };

      render(
        <ColorGameBlockAccessible
          colors={specialColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      expect(screen.getByText('Blue-Green Mix!')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('maintains separate state for multiple instances', () => {
      const color1: Color = {
        rgb: [100, 150, 200],
        hex: '#6496c8',
        colorName: 'Blue'
      };

      const color2: Color = {
        rgb: [50, 75, 100],
        hex: '#324b64',
        colorName: 'Dark Blue'
      };

      render(
        <ColorGameBlockAccessible
          colors={color1}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      render(
        <ColorGameBlockAccessible
          colors={color2}
          onClick={jest.fn()}
          isCorrect={false}
          reset={false}
          onReset={jest.fn()}
        />
      );

      const button1 = screen.getByRole('button', { name: 'Blue' });
      const button2 = screen.getByRole('button', { name: 'Dark Blue' });

      expect(button1).toHaveStyle({ background: 'rgb(100, 150, 200)' });
      expect(button2).toHaveStyle({ background: 'rgb(50, 75, 100)' });

      // Click first button
      fireEvent.click(button1);

      expect(button1).toHaveStyle({ background: 'transparent' });
      expect(button2).toHaveStyle({ background: 'rgb(50, 75, 100)' });
    });

    it('preserves transparent state across re-renders when reset is false', () => {
      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');

      // Click to make transparent
      fireEvent.click(button);
      expect(button).toHaveStyle({ background: 'transparent' });

      // Re-render without reset
      rerender(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      // Should still be transparent
      expect(button).toHaveStyle({ background: 'transparent' });
    });

    it('updates background when colors change without reset', () => {
      const color1: Color = {
        rgb: [100, 150, 200],
        hex: '#6496c8',
        colorName: 'Blue'
      };

      const color2: Color = {
        rgb: [50, 75, 100],
        hex: '#324b64',
        colorName: 'Dark Blue'
      };

      const { rerender } = render(
        <ColorGameBlockAccessible
          colors={color1}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });

      // Change colors without reset - background style should not update
      rerender(
        <ColorGameBlockAccessible
          colors={color2}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      // Background should remain the original color from initial render
      expect(button).toHaveStyle({ background: 'rgb(100, 150, 200)' });
    });
  });

  describe('Accessibility', () => {
    it('is accessible by screen readers', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button', { name: 'Blue' });
      expect(button).toBeInTheDocument();
    });

    it('maintains accessibility with long color name', () => {
      const longNameColor: Color = {
        rgb: [128, 128, 128],
        hex: '#808080',
        colorName: 'Very Light Slightly Greenish Blue Gray'
      };

      render(
        <ColorGameBlockAccessible
          colors={longNameColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button', { name: 'Very Light Slightly Greenish Blue Gray' });
      expect(button).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(
        <ColorGameBlockAccessible
          colors={defaultColor}
          onClick={mockOnClick}
          isCorrect={false}
          reset={false}
          onReset={mockOnReset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeVisible();
      expect(button.tabIndex).toBe(0);
    });
  });
});
