# Contributing to brittanyellichprojects

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing to this repository.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Running Tests](#running-tests)
- [Building the Project](#building-the-project)
- [Before Submitting a Pull Request](#before-submitting-a-pull-request)
- [Keeping Documentation Up to Date](#keeping-documentation-up-to-date)

## Getting Started

This project is a React TypeScript application built with Create React App. To get started:

1. **Clone the repository**
   ```bash
   git clone https://github.com/brittanyellich/brittanyellichprojects.git
   cd brittanyellichprojects
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
   This will open [http://localhost:3000](http://localhost:3000) in your browser. The page will reload when you make changes.

## Development Workflow

1. **Create a new branch** for your feature or bug fix
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the existing code style and patterns in the project

3. **Test your changes** thoroughly (see [Running Tests](#running-tests))

4. **Commit your changes** with clear, descriptive commit messages
   ```bash
   git add .
   git commit -m "Add feature: description of your changes"
   ```

5. **Push your branch** and create a pull request
   ```bash
   git push origin feature/your-feature-name
   ```

## Running Tests

**Running tests is mandatory before merging any code.** This project uses Jest and React Testing Library for testing.

### Run all tests
```bash
npm test
```

This will run tests in watch mode. To run tests once (useful for CI/CD):

```bash
npm test -- --watchAll=false
```

### Test Coverage
All tests must pass before code can be merged. The project currently has:
- Component tests for UI components
- Unit tests for utility functions
- Integration tests for key features

### Writing Tests
When adding new features or fixing bugs:
- Add tests for new functionality
- Update existing tests if behavior changes
- Follow the existing test patterns in the codebase
- Ensure tests are meaningful and cover edge cases

## Building the Project

Before submitting a pull request, ensure the project builds successfully:

```bash
npm run build
```

This creates an optimized production build in the `build` folder. The build must complete without errors.

## Before Submitting a Pull Request

Before submitting your pull request, make sure you have:

- [ ] **Run all tests** and verified they pass
  ```bash
  npm test -- --watchAll=false
  ```

- [ ] **Built the project** successfully
  ```bash
  npm run build
  ```

- [ ] **Updated documentation** if your changes affect:
  - How the project is used
  - Installation or setup instructions
  - Available commands or scripts
  - API or component interfaces

- [ ] **Reviewed your changes** to ensure:
  - Code follows existing patterns and style
  - No unnecessary files are included
  - Comments are clear and helpful
  - No console.log statements or debug code remains

- [ ] **Tested your changes** manually in the browser to ensure:
  - UI works as expected
  - No console errors appear
  - Responsive design is maintained
  - Accessibility is not compromised

## Keeping Documentation Up to Date

### README Updates

The [README.md](README.md) file is the first thing users see when they visit this repository. It must be kept up to date with:

- **Project description**: Ensure it accurately describes the project's purpose
- **Getting started instructions**: Verify installation steps work correctly
- **Available scripts**: Update if new npm scripts are added
- **Deployment information**: Keep deployment instructions current
- **Links**: Ensure all links are valid and point to the correct resources

### When to Update the README

Update the README when you:
- Add or modify npm scripts
- Change installation requirements
- Add new features that users should know about
- Update deployment processes
- Change project structure significantly
- Add or remove major dependencies

### Documentation Review Checklist

Before finalizing your pull request, review:
- [ ] Does the README accurately reflect the current state of the project?
- [ ] Are all commands in the documentation tested and working?
- [ ] Are there any new features or changes that should be documented?
- [ ] Are all links in the documentation still valid?

## Questions or Issues?

If you have questions or run into issues while contributing:
- Check existing issues in the repository
- Review the README for basic setup information
- Create a new issue describing your question or problem

Thank you for contributing to brittanyellichprojects! 🎉
