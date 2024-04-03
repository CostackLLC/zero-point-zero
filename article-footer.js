// scroll position management & section banner swap

let body = document.querySelector('body');
let scrollPosition = 0;
let searchButton = document.querySelector('#article-search-button');
let algoliaPopup = null;

function saveScrollPosition() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    localStorage.setItem('scrollPosition', scrollPosition);
}

searchButton.addEventListener('click', saveScrollPosition);

let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        algoliaPopup = document.querySelector('.aa-Panel');
        if (algoliaPopup) {
            body.style.overflowY = 'scroll';
            body.style.position = 'fixed';
            body.style.top = -scrollPosition + 'px';
        } else {
            body.style.overflowY = '';
            body.style.position = '';
            window.scrollTo(0, localStorage.getItem('scrollPosition') || 0);
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
});

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
    newDiv.innerHTML = '';
    if (inputField.value !== '') {
        let letters = Array.from(inputField.value);
        letters[letters.length - 1] = `<div class="${letters[letters.length - 1] === ' ' ? 'space caret' : 'letter caret'}">${letters[letters.length - 1] === ' ' ? ' ' : letters[letters.length - 1]}</div>`;
        newDiv.innerHTML = letters.map(letter => `<div class="${letter === ' ' ? 'space' : 'letter'}">${letter === ' ' ? ' ' : letter}</div>`).join('');
    } else {
        newDiv.innerHTML = '<div class="letter caret"> </div>';
    }
    newDiv.scrollLeft = newDiv.scrollWidth;
}

updateContent();

inputField.addEventListener('input', updateContent);

inputField.addEventListener('focus', function () {
    setTimeout(updateContent, 0);
});

var clearButton = document.querySelector('.aa-ClearButton');

