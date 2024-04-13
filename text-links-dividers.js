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

// separator

function createCircles(selector, circleClass) {
    const containers = document.querySelectorAll(selector);
    containers.forEach((container) => {
        const containerWidth = container.clientWidth;
        const numCircles = Math.floor(containerWidth / 6);
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

createCircles('.globe-grid-section-separator-grey-container', 'globe-grid-section-separator-grey-circle');

window.addEventListener('resize', throttle(function () {
    requestAnimationFrame(function () {
        createCircles('.globe-grid-section-separator-grey-container', 'globe-grid-section-separator-grey-circle');
    });
}, 250));