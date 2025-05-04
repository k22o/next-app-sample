import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  testEnvironment: 'node',
  preset: 'ts-jest', // これがないとテスト時に型変換まわりでエラーが出る
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  errorOnDeprecated: true,
  testMatch: [
    "**/__tests__/**/*.test.(ts|tsx|js|jsx)"
  ],
};

export default config;
