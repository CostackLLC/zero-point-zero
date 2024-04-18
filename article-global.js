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
let searchPanel = document.querySelector('#article-search-panel');

// Function to save the current scroll position
function saveScrollPosition() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    localStorage.setItem('scrollPosition', scrollPosition);
}

// Mutation observer to detect changes in the search panel's attributes
let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (searchPanel && searchPanel.classList.contains('show')) {
            saveScrollPosition();
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

if (searchPanel) {
    observer.observe(searchPanel, { attributes: true });
}

// Event listener to save the scroll position before the page unloads
window.addEventListener('beforeunload', saveScrollPosition);

// Event listener to restore the scroll position once the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('scrollPosition')) {
        window.scrollTo(0, localStorage.getItem('scrollPosition'));
    }
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