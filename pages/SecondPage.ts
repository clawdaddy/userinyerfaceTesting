import { BasePage } from "./BasePage";
import { WebDriver, until, By } from "selenium-webdriver";

export class SecondPage extends BasePage {
  photoPath = "../assets/saitama_ok.webp";

  uploadFileButton = By.linkText("upload");
  async waitForPageToLoad() {
    await this.driver.wait(until.urlIs("https://userinyerface.com/game.html"));
  }
  async uploadPhoto() {
    await this.click(this.uploadFileButton);
    // await element.click();
    // await element.sendKeys(this.photoPath);
  }
}
