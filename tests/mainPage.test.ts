import { MainPage } from "../pages/MainPage";
import { SecondPage } from "../pages/SecondPage";
import { Key, By } from "selenium-webdriver";

const page = new MainPage();
// const secondPage = new SecondPage({});

describe("tests for navigating userinyerface", () => {
  beforeAll(async () => {
    await page.navigate();
  }, 15000);
  beforeEach(async () => {
    page.closeChat();
  });

  afterAll(async () => {
    await page.driver.quit();
  });

  test("it can direct users to the game", async () => {
    await page.startGame();
    // page.closeTimerIfOpened();
  }, 10000);

  test("it loads the game", async () => {
    await page.waitForPageToLoad();
    await page.closeCookies();
    const termsText = await page.getTermsText();
    expect(termsText).toBe("I do not accept the Terms & Conditions");
  });

  test("it can have a password entered", async () => {
    const placeholderText = await page.getPasswordInput();
    expect(placeholderText).toBe(page.passwordPlaceholder);

    await page.setPassword();
    const newText = await page.getPasswordInput();
    expect(newText).toBe(page.password);
  });

  test("it can have an email entered", async () => {
    const placeholderText = await page.getEmailInput();
    expect(placeholderText).toBe(page.emailPlaceholder);

    await page.setEmail();
    const newText = await page.getEmailInput();
    expect(newText).toBe(page.email);
  });

  test("it can have a domain entered", async () => {
    const placeholderText = await page.getDomainInput();
    expect(placeholderText).toBe(page.domainPlaceholder);

    await page.setDomain();
    const newText = await page.getDomainInput();
    expect(newText).toBe(page.domain);
  });

  test("it can select the email extension", async () => {
    const placeholderText = await page.getExtensionText();
    expect(placeholderText).toBe(page.extensionHeaderPlaceholder);

    await page.selectExtension();
    const newText = await page.getExtensionText();
    expect(newText).toBe(page.extensionChoiceText);
  });

  test("it can click the terms and conditions radio and go to next page", async () => {
    await page.clickTermsRadio();
    await page.goToNextPageFromFirst();
    const indicatorText = await page.getPageIndicatorText();
    expect(indicatorText).toBe(page.page2IndicatorText);
  });

  test("it can upload an image", async () => {
    const image = await page.uploadPhoto();
    expect(image).toBeTruthy();
  }, 15000);
  test("it can deselect all but 3 interests", async () => {
    const deselected = await page.deselectInterests();
    expect(deselected.length).toBe(21);
  });
  test("it can navigate to page 3", async () => {
    await page.goToNextPage();
    const pageIndicatorText = await page.getPageIndicatorText();
    expect(pageIndicatorText).toBe(page.page3IndicatorText);
  });
  test("it has text fields that can be filled out", async () => {
    await page.fillOutPersonalInfoTextInputs();
    const [firstNameEl, zipEl, cityEl, surnameEl, streetEl] =
      await page.getElements(page.personalInfoTextInputs);
    const [firstName, zip, city, surname, street] = await Promise.all([
      firstNameEl.getAttribute("value"),
      zipEl.getAttribute("value"),
      cityEl.getAttribute("value"),
      surnameEl.getAttribute("value"),
      streetEl.getAttribute("value"),
    ]);
    expect(firstName).toBe(page.firstName);
    expect(zip).toBe(page.zip);
    expect(city).toBe(page.city);
    expect(surname).toBe(page.surname);
    expect(street).toBe(page.street);
  });
  test("it has a title field that can be filled out", async () => {
    await page.fillOutTitleDropdown();
    const titleHeaderText = await page.getText(page.titleHeader);
    expect(titleHeaderText).toBe(page.title);
  });
  test("it has a country field that can be filled out", async () => {
    await page.fillOutCountryDropdown();
    const country = await page.getText(page.countryHeader);
    expect(country).toBe(page.countryString);
  });
  test("it has a birthdate day, month, and year that can be filled out", async () => {
    await page.fillOutDayDropdown();
    await page.fillOutMonthDropdown();
    await page.fillOutYearDropdown();
    const dayText = await page.getText(page.dayDropdownListField);
    const monthText = await page.getText(page.monthDropdownListField);
    const yearText = await page.getText(page.yearDropdownListField);
    expect(dayText).toBe("1");
    expect(monthText).toBe("January");
    expect(yearText).toBe(new Date().getFullYear() + "");
  });
  test("it has a toggle for gender that is clickable", async () => {
    await page.clickToggle();
    const selectedGender = await page.getSelectedToggleText();
    expect(selectedGender).toBe("Female");
  }, 10000);
  test("it has a button that will take you to page 4", async () => {
    try {
      await page.driver
        .actions({ async: true })
        .keyDown(Key.ARROW_DOWN)
        .keyUp(Key.ARROW_DOWN)
        .perform();
      await page.goToNextPage();
      const pageIndicatorText = await page.getPageIndicatorText();
      expect(pageIndicatorText).toBe(page.page4IndicatorText);
    } catch (err) {
      await page.driver
        .actions({ async: true })
        .keyDown(Key.ARROW_DOWN)
        .keyUp(Key.ARROW_DOWN)
        .perform();
      await page.goToNextPage();
      const pageIndicatorText = await page.getPageIndicatorText();
      expect(pageIndicatorText).toBe(page.page4IndicatorText);
    }
  });
  test("it has a captcha that it totally doable", async () => {
    try {
      await page.selectCheckboxes();
    } catch (err) {
      await page.driver
        .actions()
        .keyDown(Key.ARROW_DOWN)
        .keyUp(Key.ARROW_DOWN)
        .perform();
      await page.clickValidate();
      await page.selectCheckboxes();
    }
  }, 10000);
  test("it has a final page to congratulate those who finish the game", async () => {
    await page.clickValidate();
    const endTitle = await page.getEndTitle();
    expect(endTitle).toBe(page.endTitleText);
  });
});
