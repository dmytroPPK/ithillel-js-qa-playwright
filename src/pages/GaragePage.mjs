import { BasePage } from "./BasePage.mjs";
import { Header } from "../components/Header.mjs";
import {FuelExpencesPage} from './FuelExpences.mjs';
import {UserProfilePage} from './UserProfilePage.mjs';
import { AddCarPopup } from '../components/AddCarPopUp.mjs';
import { CarList } from '../components/CarList.mjs';

export class GaragePage extends BasePage{
    constructor(pwPage) {
        super(
            pwPage, 
            "/panel/garage",
            `//button[contains(text(),'Add car')]`
            );
        this.settingLink = this.page.getByRole('link', {name:/ Settings/});
        this.removeMyAccountBtn = this.page.getByRole('button', {name:/Remove my account/});
        this.removeBtn =  this.page.getByRole('button', {name:/Remove/});

        this.addCarBtn = this.page.getByRole('button', { name: 'Add car' });
		this.addCarPopup = new AddCarPopup(this.page);

        this.carList = new CarList(this.page);
        
    }

    get validator(){
        return{
            header: this.page.getByRole("heading",{name:"Garage"}),
            logOutLink: this.page.getByText('Log out'),
            profileButton: this.page.getByRole("button",{name:" My profile "})
        }
    }

    getFuelPage(){
        return new FuelExpencesPage(this.page)
    }

    getUserProfilePage(){
        return new UserProfilePage(this.page);
    }

    async openAddCarPopup() {
		await this.addCarBtn.click();
		return this.addCarPopup;
	}

    

}