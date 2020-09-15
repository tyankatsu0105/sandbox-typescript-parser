module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.json",
    },
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.ts$",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "js", "node"],
};
