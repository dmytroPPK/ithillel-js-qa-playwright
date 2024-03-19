import { BasePage } from "./BasePage.mjs";

export class UserProfilePage extends BasePage{
    constructor(pwPage) {
        super(
            pwPage, 
            "/panel/profile"
            );
        this.userInfoParagraph = this.page.locator('div.panel-page_content p.profile_name');
    }
}