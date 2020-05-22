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

export const toggleNewSeqButton = () => {
    document.getElementById("new-seq-btn").classList.toggle("enable-btn");
}