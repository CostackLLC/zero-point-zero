// article topbar navigation buttons

document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.article-topbar-navigation-button, .article-topbar-navigation-close-button');
    const animationDuration = 150; // Duration of the animation in milliseconds

    buttons.forEach(button => {
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

        // For touch devices
        button.addEventListener('touchstart', function () {
            this.classList.add('active');
        });

        button.addEventListener('touchend', function () {
            setTimeout(() => {
                this.classList.remove('active');
            }, animationDuration);
        });
    });
});