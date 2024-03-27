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



// article search result overlay and style changes

let searchAutocompleteObserver = new MutationObserver((mutations) => {
    let aaPanelExists = document.querySelector('.aa-Panel') !== null;
    let overlay = document.querySelector('#article-search-overlay');
    let articleSearchPanel = document.querySelector('#article-search-panel');

    overlay.style.display = aaPanelExists ? 'block' : 'none';
    articleSearchPanel.style.boxShadow = aaPanelExists ? 'none' : '0 0 5px 1px rgba(0,0,0,0.28)';
});

searchAutocompleteObserver.observe(document, { childList: true, subtree: true });






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

// scroll position management (search autocomplete + page reload) & section banner swap

let body = document.querySelector('body');
let scrollPosition = 0;
let algoliaPopup = null;
let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type === 'childList') {
            algoliaPopup = document.querySelector('.aa-Panel');
            if (algoliaPopup) {
                scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                localStorage.setItem('scrollPosition', scrollPosition);
                requestAnimationFrame(function () {
                    body.style.overflowY = 'scroll';
                    body.style.position = 'fixed';
                    body.style.top = -scrollPosition + 'px';
                });
            } else {
                requestAnimationFrame(function () {
                    body.style.overflowY = '';
                    body.style.position = '';
                    scrollPosition = localStorage.getItem('scrollPosition') || 0;
                    window.scrollTo(0, scrollPosition);
                });
            }
        }
    });
});
observer.observe(body, { childList: true, subtree: true });
window.addEventListener('beforeunload', function () {
    localStorage.setItem('scrollPosition', window.pageYOffset || document.documentElement.scrollTop);
});
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('scrollPosition')) {
        window.scrollTo(0, localStorage.getItem('scrollPosition'));
    }
    var imageContainer = document.querySelector('.article-left-view-image-container');
    var sections = document.querySelectorAll('.article-section');
    var offset = 64;
    function getVisibleSection() {
        var scrollPosition = window.scrollY || window.pageYOffset;
        var pastFirstSection = false;
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionPosition = section.getBoundingClientRect();
            if (i === 0 && sectionPosition.bottom < offset) {
                pastFirstSection = true;
            }
            if (sectionPosition.top - offset <= window.innerHeight && sectionPosition.bottom - offset >= 0) {
                return { section: section, index: i, pastFirstSection: pastFirstSection };
            }
        }
        return { pastFirstSection: pastFirstSection };
    }
    function debounce(func, wait) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        };
    }
    function updateImageContainerPosition() {
        var visibleSectionInfo = getVisibleSection();
        var translateYValue = -100 * visibleSectionInfo.index;
        var currentTranslateY = parseFloat(getComputedStyle(imageContainer).transform.split(',')[5]) || 0;
        var distanceToTravel = Math.abs(currentTranslateY - translateYValue);
        var animationDuration = Math.min(0.2 + (distanceToTravel / 100), 1.0);
        requestAnimationFrame(() => {
            imageContainer.style.transition = `transform ${animationDuration}s ease-in-out`;
            imageContainer.style.transform = `translateY(${translateYValue}vh)`;
        });
    }
    var debouncedUpdateImageContainerPosition = debounce(updateImageContainerPosition, 10);
    updateImageContainerPosition();
    window.addEventListener('scroll', debouncedUpdateImageContainerPosition);
});

// topbar on scroll

window.addEventListener('load', (event) => {
    var navbar = document.querySelector('.article-topbar-navigation-container');
    var topbarSeparator = document.querySelector('#topbar-separator');
    var circles = topbarSeparator.querySelectorAll('.globe-grid-section-separator-grey-circle');
    var last_known_scroll_position = 0;
    var ticking = false;
    function doSomething(scroll_pos) {
        if (scroll_pos > 0) {
            navbar.classList.add("article-topbar-navigation-shadow-on-scroll");
            circles.forEach(circle => circle.style.transform = 'scale(0)');
        } else {
            navbar.classList.remove("article-topbar-navigation-shadow-on-scroll");
            circles.forEach(circle => circle.style.transform = 'scale(1)');
        }
    }
    window.addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                doSomething(last_known_scroll_position);
                ticking = false;
            });
            ticking = true;
        }
    });
    window.addEventListener('resize', function () {
        createCircles('.globe-grid-section-separator-grey-container', 'globe-grid-section-separator-grey-circle');
        circles = topbarSeparator.querySelectorAll('.globe-grid-section-separator-grey-circle');
        doSomething(window.pageYOffset);
    });
    doSomething(window.pageYOffset);
});

