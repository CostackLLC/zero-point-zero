// article search bar panel

var toggleSearchSlidePanel, inputField, searchSlidePanel, searchOverlay, clearButton;

function initializeSearchPanel() {
    searchSlidePanel = document.getElementById("article-search-panel"),
        searchOverlay = document.getElementById("article-search-overlay"),
        clearButton = document.querySelector(".aa-Autocomplete .aa-ClearButton"),
        inputField = document.querySelector("#autocomplete input"),
        searchSlidePanel && searchOverlay && clearButton && inputField ? (toggleSearchSlidePanel = function () {
            requestAnimationFrame((function () {
                searchSlidePanel.classList.contains("show") ? (inputField.value && clearButton.click(), setTimeout((function () {
                    searchSlidePanel.classList.remove("show"), searchOverlay.classList.remove("show"), inputField.blur()
                }), 500)) : (searchSlidePanel.classList.add("show"), searchOverlay.classList.add("show"))
            }))
        }, searchSlidePanel.addEventListener("transitionend", (function () {
            searchSlidePanel.classList.contains("show") && inputField.focus()
        })), document.getElementById("article-search-button").addEventListener("click", toggleSearchSlidePanel), clearButton.addEventListener("click", (function () {
            setTimeout((function () {
                searchSlidePanel.classList.remove("show"), searchOverlay.classList.remove("show"), inputField.blur()
            }), 500)
        })), document.addEventListener("keydown", (function (e) {
            "Escape" !== e.key && 27 !== e.keyCode || !searchSlidePanel.classList.contains("show") || (inputField.value && clearButton.click(), setTimeout((function () {
                searchSlidePanel.classList.remove("show"), searchOverlay.classList.remove("show"), inputField.blur()
            }), 500))
        }))) : console.error("One or more elements could not be found in the DOM.")
}

document.addEventListener("DOMContentLoaded", (function () {
    var e = new MutationObserver((function (e, n) {
        var c = document.querySelector(".aa-Form");
        if (c) {
            c.appendChild(a);
            var r = document.querySelector(".close-button");
            r && (r.removeEventListener("click", t), r.addEventListener("click", t)), n.disconnect()
        }
    }));

    function t() {
        toggleSearchSlidePanel(), inputField.blur(), inputField.value = ""
    }
    e.observe(document.body, {
        childList: !0,
        subtree: !0
    });
    var a = document.createElement("div");
    a.setAttribute("class", "close-button-container");
    var n = document.createElement("button");
    n.setAttribute("class", "close-button");
    var c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    c.setAttribute("viewBox", "0 0 24 24"), c.setAttribute("fill", "rgba(255, 255, 255, 0.45)");
    var r = document.createElementNS("http://www.w3.org/2000/svg", "path");
    r.setAttribute("d", "M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"), c.appendChild(r), n.appendChild(c), a.appendChild(n);
    var l = document.querySelector(".aa-ClearButton");
    l && (l.textContent = "CLEAR");
    var i = new MutationObserver((function (e) {
        e.forEach((function (e) {
            "hidden" === e.attributeName && (a.style.display = l.hasAttribute("hidden") ? "block" : "none")
        }))
    }));
    l && i.observe(l, {
        attributes: !0
    }), document.addEventListener("click", (function (e) {
        var t = document.querySelector(".aa-Autocomplete"),
            a = document.querySelector(".aa-Panel"),
            n = !!t && t.contains(e.target),
            c = !!a && a.contains(e.target),
            r = e.target.closest('.article-topbar-navigation-button.toggle-theme');
        n || c || r || !searchSlidePanel.classList.contains("show") || (inputField.value && l.click(), setTimeout((function () {
            searchSlidePanel.classList.remove("show"), searchOverlay.classList.remove("show"), inputField.blur()
        }), 500))
    })), initializeSearchPanel()
}));

// custom caret

var inputField = document.querySelector('.aa-Input');
var wrapperDiv = document.querySelector('.aa-InputWrapper');
var newDiv = document.createElement('div');
newDiv.contentEditable = 'true';
newDiv.className = 'editableDiv';
newDiv.style.position = 'absolute';
newDiv.style.width = '100%';
newDiv.style.display = 'flex';
newDiv.style.pointerEvents = 'none';
newDiv.style.overflow = 'hidden';
wrapperDiv.appendChild(newDiv);

