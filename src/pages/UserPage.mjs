import { BasePage } from "./BasePage.mjs";
import { Header } from "../components/Header.mjs";

export class UserPage extends BasePage{
    constructor(pwPage, url=null) {
        super(
            pwPage, 
            url,
            `//button[contains(text(),'Add car')]`
            );
        this.settingLink = this.page.getByRole('link', {name:/ Settings/});
        this.removeMyAccountBtn = this.page.getByRole('button', {name:/Remove my account/});
        this.removeBtn =  this.page.getByRole('button', {name:/Remove/})
        
    }

    get validator(){
        return{
            header: this.page.getByRole("heading",{name:"Garage"}),
            logOutLink: this.page.getByText('Log out'),
            profileButton: this.page.getByRole("button",{name:" My profile "})
        }
    }

    

}