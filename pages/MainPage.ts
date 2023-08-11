import { BasePage } from "./BasePage";
import { By, until } from "selenium-webdriver";

export class MainPage extends BasePage {
  // splash page
  startLink = By.linkText("HERE");
  // 1st page
  passwordPlaceholder = "Choose Password";
  emailPlaceholder = "Your email";
  domainPlaceholder = "Domain";
  extensionHeaderPlaceholder = "other";
  extensionChoiceText = ".org";
  password = "aB0123456Б";
  email = "asdf";
  domain = "gmail";

  termsTextBox = By.className("login-form__terms-conditions");
  closeModalButton = By.className("modal__close-copyright");
  passwordInput = By.css(`[placeholder='${this.passwordPlaceholder}']`);
  emailInput = By.css(`[placeholder='${this.emailPlaceholder}']`);
  domainInput = By.css(`[placeholder='${this.domainPlaceholder}']`);
  extensionHeader = By.className("dropdown__header");
  extensionDropdown = By.className("dropdown__list");
  extensionChoice = By.css(".dropdown__list-item:nth-child(2)");
  termsAndConditionsRadio = By.className("icon-check");
  nextLink = By.linkText("Next");

  // 2nd page
  pageIndicatorText = "2 / 4";

  pageIndicator = By.className("page-indicator");

  constructor() {
    super({ url: "https://userinyerface.com/" });
  }
  async startGame() {
    await this.click(this.startLink);
  }
  // wait for new page to load
  async waitForPageToLoad() {
    await this.driver.wait(until.urlIs("https://userinyerface.com/game.html"));
  }
  async getTermsText() {
    return this.getText(this.termsTextBox);
  }
  async detectTimer() {
    /* I want to set up a listener or observer or something that 
    will watch for the timer modal to open. When the modal opens, I
    would like the function to close the modal. If the timer does not
    pop up before all tests are completed, then I need to end the function
    somehow
    */
    await this.driver.wait(until.elementLocated(this.closeModalButton));
  }
  async getPasswordInput() {
    return this.getAttribute(this.passwordInput, "value");
  }
  async setPassword() {
    // 10 chars, 1 capital, 1 numeral, 1 letter of email, 1 cyrrilic
    return await this.setInput(this.passwordInput, this.password);
  }
  async getEmailInput() {
    return this.getAttribute(this.emailInput, "value");
  }
  async setEmail() {
    return this.setInput(this.emailInput, this.email);
  }
  async getDomainInput() {
    return this.getAttribute(this.domainInput, "value");
  }
  async setDomain() {
    return this.setInput(this.domainInput, this.domain);
  }
  async getExtensionText() {
    return this.getText(this.extensionHeader);
  }
  async selectExtension() {
    await this.click(this.extensionHeader);
    await this.click(this.extensionChoice);
    // await
  }
  async clickTermsRadio() {
    await this.click(this.termsAndConditionsRadio);
  }
  async goToNextPageFromFirst() {
    await this.click(this.nextLink);
  }

  async getPageIndicatorText() {
    return this.getText(this.pageIndicator);
  }
  // closeTimerIfOpened() {
  //   this.click(this.closeModalButton).then(() => {
  //     this.closeTimerIfOpened();
  //   });
}
