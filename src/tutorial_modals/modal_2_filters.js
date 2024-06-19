// Modal 2: demo base filters

import { createImageElement } from '../util';
import { getNavigationButton, BUTTON_TEXT } from './create_modals';
import { get_modal_1_elements } from './modal_1_region_select';
import { get_modal_3_elements } from './modal_3_data_models';

export const get_modal_2_elements = (modalContainer) => {
    const filtersText = getDesc();
    const filtersImg = getImg();
    const prevBtn = getNavigationButton(modalContainer, get_modal_1_elements, BUTTON_TEXT.PREV_ARROW);
    const nextBtn = getNavigationButton(modalContainer, get_modal_3_elements, BUTTON_TEXT.NEXT_ARROW);
    return [filtersText, filtersImg, prevBtn, nextBtn];
};

const getDesc = () => {
    const desc = document.createElement('p');
    desc.innerHTML = 'Highlight different bases using filters';
    return desc;
};

const getImg = () => {
    return createImageElement('dist/gifs/filter3.gif');
};
