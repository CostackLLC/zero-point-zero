function createCircles(e,t){let n=document.querySelectorAll(e);n.forEach(e=>{let n=e.clientWidth,l=Math.floor(n/6);e.innerHTML="";for(let r=0;r<l;r++){let o=document.createElement("div");o.classList.add(t),e.appendChild(o)}e.lastChild&&(e.lastChild.style.marginRight="0")})}function capitalizeTitle(e){for(var t=e.split(" "),n=["a","an","the","and","but","or","for","of","in","on","to"],l=["pre","anti","co","sub","re","un","non","de","dis","ex","in","ir","mis","out","over","post","pro","semi","under","up"],r=0;r<t.length;r++)if(0!=r&&r!=t.length-1&&n.includes(t[r])?t[r]=t[r].toLowerCase():t[r]=t[r][0].toUpperCase()+t[r].slice(1),t[r].includes("-")){var o=t[r].split("-");l.includes(o[0])||(o[0]=o[0][0].toUpperCase()+o[0].slice(1)),o[1]=o[1][0].toUpperCase()+o[1].slice(1),t[r]=o.join("-")}return t.join(" ")}window.addEventListener("load",function(){document.querySelectorAll(".moon-grid-link-container").forEach((e,t,n)=>{let l=e.querySelector(".moon-grid-link"),r=l.textContent.trim();l.innerHTML="";let o=document.createElement("span");o.textContent=r,o.style.position="relative",o.style.display="inline-block",l.appendChild(o);let a=o.offsetWidth,s=Math.floor(a/6),c=(s+1)*6,d=document.createElement("div");d.classList.add("moon-grid-link-circle-underline"),d.style.width=c+"px";for(let u=0;u<s+1;u++){let p=document.createElement("div");p.classList.add("moon-grid-link-circle"),d.appendChild(p)}let g=c-a-3,f=t===n.length-1?0:g/2;o.style.paddingLeft=(0===t?0:g/2)+"px",o.style.paddingRight=f+"px",o.appendChild(d)}),window.addEventListener("resize",function(){document.querySelectorAll(".moon-grid-link span").forEach((e,t,n)=>{let l=e.querySelector(".moon-grid-link-circle-underline");l&&e.removeChild(l);let r=e.offsetWidth,o=Math.floor(r/6),a=(o+1)*6,s=document.createElement("div");s.classList.add("moon-grid-link-circle-underline"),s.style.width=a+"px";for(let c=0;c<o+1;c++){let d=document.createElement("div");d.classList.add("moon-grid-link-circle"),s.appendChild(d)}let u=a-r-3,p=t===n.length-1?0:u/2;e.style.paddingLeft=(0===t?0:u/2)+"px",e.style.paddingRight=p+"px",e.appendChild(s)})})}),window.addEventListener("load",function(){document.querySelectorAll(".globe-grid-link-container").forEach((e,t,n)=>{let l=e.querySelector(".globe-grid-link"),r=l.textContent.trim().split(/\s+/);l.innerHTML="";let o=[];for(let a=0;a<r.length;a++)r[a].length<=3&&o.length>0&&(o[o.length-1]+" "+r[a]).length<=6?o[o.length-1]+=" "+r[a]:r[a].length<=3&&a<r.length-1&&(r[a]+" "+r[a+1]).length<=6?o.push(r[a]+" "+r[++a]):r[a].length<=3&&a===r.length-1&&o.length>0?o[o.length-1]+=" "+r[a]:r[a].length<=3&&a<r.length-1?o.push(r[a]+" "+r[++a]):o.push(r[a]);o.forEach((e,r)=>{let a=document.createElement("span");a.textContent=e,a.style.position="relative",a.style.display="inline-block",r!==o.length-1&&(a.style.marginRight="3px"),l.appendChild(a);let s=a.offsetWidth,c=Math.floor(s/6),d=(c+1)*6,u=document.createElement("div");u.classList.add("globe-grid-link-circle-underline"),u.style.width=d+"px";for(let p=0;p<c+1;p++){let g=document.createElement("div");g.classList.add("globe-grid-link-circle"),u.appendChild(g)}let f=d-s-3,h=t===n.length-1?0:f/2;a.style.paddingLeft=(0===t?0:f/2)+"px",a.style.paddingRight=h+"px",a.appendChild(u)})}),window.addEventListener("resize",function(){document.querySelectorAll(".globe-grid-link span").forEach((e,t,n)=>{let l=e.querySelector(".globe-grid-link-circle-underline");l&&e.removeChild(l);let r=e.offsetWidth,o=Math.floor(r/6),a=(o+1)*6,s=document.createElement("div");s.classList.add("globe-grid-link-circle-underline"),s.style.width=a+"px";for(let c=0;c<o+1;c++){let d=document.createElement("div");d.classList.add("globe-grid-link-circle"),s.appendChild(d)}let u=a-r-3,p=t===n.length-1?0:u/2;e.style.paddingLeft=(0===t?0:u/2)+"px",e.style.paddingRight=p+"px",e.appendChild(s)})})}),createCircles(".globe-grid-section-separator-grey-container","globe-grid-section-separator-grey-circle"),window.addEventListener("resize",function(){createCircles(".globe-grid-section-separator-grey-container","globe-grid-section-separator-grey-circle")});for(var toggleSearchSlidePanel,inputField,searchSlidePanel,imageWrappers,clearButton,elements=document.querySelectorAll(".article-heading.h1"),i=0;i<elements.length;i++){var e,t=capitalizeTitle(elements[i].innerText);elements[i].innerText=t}window.addEventListener("load",function(){document.querySelectorAll(".article-topbar-navigation-container a, div.description-icon").forEach(function(e){e.addEventListener("dragstart",function(e){e.preventDefault()})})});let body=document.querySelector("body"),scrollPosition=0,searchButton=document.querySelector("#article-search-button"),algoliaPopup=null;function saveScrollPosition(){scrollPosition=window.pageYOffset||document.documentElement.scrollTop,localStorage.setItem("scrollPosition",scrollPosition)}searchButton.addEventListener("click",saveScrollPosition);let observer=new MutationObserver(function(e){e.forEach(function(e){(algoliaPopup=document.querySelector(".aa-Panel"))?(body.style.overflowY="scroll",body.style.position="fixed",body.style.top=-scrollPosition+"px"):(body.style.overflowY="",body.style.position="",window.scrollTo(0,localStorage.getItem("scrollPosition")||0))})});observer.observe(body,{childList:!0,subtree:!0}),window.addEventListener("beforeunload",function(){localStorage.setItem("scrollPosition",window.pageYOffset||document.documentElement.scrollTop)}),document.addEventListener("DOMContentLoaded",function(){localStorage.getItem("scrollPosition")&&window.scrollTo(0,localStorage.getItem("scrollPosition"))});var imageContainer=document.querySelector(".article-left-view-image-container"),sections=document.querySelectorAll(".article-section"),offset=64;function getVisibleSection(){window.scrollY||window.pageYOffset;for(var e=!1,t=0;t<sections.length;t++){var n=sections[t],l=n.getBoundingClientRect();if(0===t&&l.bottom<offset&&(e=!0),l.top-offset<=window.innerHeight&&l.bottom-offset>=0)return{section:n,index:t,pastFirstSection:e}}return{pastFirstSection:e}}function debounce(e,t){var n;return function(){var l=this,r=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(l,r)},t)}}function updateImageContainerPosition(){var e,t=-100*getVisibleSection().index,n=Math.min(.2+Math.abs((parseFloat(getComputedStyle(imageContainer).transform.split(",")[5])||0)-t)/100,1);requestAnimationFrame(()=>{imageContainer.style.transition=`transform ${n}s ease-in-out`,imageContainer.style.transform=`translateY(${t}vh)`})}var debouncedUpdateImageContainerPosition=debounce(updateImageContainerPosition,10);function initializeSearchPanel(){if(searchSlidePanel=document.getElementById("article-search-panel"),imageWrappers=document.querySelectorAll(".article-left-view-image-wrapper"),clearButton=document.querySelector(".aa-Autocomplete .aa-ClearButton"),inputField=document.querySelector("#autocomplete input"),!searchSlidePanel||!clearButton||!inputField){console.error("One or more elements could not be found in the DOM.");return}toggleSearchSlidePanel=function(){requestAnimationFrame(function(){searchSlidePanel.classList.contains("show")?(inputField.value&&clearButton.click(),setTimeout(function(){searchSlidePanel.classList.remove("show"),imageWrappers.forEach(function(e){e.classList.remove("greyscale")}),inputField.blur()},500)):(searchSlidePanel.classList.add("show"),imageWrappers.forEach(function(e){e.classList.add("greyscale")}))})},searchSlidePanel.addEventListener("transitionend",function(){searchSlidePanel.classList.contains("show")&&inputField&&inputField.focus()}),document.getElementById("article-search-button").addEventListener("click",toggleSearchSlidePanel),clearButton.addEventListener("click",function(){setTimeout(function(){searchSlidePanel.classList.remove("show"),imageWrappers.forEach(function(e){e.classList.remove("greyscale")}),inputField.blur()},500)}),document.addEventListener("keydown",function e(t){("Escape"===t.key||27===t.keyCode)&&searchSlidePanel.classList.contains("show")&&(inputField.value&&clearButton.click(),setTimeout(function(){searchSlidePanel.classList.remove("show"),imageWrappers.forEach(function(e){e.classList.remove("greyscale")}),inputField.blur()},500))})}updateImageContainerPosition(),window.addEventListener("scroll",debouncedUpdateImageContainerPosition),document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".aa-ClearButton");e&&(e.textContent="CLEAR")});var closeButtonContainer=document.createElement("div");closeButtonContainer.setAttribute("class","close-button-container");var closeButton=document.createElement("button");closeButton.setAttribute("class","close-button");var svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("viewBox","0 0 24 24"),svg.setAttribute("fill","rgba(255, 255, 255, 0.45)");var path=document.createElementNS("http://www.w3.org/2000/svg","path");path.setAttribute("d","M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"),svg.appendChild(path),closeButton.appendChild(svg),closeButtonContainer.appendChild(closeButton),document.querySelector(".aa-Form").appendChild(closeButtonContainer),document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".close-button");e&&e.addEventListener("click",function(){toggleSearchSlidePanel(),inputField.blur()})}),document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".aa-ClearButton"),t=document.querySelector(".close-button-container");e&&new MutationObserver(function(n){n.forEach(function(n){"hidden"===n.attributeName&&(t.style.display=e.hasAttribute("hidden")?"block":"none")})}).observe(e,{attributes:!0})}),document.addEventListener("click",function(e){var t=document.querySelector(".aa-Form"),n=document.querySelector(".aa-Panel"),l=!!t&&t.contains(e.target),r=!!n&&n.contains(e.target);!l&&!r&&searchSlidePanel.classList.contains("show")&&(inputField.value&&clearButton.click(),setTimeout(function(){searchSlidePanel.classList.remove("show"),imageWrappers.forEach(function(e){e.classList.remove("greyscale")}),inputField.blur()},500))}),document.addEventListener("DOMContentLoaded",function(){initializeSearchPanel()});let searchAutocompleteObserver=new MutationObserver(e=>{let t=null!==document.querySelector(".aa-Panel");document.querySelector("#article-search-overlay").style.display=t?"block":"none"});searchAutocompleteObserver.observe(document,{childList:!0,subtree:!0});var inputField=document.querySelector(".aa-Input"),wrapperDiv=document.querySelector(".aa-InputWrapper"),newDiv=document.createElement("div");function updateContent(){if(newDiv.innerHTML="",""!==inputField.value){let e=Array.from(inputField.value);e[e.length-1]=`<div class="${" "===e[e.length-1]?"space caret":"letter caret"}">${" "===e[e.length-1]?" ":e[e.length-1]}</div>`,newDiv.innerHTML=e.map(e=>`<div class="${" "===e?"space":"letter"}">${" "===e?" ":e}</div>`).join("")}else newDiv.innerHTML='<div class="letter caret">\xa0</div>';newDiv.scrollLeft=newDiv.scrollWidth}newDiv.contentEditable="true",newDiv.className="editableDiv",newDiv.style.position="absolute",newDiv.style.width="100%",newDiv.style.display="flex",newDiv.style.pointerEvents="none",newDiv.style.overflow="hidden",wrapperDiv.appendChild(newDiv),updateContent(),inputField.addEventListener("input",updateContent),inputField.addEventListener("focus",function(){setTimeout(updateContent,0)});var clearButton=document.querySelector(".aa-ClearButton");function checkScroll(){window.requestAnimationFrame(updateProgress)}clearButton.addEventListener("click",function(){newDiv.innerHTML=""}),document.addEventListener("DOMContentLoaded",e=>{let t=document.querySelector(".aa-SubmitButton");if(t){let n=document.createElement("div");n.className=t.className,n.innerHTML=t.innerHTML,t.parentNode.insertBefore(n,t),t.parentNode.removeChild(t)}}),window.addEventListener("load",e=>{var t=document.querySelector(".article-topbar-navigation-container"),n=document.querySelector("#topbar-separator"),l=n.querySelectorAll(".globe-grid-section-separator-grey-circle"),r=0,o=!1;function a(e){e>0?(t.classList.add("article-topbar-navigation-shadow-on-scroll"),l.forEach(e=>e.style.transform="scale(0)")):(t.classList.remove("article-topbar-navigation-shadow-on-scroll"),l.forEach(e=>e.style.transform="scale(1)"))}window.addEventListener("scroll",function(e){r=window.scrollY,o||(window.requestAnimationFrame(function(){a(r),o=!1}),o=!0)}),window.addEventListener("resize",function(){createCircles(".globe-grid-section-separator-grey-container","globe-grid-section-separator-grey-circle"),l=n.querySelectorAll(".globe-grid-section-separator-grey-circle"),a(window.pageYOffset)}),a(window.pageYOffset)}),window.removeEventListener("scroll",updateProgress),window.addEventListener("scroll",checkScroll),checkScroll();const circles=Array.from(document.querySelectorAll(".scroll-progress-indicator-circle")).slice(0,22),target=document.querySelector("#last-article-content");function updateProgress(){let e=window.innerHeight,t=target.getBoundingClientRect(),n=t.bottom+window.scrollY,l=window.scrollY/(n-e),r=Math.round(22*l);circles.forEach(e=>{e.dataset.order<r?e.classList.add("active"):e.classList.remove("active")});let o=document.querySelector(".article-topbar-navigation-icon.close-article"),a=document.querySelector(".article-topbar-navigation-icon.finished-reading");l>=1?(o.style.transform="scale(0)",a.style.transform="scale(1)",circles[circles.length-1].classList.add("active")):(o.style.transform="scale(1)",a.style.transform="scale(0)",circles[circles.length-1].classList.remove("active"))}function createBlockquoteCircles(e,t){let n=document.querySelector("blockquote p"),l=document.querySelectorAll(e),r=new ResizeObserver(e=>{for(let n of e){let r=n.contentRect.height;l.forEach(e=>{e.style.height=r+"px",e.innerHTML="";let n=Math.floor(r/6);for(let l=0;l<n;l++){let o=document.createElement("div");o.classList.add(t),e.appendChild(o)}e.lastChild&&(e.lastChild.style.marginBottom="0")})}});r.observe(n)}circles.forEach((e,t)=>{let n=t/circles.length*2*Math.PI-Math.PI/2;e.style.transform=`translate(${22*Math.cos(n)}px, ${22*Math.sin(n)}px)`,e.dataset.order=Math.round(t/circles.length*22)}),$(document).ready(function(){$(".article-topbar-navigation-close-button").hover(function(){$(".scroll-progress-indicator-wrapper").css("transform","scale(0)")},function(){$(".scroll-progress-indicator-wrapper").css("transform","scale(1)")}),$(".article-topbar-navigation-close-button").on("mousedown",function(){$(".scroll-progress-indicator-wrapper").css("transform","scale(0)")}),$(".article-topbar-navigation-close-button").on("mouseup",function(){$(".scroll-progress-indicator-wrapper").css("transform","scale(1)")})}),createBlockquoteCircles(".blockquote-column","blockquote-circle"),document.addEventListener("DOMContentLoaded",function(){function e(e,t,n){let l=document.querySelector(e);for(let r=0;r<t;r++){let o=document.createElement("div");o.classList.add("globe-grid-quote-attribution-circle"),l.appendChild(o)}l.style.flexDirection=n}e(".globe-grid-quote-attribution-circles-left",4,"column"),e(".globe-grid-quote-attribution-circles-bottom",5,"row")});
