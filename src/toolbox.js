import * as Util from './util';

export const drawToolBox = () => {
    let toolbox = document.getElementById("toolbox");

    //clear overlay
    let clearBtn = document.createElement("button");
    clearBtn.innerHTML = "Clear";
    clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        Util.clearCanvas(document.getElementById("overlay"));
    });
    toolbox.appendChild(clearBtn);

    //reset seq
    let reset = document.createElement("button");
    reset.innerHTML = "Reset";
    reset.addEventListener("click", (e) => {
        e.preventDefault();
        
    })
}

export const showBaseInfo = (event) => {
    let tooltip = document.getElementById("tooltip");
    let ctx = tooltip.getContext('2d');

    //draw rect
    Util.clearCanvas(tooltip);
    let xCoord = Util.getMouseCoord(event);
    let width = 10;
    ctx.fillStyle = "#757575";
    ctx.fillRect(xCoord - width, 0, width, tooltip.height);

    //display tool tip info

}