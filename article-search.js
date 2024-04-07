// article search bar panel

var toggleSearchSlidePanel;
var inputField;
var searchSlidePanel;
var imageWrappers;
var clearButton;

function initializeSearchPanel() {
    searchSlidePanel = document.getElementById('article-search-panel');
    imageWrappers = document.querySelectorAll('.article-left-view-image-wrapper');
    clearButton = document.querySelector('.aa-Autocomplete .aa-ClearButton');
    inputField = document.querySelector('#autocomplete input');

    if (!searchSlidePanel || !clearButton || !inputField) {
        console.error('One or more elements could not be found in the DOM.');
        return;
    }

    toggleSearchSlidePanel = function () {
        requestAnimationFrame(function () {
            if (searchSlidePanel.classList.contains('show')) {
                if (inputField.value) {
                    clearButton.click();
                }
                setTimeout(function () {
                    searchSlidePanel.classList.remove('show');
                    imageWrappers.forEach(function (wrapper) {
                        wrapper.classList.remove('greyscale');
                    });
                    inputField.blur();
                }, 500);
            } else {
                searchSlidePanel.classList.add('show');
                imageWrappers.forEach(function (wrapper) {
                    wrapper.classList.add('greyscale');
                });
            }
        });
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            if (searchSlidePanel.classList.contains('show')) {
                if (inputField.value) {
                    clearButton.click();
                }
                setTimeout(function () {
                    searchSlidePanel.classList.remove('show');
                    imageWrappers.forEach(function (wrapper) {
                        wrapper.classList.remove('greyscale');
                    });
                    inputField.blur();
                }, 500);
            }
        }
    }

    searchSlidePanel.addEventListener('transitionend', function () {
        if (searchSlidePanel.classList.contains('show') && inputField) {
            inputField.focus();
        }
    });

    var searchButton = document.getElementById('article-search-button');
    searchButton.addEventListener('click', toggleSearchSlidePanel);

    clearButton.addEventListener('click', function () {
        setTimeout(function () {
            searchSlidePanel.classList.remove('show');
            imageWrappers.forEach(function (wrapper) {
                wrapper.classList.remove('greyscale');
            });
            inputField.blur();
        }, 500);
    });

    document.addEventListener('keydown', handleEscapeKey);
}

document.addEventListener('DOMContentLoaded', function () {
    var clearButton = document.querySelector('.aa-ClearButton');
    if (clearButton) {
        clearButton.textContent = 'CLEAR';
    }
});

var closeButtonContainer = document.createElement('div');
closeButtonContainer.setAttribute('class', 'close-button-container');

var closeButton = document.createElement('button');
closeButton.setAttribute('class', 'close-button');

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("viewBox", "0 0 24 24");
svg.setAttribute("fill", "rgba(255, 255, 255, 0.45)");

var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z");

svg.appendChild(path);
closeButton.appendChild(svg);
closeButtonContainer.appendChild(closeButton);

document.querySelector('.aa-Form').appendChild(closeButtonContainer);

document.addEventListener('DOMContentLoaded', function () {
    var closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            toggleSearchSlidePanel();
            inputField.blur();
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var clearButton = document.querySelector('.aa-ClearButton');
    var closeButtonContainer = document.querySelector('.close-button-container');
    if (clearButton) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'hidden') {
                    closeButtonContainer.style.display = clearButton.hasAttribute('hidden') ? 'block' : 'none';
                }
            });
        });
        observer.observe(clearButton, { attributes: true });
    }
});

document.addEventListener('click', function (event) {
    var formElement = document.querySelector('.aa-Form');
    var panelElement = document.querySelector('.aa-Panel');
    var isClickInsideForm = formElement ? formElement.contains(event.target) : false;
    var isClickInsidePanel = panelElement ? panelElement.contains(event.target) : false;

    if (!isClickInsideForm && !isClickInsidePanel) {
        if (searchSlidePanel.classList.contains('show')) {
            if (inputField.value) {
                clearButton.click();
            }
            setTimeout(function () {
                searchSlidePanel.classList.remove('show');
                imageWrappers.forEach(function (wrapper) {
                    wrapper.classList.remove('greyscale');
                });
                inputField.blur();
            }, 500);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    initializeSearchPanel();
});

// article search result overlay

let searchAutocompleteObserver = new MutationObserver((mutations) => {
    let aaPanelExists = document.querySelector('.aa-Panel') !== null;
    let overlay = document.querySelector('#article-search-overlay');

    overlay.style.display = aaPanelExists ? 'block' : 'none';
});

searchAutocompleteObserver.observe(document, { childList: true, subtree: true });

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
inputField.addEventListener('keydown', function(event) {
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
