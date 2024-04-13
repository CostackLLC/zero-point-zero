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
