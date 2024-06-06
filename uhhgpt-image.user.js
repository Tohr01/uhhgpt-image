// ==UserScript==
// @name         UHH GPT Image Upload
// @namespace    https://github.com/Tohr01
// @version      2024-04-12
// @description  Allows to upload Images to UHH GPT
// @author       Tohr01
// @match        https://uhhgpt.uni-hamburg.de/interface.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uni-hamburg.de
// @run-at       document-start
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==


// Custom css styles for img icon
GM_addStyle (`
    .imgIconSelection {
        filter: brightness(0%) invert(25%) sepia(72%) saturate(2393%) hue-rotate(186deg) brightness(98%) contrast(98%);
    }
    .imgIconSelection:hover {
        filter: brightness(0%) invert(33%) sepia(75%) saturate(3014%) hue-rotate(344deg) brightness(101%) contrast(81%);
    }

    .imgIconNoSelection {
        filter: invert(28%) sepia(0%) saturate(0%) hue-rotate(168deg) brightness(93%) contrast(82%);
    }
    .imgIconNoSelection:hover {
        filter: brightness(0%) invert(16%) sepia(0%) saturate(320%) hue-rotate(161deg) brightness(105%) contrast(79%);
    }
` );

// Image icon
const IMG_SVG_UNSELECTED = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25" height="25" viewBox="0 0 230.9 233.3" style="enable-background:new 0 0 230.9 233.3;" xml:space="preserve"><style type="text/css"> .st0{fill:none;stroke:#0871B9;stroke-width:15;stroke-miterlimit:10;} .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#0971B9;} .st2{fill:none;stroke:#0871B9;stroke-width:20;stroke-miterlimit:10;} .st3{fill-rule:evenodd;clip-rule:evenodd;fill:#0871B9;}</style><g><path class="st0" d="M191.8,106.6c-3.7-3.2-9.3-2.8-12.5,0.9l-45.4,51.9c-3,3.4-8,4-11.7,1.5l-27.8-19.1c-3.4-2.3-7.9-2-10.9,0.7	l-49.6,44.3c-1,0.9-1.1,2.5-0.3,3.5c14.8,18.4,40.7,25,82.8,25c73.5,0,97.4-20,99.8-88L191.8,106.6z"/>	<path class="st1" d="M191.8,106.6c-3.7-3.2-9.3-2.8-12.5,0.9l-45.4,51.9c-3,3.4-8,4-11.7,1.5l-27.8-19.1c-3.4-2.3-7.9-2-10.9,0.7 l-49.6,44.3c-1,0.9-1.1,2.5-0.3,3.5c14.8,18.4,40.7,25,82.8,25c73.5,0,97.4-20,99.8-88L191.8,106.6z"/></g><g><g> <path class="st2" d="M16.4,115.4c0,77.6,22.4,100,100,100"/></g>	<g><path class="st2" d="M216.4,115.4c0,77.6-22.4,100-100,100"/>	</g><g><path class="st2" d="M16.4,115.4c0-77.6,22.4-100,100-100"/></g><g><path class="st2" d="M216.4,115.4c0-77.6-22.4-100-100-100"/>	</g></g><circle class="st3" cx="74.3" cy="70.5" r="15.9"/></svg>`
const IMG_SVG_SELECTED = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25" height="25" viewBox="0 0 230.9 233.3" style="enable-background:new 0 0 230.9 233.3;" xml:space="preserve"> <style type="text/css"> .st0{fill:none;stroke:#0871B9;stroke-width:20;stroke-miterlimit:10;} .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#0871B9;stroke:#0371BB;stroke-width:20;stroke-linecap:round;stroke-miterlimit:10;} </style><g><g><path class="st0" d="M16.4,115.4c0,77.6,22.4,100,100,100"/></g><g><path class="st0" d="M216.4,115.4c0,77.6-22.4,100-100,100"/></g><g><path class="st0" d="M16.4,115.4c0-77.6,22.4-100,100-100"/></g><g><path class="st0" d="M216.4,115.4c0-77.6-22.4-100-100-100"/></g></g> <g> 	<line class="st1" x1="73.5" y1="73.8" x2="159.3" y2="159.5"/> <line class="st1" x1="159.3" y1="73.8" x2="73.5" y2="159.5"/> </g> </svg>`

unsafeWindow.showImgIcon = () => {
   const imgIcon = document.getElementById("uploadImg");
   imgIcon.style.visibility = "visible";
}
unsafeWindow.hideImgIcon = () => {
   const imgIcon = document.getElementById("uploadImg");
   imgIcon.style.visibility = "hidden";
}
unsafeWindow.setImgIconUnselected = () => {
   const imgIcon = document.getElementById("uploadImg");
   imgIcon.classList.remove("imgIconSelection");
   imgIcon.classList.add("imgIconNoSelection");
   imgIcon.innerHTML = IMG_SVG_UNSELECTED;
}
unsafeWindow.setImgIconSelected= () => {
   const imgIcon = document.getElementById("uploadImg");
   imgIcon.classList.add("imgIconSelection");
   imgIcon.classList.remove("imgIconNoSelection");
   imgIcon.innerHTML = IMG_SVG_SELECTED;
}

