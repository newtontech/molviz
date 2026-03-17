# Contributing to MolViz

Thank you for your interest in contributing to MolViz! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/molviz.git
   cd molviz
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Running the Application

```bash
# Start development server
npm run start

# Build for production
npm run make
```

### Project Structure

```
molviz/
├── src/              # Source code (to be implemented)
├── public/           # Static assets
├── tests/            # Test files
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/newtontech/molviz/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its use case
3. Discuss with maintainers before implementation

### Submitting Code Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Write tests for new functionality
4. Ensure all tests pass:
   ```bash
   npm test
   ```
5. Commit with clear messages:
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. Push and create a Pull Request

## Pull Request Process

1. Ensure your PR addresses a specific issue
2. Update documentation if needed
3. Add tests for new features
4. Request review from maintainers
5. Make requested changes

### Commit Message Format

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Adding tests
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## Coding Standards

### JavaScript/TypeScript

- Use ESLint for linting
- Follow Prettier formatting
- Write clear, self-documenting code
- Add JSDoc comments for public APIs

### Testing

- Write unit tests for core functionality
- Aim for high test coverage
- Use descriptive test names

## Questions?

Feel free to open an issue for any questions or discussions.

---

Thank you for contributing to MolViz! 🧪