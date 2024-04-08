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

// nodrag & noselect

window.addEventListener('load', function () {
    var elements = document.querySelectorAll('.article-topbar-navigation-container a, div.description-icon');
    elements.forEach(function (el) {
        el.addEventListener('dragstart', function (event) {
            event.preventDefault();
        });
    });
});
