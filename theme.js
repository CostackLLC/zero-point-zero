// theme toggle

// Function to add or remove the transition class based on scroll position
function handleScroll() {
    if (window.scrollY > 0) {
        document.body.classList.add('bg-transition');
    } else {
        document.body.classList.remove('bg-transition');
    }
}

// Function to check if the dark theme is selected
function isThemeSelected() {
    const hasDarkCookie = document.cookie.match(/theme=dark/i) != null;
    const hasLightCookie = document.cookie.match(/theme=light/i) != null;
    return hasDarkCookie ? true : hasLightCookie ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Function to update the display of icons
function updateIconsDisplay(isDarkMode) {
    // Define the icon pairs for light and dark themes
    const iconPairs = {
        'account': ['topbar-button-icon-light-theme-account', 'topbar-button-icon-dark-theme-account'],
        'search': ['topbar-button-icon-light-theme-search', 'topbar-button-icon-dark-theme-search'],
        'toc': ['topbar-button-icon-light-theme-toc', 'topbar-button-icon-dark-theme-toc'],
        'comments': ['topbar-button-icon-light-theme-comments', 'topbar-button-icon-dark-theme-comments'],
        'theme-toggle': ['topbar-button-icon-light-theme-theme-toggle', 'topbar-button-icon-dark-theme-theme-toggle']
    };

    for (const [iconType, ids] of Object.entries(iconPairs)) {
        const lightIcon = document.getElementById(ids[0]);
        const darkIcon = document.getElementById(ids[1]);
        if (lightIcon && darkIcon) {
            lightIcon.style.display = isDarkMode ? 'none' : 'block';
            darkIcon.style.display = isDarkMode ? 'block' : 'none';
        }
    }
}

// Function to set the theme from cookie and update icons
function setThemeFromCookie() {
    const isDarkMode = isThemeSelected();
    document.body.classList.toggle('dark-mode', isDarkMode);
    updateIconsDisplay(isDarkMode); // Update icons right after setting the theme
}

// Function to toggle the theme
function toggleTheme() {
    const isDarkMode = !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode');
    document.cookie = 'theme=' + (isDarkMode ? 'dark' : 'light');
    updateIconsDisplay(isDarkMode);
}

// Initialize theme from cookie and set up event listeners
(function () {
    setThemeFromCookie();
    document.querySelector('.article-topbar-navigation-button.toggle-theme').onclick = toggleTheme;
    window.addEventListener('scroll', handleScroll);
})();













// topbar separator + shadow & body on scroll | touch devices

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

if (isTouchDevice) {
    window.addEventListener('load', () => {
        const topbarSeparator = document.querySelector('#topbar-separator');
        const navbar = document.querySelector('.article-topbar-navigation-container');

        function handleTopbarScroll() {
            const scrollPos = window.scrollY;
            if (scrollPos > 0) {
                topbarSeparator.style.visibility = 'hidden';
                navbar.classList.add("article-topbar-navigation-shadow-on-scroll");
                document.body.classList.add("body-bg-color-on-scroll");
            } else {
                topbarSeparator.style.visibility = 'visible';
                navbar.classList.remove("article-topbar-navigation-shadow-on-scroll");
                document.body.classList.remove("body-bg-color-on-scroll");
            }
        }

        function throttleScroll(func, limit) {
            let ticking = false;
            return function() {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        func();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
        }

        window.addEventListener('scroll', throttleScroll(handleTopbarScroll, 250));

        window.addEventListener('resize', () => {
            createSectionSeparatorCircles('#topbar-separator', 'globe-grid-section-separator-grey-circle');
            handleTopbarScroll();
        });

        handleTopbarScroll();
    });
} else {

// topbar separator + shadow & body on scroll | non-touch devices

    window.addEventListener('load', () => {
        const topbarSeparator = document.querySelector('#topbar-separator');
        const navbar = document.querySelector('.article-topbar-navigation-container');
        let circles = topbarSeparator.getElementsByClassName('globe-grid-section-separator-grey-circle');

        function handleTopbarScroll() {
            const scrollPos = window.scrollY;
            const circlesArray = Array.from(circles);
            if (scrollPos > 0) {
                circlesArray.forEach(circle => (circle.style.transform = 'scale(0)'));
                navbar.classList.add("article-topbar-navigation-shadow-on-scroll");
                document.body.classList.add("body-bg-color-on-scroll");
            } else {
                circlesArray.forEach(circle => (circle.style.transform = 'scale(1)'));
                navbar.classList.remove("article-topbar-navigation-shadow-on-scroll");
                document.body.classList.remove("body-bg-color-on-scroll");
            }
        }

        function throttleScroll(func, limit) {
            let ticking = false;
            return function() {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        func();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
        }

        window.addEventListener('scroll', throttleScroll(handleTopbarScroll, 250));

        window.addEventListener('resize', () => {
            createSectionSeparatorCircles('#topbar-separator', 'globe-grid-section-separator-grey-circle');
            circles = topbarSeparator.getElementsByClassName('globe-grid-section-separator-grey-circle');
            handleTopbarScroll();
        });

        handleTopbarScroll();
    });
}





















// section separator

function createSectionSeparatorCircles(selector, circleClass) {
    const containers = document.querySelectorAll(selector);
    containers.forEach(container => {
        const containerWidth = container.clientWidth;
        const circleSize = 6;
        const numCircles = Math.floor(containerWidth / circleSize);
        container.innerHTML = '';
        for (let i = 0; i < numCircles; i++) {
            const circle = document.createElement('div');
            circle.classList.add(circleClass);
            container.appendChild(circle);
        }        
        if (container.lastChild) {
            container.lastChild.style.marginRight = '0';
        }
    });
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

createSectionSeparatorCircles('.globe-grid-section-separator-grey-container', 'globe-grid-section-separator-grey-circle');

window.addEventListener('resize', throttle(() => {
    createSectionSeparatorCircles('.globe-grid-section-separator-grey-container', 'globe-grid-section-separator-grey-circle');
}, 250));

// description link

window.addEventListener("load", function () {
    const updateCircles = function () {
        document.querySelectorAll(".moon-grid-link-container").forEach(function (container, index, array) {
            const link = container.querySelector(".moon-grid-link");
            const text = link.textContent.trim();
            link.innerHTML = "";
            const span = document.createElement("span");
            span.textContent = text;
            span.style.position = "relative";
            span.style.display = "inline-block";
            link.appendChild(span);
            const width = span.offsetWidth;
            const circleCount = Math.floor(width / 6);
            const underlineWidth = 6 * (circleCount + 1);
            const circleUnderline = document.createElement("div");
            circleUnderline.classList.add("moon-grid-link-circle-underline");
            circleUnderline.style.width = underlineWidth + "px";
            for (let i = 0; i < circleCount + 1; i++) {
                const circle = document.createElement("div");
                circle.classList.add("moon-grid-link-circle");
                circleUnderline.appendChild(circle);
            }
            const extraSpace = underlineWidth - width - 3;
            const paddingLeft = index === 0 ? 0 : extraSpace / 2;
            const paddingRight = index === array.length - 1 ? 0 : extraSpace / 2;
            span.style.paddingLeft = paddingLeft + "px";
            span.style.paddingRight = paddingRight + "px";
            span.appendChild(circleUnderline);
        });
    };

    updateCircles();

    let resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            requestAnimationFrame(updateCircles);
        }, 250);
    });
});