// article topbar navigation: close button

function checkScroll() {
    window.requestAnimationFrame(updateProgress);
}
window.removeEventListener('scroll', updateProgress);
window.addEventListener('scroll', checkScroll);
checkScroll();
const circles = Array.from(document.querySelectorAll('.scroll-progress-indicator-circle')).slice(0, 22);
const target = document.querySelector('#last-article-content');
circles.forEach((circle, index) => {
    const angle = ((index / circles.length) * 2 * Math.PI) - Math.PI / 2;
    const radius = 22;
    circle.style.transform = `translate(${radius * Math.cos(angle)}px, ${radius * Math.sin(angle)}px)`;
    circle.dataset.order = Math.round((index / circles.length) * 22);
});
function updateProgress() {
    const windowHeight = window.innerHeight;
    const targetRect = target.getBoundingClientRect();
    const targetBottomPosition = targetRect.bottom + window.scrollY;
    const progress = window.scrollY / (targetBottomPosition - windowHeight);
    const activeCircles = Math.round(progress * 22);
    circles.forEach((circle) => {
        if (circle.dataset.order < activeCircles) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });
    const closeIcon = document.querySelector('.article-topbar-navigation-icon.close-article');
    const finishedReadingIcon = document.querySelector('.article-topbar-navigation-icon.finished-reading');
    if (progress >= 1) {
        closeIcon.style.transform = 'scale(0)';
        finishedReadingIcon.style.transform = 'scale(1)';
        circles[circles.length - 1].classList.add('active');
    } else {
        closeIcon.style.transform = 'scale(1)';
        finishedReadingIcon.style.transform = 'scale(0)';
        circles[circles.length - 1].classList.remove('active');
    }
}
$(document).ready(function () {
    $('.article-topbar-navigation-close-button').hover(
        function () { $('.scroll-progress-indicator-wrapper').css('transform', 'scale(0)'); },
        function () { $('.scroll-progress-indicator-wrapper').css('transform', 'scale(1)'); }
    );
    $('.article-topbar-navigation-close-button').on('mousedown', function () {
        $('.scroll-progress-indicator-wrapper').css('transform', 'scale(0)');
    });
    $('.article-topbar-navigation-close-button').on('mouseup', function () {
        $('.scroll-progress-indicator-wrapper').css('transform', 'scale(1)');
    });
});

// blockquote

function createBlockquoteCircles(selector, circleClass) {
    const blockquoteParagraph = document.querySelector('blockquote p');
    const columns = document.querySelectorAll(selector);
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const blockquoteHeight = entry.contentRect.height;
            columns.forEach((column) => {
                column.style.height = blockquoteHeight + 'px';
                column.innerHTML = '';
                const numCircles = Math.floor(blockquoteHeight / 6);
                for (let i = 0; i < numCircles; i++) {
                    const circle = document.createElement('div');
                    circle.classList.add(circleClass);
                    column.appendChild(circle);
                }
                if (column.lastChild) {
                    column.lastChild.style.marginBottom = '0';
                }
            });
        }
    });
    resizeObserver.observe(blockquoteParagraph);
}
createBlockquoteCircles('.blockquote-column', 'blockquote-circle');

// blockquote attribution icon

document.addEventListener('DOMContentLoaded', function () {
    function createCircles(containerClass, count, direction) {
        const container = document.querySelector(containerClass);
        for (let i = 0; i < count; i++) {
            const circle = document.createElement('div');
            circle.classList.add('globe-grid-quote-attribution-circle');
            container.appendChild(circle);
        }
        container.style.flexDirection = direction;
    }
    createCircles('.globe-grid-quote-attribution-circles-left', 4, 'column');
    createCircles('.globe-grid-quote-attribution-circles-bottom', 5, 'row');
});
