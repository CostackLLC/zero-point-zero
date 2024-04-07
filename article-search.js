/* article search bar pannel */

.aa-Autocomplete {
    display: flex;
    justify-content: center;
}

#article-search-panel {
    position: fixed;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 64px;
    right: 0;
    z-index: 9999999;
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    transform: translateY(-120%);
    will-change: transform;
}

#article-search-panel.show {
    transform: translateY(0);
}

.article-left-view-image-wrapper {
    transition: filter 0.3s;
}

.article-left-view-image-wrapper.greyscale {
    filter: grayscale(100%);
}

.aa-ClearIcon {
    display: none;
}

.close-button {
    background-color: transparent;
    cursor: pointer;
    width: 20px;
    height: 20px;
    padding: 0;
}

.close-button svg {
    transition: fill 0.075s;
}

.autocomplete-record-container {
    display: flex;
    text-decoration: none;
}

.autocomplete-record-details {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: -4px 20px 0 0;
}

.autocomplete-item-title {
    font-family: 'DM Serif Display Regular';
    font-size: 25px;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: 0.8px;
    margin-bottom: 6px;
}

.autocomplete-item-subtitle {
    font-family: "DM Sans", sans-serif;
    color: var(--alt-text);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: .2px;
    text-align: left;
    margin-bottom: 3px;
}

.autocomplete-item-topic {
    display: inline-block;
    position: relative;
    font-family: "DM Sans", sans-serif;
    color: var(--black);
    text-align: left;
    letter-spacing: .3px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    left: -1px;
}

.autocomplete-item-topic::before {
    content: "chevron_right";
    font-family: "Material Symbols Rounded (Google)", sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 1.6;
    letter-spacing: .2px;
    color: var(--black);
    position: relative;
    top: 3px;
    left: -3px;
}

.autocomplete-item-thumbnail-container {
    width: 100px;
    height: 130px;
    min-width: 100px;
    min-height: 130px;
    margin-left: auto;
}

.autocomplete-item-thumbnail {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.aa-SourceNoResults {
    padding: 0;
}

.no-results-record-container {
    padding: 15px;
    border-radius: 12px;
    transition: background-color .1s;
}


.aa-Panel {
    position: fixed;
    top: 108px !important;
    display: flex;
    justify-content: center;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    z-index: 9999999;
}

.aa-PanelLayout,
.aa-Panel--scrollable {
    padding: 15px 2px 15px 15px;
    max-width: 600px;
    height: calc(100vh - 108px) !important;
    max-height: none;
}

.aa-Item {
    padding: 15px;
    border-radius: 12px;
    transition: background-color .1s;
}

.aa-InputWrapperPrefix {
    position: relative;
    right: 28px;
    order: 2;
}

.aa-SubmitButton {
    display: none;
}

.aa-Label svg {
    color: var(--black);
}

.aa-LoadingIndicator {
    position: relative;
    right: 1px;
}

.aa-InputWrapper {
    position: relative;
    margin-right: 58px;
    left: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    order: 1;
}

.aa-InputWrapperSuffix {
    position: relative;
    right: 28px;
    order: 3;
}

.close-button-container {
    position: relative;
    padding: 0px;
    right: 28px;
    order: 3;
}

.aa-Form {
    border: none;
    max-width: 600px;
    margin: 0 28px;
}

.aa-Form:hover {
    border: none;
}

.aa-Form:focus-visible {
    border: none;
}

.aa-Form:focus-within {
    border: none;
    box-shadow: none;
}

.aa-Input {
    position: relative;
    bottom: 1px;
    font-family: monospace, sans-serif;
}

.aa-GradientBottom {
    display: none;
}






.aa-ClearButton {
    font-family: "DM Sans", sans-serif;
    position: relative;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.7px;
    padding: 0;
    max-height: 20px;
    bottom: 1px;
    transition: color 0.075s;
}















.aa-ClearButton:focus-visible {
    outline: none;
}

/* custom search input caret */

.letter {
    display: flex;
    justify-content: center;
    min-height: 23px;
    align-content: center;
    flex-wrap: wrap;
    font-family: monospace, sans-serif;
}

.caret {
    display: flex;
    justify-content: center;
    min-height: 23px;
    align-content: center;
    flex-wrap: wrap;
}

/* mobile */
@media only screen and (max-width: 680px) {
    .aa-DetachedSearchButton {
        background-color: var(--black);
        border-color: rgb(255 255 255 / 60%);
        border-width: 2px;
    }

    .aa-SubmitIcon,
    .aa-DetachedCancelButton {
        color: var(--white);
    }

    .aa-DetachedSearchButtonPlaceholder {
        color: rgba(255, 255, 255, 0.45);
    }

    .aa-DetachedContainer {
        background-color: var(--black);
    }
}
