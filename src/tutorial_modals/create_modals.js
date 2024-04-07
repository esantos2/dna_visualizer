// main driver file for modal display

import { createElementWithClass } from '../util';
import { get_modal_1_elements } from './modal_1_region_select';

export { openTutorial, getNavigationButton, closeModal, BUTTON_TEXT };

const BUTTON_TEXT = {
    PREV_ARROW: '< Prev',
    NEXT_ARROW: 'Next >',
    START: 'Get Started',
};

const openTutorial = () => {
    //creates modal template and displays the first modal
    const modalTemplate = _modalTemplate();
    const modalContainer = createElementWithClass('div', 'welcome-prompt');
    _createModal(modalContainer, get_modal_1_elements);
    modalTemplate.appendChild(modalContainer);
};

const closeModal = (e) => {
    //exits tutorial modal screen
    e.preventDefault();
    document.getElementById('modal').innerHTML = '';
};

const getNavigationButton = (
    container,
    nextModalElements,
    buttonTextDirection,
) => {
    //creates button that creates other modals on click
    const arrowBtn = document.createElement('button');
    arrowBtn.innerHTML = buttonTextDirection;
    arrowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        _createModal(container, nextModalElements);
    });
    return arrowBtn;
};

const _modalTemplate = () => {
    //creates modal container, background, and interior for modal contents to be displayed
    const modalContainer = document.getElementById('modal');

    const modalBackground = createElementWithClass('div', 'modal-back');
    modalBackground.addEventListener('click', closeModal);

    const modalInterior = createElementWithClass('div', 'modal-box');
    modalInterior.addEventListener('click', (e) => e.stopPropagation());

    modalBackground.append(modalInterior);
    modalContainer.appendChild(modalBackground);
    return modalInterior;
};

const _createModal = (modalContainer, getModalElements) => {
    //adds modal elements to the container for display
    modalContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    getModalElements(modalContainer).forEach((ele) =>
        fragment.appendChild(ele),
    );
    modalContainer.appendChild(fragment);
};
