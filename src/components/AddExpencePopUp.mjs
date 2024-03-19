import { BaseComponent } from "./BaseComponents.mjs";

export class AddExpencePopUp extends BaseComponent{

    constructor(page) {
		super(page, 'app-add-expense-modal');
        this.mileageInput = this.container.locator('#addExpenseMileage');
        this.litersInput = this.container.locator('#addExpenseLiters');
        this.costInput = this.container.locator('#addExpenseTotalCost');

        this.addExpenceBtn = this.container.getByRole('button', { name: 'Add' });
	}

    async fillExpence(mileage, liters, cost){
        await this.mileageInput.fill(mileage.toString());
        await this.litersInput.fill(liters.toString());
        await this.costInput.fill(cost.toString());
    }

    async addExpence(mileage, liters, cost){
        await this.fillExpence(mileage, liters, cost);
        await this.addExpenceBtn.click();
    }


}