















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

// Throttle function to limit the rate at which a function can fire.
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

// Initial call on load
createCircles('.globe-grid-section-separator-grey-container', 'globe-grid-section-separator-grey-circle');

// Optimized resize event listener using throttle
window.addEventListener('resize', throttle(function () {
    requestAnimationFrame(function () {
        createCircles('.globe-grid-section-separator-grey-container', 'globe-grid-section-separator-grey-circle');
    });
}, 250));