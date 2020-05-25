export const openModal = () => {
    //setup modal
    let modal = document.getElementById("modal");

    let modalBack = document.createElement("div");
    modalBack.setAttribute("class", "modal-back");
    modalBack.addEventListener("click", closeModal);
    
    let modalBox = document.createElement("div");
    modalBox.setAttribute("class", "modal-box");
    modalBox.addEventListener("click", e => e.stopPropagation());
    
    let welcomePrompt = document.createElement("div");
    welcomePrompt.setAttribute("class", "welcome-prompt");

    //contents
    modal1(welcomePrompt);

    //add to html
    modalBox.appendChild(welcomePrompt);
    modalBack.appendChild(modalBox);
    modal.appendChild(modalBack);
}

export const closeModal = (e) => {
    e.preventDefault();
    document.getElementById("modal").innerHTML = "";
}

const nextButton = (nextModal, prompt) => {
    let nextBtn = document.createElement("button");
    nextBtn.innerHTML = ">";
    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        nextModal(prompt);
    })
    prompt.appendChild(nextBtn);
}

const prevButton = (prevModal, prompt) => {
    let prevBtn = document.createElement("button");
    prevBtn.innerHTML = "<";
    prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        prevModal(prompt);
    })
    prompt.appendChild(prevBtn);
}

export const modal1 = (welcomePrompt) => {
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

export const modal2 = (welcomePrompt) => {
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

export const modal3 = (welcomePrompt) => {
    welcomePrompt.innerHTML = "";
    let newLine = document.createElement("p");
    newLine.innerHTML = "Bar charts and the 3D model provide more to explore and update with new selections";
    let newImg1 = document.createElement("img");
    newImg1.setAttribute("src", "dist/gifs/charts1.gif");
    let newImg2 = document.createElement("img");
    newImg2.setAttribute("src", "dist/gifs/strand2.gif");
    let startBtn = document.createElement("button");
    startBtn.innerHTML = "Get Started";
    startBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(e);
    })
    welcomePrompt.appendChild(newLine);
    welcomePrompt.appendChild(newImg1);
    welcomePrompt.appendChild(newImg2);
    prevButton(modal2, welcomePrompt);
    welcomePrompt.appendChild(startBtn);
}