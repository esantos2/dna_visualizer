import { createElementWithClass, createImageElement } from '../util';

export {
    openTutorial
};

const BUTTON_TEXT = {
    PREV_ARROW: "< Prev",
    NEXT_ARROW: "Next >",
    START: "Get Started"
};

const MODAL_TEXT = {
    TITLE: "Welcome to the DNA Visualizer",
    OVERVIEW: "Explore and analyze DNA sequences from a variety of species and diseases",
    REGION_SELECT: "Click + Drag to select a region, then click \"Select Region\" to zoom in on your selection",
    FILTERS: "Highlight different bases using filters",
    DATA_MODELS: "Bar charts and the 3D model provide more to explore and update with new selections"
};

const openTutorial = () => {
    const modalTemplate = _modalTemplate();
    const modalContainer = createElementWithClass("div", "welcome-prompt");
    createModal(modalContainer, get_modal_1_elements);
    modalTemplate.appendChild(modalContainer);
}

const _modalTemplate = () => {
    const modalContainer = document.getElementById("modal");
    
    const modalBackground = createElementWithClass("div", "modal-back");
    modalBackground.addEventListener("click", closeModal);
    
    const modalInterior = createElementWithClass("div", "modal-box");
    modalInterior.addEventListener("click", e => e.stopPropagation());

    modalBackground.append(modalInterior);
    modalContainer.appendChild(modalBackground);
    return modalInterior;
}

const closeModal = (e) => {
    e.preventDefault();
    document.getElementById("modal").innerHTML = "";
}

const getNavigationButton = (container, nextModalElements, buttonTextDirection) => {
    const arrowBtn = document.createElement("button");
    arrowBtn.innerHTML = buttonTextDirection;
    arrowBtn.addEventListener("click", (e) => {
        e.preventDefault();
        createModal(container, nextModalElements);
    });
    return arrowBtn;
}

const createModal = (modalContainer, getModalElements) => {
    modalContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    getModalElements(modalContainer).forEach(ele => fragment.appendChild(ele));
    modalContainer.appendChild(fragment);
}

const get_modal_1_elements = (modalContainer) => {
    const title = document.createElement("h1");
    title.innerHTML = MODAL_TEXT.TITLE;
    const overview = document.createElement("p");
    overview.innerHTML = MODAL_TEXT.OVERVIEW;
    const regionSelectText = document.createElement("p");
    regionSelectText.innerHTML = MODAL_TEXT.REGION_SELECT;
    const regionSelectImg = createImageElement("dist/gifs/selected_seq4.gif");
    const nextModalBtn = getNavigationButton(modalContainer, get_model_2_elements, BUTTON_TEXT.NEXT_ARROW);
    return [title, overview, regionSelectText, regionSelectImg, nextModalBtn];
}

const get_model_2_elements = (modalContainer) => {
    const filtersText = document.createElement("p");
    filtersText.innerHTML = MODAL_TEXT.FILTERS;
    const newImg = createImageElement("dist/gifs/filter3.gif");
    const prevBtn = getNavigationButton(modalContainer, get_modal_1_elements, BUTTON_TEXT.PREV_ARROW);
    const nextBtn = getNavigationButton(modalContainer, get_modal_3_elements, BUTTON_TEXT.NEXT_ARROW);
    return [filtersText, newImg, prevBtn, nextBtn];
}

const get_modal_3_elements = (modalContainer) => {
    const dataModelsText = document.createElement("p");
    dataModelsText.innerHTML = MODAL_TEXT.DATA_MODELS;

    const images = createElementWithClass("div", "last-modal-images");
    const newImg1 = createImageElement("dist/gifs/charts1.gif");
    const newImg2 = createImageElement("dist/gifs/strand2.gif");
    images.appendChild(newImg1);
    images.appendChild(newImg2);

    const prevBtn = getNavigationButton(modalContainer, get_model_2_elements, BUTTON_TEXT.PREV_ARROW);

    const startBtn = document.createElement("button");
    startBtn.innerHTML = BUTTON_TEXT.START;
    startBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(e);
    });

    return [dataModelsText, images, prevBtn, startBtn];
}