clearButton.addEventListener('click', function () {
    newDiv.innerHTML = '';
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

// links

window.addEventListener('load', function () {
    function createMoonGridLinkCircles() {
        document.querySelectorAll('.moon-grid-link-container').forEach((linkContainer, containerIndex, containerArray) => {
            const link = linkContainer.querySelector('.moon-grid-link');
            const linkText = link.textContent.trim();
            link.innerHTML = '';
            const groupElement = document.createElement('span');
            groupElement.textContent = linkText;
            groupElement.style.position = 'relative';
            groupElement.style.display = 'inline-block';
            link.appendChild(groupElement);
            const linkWidth = groupElement.offsetWidth;
            const circleDiameter = 3;
            const circleMargin = 3;
            const circleTotalWidth = circleDiameter + circleMargin;
            const numCircles = Math.floor(linkWidth / circleTotalWidth);
            const extraCircle = 1;
            const totalCirclesWidth = (numCircles + extraCircle) * circleTotalWidth;
            const underline = document.createElement('div');
            underline.classList.add('moon-grid-link-circle-underline');
            underline.style.width = totalCirclesWidth + 'px';
            for (let i = 0; i < numCircles + extraCircle; i++) {
                const circle = document.createElement('div');
                circle.classList.add('moon-grid-link-circle');
                underline.appendChild(circle);
            }
            const spaceDifference = totalCirclesWidth - linkWidth - circleDiameter;
            const paddingLeft = containerIndex === 0 ? 0 : spaceDifference / 2;
            const paddingRight = containerIndex === containerArray.length - 1 ? 0 : spaceDifference / 2;
            groupElement.style.paddingLeft = paddingLeft + 'px';
            groupElement.style.paddingRight = paddingRight + 'px';
            groupElement.appendChild(underline);
        });
    }
    createMoonGridLinkCircles();
    window.addEventListener('resize', function () {
        document.querySelectorAll('.moon-grid-link span').forEach((span, spanIndex, spanArray) => {
            const underline = span.querySelector('.moon-grid-link-circle-underline');
            if (underline) {
                span.removeChild(underline);
            }
            const linkWidth = span.offsetWidth;
            const circleDiameter = 3;
            const circleMargin = 3;
            const circleTotalWidth = circleDiameter + circleMargin;
            const numCircles = Math.floor(linkWidth / circleTotalWidth);
            const extraCircle = 1;
            const totalCirclesWidth = (numCircles + extraCircle) * circleTotalWidth;
            const newUnderline = document.createElement('div');
            newUnderline.classList.add('moon-grid-link-circle-underline');
            newUnderline.style.width = totalCirclesWidth + 'px';
            for (let i = 0; i < numCircles + extraCircle; i++) {
                const circle = document.createElement('div');
                circle.classList.add('moon-grid-link-circle');
                newUnderline.appendChild(circle);
            }
            const spaceDifference = totalCirclesWidth - linkWidth - circleDiameter;
            const paddingLeft = spanIndex === 0 ? 0 : spaceDifference / 2;
            const paddingRight = spanIndex === spanArray.length - 1 ? 0 : spaceDifference / 2;
            span.style.paddingLeft = paddingLeft + 'px';
            span.style.paddingRight = paddingRight + 'px';
            span.appendChild(newUnderline);
        });
    });
});

window.addEventListener('load', function () {
    function createGlobeGridLinkCircles() {
        document.querySelectorAll('.globe-grid-link-container').forEach((linkContainer, containerIndex, containerArray) => {
            const link = linkContainer.querySelector('.globe-grid-link');
            const words = link.textContent.trim().split(/\s+/);
            link.innerHTML = '';
            let groupedWords = [];
            for (let i = 0; i < words.length; i++) {
                if (words[i].length <= 3 && groupedWords.length > 0 && (groupedWords[groupedWords.length - 1] + ' ' + words[i]).length <= 6) {
                    groupedWords[groupedWords.length - 1] += ' ' + words[i];
                } else if (words[i].length <= 3 && i < words.length - 1 && (words[i] + ' ' + words[i + 1]).length <= 6) {
                    groupedWords.push(words[i] + ' ' + words[++i]);
                } else if (words[i].length <= 3 && i === words.length - 1 && groupedWords.length > 0) {
                    groupedWords[groupedWords.length - 1] += ' ' + words[i];
                } else if (words[i].length <= 3 && i < words.length - 1) {
                    groupedWords.push(words[i] + ' ' + words[++i]);
                } else {
                    groupedWords.push(words[i]);
                }
            }
            groupedWords.forEach((group, index) => {
                const groupElement = document.createElement('span');
                groupElement.textContent = group;
                groupElement.style.position = 'relative';
                groupElement.style.display = 'inline-block';
                if (index !== groupedWords.length - 1) {
                    groupElement.style.marginRight = '3px';
                }
                link.appendChild(groupElement);
                const linkWidth = groupElement.offsetWidth;
                const circleDiameter = 3;
                const circleMargin = 3;
                const circleTotalWidth = circleDiameter + circleMargin;
                const numCircles = Math.floor(linkWidth / circleTotalWidth);
                const extraCircle = 1;
                const totalCirclesWidth = (numCircles + extraCircle) * circleTotalWidth;
                const underline = document.createElement('div');
                underline.classList.add('globe-grid-link-circle-underline');
                underline.style.width = totalCirclesWidth + 'px';
                for (let i = 0; i < numCircles + extraCircle; i++) {
                    const circle = document.createElement('div');
                    circle.classList.add('globe-grid-link-circle');
                    underline.appendChild(circle);
                }
                const spaceDifference = totalCirclesWidth - linkWidth - circleDiameter;
                const paddingLeft = containerIndex === 0 ? 0 : spaceDifference / 2;
                const paddingRight = containerIndex === containerArray.length - 1 ? 0 : spaceDifference / 2;
                groupElement.style.paddingLeft = paddingLeft + 'px';
                groupElement.style.paddingRight = paddingRight + 'px';
                groupElement.appendChild(underline);
            });
        });
    }
    createGlobeGridLinkCircles();
    window.addEventListener('resize', function () {
        document.querySelectorAll('.globe-grid-link span').forEach((span, spanIndex, spanArray) => {
            const underline = span.querySelector('.globe-grid-link-circle-underline');
            if (underline) {
                span.removeChild(underline);
            }
            const linkWidth = span.offsetWidth;
            const circleDiameter = 3;
            const circleMargin = 3;
            const circleTotalWidth = circleDiameter + circleMargin;
            const numCircles = Math.floor(linkWidth / circleTotalWidth);
            const extraCircle = 1;
            const totalCirclesWidth = (numCircles + extraCircle) * circleTotalWidth;
            const newUnderline = document.createElement('div');
            newUnderline.classList.add('globe-grid-link-circle-underline');
            newUnderline.style.width = totalCirclesWidth + 'px';
            for (let i = 0; i < numCircles + extraCircle; i++) {
                const circle = document.createElement('div');
                circle.classList.add('globe-grid-link-circle');
                newUnderline.appendChild(circle);
            }
            const spaceDifference = totalCirclesWidth - linkWidth - circleDiameter;
            const paddingLeft = spanIndex === 0 ? 0 : spaceDifference / 2;
            const paddingRight = spanIndex === spanArray.length - 1 ? 0 : spaceDifference / 2;
            span.style.paddingLeft = paddingLeft + 'px';
            span.style.paddingRight = paddingRight + 'px';
            span.appendChild(newUnderline);
        });
    });
});

// section separator

function createCircles(selector, circleClass) {
    const containers = document.querySelectorAll(selector);
    containers.forEach((circles) => {
        const containerWidth = circles.clientWidth;
        const numCircles = Math.floor(containerWidth / 6);
        circles.innerHTML = '';
        for (let i = 0; i < numCircles; i++) {
            const circle = document.createElement('div');
            circle.classList.add(circleClass);
            circles.appendChild(circle);
        }
        if (circles.lastChild) {
            circles.lastChild.style.marginRight = '0';
        }
    });
}
createCircles('.globe-grid-section-separator-grey-container', 'globe-grid-section-separator-grey-circle');
window.addEventListener('resize', function () {
    createCircles('.globe-grid-section-separator-grey-container', 'globe-grid-section-separator-grey-circle');
});

// capitalized heading (h1)

function capitalizeTitle(title) {
    var words = title.split(" ");
    var lowerWords = ["a", "an", "the", "and", "but", "or", "for", "of", "in", "on", "to"];
    var prefixes = ["pre", "anti", "co", "sub", "re", "un", "non", "de", "dis", "ex", "in", "ir", "mis", "out", "over", "post", "pro", "semi", "under", "up"];
    for (var i = 0; i < words.length; i++) {
        if (i == 0 || i == words.length - 1 || !lowerWords.includes(words[i])) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        } else {
            words[i] = words[i].toLowerCase();
        }
        if (words[i].includes("-")) {
            var parts = words[i].split("-");
            if (!prefixes.includes(parts[0])) {
                parts[0] = parts[0][0].toUpperCase() + parts[0].slice(1);
            }
            parts[1] = parts[1][0].toUpperCase() + parts[1].slice(1);
            words[i] = parts.join("-");
        }
    }
    return words.join(" ");
}
var elements = document.querySelectorAll(".article-heading.h1");
for (var i = 0; i < elements.length; i++) {
    var originalTitle = elements[i].innerText;
    var capitalizedTitle = capitalizeTitle(originalTitle);
    elements[i].innerText = capitalizedTitle;
}

// nodrag & noselect

window.addEventListener('load', function () {
    var elements = document.querySelectorAll('.article-topbar-navigation-container a, .article-left-view-container img, .article-left-view-container a, div.description-icon');
    elements.forEach(function (el) {
        el.addEventListener('dragstart', function (event) {
            event.preventDefault();
        });
    });
});
