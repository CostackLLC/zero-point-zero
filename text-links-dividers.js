// links

window.addEventListener('load', function () {
    function createMoonGridLinkCircles() {
        document.querySelectorAll('.moon-grid-link-container').forEach((linkContainer, containerIndex, containerArray) => {
            const link = linkContainer.querySelector('.moon-grid-link');
            const linkText = link.textContent.trim();
            link.innerHTML = '';
            const groupElement = document.createElement('span');
            groupElement.textContent = linkText;
            groupElement.style.position = 'relative';
            groupElement.style.display = 'inline-block';
            link.appendChild(groupElement);
            const linkWidth = groupElement.offsetWidth;
            const circleDiameter = 3;
            const circleMargin = 3;
            const circleTotalWidth = circleDiameter + circleMargin;
            const numCircles = Math.floor(linkWidth / circleTotalWidth);
            const extraCircle = 1;
            const totalCirclesWidth = (numCircles + extraCircle) * circleTotalWidth;
            const underline = document.createElement('div');
            underline.classList.add('moon-grid-link-circle-underline');
            underline.style.width = totalCirclesWidth + 'px';
            for (let i = 0; i < numCircles + extraCircle; i++) {
                const circle = document.createElement('div');
                circle.classList.add('moon-grid-link-circle');
                underline.appendChild(circle);
            }
            const spaceDifference = totalCirclesWidth - linkWidth - circleDiameter;
            const paddingLeft = containerIndex === 0 ? 0 : spaceDifference / 2;
            const paddingRight = containerIndex === containerArray.length - 1 ? 0 : spaceDifference / 2;
            groupElement.style.paddingLeft = paddingLeft + 'px';
            groupElement.style.paddingRight = paddingRight + 'px';
            groupElement.appendChild(underline);
        });
    }
    createMoonGridLinkCircles();
    window.addEventListener('resize', function () {
        document.querySelectorAll('.moon-grid-link span').forEach((span, spanIndex, spanArray) => {
            const underline = span.querySelector('.moon-grid-link-circle-underline');
            if (underline) {
                span.removeChild(underline);
            }
            const linkWidth = span.offsetWidth;
            const circleDiameter = 3;
            const circleMargin = 3;
            const circleTotalWidth = circleDiameter + circleMargin;
            const numCircles = Math.floor(linkWidth / circleTotalWidth);
            const extraCircle = 1;
            const totalCirclesWidth = (numCircles + extraCircle) * circleTotalWidth;
            const newUnderline = document.createElement('div');
            newUnderline.classList.add('moon-grid-link-circle-underline');
            newUnderline.style.width = totalCirclesWidth + 'px';
            for (let i = 0; i < numCircles + extraCircle; i++) {
                const circle = document.createElement('div');
                circle.classList.add('moon-grid-link-circle');
                newUnderline.appendChild(circle);
            }
            const spaceDifference = totalCirclesWidth - linkWidth - circleDiameter;
            const paddingLeft = spanIndex === 0 ? 0 : spaceDifference / 2;
            const paddingRight = spanIndex === spanArray.length - 1 ? 0 : spaceDifference / 2;
            span.style.paddingLeft = paddingLeft + 'px';
            span.style.paddingRight = paddingRight + 'px';
            span.appendChild(newUnderline);
        });
    });
});



window.addEventListener('load', function () {
    function createGlobeGridLinkCircles() {
        document.querySelectorAll('.globe-grid-link-container').forEach((linkContainer, containerIndex, containerArray) => {
            const link = linkContainer.querySelector('.globe-grid-link');
            const words = link.textContent.trim().split(/\s+/);
            link.innerHTML = '';
            let groupedWords = [];
            for (let i = 0; i < words.length; i++) {
                if (words[i].length <= 3 && groupedWords.length > 0 && (groupedWords[groupedWords.length - 1] + ' ' + words[i]).length <= 6) {
                    groupedWords[groupedWords.length - 1] += ' ' + words[i];
                } else if (words[i].length <= 3 && i < words.length - 1 && (words[i] + ' ' + words[i + 1]).length <= 6) {
                    groupedWords.push(words[i] + ' ' + words[++i]);
                } else if (words[i].length <= 3 && i === words.length - 1 && groupedWords.length > 0) {
                    groupedWords[groupedWords.length - 1] += ' ' + words[i];
                } else if (words[i].length <= 3 && i < words.length - 1) {
                    groupedWords.push(words[i] + ' ' + words[++i]);
                } else {
                    groupedWords.push(words[i]);
                }
            }
            groupedWords.forEach((group, index) => {
                const groupElement = document.createElement('span');
                groupElement.textContent = group;
                groupElement.style.position = 'relative';
                groupElement.style.display = 'inline-block';
                if (index !== groupedWords.length - 1) {
                    groupElement.style.marginRight = '3px';
                }
                link.appendChild(groupElement);
                const linkWidth = groupElement.offsetWidth;
                const circleDiameter = 3;
                const circleMargin = 3;
                const circleTotalWidth = circleDiameter + circleMargin;
                const numCircles = Math.floor(linkWidth / circleTotalWidth);
                const extraCircle = 1;
                const totalCirclesWidth = (numCircles + extraCircle) * circleTotalWidth;
                const underline = document.createElement('div');
                underline.classList.add('globe-grid-link-circle-underline');
                underline.style.width = totalCirclesWidth + 'px';
                for (let i = 0; i < numCircles + extraCircle; i++) {
                    const circle = document.createElement('div');
                    circle.classList.add('globe-grid-link-circle');
                    underline.appendChild(circle);
                }
                const spaceDifference = totalCirclesWidth - linkWidth - circleDiameter;
                const paddingLeft = containerIndex === 0 ? 0 : spaceDifference / 2;
                const paddingRight = containerIndex === containerArray.length - 1 ? 0 : spaceDifference / 2;
                groupElement.style.paddingLeft = paddingLeft + 'px';
                groupElement.style.paddingRight = paddingRight + 'px';
                groupElement.appendChild(underline);
            });
        });
    }
    createGlobeGridLinkCircles();
    window.addEventListener('resize', function () {
        document.querySelectorAll('.globe-grid-link span').forEach((span, spanIndex, spanArray) => {
            const underline = span.querySelector('.globe-grid-link-circle-underline');
            if (underline) {
                span.removeChild(underline);
            }
            const linkWidth = span.offsetWidth;
            const circleDiameter = 3;
            const circleMargin = 3;
            const circleTotalWidth = circleDiameter + circleMargin;
            const numCircles = Math.floor(linkWidth / circleTotalWidth);
            const extraCircle = 1;
            const totalCirclesWidth = (numCircles + extraCircle) * circleTotalWidth;
            const newUnderline = document.createElement('div');
            newUnderline.classList.add('globe-grid-link-circle-underline');
            newUnderline.style.width = totalCirclesWidth + 'px';
            for (let i = 0; i < numCircles + extraCircle; i++) {
                const circle = document.createElement('div');
                circle.classList.add('globe-grid-link-circle');
                newUnderline.appendChild(circle);
            }
            const spaceDifference = totalCirclesWidth - linkWidth - circleDiameter;
            const paddingLeft = spanIndex === 0 ? 0 : spaceDifference / 2;
            const paddingRight = spanIndex === spanArray.length - 1 ? 0 : spaceDifference / 2;
            span.style.paddingLeft = paddingLeft + 'px';
            span.style.paddingRight = paddingRight + 'px';
            span.appendChild(newUnderline);
        });
    });
});


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
