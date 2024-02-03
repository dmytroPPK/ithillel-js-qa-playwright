import {BaseComponent} from './BaseComponents.mjs';
import { SignUpForm } from './SignUpForm.mjs';

export class LoginForm extends BaseComponent {
	constructor(pwPage) {
		super(pwPage, 'app-signin-modal');
		this.emailInput = this.container.locator('id=signinEmail');
		this.passwdInput = this.container.locator('id=signinPassword');
		this.loginBtn = this.container.getByRole('button',{name:'Login'})
		this.signUpLink = this.container.getByRole("button", {name:"Registration"})
	}

	async openSignUpForm() {
		await this.signUpLink.click();
		return new SignUpForm(this.page);
	}


}