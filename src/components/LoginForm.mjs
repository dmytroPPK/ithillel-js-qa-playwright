import {BaseComponent} from './BaseComponents.mjs';
import { SignUpForm } from './SignUpForm.mjs';
import { GaragePage } from '../pages/GaragePage.mjs';

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
	async loginWithCredentials(email, password){
		await this.fill(email,password)
		await this.loginBtn.click()
		return new GaragePage(this.page)
	}

	async fill(email, password){
		await this.emailInput.fill(email)
		await this.passwdInput.fill(password)
	}


}