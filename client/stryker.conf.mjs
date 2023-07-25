// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'perTest',
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json',
  typescriptChecker: {
    prioritizePerformanceOverAccuracy: true,
  },
  cleanTempDir: true,
  commandRunner: {
    command: 'npm test:unit',
  },
  tempDirName: 'strykerTmp',
  concurrency: 6,
  timeoutMS: 60 * 1000,
};
export default config;
