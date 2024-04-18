// removing elements from the dom and prevent scripts from executing (on mobile)

document.addEventListener("DOMContentLoaded", function() {
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    var isMobile = window.matchMedia("only screen and (max-width: 767px)").matches;

    if (isMobile && isMobileDevice()) {
        // Remove elements for mobile devices (add with comma)
        var containers = [
            '.article-left-view-container'
        ];
        containers.forEach(function(containerClass) {
            var container = document.querySelector(containerClass);
            if (container) {
                container.parentNode.removeChild(container);
            }
        });

        // Prevent specific scripts from loading (add with comma)
        var scriptsToPrevent = [
            'https://cdn.jsdelivr.net/gh/costackllc/zero-point-zero@v0.0.80/article-left-view.js'
        ];
        scriptsToPrevent.forEach(function(src) {
            var scripts = document.querySelectorAll('script[src="' + src + '"]');
            scripts.forEach(function(script) {
                script.parentNode.removeChild(script);
            });
        });
    }
});