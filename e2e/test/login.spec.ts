describe('[Playwright] Login: ', () => {
    it('should login', async () => {
        await page.goto("http://google.com", {timeout: 120000});
        await expect(page).toHaveSelector('img');
    });
});
