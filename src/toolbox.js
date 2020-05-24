import * as Util from './util';
import { displaySeq } from './display_seq';

class ToolBox{
    constructor(selected){
        this.selected = selected;
        this.toolbox = document.getElementById("toolbox");
    }

    drawToolBox(){
        this.toolbox.innerHTML = "";
        this.createSelectionButtons();
    }

    createSelectionButtons(){
        //clear overlay
        let clearBtn = document.createElement("button");
        clearBtn.innerHTML = "Clear";
        clearBtn.addEventListener("click", (e) => {
            e.preventDefault();
            Util.clearCanvas(document.getElementById("overlay")); //clear overlay
            Util.clearBottomToolTips(); //clear tooltips
            let submitButton = document.getElementById("new-seq-btn");
            submitButton.setAttribute("disabled", true); //disable selection button
            submitButton.classList.add("disabled-btn");
        });
        this.toolbox.appendChild(clearBtn);

        //reset seq
        let reset = document.createElement("button");
        reset.innerHTML = "Reset";
        reset.setAttribute("id", "reset");
        reset.setAttribute("disabled", true); //disabled by default
        reset.setAttribute("class", "disabled-btn");
        reset.addEventListener("click", (e) => {
            e.preventDefault();
            Util.clearBottomToolTips();
            reset.setAttribute("disabled", true);
            displaySeq(this.selected);
        })
        this.toolbox.appendChild(reset);

        //submit selection
        let handleSelection = document.createElement("button");
        handleSelection.innerHTML = "Select Region";
        handleSelection.setAttribute("id", "new-seq-btn");
        handleSelection.setAttribute("class", "new-seq-btn disabled-btn"); //disabled by default
        handleSelection.setAttribute("disabled", true);
        this.toolbox.appendChild(handleSelection);

        //filters
        let filters = document.createElement("button");
        filters.innerHTML = "Filters";
        filters.addEventListener("click", (e) => {
            e.preventDefault();
            Util.toggleFilters(e);
        });
        this.toolbox.appendChild(filters);
    }

    showBaseInfo(startIdx, rectWidth){
        return (e) => {
            let tooltip = document.getElementById("tooltip");
            let ctx = tooltip.getContext('2d');
            //draw rect
            Util.clearCanvas(tooltip);
            let xCoord = Util.getMouseCoord(e);
            let width = 5;
            ctx.fillStyle = "#757575";
            ctx.fillRect(xCoord - width, 0, width, tooltip.height);
            //display tool tip info
            let infoBox = document.getElementById("tool-top");
            infoBox.style.left = `${xCoord - 2}px`;
            infoBox.innerHTML = `base#: ${startIdx + Math.floor(xCoord / rectWidth) + 1}`;
        }
    }

    selectionEndpoint(startIdx, rectWidth){
        return (e) => {
            let toolBoxBtm = document.getElementById("tool-btm-container");
            let endInfoBox = document.createElement("div");
            endInfoBox.setAttribute("class", "base-info");
            let xCoord = Util.getMouseCoord(e);
            endInfoBox.style.display = "block";
            endInfoBox.style.left = `${xCoord - 2}px`;
            endInfoBox.style.top = "3px";
            endInfoBox.innerHTML = `base#: ${startIdx + Math.floor(xCoord / rectWidth) + 1}`;
            toolBoxBtm.appendChild(endInfoBox);
        }
    }

    allowReset(){
        let reset = document.getElementById("reset");
        reset.removeAttribute("disabled");
        reset.classList.remove("disabled-btn");
    }


}



export default ToolBox;