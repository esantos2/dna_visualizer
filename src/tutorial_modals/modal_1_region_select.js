import { createImageElement } from '../util';
import { getNavigationButton, BUTTON_TEXT } from './create_modals';
import { get_modal_2_elements } from './modal_2_filters';

export const get_modal_1_elements = (modalContainer) => {
    const introText = getIntro();
    const regionSelectText = getDesc();
    const regionSelectImg = getImg();
    const nextModalBtn = getNavigationButton(modalContainer, get_modal_2_elements, BUTTON_TEXT.NEXT_ARROW);
    return [ ...introText, regionSelectText, regionSelectImg, nextModalBtn];
}

const getIntro = () => {
    const title = document.createElement("h1");
    title.innerHTML = "Welcome to the DNA Visualizer";
    const overview = document.createElement("p");
    overview.innerHTML = "Explore and analyze DNA sequences from a variety of species and diseases";
    return [title, overview];
}

const getDesc = () => {
    const desc = document.createElement("p");
    desc.innerHTML = "Click + Drag to select a region, then click \"Select Region\" to zoom in on your selection";
    return desc;
}

const getImg = () => {
    return createImageElement("dist/gifs/selected_seq4.gif");
}