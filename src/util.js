export const clearCanvas = (canvas) => {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export const getMouseCoord = (event) => {
    let seqBox = document.getElementById("main-seq");
    return event.clientX - seqBox.offsetLeft;
}

export const toggleDropdown = (e) => {
    e.preventDefault();
    document.getElementById("seq-selection").classList.toggle("show-list");
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