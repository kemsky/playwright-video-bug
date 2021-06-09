describe('[Playwright] logout: ', () => {
    it('should logout 1', async () => {
        await page.goto("http://google.com", {timeout: 120000});
        await expect(page).toHaveSelector('img');
    });

    it('should logout 2', async () => {
        await page.goto("http://google.com", {timeout: 120000});
        await expect(page).toHaveSelector('img');
    });
});


describe('[Playwright] logout2: ', () => {
    it('should logout 12', async () => {
        await page.goto("http://google.com", {timeout: 120000});
        await expect(page).toHaveSelector('img');
    });

    it('should logout 22', async () => {
        await page.goto("http://google.com", {timeout: 120000});
        await expect(page).toHaveSelector('img');
    });
});
