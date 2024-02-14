type PNGFileName = `${string}.png`;
 /**
  * Save a screenshot of the element.
  *
  * @param {WebdriverIO.Element} element - The element to take a screenshot of
  * @param {PNGFileName} filename - The name of the file to save the screenshot to
  * @return {Promise<Buffer>} A promise that resolves with the screenshot buffer
  */
 export const customSaveScreenshot = async(element:WebdriverIO.Element,filename: PNGFileName):Promise<Buffer>=> {
  // Function implementation goes here
 return  element.saveScreenshot(filename)
}