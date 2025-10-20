# GitHub Copilot Instructions

## Project Overview

This is a React + TypeScript portfolio project that showcases interactive web applications and side projects. The application is built with Create React App and uses SCSS for styling. The site is deployed to AWS S3 and served via CloudFront.

## Tech Stack

- **Framework**: React 17 with TypeScript
- **Styling**: SCSS (Sass)
- **Routing**: React Router v6
- **Testing**: Jest with React Testing Library
- **Build Tool**: react-scripts (Create React App)
- **Package Manager**: npm (primary), yarn (supported)
- **Node Version**: 14

## Project Structure

```
src/
├── components/          # Reusable UI components
├── containers/          # Page-level components and complex features
├── themes/             # Theme context and styling
├── utils/              # Utility functions and helpers
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

### Components vs Containers

- **Components**: Small, reusable UI elements (buttons, toggles, etc.)
  - Should be focused on presentation
  - Minimal business logic
  - Accept props for customization
  - Include corresponding `.scss` file for styles

- **Containers**: Page-level components and complex features
  - Can contain business logic
  - May manage state
  - Compose multiple components
  - Include corresponding `.scss` file for styles

## Coding Standards

### TypeScript

- Use TypeScript for all new `.tsx` and `.ts` files
- Enable strict mode is configured in `tsconfig.json`
- Define interfaces for component props
- Use descriptive interface names (e.g., `Props`, `ButtonProps`)
- Avoid using `any` type; prefer specific types or `unknown`

### React Components

- Use functional components with hooks
- Define props interface above the component
- Use destructuring for props in function parameters
- Export components as default exports
- Component file names should match the component name

Example component structure:
```typescript
import React from "react";
import "./ComponentName.scss";

interface Props {
  onClick: () => void;
  text: string;
}

function ComponentName({ onClick, text }: Props) {
  return (
    // JSX here
  );
}

export default ComponentName;
```

### Styling

- Use SCSS for all styling
- Each component/container should have its own `.scss` file
- Use BEM-like naming conventions or simple class names
- Keep styles scoped to the component
- Import SCSS files at the top of the component file

### File Organization

- Each component/container should be in its own directory
- Directory name matches the component name
- Include: `ComponentName.tsx`, `ComponentName.scss`, `ComponentName.test.tsx`
- Test files are optional but encouraged

## Testing Guidelines

### Testing Framework

- Use Jest with React Testing Library
- Test files should be named `ComponentName.test.tsx`
- Place test files next to the component being tested

### Test Structure

- Group related tests using `describe` blocks
- Use clear, descriptive test names with `it` statements
- Test categories should include:
  - Component Rendering
  - Props Handling
  - User Interactions
  - Keyboard Accessibility
  - Edge Cases
  - Accessibility

### Writing Tests

- Use `screen` queries from React Testing Library
- Prefer `getByRole` over other query methods for accessibility
- Test user behavior, not implementation details
- Mock functions with `jest.fn()`
- Clear mocks in `beforeEach` when needed
- Test keyboard accessibility (Enter, Space keys)
- Verify screen reader accessibility

Example test structure:
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  describe('Component Rendering', () => {
    it('renders component with required props', () => {
      // Test implementation
    });
  });

  describe('User Interactions', () => {
    it('handles click events', () => {
      // Test implementation
    });
  });
});
```

## Build and Development

### Available Scripts

- `npm start` - Run development server on http://localhost:3000
- `npm build` - Build for production
- `npm test` - Run tests in watch mode
- `npm test -- --passWithNoTests` - Run tests without failing on no tests

### CI/CD

- Tests run on every push and pull request to `main`
- Deployment to S3 happens on push to `master` branch
- CloudFront cache is invalidated after deployment

## Dependencies

### Key Libraries

- **React Router**: Use v6 syntax (`<Routes>`, `<Route>`, `useParams`, `useNavigate`)
- **FontAwesome**: Available for icons via `@fortawesome/react-fontawesome`
- **React Modal**: Use for modal dialogs
- **date-fns**: Use for date manipulation
- **js-cookie**: Use for cookie management

### Adding New Dependencies

- Use `npm install` for new packages
- Ensure compatibility with React 17 and TypeScript 4.4
- Update documentation if adding significant dependencies

## Accessibility Requirements

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Buttons should respond to Enter and Space keys
- Include proper ARIA attributes where needed
- Test with screen readers in mind
- Maintain proper focus management

## Best Practices

1. **Component Design**
   - Keep components small and focused
   - Use composition over complex components
   - Avoid prop drilling; consider context for shared state

2. **State Management**
   - Use React hooks for component state
   - Use Context API for theme and shared state
   - localStorage utilities are available in `src/utils/localStorage.ts`

3. **Code Quality**
   - Write descriptive variable and function names
   - Add comments only when necessary to explain complex logic
   - Keep functions small and single-purpose
   - Avoid deeply nested code

4. **Performance**
   - Minimize re-renders with proper dependency arrays
   - Use React.memo for expensive components when needed
   - Lazy load routes if the app grows

5. **Error Handling**
   - Handle errors gracefully
   - Provide user feedback for errors
   - Log errors appropriately

## Common Patterns

### Theme Context

The app uses a ThemeContext for managing themes:
- Available in `src/themes/ThemeContext.ts` and `src/themes/ThemeContextWrapper.tsx`
- Use for theme-aware components

### LocalStorage

- Utility functions available in `src/utils/localStorage.ts`
- Use for persisting user preferences

## Code Review Standards

When reviewing code:
- Verify TypeScript types are properly defined
- Check for accessibility (keyboard navigation, screen reader support)
- Ensure tests are comprehensive and test user behavior
- Verify SCSS follows project conventions
- Check that new components follow the established structure
- Ensure no console.log statements in production code
- Verify proper error handling

## Notes

- This is a portfolio/demo project - focus on clean, maintainable code
- Prioritize accessibility and user experience
- Keep the codebase simple and easy to understand
- The project uses Create React App, so don't eject unless absolutely necessary
