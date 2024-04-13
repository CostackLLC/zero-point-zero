// article topbar navigation buttons

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.article-topbar-navigation-button, .article-topbar-navigation-close-button');
    const animationDuration = 180; // ensure this duration matches the css

    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.classList.add('active');
        });

        button.addEventListener('mouseup', () => {
            setTimeout(() => {
                button.classList.remove('active');
            }, animationDuration);
        });

        button.addEventListener('touchstart', () => {
            button.classList.add('active');
        });

        button.addEventListener('touchend', () => {
            setTimeout(() => {
                button.classList.remove('active');
            }, animationDuration);
        });
    });
});