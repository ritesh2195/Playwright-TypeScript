import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginAlert } from "./ObjectInterface";

export class LoginPage extends BasePage{

  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly continueButton: Locator;
  private readonly signInButton: Locator;
  private readonly alertIcon: Locator;
  private readonly alertHeaderText: Locator;
  private readonly alertMessage: Locator;

  constructor(page: Page) {

    super(page);

    this.page = page;

    this.emailInput = page.locator("id=ap_email");

    this.passwordInput = page.locator("id=ap_password");

    this.continueButton = page.locator("id=continue").nth(1);

    this.signInButton = page.locator("id=signInSubmit");

    this.alertIcon = page
      .locator("//i[contains(@class,'a-icon-alert')]")
      .nth(0);

    this.alertHeaderText = page.locator(
      "//h4[contains(text(),'There was a problem')]"
    );

    this.alertMessage = page.locator(
      "//span[contains(text(),'We cannot find an account with that email address')]"
    );
  }

  async enterEmailAndContinue(email: string) {
    await this.emailInput.fill(email);

    await this.continueButton.click();
  }

  async enterPasswordAndSignIn(password: string) {
    await this.passwordInput.fill(password);

    await this.signInButton.click();
  }

  async verifyOnUnSuccessfulLoginAlert(): Promise<LoginAlert> {
    await this.alertIcon.waitFor({ timeout: 2000 });

    const obj:LoginAlert = {
      isAlrtIconDisplayed: await this.alertIcon.isVisible(),
      isAlertHeaderDisplayed: await this.alertHeaderText.isVisible(),
      isAlertMessage: await this.alertMessage.isVisible(),
    };

    return obj;
  }
}