/*
onbeforescriptexecute polyfill code by jspenguin2017
Library code, licensed under MIT
https://github.com/jspenguin2017/Snippets/blob/master/onbeforescriptexecute.html
*/
(() => {
   "use strict";

   const Event = class {
      constructor(script, target) {
         this.script = script;
         this.target = target;

         this._cancel = false;
         this._replace = null;
         this._stop = false;
      }

      preventDefault() {
         this._cancel = true;
      }
      stopPropagation() {
         this._stop = true;
      }
      replacePayload(payload) {
         this._replace = payload;
      }
   };

   let callbacks = [];
   window.addBeforeScriptExecuteListener = (f) => {
      if (typeof f !== "function") {
         throw new Error("Event handler must be a function.");
      }
      callbacks.push(f);
   };
   window.removeBeforeScriptExecuteListener = (f) => {
      let i = callbacks.length;
      while (i--) {
         if (callbacks[i] === f) {
            callbacks.splice(i, 1);
         }
      }
   };

   const dispatch = (script, target) => {
      if (script.tagName !== "SCRIPT") {
         return;
      }

      const e = new Event(script, target);

      if (typeof window.onbeforescriptexecute === "function") {
         try {
            window.onbeforescriptexecute(e);
         } catch (err) {
            console.error(err);
         }
      }

      for (const func of callbacks) {
         if (e._stop) {
            break;
         }
         try {
            func(e);
         } catch (err) {
            console.error(err);
         }
      }

      if (e._cancel) {
         script.textContent = "";
         script.remove();
      } else if (typeof e._replace === "string") {
         script.textContent = e._replace;
      }
   };
   const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
         for (const n of m.addedNodes) {
            dispatch(n, m.target);
         }
      }
   });
   observer.observe(document, {
      childList: true,
      subtree: true,
   });
})();


// Modify script tag in body of interface.php
const SCRIPT_RGX = /messageElements\.forEach\(.*?}\)/gs;
const message_loop_replace_str =
    `messageElements.forEach((messageElement, idx, array) => {
			let messageObject = {};
			messageObject.role = messageElement.dataset.role;
			if (window.current_img !== undefined && idx == messageElements.length-1) {
				let txt_object = {};
				txt_object.type = 'text';
				txt_object.text = messageElement.querySelector(".message-text").textContent;
				let img_object = {};

				img_object.type = "image_url";
				img_object.image_url = {
					"url": window.current_img
				};
                window.current_img = undefined;
                window.setImgIconUnselected();
				messageObject.content = [txt_object, img_object];
			} else {
				messageObject.content = messageElement.querySelector(".message-text").textContent;
			}
			requestObject.messages.push(messageObject);
		});`
let m = false;
// If browser not Firefox use polyfill from above
// https://stackoverflow.com/a/9851769
if (typeof InstallTrigger === 'undefined') {
   window.onbeforescriptexecute = (e) => {
      const content = e.script.textContent;
      if (!content) {
         return;
      }

      // Change script payload
      if (e.script.textContent.match(SCRIPT_RGX) && !m) {
         e.replacePayload(content.replace(SCRIPT_RGX, message_loop_replace_str));
         m = true;
      }
   };
} else {
   document.addEventListener('beforescriptexecute', (e) => {
      const src = e.target.src;
      const content = e.target.text;
      if (src === '' && !m && content.match(SCRIPT_RGX)) {
         e.preventDefault();
         e.stopPropagation();
         e.target.remove();

         var script = document.createElement('script');
         script.innerHTML = content.replace(SCRIPT_RGX, message_loop_replace_str);
         m = true;
         document.body.appendChild(script);
      }
   });
}
unsafeWindow.modelSelectionChanged = (model) => {
   if (model === "gpt4") {
      showImgIcon()
      localStorage.setItem('model', 'gpt-4o');
   } else {
      unsafeWindow.currentImg = undefined;
      hideImgIcon();
      localStorage.setItem('model', 'gpt-3.5-turbo');
   }
}

unsafeWindow.current_img = undefined;

document.addEventListener('DOMContentLoaded', () => {
   // Set GPT 4 Omni as default and override onchange attribute
   const radiogroup = document.getElementsByClassName("radiogroup")[0];
   const gpt3Input = radiogroup.children[0].children[0];
   const gpt4Input = radiogroup.children[1].children[0]
   gpt3Input.setAttribute("onchange", "modelSelectionChanged('gpt3')");
   gpt4Input.click();
   gpt4Input.setAttribute("onchange", "modelSelectionChanged('gpt4')");

   // Change input field style
   const input_field = document.getElementsByClassName("input");
   input_field[0].style = 'grid-template-columns: 1fr 2rem 3rem';

   // Adding image icon left to submit button
   const imgIconUnselcted = `<div class="input-send imgIconNoSelection" id="uploadImg">
   ${IMG_SVG_UNSELECTED}
   </div>`;
   const sendBtn = document.getElementsByClassName('input-send')[0];
   sendBtn.insertAdjacentHTML('beforebegin', imgIconUnselcted);
   const imgIconElem = document.getElementById('uploadImg');

   // Resize send button svg
   const btn_svg = document.querySelectorAll(".input-send")[1];
   const svg = btn_svg.getElementsByTagName('svg')[0];
   svg.setAttribute('width', 25);
   svg.setAttribute('height', 25);
   
   // Add onclick listener to handle file picking or discarding of file
   imgIconElem.addEventListener('click', () => {
      // Check if an image is currently selected
      if (unsafeWindow.current_img !== undefined) {
         unsafeWindow.current_img = undefined;
         setImgIconUnselected();
         return;
      }
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = ".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
      input.click();
      input.onchange = e => {
         const file = e.target.files[0];

         const reader = new FileReader();
         reader.readAsDataURL(file);

         reader.onload = () => {
            unsafeWindow.current_img = reader.result;
            setImgIconSelected();
         };
         reader.onerror = (error) => {
            console.log('Error retrieving image: ', error);
         };
      }
   });
});
