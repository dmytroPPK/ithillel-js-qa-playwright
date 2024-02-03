import {BaseComponent} from './BaseComponents.mjs';

export class Header extends BaseComponent {
	constructor(pwPage) {
		super(pwPage, 'header');
		this.signInBtn = this.container.getByRole("button",{name:"Sign In"});
	}
}