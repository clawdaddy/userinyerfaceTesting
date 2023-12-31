import {
  WebDriver,
  Builder,
  Capabilities,
  By,
  until,
  WebElement,
} from "selenium-webdriver";

interface IOptions {
  driver?: WebDriver;
  url?: string;
}

export class BasePage {
  driver: WebDriver;
  url: string;
  constructor({ driver, url }: IOptions) {
    this.driver =
      driver || new Builder().withCapabilities(Capabilities.chrome()).build();
    this.url = url || "";
  }
  async navigate(url?: string) {
    if (url) return await this.driver.get(url);
    else if (this.url) return await this.driver.get(this.url);
    else return Promise.reject("Need a valid url for BasePage.navigate()");
  }
  async getElement(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    const element = await this.driver.findElement(elementBy);
    await this.driver.wait(until.elementIsVisible(element));
    return element;
  }
  async getElements(elementBy: By) {
    await this.driver.wait(until.elementsLocated(elementBy));
    const elements = await this.driver.findElements(elementBy);
    await this.driver.wait(until.elementIsVisible(elements[0]));
    return elements;
  }
  async click(elementBy: By) {
    return (await this.getElement(elementBy)).click();
  }
  async getText(elementBy: By) {
    return (await this.getElement(elementBy)).getText();
  }
  async getAttribute(elementBy: By, attribute: string) {
    return (await this.getElement(elementBy)).getAttribute(attribute);
  }
  async setInput(elementBy: By, keys: any) {
    const input = await this.getElement(elementBy);
    return this.setWebElementInput(input, keys);
  }
  async setWebElementInput(element: WebElement, keys: any) {
    await element.clear();
    return element.sendKeys(keys);
  }
}
