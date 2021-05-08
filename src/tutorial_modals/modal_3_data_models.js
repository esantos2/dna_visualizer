// Modal 3: demo bar charts and 3D model

import { createImageElement, createElementWithClass } from '../util';
import { getNavigationButton, closeModal, BUTTON_TEXT } from './create_modals';
import { get_modal_2_elements } from './modal_2_filters';

export const get_modal_3_elements = (modalContainer) => {
    const dataModelsText = getDesc();
    const dataModelsImages = getImages();
    const prevBtn = getNavigationButton(modalContainer, get_modal_2_elements, BUTTON_TEXT.PREV_ARROW);
    const startBtn = createStartButton();
    return [dataModelsText, dataModelsImages, prevBtn, startBtn];
}

const getDesc = () => {
    const desc = document.createElement("p");
    desc.innerHTML = "Bar charts and the 3D model provide more to explore and update with new selections";
    return desc;
}

const getImages = () => {
    const images = createElementWithClass("div", "last-modal-images");
    const newImg1 = createImageElement("dist/gifs/charts1.gif");
    const newImg2 = createImageElement("dist/gifs/strand2.gif");
    images.appendChild(newImg1);
    images.appendChild(newImg2);
    return images;
}

const createStartButton = () => {
    const startBtn = document.createElement("button");
    startBtn.innerHTML = BUTTON_TEXT.START;
    startBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(e);
    });
    return startBtn;
}