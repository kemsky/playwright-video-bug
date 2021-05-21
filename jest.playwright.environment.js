const PlaywrightEnvironment = require('jest-playwright-preset/lib/PlaywrightEnvironment').default;
const fs = require('fs');

class JestPlaywrightEnvironment extends PlaywrightEnvironment {
    constructor(config) {
        super(config);
        config.testEnvironmentOptions['jest-playwright'].selectors = [{name: 'auto', script: this.selectorEngine}];
    }

    async setup() {
        await super.setup();
    }

    async teardown() {
        await super.teardown();
        const video = this.global.page.video();
        if (video != null) {
            const videoFileName = await this.global.page.video().path();
            fs.renameSync(
                videoFileName,
                `playwright\\videos\\test.webm`
            );
        }
    }

    async handleTestEvent(event) {
        if (event.name === 'test_done') {
            const parentName = event.test.parent.name.replace(/\W/g, '_').toLowerCase().replace('_playwright__', '');
            const specName = event.test.name.replace(/\W/g, '_').toLowerCase().replace('_playwright__', '');
            await this.global.page.screenshot({
                path: __dirname + `/playwright/screenshots/${parentName}_${specName}.png`,
                timeout: 60000
            });
        }
    }

    selectorEngine = () => {
        return {
            nameRegex: /^([^|]+)/,
            detailRegex: /^(?:[^|]*|\?)\|([^|]+)/,
            cssRegex: /^(?:[^|]*)\|(?:[^|]*|\?)\|([^|]+)/,
            splitRegex: /\s+/,
            transformer(selector) {
                const automation = [selector];
                const path = automation.map((selector) => {
                    if (selector === '>' || selector === '*') {
                        return selector;
                    }
                    let result = '';

                    const name = this.nameRegex.exec(selector);
                    if (name != null) {
                        result += `[data-automation-name="${name[1]}"]`;
                    }

                    const detail = this.detailRegex.exec(selector);
                    if (detail != null) {
                        result += `[data-automation-details="${detail[1]}"]`;
                    }

                    const css = this.cssRegex.exec(selector);
                    if (css != null) {
                        result += css[1];
                    }
                    return result;
                });
                return path.join(' ');
            },

            query(root, selector) {
                const auto = this.transformer(selector);
                return root.querySelector(auto);
            },

            queryAll(root, selector) {
                const auto = this.transformer(selector);
                return Array.from(root.querySelectorAll(auto));
            }
        };
    };
}

module.exports = JestPlaywrightEnvironment;
