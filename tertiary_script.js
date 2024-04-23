document.addEventListener("DOMContentLoaded",(function(){var buttons=document.querySelectorAll(".article-topbar-navigation-button, .article-topbar-navigation-close-button");buttons.forEach((function(button){button.addEventListener("mousedown",(function(){button.classList.add("active")})),button.addEventListener("mouseup",(function(){setTimeout((function(){button.classList.remove("active")}),180)})),button.addEventListener("touchstart",(function(){button.classList.add("active")})),button.addEventListener("touchend",(function(){setTimeout((function(){button.classList.remove("active")}),180)}))}))})),(()=>{function _createForOfIteratorHelper(o,allowArrayLike){var it="undefined"!=typeof Symbol&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=function(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function(){};return{s:F,n:function(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function(){it=it.call(o)},n:function(){var step=it.next();return normalCompletion=step.done,step},e:function(_e2){didErr=!0,err=_e2},f:function(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var toggleSearchSlidePanel,searchSlidePanel,searchOverlay;document.addEventListener("DOMContentLoaded",(function(){var e=new MutationObserver((function(e,n){var c=document.querySelector(".aa-Form");if(c){c.appendChild(a);var r=document.querySelector(".close-button");r&&(r.removeEventListener("click",t),r.addEventListener("click",t)),n.disconnect()}}));function t(){toggleSearchSlidePanel(),inputField.blur(),inputField.value=""}e.observe(document.body,{childList:!0,subtree:!0});var a=document.createElement("div");a.setAttribute("class","close-button-container");var n=document.createElement("button");n.setAttribute("class","close-button");var c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("viewBox","0 0 24 24"),c.setAttribute("fill","rgba(255, 255, 255, 0.45)");var r=document.createElementNS("http://www.w3.org/2000/svg","path");r.setAttribute("d","M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"),c.appendChild(r),n.appendChild(c),a.appendChild(n);var l=document.querySelector(".aa-ClearButton");l&&(l.textContent="CLEAR");var i=new MutationObserver((function(e){e.forEach((function(e){"hidden"===e.attributeName&&(a.style.display=l.hasAttribute("hidden")?"block":"none")}))}));l&&i.observe(l,{attributes:!0}),document.addEventListener("click",(function(e){var t=document.querySelector(".aa-Autocomplete"),a=document.querySelector(".aa-Panel"),n=!!t&&t.contains(e.target),c=!!a&&a.contains(e.target),r=e.target.closest(".article-topbar-navigation-button.toggle-theme");n||c||r||!searchSlidePanel.classList.contains("show")||(inputField.value&&l.click(),setTimeout((function(){searchSlidePanel.classList.remove("show"),searchOverlay.classList.remove("show"),inputField.blur()}),500))})),searchSlidePanel=document.getElementById("article-search-panel"),searchOverlay=document.getElementById("article-search-overlay"),clearButton=document.querySelector(".aa-Autocomplete .aa-ClearButton"),inputField=document.querySelector("#autocomplete input"),searchSlidePanel&&searchOverlay&&clearButton&&inputField&&(toggleSearchSlidePanel=function(){requestAnimationFrame((function(){searchSlidePanel.classList.contains("show")?(inputField.value&&clearButton.click(),setTimeout((function(){searchSlidePanel.classList.remove("show"),searchOverlay.classList.remove("show"),inputField.blur()}),500)):(searchSlidePanel.classList.add("show"),searchOverlay.classList.add("show"))}))},searchSlidePanel.addEventListener("transitionend",(function(){searchSlidePanel.classList.contains("show")&&inputField.focus()})),document.getElementById("article-search-button").addEventListener("click",toggleSearchSlidePanel),clearButton.addEventListener("click",(function(){setTimeout((function(){searchSlidePanel.classList.remove("show"),searchOverlay.classList.remove("show"),inputField.blur()}),500)})),document.addEventListener("keydown",(function(e){"Escape"!==e.key&&27!==e.keyCode||!searchSlidePanel.classList.contains("show")||(inputField.value&&clearButton.click(),setTimeout((function(){searchSlidePanel.classList.remove("show"),searchOverlay.classList.remove("show"),inputField.blur()}),500))})))}));var clearButton,inputField=document.querySelector(".aa-Input"),wrapperDiv=document.querySelector(".aa-InputWrapper"),newDiv=document.createElement("div");function updateContent(){for(var caretPosition=inputField.selectionStart,inputValue=inputField.value,contentHtml="",i=0;i<inputValue.length;i++){var _char=inputValue[i];_char=" "===_char?" ":_char,contentHtml+='<span class="'.concat(i===caretPosition-1?"letter caret":"letter",'">').concat(_char,"</span>")}0===caretPosition&&inputValue?contentHtml=contentHtml.replace('<span class="letter">','<span class="letter caret">'):0!==caretPosition||inputValue||(contentHtml='<span class="letter caret"> </span>'),newDiv.innerHTML=contentHtml,newDiv.scrollLeft=newDiv.scrollWidth}newDiv.contentEditable="true",newDiv.className="editableDiv",newDiv.style.position="absolute",newDiv.style.width="100%",newDiv.style.display="flex",newDiv.style.pointerEvents="none",newDiv.style.overflow="hidden",wrapperDiv.appendChild(newDiv),inputField.addEventListener("input",updateContent),inputField.addEventListener("keydown",(function(event){["ArrowLeft","ArrowRight","Home","End"].includes(event.key)&&setTimeout(updateContent,0),"ArrowRight"===event.key&&0===inputField.selectionStart&&(inputField.selectionStart=inputField.selectionEnd=1)})),inputField.addEventListener("click",updateContent),inputField.addEventListener("focus",updateContent),(clearButton=document.querySelector(".aa-ClearButton")).addEventListener("click",(function(){newDiv.innerHTML='<span class="letter caret"> </span>',inputField.value=""})),document.addEventListener("DOMContentLoaded",updateContent),inputField.addEventListener("focus",(function(){inputField.value||(newDiv.innerHTML='<span class="letter caret"> </span>')})),document.addEventListener("DOMContentLoaded",(function(event){var button=document.querySelector(".aa-SubmitButton");if(button){var div=document.createElement("div");div.className=button.className,div.innerHTML=button.innerHTML,button.parentNode.insertBefore(div,button),button.parentNode.removeChild(button)}})),document.addEventListener("wheel",(function(e){var div=document.querySelector(".aa-Panel--scrollable");div&&(div.scrollTop+=e.deltaY)})),document.addEventListener("DOMContentLoaded",(function(){var statusContainer=document.getElementById("article-search-overlay"),intervalId=null,displayOfflineMessage=function(){statusContainer.innerHTML='\n            <div class="autocomplete-record-details connection-issue">\n                <div class="connection-issue-wrapper">        \n                    <p class="autocomplete-item-title connection-issue">Connection Issue Detected</p>\n                    <p class="autocomplete-item-subtitle connection-issue">It appears you\'re currently offline or experiencing connectivity issues. Please check your internet connection. We\'ll automatically reconnect as soon as you\'re back online.</p>\n                    <div class="autocomplete-item-topic-badge connection-issue">\n                    <p class="autocomplete-item-topic connection-issue">Thank you for your patience.</p>\n                    </div>\n                </div>\n            </div>\n        ';var aaPanel=document.querySelector(".aa-Panel");aaPanel&&(aaPanel.style.display="none")},checkInternetConnection=function(){navigator.onLine?fetch("https://uploads-ssl.webflow.com/65a65d78528ae0b98e38a942/661150242e87885e52b68254_noise-var-black.gif",{method:"HEAD",cache:"no-cache"}).then((function(){!function(){statusContainer.innerHTML='\n            <div class="autocomplete-record-details connection-issue">\n                <div class="connection-issue-wrapper">        \n                    <p class="autocomplete-item-title connection-issue">Explore Relevant Articles</p>\n                    <p class="autocomplete-item-subtitle connection-issue">We are committed to growing our article base to meet your needs. While some searches may yield limited results now, your curiosity is shaping our future content. Each query is a building block for our expanding database.</p>\n                    <div class="autocomplete-item-topic-badge connection-issue">\n                    <p class="autocomplete-item-topic connection-issue">Start Typing to Explore</p>\n                    </div>\n                </div>\n            </div>\n        ';var aaPanel=document.querySelector(".aa-Panel");aaPanel&&(aaPanel.style.display="block")}()})).catch((function(){displayOfflineMessage()})):displayOfflineMessage()};new MutationObserver((function(mutationsList){var _step,_iterator=_createForOfIteratorHelper(mutationsList);try{for(_iterator.s();!(_step=_iterator.n()).done;){var mutation=_step.value;if("attributes"===mutation.type&&"class"===mutation.attributeName){var hasShowClass=statusContainer.classList.contains("show");hasShowClass&&!intervalId?(checkInternetConnection(),intervalId=setInterval(checkInternetConnection,5e3)):!hasShowClass&&intervalId&&(clearInterval(intervalId),intervalId=null)}}}catch(err){_iterator.e(err)}finally{_iterator.f()}})).observe(statusContainer,{attributes:!0})}))})();