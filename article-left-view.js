// Section Visibility Detection and Dynamic Image Container Positioning

function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    };
}

function getVisibleSection() {
    var sections = document.querySelectorAll('.article-section');
    var offset = 64; // Offset value for visibility detection
    var scrollPosition = window.scrollY || window.pageYOffset;
    var pastFirstSection = false;

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionPosition = section.getBoundingClientRect();
        if (i === 0 && sectionPosition.bottom < offset) {
            pastFirstSection = true;
        }
        if (sectionPosition.top - offset <= window.innerHeight && sectionPosition.bottom - offset >= 0) {
            return { section: section, index: i, pastFirstSection: pastFirstSection };
        }
    }
    return { pastFirstSection: pastFirstSection };
}

function updateImageContainerPosition() {
    var visibleSectionInfo = getVisibleSection();
    var imageContainer = document.querySelector('.article-left-view-image-container');
    var translateYValue = -100 * visibleSectionInfo.index;
    var currentTranslateY = parseFloat(getComputedStyle(imageContainer).transform.split(',')[5]) || 0;
    var distanceToTravel = Math.abs(currentTranslateY - translateYValue);
    var animationDuration = Math.min(0.2 + (distanceToTravel / 100), 1.0);

    requestAnimationFrame(() => {
        imageContainer.style.transition = `transform ${animationDuration}s ease-in-out`;
        imageContainer.style.transform = `translateY(${translateYValue}vh)`;
    });
}

var debouncedUpdateImageContainerPosition = debounce(updateImageContainerPosition, 10);
window.addEventListener('scroll', debouncedUpdateImageContainerPosition);
