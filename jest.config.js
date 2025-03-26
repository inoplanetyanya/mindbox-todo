export default {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(scss|css)$": "identity-obj-proxy",
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.svg$": "<rootDir>/__mocks__/svgMock.cjs",
	},
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.app.json",
			},
		],
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	transformIgnorePatterns: ["/node_modules/(?!antd|@ant-design)"],
};
