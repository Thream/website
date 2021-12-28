const nextJest = require('next/jest')

const createJestConfig = nextJest()
const customJestConfig = {
  moduleDirectories: ['node_modules', './'],
  modulePathIgnorePatterns: ['<rootDir>/cypress'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/react'
  ]
}

module.exports = createJestConfig(customJestConfig)
