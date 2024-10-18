module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.ts?$": "ts-jest", // Use ts-jest to transform .ts files
  },
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1", // Optional, if you use path alias
  },
  testMatch: ["**/__tests__/**/*.test.ts"], // Look for .test.ts files
  verbose: true,
};
