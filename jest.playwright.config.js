let configuration;
let launchOptions;

if (typeof process.env.CYPRESS_baseUrl === 'string') {
    configuration = {
        url: process.env.CYPRESS_baseUrl,
        username: 'System',
        password: 'password',
        downloadDir: './playwright/downloads/',
        fixturesDir: './e2e/fixtures/'
    };
    launchOptions = {
        headless: true,
        args: [
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--disable-translate',
            '--disable-extensions',
            '--disable-background-networking',
            '--safebrowsing-disable-auto-update',
            '--disable-sync',
            '--no-first-run'
        ]
    };
} else {
    configuration = {
        url: 'http://localhost:5001',
        username: 'System',
        password: 'password',
        downloadDir: './playwright/downloads/',
        fixturesDir: './e2e/fixtures/'
    };
    launchOptions = {
        headless: false,
        devtools: false,
        slowMo: 500
    };
}

module.exports = {
    name: 'CreditorGuard',
    preset: 'jest-playwright-preset',
    setupFilesAfterEnv: ['expect-playwright'],
    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest'
    },
    rootDir: './e2e',
    globals: {
        'ts-jest': {
            tsconfig: './e2e/tsconfig.json'
        },
        Configuration: configuration
    },
    testPathIgnorePatterns: ['/node_modules/', 'setup.spec.ts'],
    testResultsProcessor: 'jest-teamcity-reporter',
    testEnvironmentOptions: {
        'jest-playwright': {
            browsers: ['chromium'],
            launchOptions: launchOptions,
            contextOptions: {
                recordVideo: {dir: './playwright/videos/'},
                viewport: {width: 1440, height: 720},
                acceptDownloads: true
            }
        }
    },
    testEnvironment: '<rootDir>/../jest.playwright.environment.js',
    testTimeout: 5 * 60000,
    slowTestThreshold: 120000
};
