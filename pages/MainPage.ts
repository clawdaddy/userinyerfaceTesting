import { BasePage } from "./BasePage";
import { By, until, FileDetector, WebElement, Key } from "selenium-webdriver";

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

  cookiesButton = By.css(".cookies button");
  termsTextBox = By.className("login-form__terms-conditions");
  closeModalButton = By.className("modal__close-copyright");
  sendToBottomButton = By.className("help-form__send-to-bottom-button");
  helpForm = By.className("help-form");

  passwordInput = By.css(`[placeholder='${this.passwordPlaceholder}']`);
  emailInput = By.css(`[placeholder='${this.emailPlaceholder}']`);
  domainInput = By.css(`[placeholder='${this.domainPlaceholder}']`);

  extensionHeader = By.className("dropdown__header");
  extensionDropdown = By.className("dropdown__list");
  extensionChoice = By.css(".dropdown__list-item:nth-child(2)");
  termsAndConditionsRadio = By.className("icon-check");
  nextLink = By.linkText("Next");

  // 2nd page
  page2IndicatorText = "2 / 4";
  photoPath = process.cwd() + "/assets/saitama_ok.webp";
  nextText = "Next";

  uploadFileButton = By.linkText("upload");
  pageIndicator = By.className("page-indicator");
  avatarImg = By.className("avatar-and-interests__avatar-image");
  checkBoxes = By.className("checkbox__box");
  nextButton = By.name("button");
  validateButton = By.css(".captcha-gallery__button-container button");

  // 3rd page
  page3IndicatorText = "3 / 4";
  firstName = "Charles";
  zip = "97306";
  city = "Constantinople";
  surname = "Darwin";
  street = "Broadway";
  title = "Mr";
  country = "United States";
  birthDay = 1;
  birthMonth = "April";
  birthYear = 1900;

  personalInfoTextInputs = By.css('input[type="text"]');
  // personalInfoDropdownOpeners = By.className("dropdown__opener");
  titleHeader = By.className("dropdown__header");
  dropdownListItem = By.className("dropdown__list-item"); // first of dropdowns

  countryDropdownContainer = By.className("country-dropdown"); // className country-dropdown
  usFlag = By.className("flag-us");
  countryHeader = By.css(".country-dropdown .dropdown__header");
  countryString = "United States";

  dayDropdownListItem = By.css(
    ".date-dropdown__container.date-dropdown__container--day .dropdown__list-item"
  );
  dayDropdownListField = By.css(
    ".date-dropdown__container.date-dropdown__container--day .dropdown__field"
  );
  monthDropdownListItem = By.css(
    ".date-dropdown__container--month .dropdown__list-item:nth-child(5)"
  );
  monthDropdownListField = By.css(
    ".date-dropdown__container--month .dropdown__field"
  );
  yearDropdownListItem = By.css(
    ".date-dropdown__container.date-dropdown__container--year .dropdown__list-item:last-of-type"
  );
  yearDropdownListField = By.css(
    ".date-dropdown__container--year .dropdown__field"
  );

  ageSlider = By.className("slider__handle");
  toggleButton = By.className("toggle-button");
  selectedToggle = By.css(".selected.toggle-button");
  // page 4
  page4IndicatorText = "4 / 4";
  paginationButton = By.className("pagination__button");

  // end screen
  endTitle = By.className("end-screen__title");
  endTitleText = "YOU ARE AWESOME!";

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
  async closeCookies() {
    await this.click(this.cookiesButton);
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
  async closeModal() {
    await this.click(this.closeModalButton);
  }
  async closeChat() {
    const helpForm = await this.getAttribute(this.helpForm, "class");
    if (!helpForm.includes("hidden")) {
      await this.click(this.sendToBottomButton);
    }
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
  async uploadPhoto() {
    const element = await this.getElement(this.uploadFileButton);
    const fileDetector = new FileDetector();
    const path = await fileDetector.handleFile(this.driver, this.photoPath);
    await element.click();
    await this.driver.sleep(7000);
    const imageElement = await this.getElement(this.avatarImg);
    return imageElement;
  }
  async deselectInterests() {
    const elements = await this.getElements(this.checkBoxes);
    await elements[elements.length - 1].click();
    await elements[0].click();
    await elements[1].click();
    await elements[2].click();
    return elements;
  }
  async goToNextPage() {
    const buttons = await this.getElements(this.nextButton);
    return Promise.all(
      buttons.map(async (element) => {
        const text = await element.getText();
        if (text === this.nextText) {
          return element.click();
        } else return element;
      })
    );
  }
  async fillOutPersonalInfoTextInputs() {
    const [firstNameEl, zipEl, cityEl, surnameEl, streetEl] =
      await this.getElements(this.personalInfoTextInputs);
    await this.setWebElementInput(firstNameEl, this.firstName);
    await this.setWebElementInput(zipEl, this.zip);
    await this.setWebElementInput(cityEl, this.city);
    await this.setWebElementInput(surnameEl, this.surname);
    await this.setWebElementInput(streetEl, this.street);
  }
  async fillOutTitleDropdown() {
    await this.click(this.titleHeader);
    await this.click(this.dropdownListItem);
  }
  async fillOutCountryDropdown() {
    await this.click(this.countryDropdownContainer);
    await this.click(this.usFlag);
  }
  async fillOutDayDropdown() {
    await this.click(this.dayDropdownListField);
    return this.click(this.dayDropdownListItem);
  }
  async fillOutMonthDropdown() {
    await this.click(this.monthDropdownListField);
    return this.click(this.monthDropdownListItem);
  }
  async fillOutYearDropdown() {
    await this.click(this.yearDropdownListField);
    return this.click(this.yearDropdownListItem);
  }
  async clickToggle() {
    try {
      return this.click(this.toggleButton);
    } catch (err) {
      if (err) {
        await this.driver.sleep(5000);
        this.clickToggle();
      }
    }
  }
  async getSelectedToggleText() {
    return this.getText(this.selectedToggle);
  }
  async selectCheckboxes() {
    const elements = await this.getElements(this.checkBoxes);
    const first = await elements[0].click();
    const second = await elements[1].click();
    const third = await elements[2].click();
    const fourth = await elements[3].click();
    const fifth = await elements[4].click();
    const sixth = await elements[5].click();
    const seventh = await elements[6].click();
    const eigth = await elements[7].click();
    const ninth = await elements[8].click();
    const tenth = await elements[9].click();
    const eleventh = await elements[10].click();
    const twelfth = await elements[11].click();
    const thirteenth = await elements[12].click();
    const fourteenth = await elements[13].click();
    const fifteenth = await elements[14].click();

    const retrySixteenth = async (element: WebElement) => {
      try {
        return element.click();
      } catch (err) {
        await this.driver
          .actions()
          .keyDown(Key.ARROW_DOWN)
          .keyUp(Key.ARROW_DOWN)
          .perform();
        return retrySixteenth(element);
      }
    };
    const sixteenth = retrySixteenth(elements[15]);

    return Promise.all([
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eigth,
      ninth,
      tenth,
      eleventh,
      twelfth,
      thirteenth,
      fourteenth,
      fifteenth,
      sixteenth,
    ]);
  }
  async clickValidate() {
    return this.click(this.validateButton);
  }
  async getEndTitle() {
    return this.getText(this.endTitle);
  }
}
