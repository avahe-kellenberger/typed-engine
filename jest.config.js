module.exports = {

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'tsx'],

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/test'],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: ['.*\\.spec\\..*'],

  // A map from regular expressions to paths to transformers
  transform: {
    '\\.(ts|tsx)$': 'ts-jest'
  },

  testEnvironment: 'jsdom',

  setupFiles: ['<rootDir>/test/setup.ts']

}
