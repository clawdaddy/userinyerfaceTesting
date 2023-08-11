import { MainPage } from "../pages/MainPage";

const page = new MainPage();

describe("tests for navigating userinyerface", () => {
  beforeAll(async () => {
    await page.navigate();
  }, 15000);

  afterAll(async () => {
    await page.driver.quit();
  });

  test("it can direct users to the game", async () => {
    await page.startGame();
    // page.closeTimerIfOpened();
  }, 10000);

  test("it loads the game", async () => {
    await page.waitForPageToLoad();
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
    expect(indicatorText).toBe(page.pageIndicatorText);
  });

  test("it can upload an image", async () => {
    
  })

//   test("it can deselect all but 3 interests")
});
