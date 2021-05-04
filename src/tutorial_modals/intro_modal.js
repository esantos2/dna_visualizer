export {
    openTutorial
};

const openTutorial = () => {
    const modal = _modalTemplate();
    
    const welcomePrompt = document.createElement("div");
    welcomePrompt.setAttribute("class", "welcome-prompt");

    modal1(welcomePrompt);
    modal.appendChild(welcomePrompt);
}

const _modalTemplate = () => {
    const modalContainer = document.getElementById("modal");
    const modalBackground = document.createElement("div");
    modalBackground.setAttribute("class", "modal-back");
    modalBackground.addEventListener("click", closeModal);
    
    const modalInterior = document.createElement("div");
    modalInterior.setAttribute("class", "modal-box");
    modalInterior.addEventListener("click", e => e.stopPropagation());

    modalBackground.append(modalInterior);
    modalContainer.appendChild(modalBackground);
    return modalInterior;
}

const closeModal = (e) => {
    e.preventDefault();
    document.getElementById("modal").innerHTML = "";
}

const nextButton = (nextModal, prompt) => {
    let nextBtn = document.createElement("button");
    nextBtn.innerHTML = "Next >";
    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        nextModal(prompt);
    })
    prompt.appendChild(nextBtn);
}

const prevButton = (prevModal, prompt) => {
    let prevBtn = document.createElement("button");
    prevBtn.innerHTML = "< Prev";
    prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        prevModal(prompt);
    })
    prompt.appendChild(prevBtn);
}

const modal1 = (welcomePrompt) => {
    welcomePrompt.innerHTML = "";
    let title = document.createElement("h1");
    title.innerHTML = "Welcome to the DNA Visualizer"
    let desc = document.createElement("p");
    desc.innerHTML = "Explore and analyze DNA sequences from a variety of species and diseases"
    let newLine = document.createElement("p");
    newLine.innerHTML = "Click + Drag to select a region, then click \"Select Region\" to zoom in on your selection";
    let newImg = document.createElement("img");
    newImg.setAttribute("src", "dist/gifs/selected_seq4.gif");
    welcomePrompt.appendChild(title);
    welcomePrompt.appendChild(desc);
    welcomePrompt.appendChild(newLine);
    welcomePrompt.appendChild(newImg);
    nextButton(modal2, welcomePrompt);
}

const modal2 = (welcomePrompt) => {
    welcomePrompt.innerHTML = "";
    let newLine = document.createElement("p");
    newLine.innerHTML = "Highlight different bases using filters";
    let newImg = document.createElement("img");
    newImg.setAttribute("src", "dist/gifs/filter3.gif");
    welcomePrompt.appendChild(newLine);
    welcomePrompt.appendChild(newImg);
    prevButton(modal1, welcomePrompt);
    nextButton(modal3, welcomePrompt);
}

const modal3 = (welcomePrompt) => {
    welcomePrompt.innerHTML = "";
    let newLine = document.createElement("p");
    newLine.innerHTML = "Bar charts and the 3D model provide more to explore and update with new selections";
    let images = document.createElement("div");
    images.setAttribute("class", "last-modal-images");
    let newImg1 = document.createElement("img");
    newImg1.setAttribute("src", "dist/gifs/charts1.gif");
    let newImg2 = document.createElement("img");
    newImg2.setAttribute("src", "dist/gifs/strand2.gif");
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
    prevButton(modal2, welcomePrompt);
    welcomePrompt.appendChild(startBtn);
}