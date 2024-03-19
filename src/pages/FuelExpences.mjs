import { BasePage } from "./BasePage.mjs";
import { Header } from "../components/Header.mjs";
import {AddExpencePopUp} from '../components/AddExpencePopUp.mjs'

export class FuelExpencesPage extends BasePage{
    constructor(pwPage) {
        super(
            pwPage, 
            "/panel/expenses"
            );

        
        this.addExpencePopup = new AddExpencePopUp(this.page);
            
        this.addExpenseBtn = this.page.getByRole('button', { name: 'Add an expense' });
        this.visibleText = this.page.getByRole('heading',{name:/Fuel expenses/});
        this.carImage = this.page.locator('app-fuel-expenses').getByRole('img');
        this.garageLink = this.page.getByRole('link', { name: 'your garage', exact: true })
        this.paragraphText = this.page.locator('p.panel-empty_message');

        this.pumpImage = this.page.locator('app-fuel-expenses').getByRole('img');
        this.paragraphPumpText = this.page.locator('p.panel-empty_message').getByText('You don’t have any fuel');

        this.carListDropDown = this.page.locator('ul.car-select-dropdown_menu');
        this.carDropDownBtn = this.page.locator('#carSelectDropdown');
        
        
    }

    // get validator(){
    //     return{
    //         header: this.page.getByRole("heading",{name:"Garage"}),
    //         logOutLink: this.page.getByText('Log out'),
    //         profileButton: this.page.getByRole("button",{name:" My profile "})
    //     }
    // }

    async getCarMenuList() {
		await this.carDropDownBtn.click();
		return this.carListDropDown;
	}

    async chooseCar(name) {
		await this.carListDropDown.getByText(name).click();
	}
    
    async getCarImageProps(){
       return await this.carImage.boundingBox();
    }

    async getParagraphProps(){
        return await this.paragraphText.boundingBox();
    }

    async getPumpImageProps(){
        return await this.pumpImage.boundingBox();
     }
 
     async getParagraphPumpProps(){
         return await this.paragraphPumpText.boundingBox();
     }

     async openAddExpencePopup() {
		await this.addExpenseBtn.click();
		return this.addExpencePopup;
	}

    get expenceTable(){
        return {
            dateHeader: this.page.getByRole('columnheader', { name: 'Date' }),
            mileageHeader: this.page.getByRole('columnheader', { name: 'Mileage' }),
            litersUsedHeader: this.page.getByRole('columnheader', { name: 'Liters used' }),
            totalCostHeader: this.page.getByRole('columnheader', { name: 'Total cost' }),
        }
    }

}