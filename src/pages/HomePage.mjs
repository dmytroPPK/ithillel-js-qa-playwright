import { BasePage } from "./BasePage.mjs";
import { Header } from "../components/Header.mjs";
import {LoginForm} from "../components/LoginForm.mjs"

export class HomePage extends BasePage{
    constructor(pwPage) {
        super(
            pwPage, 
            '/',
            `//footer//*[contains(text(),'2021 Hillel IT')]`
            );
        this.header = new Header(this.page);
    }

    async openLoginForm() {
		await this.header.signInBtn.click();
		return new LoginForm(this.page);
	}

}