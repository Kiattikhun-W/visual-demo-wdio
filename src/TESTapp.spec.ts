import { expect } from "expect-webdriverio";

const BASEFOLDER = "images";

const baselineFolder = (title: string) => {
  return `${BASEFOLDER}/baseline/${title}`;
};

const actualFolder = (title: string) => {
  return `${BASEFOLDER}/screenshot/${title}`;
};

const diffFolder = (title: string) => {
  return `${BASEFOLDER}/diff/${title}`;
};

const FOLDER_OPTIONS = (title: string) => {
  return {
    baselineFolder: baselineFolder(title),
    diffFolder: diffFolder(title),
    actualFolder: actualFolder(title),
  };
};

const SCALE_IMAGES_TO_SAME_SIZE = {
  scaleImagesToSameSize: true,
  ignoreAntialiasing: true,
  ignoreAlpha: true,
};

describe("image comparison", function () {
  beforeEach(async () => {
    await browser.url("https://www.saucedemo.com");
  });
  it.skip("initial baseline images", async () => {
    const username = await $("#user-name");
    await username.setValue("xxxsds");
    await browser.checkElement(username, "elementInitialState", {
      ...FOLDER_OPTIONS(this.fullTitle()),
    });
    await username.setValue("yyyy");
    const result = await browser.checkElement(username, "elementInitialState", {
      ...FOLDER_OPTIONS(this.fullTitle()),
    });

    await expect(result).toEqual(0);
  });

  it("resize", async () => {
    const username = await $("#user-name");
    const loginWrapper = await $(".login_credentials_wrap-inner");
    await browser.checkElement(username, `resize-test`, {
      ...FOLDER_OPTIONS(this.fullTitle()),
      ...SCALE_IMAGES_TO_SAME_SIZE,
    });
    await browser.checkElement(loginWrapper, `resize-test`, {
      ...FOLDER_OPTIONS(this.fullTitle()),
      ...SCALE_IMAGES_TO_SAME_SIZE,
    });
  });
  it("for loop", async () => {
    for (let i = 0; i < 2; i++) {
      const username = await $("#user-name");
      await browser.checkElement(username, `loop-test-${i}`, {
        ...FOLDER_OPTIONS(this.fullTitle()),
        ...SCALE_IMAGES_TO_SAME_SIZE,
      });
      await username.setValue(`user-${i}`);
      await browser.checkElement(username, `loop-test-${i}`, {
        ...FOLDER_OPTIONS(this.fullTitle()),
        ...SCALE_IMAGES_TO_SAME_SIZE,
      });
    }
  });
});
