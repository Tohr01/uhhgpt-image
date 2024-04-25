# UHHGPT Image Upload
Utilize the the capability of GPT4 Turbo Vision on the UHHGPT web portal

## 📙 Demo
<div align="center">
  <img width="100%" src="https://github.com/Tohr01/uhhgpt-image/assets/55887700/9ea74aee-8687-4e76-9c61-8e17f988e9bd" alt="Demo Gif" />
</div>
Image used can be found on <a href="https://pixabay.com/de/illustrations/ai-generiert-architektur-geb%C3%A4ude-8631634">Pixabay</a>

## 🛑 Disclaimer
This is a Proof of Concept (PoC) and not an official product of the University of Hamburg.

## ⭐ Features
- [x] Allows users to upload images to the UHHGPT web portal and interact with GPT-4 for inquiries
  - [ ] Feature not yet available: Saving past image queries for extended discussions. (Current state: One query and one image. If you want to continue the conversation about the image you may upload it again. Should be fixed in the next releases)
- [x] QoL: Auto select GPT-4 Turbo Model on website load
- [x] QoL: Autohide usage hint banner on website load
- [x] Support for multiple browsers running [Tampermonkey](https://www.tampermonkey.net/) (Safari currently not supported)
  - Tested on: Google Chrome, Brave Browser and Firefox. Should work on other Chromium or Gecko based browsers as well
- [ ] Display past uploaded images below user message

## ⚙️ Installation
1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension
2. Open the Tampermonkey Dashboard
3. Add a new script
4. Copy contents of [uhhgpt-image.user.js](uhhgpt-image.user.js) to the newly created script

## 🍩 Acknowledgements / Credits
[onbeforescriptexecute polyfill code](https://github.com/jspenguin2017/Snippets/blob/master/onbeforescriptexecute.html) by jspenguin2017 (MIT License)
