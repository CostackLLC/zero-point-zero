// theme toggle
function setThemeFromCookie() {
    document.body.className = isThemeSelected() ? 'dark-mode' : '';
}

function setThemeSwitchState() {
    const isDarkMode = isThemeSelected();
    updateIconsDisplay(isDarkMode); // Set the initial display state of all icons
}

function isThemeSelected() {
    const hasDarkCookie = document.cookie.match(/theme=dark/i) != null;
    const hasLightCookie = document.cookie.match(/theme=light/i) != null;
    return hasDarkCookie ? true : hasLightCookie ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function toggleTheme() {
    const isDarkMode = !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode');
    document.cookie = 'theme=' + (isDarkMode ? 'dark' : 'light');
    updateIconsDisplay(isDarkMode); // Update the display state of all icons when the theme is toggled
}

function updateIconsDisplay(isDarkMode) {
    // Define the icon pairs for light and dark themes
    const iconPairs = {
        'account': ['topbar-button-icon-light-theme-account', 'topbar-button-icon-dark-theme-account'],
        'search': ['topbar-button-icon-light-theme-search', 'topbar-button-icon-dark-theme-search'],
        'toc': ['topbar-button-icon-light-theme-toc', 'topbar-button-icon-dark-theme-toc'],
        'comments': ['topbar-button-icon-light-theme-comments', 'topbar-button-icon-dark-theme-comments'],
        'theme-toggle': ['topbar-button-icon-light-theme-theme-toggle', 'topbar-button-icon-dark-theme-theme-toggle']
    };

    // Iterate over each icon pair and update their display based on the current theme
    for (const [iconType, ids] of Object.entries(iconPairs)) {
        const lightIcon = document.getElementById(ids[0]);
        const darkIcon = document.getElementById(ids[1]);
        if (lightIcon && darkIcon) {
            lightIcon.style.display = isDarkMode ? 'none' : 'block';
            darkIcon.style.display = isDarkMode ? 'block' : 'none';
        }
    }
}

(function () {
    setThemeFromCookie();
    setThemeSwitchState();
    // Attach the toggleTheme function to the theme toggle button
    document.querySelector('.article-topbar-navigation-button.toggle-theme').onclick = toggleTheme;
})();