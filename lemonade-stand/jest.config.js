module.exports = {
  // Transform ESM modules
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  // Don't ignore node_modules for react-leaflet
  transformIgnorePatterns: [
    "/node_modules/(?!react-leaflet|@react-leaflet|leaflet)/"
  ],
  // Setup files
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.jsx"
  ],
  // Mock files and modules
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
    "^../App$": "<rootDir>/src/__mocks__/App.jsx",
    "^../../App$": "<rootDir>/src/__mocks__/App.jsx",
    "^./App$": "<rootDir>/src/__mocks__/App.jsx",
    "^react-leaflet$": "<rootDir>/node_modules/react-leaflet/react-leaflet.js",
    "^leaflet$": "<rootDir>/node_modules/leaflet/dist/leaflet.js"
  },
  // Handle import.meta.env
  globals: {
    "import.meta": {
      env: {
        BASE_URL: "/"
      }
    }
  },
  // Test environment
  testEnvironment: "jsdom",
  // Mock paths
  moduleDirectories: ["node_modules", "src"],
  // Mock modules
  automock: false,
  unmockedModulePathPatterns: [
    "react",
    "react-dom"
  ]
};