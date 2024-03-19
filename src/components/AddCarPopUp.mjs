import { expect, test } from '@playwright/test'
import { BaseComponent } from './BaseComponents.mjs';

export class AddCarPopup extends BaseComponent {
	constructor(page) {
		super(page, 'app-add-car-modal');
		this._brandSelect = this.container.locator('#addCarBrand');
		this._modelSelect = this.container.locator('#addCarModel');
		this._milageInput = this.container.locator('#addCarMileage');
		this.addCarBtn = this.container.getByRole('button', { name: 'Add' });
		this.cancelBtn = this.container.getByRole('button', { name: 'Cancel' });
		this.errorMsg = this.container.locator('.invalid-feedback');
	}

	async fill(brand, model, milage) {
		return test.step('Fill add car form', async () => {
			await this._brandSelect.selectOption({ label: brand });
			await this._modelSelect.selectOption({ label: model });
			await this._milageInput.fill(milage.toString());
		});
	}

	async addCar(brand, model, milage) {
		await this.fill(brand, model, milage);
		await this.addCarBtn.click();
	}

	async checkError(error) {
		await expect(this.errorMsg).toHaveText(error);
	}
}
