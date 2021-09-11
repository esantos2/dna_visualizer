export const clearCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export const getMouseCoord = (event) => {
    const seqBox = document.getElementById("main-seq");
    if (event.touches){
        return event.touches[0].pageX - seqBox.offsetLeft;
    }
    return event.clientX - seqBox.offsetLeft;
}

export const toggleFilters = (e) => {
    e.preventDefault();
    document.getElementById("base-toggle").classList.toggle("show-filters");
}

export const toggleToolTip = () => {
    document.getElementById("tool-top").classList.toggle("show-tip");
}

export const clearBottomToolTips = () => {
    document.getElementById("tool-btm-container").innerHTML = "";
}

export const disableBtn = (btn) => {
    btn.setAttribute("disabled", true);
    btn.classList.add("disabled-btn");
}

export const closeDropdowns = () => {
    document.getElementById("seq-selection").classList.remove("show-list");
    document.getElementById("seq-selection-mobile").classList.remove("show-list");
}

export const createElementWithClass = (elementType, className) => {
    const newElement = document.createElement(elementType);
    newElement.setAttribute("class", className);
    return newElement;
}

export const createImageElement = (imgLink) => {
    const newImg = document.createElement("img");
    newImg.setAttribute("src", imgLink);
    return newImg;
}