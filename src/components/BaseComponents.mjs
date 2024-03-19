export class BaseComponent {
	constructor(pwPage, container) {
		this.page = pwPage;
		this.container = this.page.locator(container);
	}
}