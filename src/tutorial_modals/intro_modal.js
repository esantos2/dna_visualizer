import { createElementWithClass, createImageElement } from '../util';

export {
    openTutorial
};

const PREV_ARROW = "< Prev";
const NEXT_ARROW = "Next >";

const openTutorial = () => {
    const modal = _modalTemplate();
    const welcomePrompt = createElementWithClass("div", "welcome-prompt");
    modal1(welcomePrompt);
    modal.appendChild(welcomePrompt);
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

const addNavigationButton = (buildNextModal, modalContext, buttonTextDirection) => {
    let arrowBtn = document.createElement("button");
    arrowBtn.innerHTML = buttonTextDirection;
    arrowBtn.addEventListener("click", (e) => {
        e.preventDefault();
        buildNextModal(modalContext);
    });
    modalContext.appendChild(arrowBtn);
}

const modal1 = (welcomePrompt) => {
    welcomePrompt.innerHTML = "";
    let title = document.createElement("h1");
    title.innerHTML = "Welcome to the DNA Visualizer"
    let desc = document.createElement("p");
    desc.innerHTML = "Explore and analyze DNA sequences from a variety of species and diseases"
    let newLine = document.createElement("p");
    newLine.innerHTML = "Click + Drag to select a region, then click \"Select Region\" to zoom in on your selection";
    const newImg = createImageElement("dist/gifs/selected_seq4.gif");
    welcomePrompt.appendChild(title);
    welcomePrompt.appendChild(desc);
    welcomePrompt.appendChild(newLine);
    welcomePrompt.appendChild(newImg);
    addNavigationButton(modal2, welcomePrompt, NEXT_ARROW);
}

const modal2 = (welcomePrompt) => {
    welcomePrompt.innerHTML = "";
    let newLine = document.createElement("p");
    newLine.innerHTML = "Highlight different bases using filters";
    const newImg = createImageElement("dist/gifs/filter3.gif");
    welcomePrompt.appendChild(newLine);
    welcomePrompt.appendChild(newImg);
    addNavigationButton(modal1, welcomePrompt, PREV_ARROW);
    addNavigationButton(modal3, welcomePrompt, NEXT_ARROW);
}

const modal3 = (welcomePrompt) => {
    welcomePrompt.innerHTML = "";
    let newLine = document.createElement("p");
    newLine.innerHTML = "Bar charts and the 3D model provide more to explore and update with new selections";
    const images = createElementWithClass("div", "last-modal-images");
    const newImg1 = createImageElement("dist/gifs/charts1.gif");
    const newImg2 = createImageElement("dist/gifs/strand2.gif");
    images.appendChild(newImg1);
    images.appendChild(newImg2);
    let startBtn = document.createElement("button");
    startBtn.innerHTML = "Get Started";
    startBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(e);
    })
    welcomePrompt.appendChild(newLine);
    welcomePrompt.appendChild(images);
    addNavigationButton(modal2, welcomePrompt, PREV_ARROW);
    welcomePrompt.appendChild(startBtn);
}