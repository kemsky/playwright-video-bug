/* tslint:disable */
/// <reference types="playwright-core" />
/// <reference types="playwright" />

import 'playwright-core';
import 'playwright';
import {Browser, BrowserContext, Page} from 'playwright-core';

declare interface IConfiguration {
    readonly url: string;
    readonly username: string;
    readonly password: string;
    readonly downloadDir: string;
    readonly fixturesDir: string;
}

declare global {
    const Configuration: IConfiguration;
    const page: Page;
    const browser: Browser;
    const browserName: string;
    const context: BrowserContext;
}

declare type AutomationSelector = string;