// paragraph link

let lastWindowWidth = window.innerWidth;

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function createUnderlines() {
    document.querySelectorAll(".globe-grid-link-container").forEach((container) => {
        const link = container.querySelector(".globe-grid-link");
        const existingSpans = link.querySelectorAll("span");
        if (existingSpans.length > 0) {
            existingSpans.forEach((span) => {
                const underline = span.querySelector(".globe-grid-link-circle-underline");
                if (underline) {
                    const spanWidth = span.offsetWidth;
                    const circles = Math.floor(spanWidth / 6);
                    const underlineWidth = (circles + 1) * 6;
                    underline.style.width = underlineWidth + "px";
                    const paddingAdjustment = underlineWidth - spanWidth - 3;
                    const paddingLeft = span.previousSibling ? paddingAdjustment / 2 : 0;
                    const paddingRight = span.nextSibling ? paddingAdjustment / 2 : 0;
                    span.style.paddingLeft = paddingLeft + "px";
                    span.style.paddingRight = paddingRight + "px";
                }
            });
        } else {
            const words = link.textContent.trim().split(/\s+/);
            link.innerHTML = "";
            let wordGroups = [];
            let group = '';

            words.forEach((word, index, array) => {
                if (word.length <= 2) {
                    let leftWord = group.split(' ').pop();
                    let rightWord = array[index + 1] || '';
                    if (leftWord && (leftWord.length <= rightWord.length)) {
                        group += " " + word;
                    } else {
                        if (group) {
                            wordGroups.push(group);
                            group = '';
                        }
                        word += (rightWord ? " " + rightWord : '');
                        if (rightWord) {
                            words.splice(index + 1, 1);
                        }
                        group = word;
                    }
                } else {
                    if (group) {
                        wordGroups.push(group);
                        group = '';
                    }
                    group = word;
                }
            });

            if (group) {
                wordGroups.push(group);
            }

            wordGroups.forEach((group, index) => {
                const span = document.createElement("span");
                span.textContent = group;
                span.style.position = "relative";
                span.style.display = "inline-block";
                if (index !== wordGroups.length - 1) {
                    span.style.marginRight = "3px";
                }
                link.appendChild(span);
                const underline = document.createElement("div");
                underline.classList.add("globe-grid-link-circle-underline");
                const spanWidth = span.offsetWidth;
                const circles = Math.floor(spanWidth / 6);
                const underlineWidth = (circles + 1) * 6;
                underline.style.width = underlineWidth + "px";
                for (let i = 0; i < circles + 1; i++) {
                    const circle = document.createElement("div");
                    circle.classList.add("globe-grid-link-circle");
                    underline.appendChild(circle);
                }
                const paddingAdjustment = underlineWidth - spanWidth - 3;
                const paddingLeft = index === 0 ? 0 : paddingAdjustment / 2;
                const paddingRight = index === wordGroups.length - 1 ? 0 : paddingAdjustment / 2;
                span.style.paddingLeft = paddingLeft + "px";
                span.style.paddingRight = paddingRight + "px";
                span.appendChild(underline);
            });
        }
    });
}

function createCircles(selector, circleClass) {
    // The createCircles function remains unchanged
}

createUnderlines();
createCircles(".globe-grid-section-separator-grey-container", "globe-grid-section-separator-grey-circle");

window.addEventListener("resize", throttle(function() {
    if (window.innerWidth !== lastWindowWidth) {
        lastWindowWidth = window.innerWidth;
        requestAnimationFrame(function() {
            createUnderlines();
            createCircles(".globe-grid-section-separator-grey-container", "globe-grid-section-separator-grey-circle");
        });
    }
}, 250));