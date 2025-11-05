export default {
  mutate: ['src/**/*.{js,ts,jsx,tsx}'],
  testRunner: 'vitest',
  mutators: {
    javascript: ['javascript-mutator'],
  },
  reporters: ['progress', 'clear-text', 'html'],
  testFramework: 'vitest',
  coverageAnalysis: 'off',
};
