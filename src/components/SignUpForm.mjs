import {BaseComponent} from './BaseComponents.mjs';
import {UserPage} from '../pages/UserPage.mjs'

export class SignUpForm extends BaseComponent {
	constructor(pwPage) {
		super(pwPage, 'app-signup-modal');
		this.fnameInput = this.page.locator("#signupName")
        this.lnameInput = this.page.locator("#signupLastName")
        this.emailInput = this.page.locator("#signupEmail")
        this.passwdInput = this.page.locator("#signupPassword")
        this.rePasswdInput = this.page.locator("#signupRepeatPassword")
        this.registerBtn = this.page.getByRole('button', {name:/Register/})
	}

}