function updateContent() {
    var caretPosition = inputField.selectionStart;
    var inputValue = inputField.value;
    var contentHtml = '';

    for (var i = 0; i < inputValue.length; i++) {
        var char = inputValue[i];
        char = char === ' ' ? ' ' : char;
        var isCaretPosition = i === caretPosition - 1;

        contentHtml += `<span class="${isCaretPosition ? 'letter caret' : 'letter'}">${char}</span>`;
    }

    if (caretPosition === 0 && inputValue) {
        contentHtml = contentHtml.replace('<span class="letter">', '<span class="letter caret">');
    } else if (caretPosition === 0 && !inputValue) {
        contentHtml = `<span class="letter caret"> </span>`;
    }

    newDiv.innerHTML = contentHtml;
    newDiv.scrollLeft = newDiv.scrollWidth;
}

inputField.addEventListener('input', updateContent);
inputField.addEventListener('keydown', function (event) {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        setTimeout(updateContent, 0);
    }

    if (event.key === 'ArrowRight' && inputField.selectionStart === 0) {
        inputField.selectionStart = inputField.selectionEnd = 1;
    }

});
inputField.addEventListener('click', updateContent);
inputField.addEventListener('focus', updateContent);


var clearButton = document.querySelector('.aa-ClearButton');
clearButton.addEventListener('click', function () {
    newDiv.innerHTML = '<span class="letter caret"> </span>';
    inputField.value = '';
});

document.addEventListener('DOMContentLoaded', updateContent);

inputField.addEventListener('focus', function () {
    if (!inputField.value) {
        newDiv.innerHTML = '<span class="letter caret"> </span>';
    }
});

// form submit button

document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.querySelector('.aa-SubmitButton');
    if (button) {
        const div = document.createElement('div');
        div.className = button.className;
        div.innerHTML = button.innerHTML;
        button.parentNode.insertBefore(div, button);
        button.parentNode.removeChild(button);
    }
});

// global scroll for search results

function scrollDiv(e) {
    var div = document.querySelector('.aa-Panel--scrollable');
    if (div) {
        div.scrollTop += e.deltaY;
    }
}
document.addEventListener('wheel', scrollDiv);









// connection issue detected

document.addEventListener('DOMContentLoaded', function () {
    const statusContainer = document.getElementById('article-search-overlay');
    let intervalId = null;

    const displayConnectionMessage = () => {
        const connectionMessage = `

        <div class="autocomplete-record-details connection-issue">
            <div class="connection-issue-wrapper">        
                <p class="autocomplete-item-title connection-issue">Explore Relevant Articles</p>
                <p class="autocomplete-item-subtitle connection-issue">We are committed to growing our article base to meet your needs. While some searches may yield limited results now, your curiosity is shaping our future content. Each query is a building block for our expanding database.</p>
                <div class="autocomplete-item-topic-badge connection-issue">
                <p class="autocomplete-item-topic connection-issue">Start Typing to Explore</p>
                </div>
            </div>
        </div>

        `;
        statusContainer.innerHTML = connectionMessage;
        // Show the .aa-Panel element if it was previously hidden
        const aaPanel = document.querySelector('.aa-Panel');
        if (aaPanel) {
            aaPanel.style.display = 'block';
        }
    };

    const checkInternetConnection = () => {
        if (navigator.onLine) {
            fetch('https://uploads-ssl.webflow.com/65a65d78528ae0b98e38a942/661150242e87885e52b68254_noise-var-black.gif', { method: 'HEAD', cache: 'no-cache' })
                .then(() => {
                    displayConnectionMessage();
                })
                .catch(() => {
                    displayOfflineMessage();
                });
        } else {
            displayOfflineMessage();
        }
    };

    const displayOfflineMessage = () => {
        const offlineMessage = `

        <div class="autocomplete-record-details connection-issue">
            <div class="connection-issue-wrapper">        
                <p class="autocomplete-item-title connection-issue">Connection Issue Detected</p>
                <p class="autocomplete-item-subtitle connection-issue">It appears you're currently offline or experiencing connectivity issues. Please check your internet connection. We'll automatically reconnect as soon as you're back online.</p>
                <div class="autocomplete-item-topic-badge connection-issue">
                <p class="autocomplete-item-topic connection-issue">Thank you for your patience.</p>
                </div>
            </div>
        </div>

`;
        statusContainer.innerHTML = offlineMessage;
        // Hide the .aa-Panel element
        const aaPanel = document.querySelector('.aa-Panel');
        if (aaPanel) {
            aaPanel.style.display = 'none';
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start checking when the div is in the viewport
                if (!intervalId) {
                    checkInternetConnection(); // Initial check
                    intervalId = setInterval(checkInternetConnection, 5000);
                }
            } else {
                // Stop checking when the div is not in the viewport
                clearInterval(intervalId);
                intervalId = null;
            }
        });
    });

    // Observe the status container
    observer.observe(statusContainer);
});