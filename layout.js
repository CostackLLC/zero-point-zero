// article topbar navigation buttons

document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.article-topbar-navigation-button, .article-topbar-navigation-close-button');
    const animationDuration = 150; // Duration of the animation in milliseconds
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints; // Check for touch device

    buttons.forEach(button => {
        if (!isTouchDevice) {
            // Desktop events
            button.addEventListener('mousedown', function () {
                this.classList.add('active');
            });

            button.addEventListener('mouseup', function () {
                setTimeout(() => {
                    this.classList.remove('active');
                }, animationDuration);
            });

            button.addEventListener('mouseleave', function () {
                setTimeout(() => {
                    this.classList.remove('active');
                }, animationDuration);
            });
        }

        // Touch events
        button.addEventListener('touchstart', function (e) {
            // Prevent mouse events from firing
            e.preventDefault();
            this.classList.add('hover');
        });

        button.addEventListener('touchend', function (e) {
            // Prevent mouse events from firing
            e.preventDefault();
            setTimeout(() => {
                this.classList.remove('hover');
            }, animationDuration);
        });
    });
});
