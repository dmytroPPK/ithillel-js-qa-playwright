export class BasePage {
	constructor(pwPage, url, waitPageSlector = 'html') {
		this.page = pwPage;
		this.url = url;
        this.waitPageLocator = this.page.locator(waitPageSlector);
	}

	async open() {
        if (this.url !== null){
            await this.page.goto(this.url);
        }
        await this.waitPageLocator.waitFor({ state: 'visible'});
	}
}
