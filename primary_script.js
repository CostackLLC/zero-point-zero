document.addEventListener("DOMContentLoaded",(function(){window.matchMedia("only screen and (max-width: 767px)").matches&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&([".article-left-view-container"].forEach((function(containerClass){var container=document.querySelector(containerClass);container&&container.parentNode.removeChild(container)})),["https://cdn.jsdelivr.net/gh/costackllc/zero-point-zero@v0.0.101/secondary_script.js"].forEach((function(src){document.querySelectorAll('script[src="'+src+'"]').forEach((function(script){script.parentNode.removeChild(script)}))})))})),(()=>{function _slicedToArray(arr,i){return function(arr){if(Array.isArray(arr))return arr}(arr)||function(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}(arr,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function isThemeSelected(){var hasDarkCookie=null!=document.cookie.match(/theme=dark/i),hasLightCookie=null!=document.cookie.match(/theme=light/i);return!!hasDarkCookie||!hasLightCookie&&window.matchMedia("(prefers-color-scheme: dark)").matches}function toggleTheme(){var isDarkMode=!document.body.classList.contains("dark-mode");document.body.classList.toggle("dark-mode"),document.cookie="theme="+(isDarkMode?"dark":"light"),updateIconsDisplay(isDarkMode)}function updateIconsDisplay(isDarkMode){for(var _i=0,_Object$entries=Object.entries({account:["topbar-button-icon-light-theme-account","topbar-button-icon-dark-theme-account"],search:["topbar-button-icon-light-theme-search","topbar-button-icon-dark-theme-search"],toc:["topbar-button-icon-light-theme-toc","topbar-button-icon-dark-theme-toc"],comments:["topbar-button-icon-light-theme-comments","topbar-button-icon-dark-theme-comments"],"theme-toggle":["topbar-button-icon-light-theme-theme-toggle","topbar-button-icon-dark-theme-theme-toggle"]});_i<_Object$entries.length;_i++){var _Object$entries$_i=_slicedToArray(_Object$entries[_i],2),ids=(_Object$entries$_i[0],_Object$entries$_i[1]),lightIcon=document.getElementById(ids[0]),darkIcon=document.getElementById(ids[1]);lightIcon&&darkIcon&&(lightIcon.style.display=isDarkMode?"none":"block",darkIcon.style.display=isDarkMode?"block":"none")}}var func,limit,inThrottle;function createSectionSeparatorCircles(selector,circleClass){document.querySelectorAll(selector).forEach((function(container){var containerWidth=container.clientWidth,numCircles=Math.floor(containerWidth/6);container.innerHTML="";for(var i=0;i<numCircles;i++){var circle=document.createElement("div");circle.classList.add(circleClass),container.appendChild(circle)}container.lastChild&&(container.lastChild.style.marginRight="0")}))}document.body.className=isThemeSelected()?"dark-mode":"",updateIconsDisplay(isThemeSelected()),document.querySelector(".article-topbar-navigation-button.toggle-theme").onclick=toggleTheme,"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?window.addEventListener("load",(function(){var func,ticking,topbarSeparator=document.querySelector("#topbar-separator"),navbar=document.querySelector(".article-topbar-navigation-container"),body=document.body;function handleTopbarScroll(){window.scrollY>0?(topbarSeparator.style.visibility="hidden",navbar.classList.add("article-topbar-navigation-shadow-on-scroll"),body.classList.add("body-bg-color-on-scroll")):(topbarSeparator.style.visibility="visible",navbar.classList.remove("article-topbar-navigation-shadow-on-scroll"),body.classList.remove("body-bg-color-on-scroll"))}window.addEventListener("scroll",(func=handleTopbarScroll,ticking=!1,function(){ticking||(window.requestAnimationFrame((function(){func(),ticking=!1})),ticking=!0)})),window.addEventListener("resize",(function(){createSectionSeparatorCircles("#topbar-separator","globe-grid-section-separator-grey-circle"),handleTopbarScroll()})),handleTopbarScroll()})):window.addEventListener("load",(function(){var func,ticking,topbarSeparator=document.querySelector("#topbar-separator"),navbar=document.querySelector(".article-topbar-navigation-container"),body=document.body,circles=topbarSeparator.getElementsByClassName("globe-grid-section-separator-grey-circle");function handleTopbarScroll(){var scrollPos=window.scrollY,circlesArray=Array.from(circles);scrollPos>0?(circlesArray.forEach((function(circle){return circle.style.transform="scale(0)"})),navbar.classList.add("article-topbar-navigation-shadow-on-scroll"),body.classList.add("body-bg-color-on-scroll")):(circlesArray.forEach((function(circle){return circle.style.transform="scale(1)"})),navbar.classList.remove("article-topbar-navigation-shadow-on-scroll"),body.classList.remove("body-bg-color-on-scroll"))}window.addEventListener("scroll",(func=handleTopbarScroll,ticking=!1,function(){ticking||(window.requestAnimationFrame((function(){func(),ticking=!1})),ticking=!0)})),window.addEventListener("resize",(function(){createSectionSeparatorCircles("#topbar-separator","globe-grid-section-separator-grey-circle"),circles=topbarSeparator.getElementsByClassName("globe-grid-section-separator-grey-circle"),handleTopbarScroll()})),handleTopbarScroll()})),createSectionSeparatorCircles(".globe-grid-section-separator-grey-container","globe-grid-section-separator-grey-circle"),window.addEventListener("resize",(func=function(){createSectionSeparatorCircles(".globe-grid-section-separator-grey-container","globe-grid-section-separator-grey-circle")},limit=250,function(){var args=arguments;inThrottle||(func.apply(this,args),inThrottle=!0,setTimeout((function(){return inThrottle=!1}),limit))})),window.addEventListener("load",(function(){var resizeTimer,updateCircles=function(){document.querySelectorAll(".moon-grid-link-container").forEach((function(container,index,array){var link=container.querySelector(".moon-grid-link"),text=link.textContent.trim();link.innerHTML="";var span=document.createElement("span");span.textContent=text,span.style.position="relative",span.style.display="inline-block",link.appendChild(span);var width=span.offsetWidth,circleCount=Math.floor(width/6),underlineWidth=6*(circleCount+1),circleUnderline=document.createElement("div");circleUnderline.classList.add("moon-grid-link-circle-underline"),circleUnderline.style.width=underlineWidth+"px";for(var i=0;i<circleCount+1;i++){var circle=document.createElement("div");circle.classList.add("moon-grid-link-circle"),circleUnderline.appendChild(circle)}var extraSpace=underlineWidth-width-3,paddingLeft=0===index?0:extraSpace/2,paddingRight=index===array.length-1?0:extraSpace/2;span.style.paddingLeft=paddingLeft+"px",span.style.paddingRight=paddingRight+"px",span.appendChild(circleUnderline)}))};updateCircles(),window.addEventListener("resize",(function(){clearTimeout(resizeTimer),resizeTimer=setTimeout((function(){requestAnimationFrame(updateCircles)}),250)}))}));var lastWindowWidth=window.innerWidth;function createUnderlines(){document.querySelectorAll(".globe-grid-link-container").forEach((function(container){var link=container.querySelector(".globe-grid-link"),existingSpans=link.querySelectorAll("span");if(existingSpans.length>0)existingSpans.forEach((function(span){var underline=span.querySelector(".globe-grid-link-circle-underline");if(underline){var spanWidth=span.offsetWidth,underlineWidth=6*(Math.floor(spanWidth/6)+1);underline.style.width=underlineWidth+"px";var paddingAdjustment=underlineWidth-spanWidth-3,paddingLeft=span.previousSibling?paddingAdjustment/2:0,paddingRight=span.nextSibling?paddingAdjustment/2:0;span.style.paddingLeft=paddingLeft+"px",span.style.paddingRight=paddingRight+"px"}}));else{var words=link.textContent.trim().split(/\s+/);link.innerHTML="";var wordGroups=[],group="";words.forEach((function(word,index,array){if(word.length<=2){var leftWord=group.split(" ").pop(),rightWord=array[index+1]||"";leftWord&&leftWord.length<=rightWord.length?group+=" "+word:(group&&(wordGroups.push(group),group=""),word+=rightWord?" "+rightWord:"",rightWord&&words.splice(index+1,1),group=word)}else group&&(wordGroups.push(group),group=""),group=word})),group&&wordGroups.push(group),wordGroups.forEach((function(group,index){var span=document.createElement("span");span.textContent=group,span.style.position="relative",span.style.display="inline-block",index!==wordGroups.length-1&&(span.style.marginRight="3px"),link.appendChild(span);var underline=document.createElement("div");underline.classList.add("globe-grid-link-circle-underline");var spanWidth=span.offsetWidth,circles=Math.floor(spanWidth/6),underlineWidth=6*(circles+1);underline.style.width=underlineWidth+"px";for(var i=0;i<circles+1;i++){var circle=document.createElement("div");circle.classList.add("globe-grid-link-circle"),underline.appendChild(circle)}var paddingAdjustment=underlineWidth-spanWidth-3,paddingLeft=0===index?0:paddingAdjustment/2,paddingRight=index===wordGroups.length-1?0:paddingAdjustment/2;span.style.paddingLeft=paddingLeft+"px",span.style.paddingRight=paddingRight+"px",span.appendChild(underline)}))}}))}createUnderlines(),window.addEventListener("resize",function(func,limit){var inThrottle;return function(){var args=arguments;inThrottle||(func.apply(this,args),inThrottle=!0,setTimeout((function(){return inThrottle=!1}),limit))}}((function(){window.innerWidth!==lastWindowWidth&&(lastWindowWidth=window.innerWidth,requestAnimationFrame((function(){createUnderlines()})))}),250))})(),(()=>{function _createForOfIteratorHelper(o,allowArrayLike){var it="undefined"!=typeof Symbol&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=function(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function(){};return{s:F,n:function(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function(){it=it.call(o)},n:function(){var step=it.next();return normalCompletion=step.done,step},e:function(_e2){didErr=!0,err=_e2},f:function(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function checkScroll(){window.requestAnimationFrame(updateProgress)}window.removeEventListener("scroll",updateProgress),window.addEventListener("scroll",checkScroll),checkScroll();var circles=Array.from(document.querySelectorAll(".scroll-progress-indicator-circle")).slice(0,22),target=document.querySelector("#last-article-content");function updateProgress(){var windowHeight=window.innerHeight,targetBottomPosition=target.getBoundingClientRect().bottom+window.scrollY,progress=window.scrollY/(targetBottomPosition-windowHeight),activeCircles=Math.round(22*progress);circles.forEach((function(circle){circle.dataset.order<activeCircles?circle.classList.add("active"):circle.classList.remove("active")}));var closeIcon=document.querySelector(".article-topbar-navigation-icon.close-article"),finishedReadingIcon=document.querySelector(".article-topbar-navigation-icon.finished-reading");progress>=1?(closeIcon.style.transform="scale(0)",finishedReadingIcon.style.transform="scale(1)",circles[circles.length-1].classList.add("active")):(closeIcon.style.transform="scale(1)",finishedReadingIcon.style.transform="scale(0)",circles[circles.length-1].classList.remove("active"))}circles.forEach((function(circle,index){var angle=index/circles.length*2*Math.PI-Math.PI/2;circle.style.transform="translate(".concat(22*Math.cos(angle),"px, ").concat(22*Math.sin(angle),"px)"),circle.dataset.order=Math.round(index/circles.length*22)})),$(document).ready((function(){$(".article-topbar-navigation-close-button").hover((function(){$(".scroll-progress-indicator-wrapper").css("transform","scale(0)")}),(function(){$(".scroll-progress-indicator-wrapper").css("transform","scale(1)")})),$(".article-topbar-navigation-close-button").on("mousedown",(function(){$(".scroll-progress-indicator-wrapper").css("transform","scale(0)")})),$(".article-topbar-navigation-close-button").on("mouseup",(function(){$(".scroll-progress-indicator-wrapper").css("transform","scale(1)")}))}));var body=document.querySelector("body"),scrollPosition=0,searchPanel=document.querySelector("#article-search-panel");function saveScrollPosition(){scrollPosition=window.pageYOffset||document.documentElement.scrollTop,localStorage.setItem("scrollPosition",scrollPosition)}var observer=new MutationObserver((function(mutations){mutations.forEach((function(mutation){searchPanel&&searchPanel.classList.contains("show")?(saveScrollPosition(),body.style.overflowY="scroll",body.style.position="fixed",body.style.top=-scrollPosition+"px"):(body.style.overflowY="",body.style.position="",window.scrollTo(0,localStorage.getItem("scrollPosition")||0))}))}));function capitalizeTitle(title){for(var words=title.split(" "),lowerWords=["a","an","the","and","but","or","for","of","in","on","to"],prefixes=["pre","anti","co","sub","re","un","non","de","dis","ex","in","ir","mis","out","over","post","pro","semi","under","up"],i=0;i<words.length;i++)if(0!=i&&i!=words.length-1&&lowerWords.includes(words[i])?words[i]=words[i].toLowerCase():words[i]=words[i][0].toUpperCase()+words[i].slice(1),words[i].includes("-")){var parts=words[i].split("-");prefixes.includes(parts[0])||(parts[0]=parts[0][0].toUpperCase()+parts[0].slice(1)),parts[1]=parts[1][0].toUpperCase()+parts[1].slice(1),words[i]=parts.join("-")}return words.join(" ")}searchPanel&&observer.observe(searchPanel,{attributes:!0}),window.addEventListener("beforeunload",saveScrollPosition),document.addEventListener("DOMContentLoaded",(function(){localStorage.getItem("scrollPosition")&&window.scrollTo(0,localStorage.getItem("scrollPosition"))}));for(var selector,circleClass,blockquoteParagraph,columns,elements=document.querySelectorAll(".article-heading.h1"),i=0;i<elements.length;i++){var capitalizedTitle=capitalizeTitle(elements[i].innerText);elements[i].innerText=capitalizedTitle}selector=".blockquote-column",circleClass="blockquote-circle",blockquoteParagraph=document.querySelector("blockquote p"),columns=document.querySelectorAll(selector),new ResizeObserver((function(entries){var _step,_iterator=_createForOfIteratorHelper(entries);try{var _loop=function(){var blockquoteHeight=_step.value.contentRect.height;columns.forEach((function(column){column.style.height=blockquoteHeight+"px",column.innerHTML="";for(var numCircles=Math.floor(blockquoteHeight/6),_i=0;_i<numCircles;_i++){var circle=document.createElement("div");circle.classList.add(circleClass),column.appendChild(circle)}column.lastChild&&(column.lastChild.style.marginBottom="0")}))};for(_iterator.s();!(_step=_iterator.n()).done;)_loop()}catch(err){_iterator.e(err)}finally{_iterator.f()}})).observe(blockquoteParagraph),document.addEventListener("DOMContentLoaded",(function(){function createCircles(containerClass,count,direction){for(var container=document.querySelector(containerClass),_i2=0;_i2<count;_i2++){var circle=document.createElement("div");circle.classList.add("globe-grid-quote-attribution-circle"),container.appendChild(circle)}container.style.flexDirection=direction}createCircles(".globe-grid-quote-attribution-circles-left",4,"column"),createCircles(".globe-grid-quote-attribution-circles-bottom",5,"row")})),window.addEventListener("load",(function(){document.querySelectorAll(".article-topbar-navigation-container a, div.description-icon").forEach((function(el){el.addEventListener("dragstart",(function(event){event.preventDefault()}))}))}))})();