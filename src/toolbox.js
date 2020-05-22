import * as Util from './util';
import { displaySeq } from './display_seq';

class ToolBox{
    constructor(selected){
        this.selected = selected;
    }

    drawToolBox(){
        let toolbox = document.getElementById("toolbox");
        toolbox.innerHTML = "";
    
        //clear overlay
        let clearBtn = document.createElement("button");
        clearBtn.innerHTML = "Clear";
        clearBtn.addEventListener("click", (e) => {
            e.preventDefault();
            Util.clearCanvas(document.getElementById("overlay")); //clear overlay
            Util.clearBottomToolTips();
            document.getElementById("new-seq-btn").setAttribute("disabled", true); //disable selection button
        });
        toolbox.appendChild(clearBtn);
    
        //reset seq
        let reset = document.createElement("button");
        reset.innerHTML = "Reset";
        reset.addEventListener("click", (e) => {
            e.preventDefault();
            Util.clearBottomToolTips();
            displaySeq(this.selected);
        })
        toolbox.appendChild(reset);

        //submit selection
        let handleSelection = document.createElement("button");
        handleSelection.innerHTML = "Select Region";
        handleSelection.setAttribute("id", "new-seq-btn");
        handleSelection.setAttribute("class", "new-seq-btn");
        handleSelection.setAttribute("disabled", true);
        toolbox.appendChild(handleSelection);
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
            endInfoBox.innerHTML = `base#: ${startIdx + Math.floor(xCoord / rectWidth) + 1}`;
            toolBoxBtm.appendChild(endInfoBox);
        }
    }


}



export default ToolBox;