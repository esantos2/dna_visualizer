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
            Util.clearCanvas(document.getElementById("overlay"));
        });
        toolbox.appendChild(clearBtn);
    
        //reset seq
        let reset = document.createElement("button");
        reset.innerHTML = "Reset";
        reset.addEventListener("click", (e) => {
            e.preventDefault();
            displaySeq(this.selected);
        })
        toolbox.appendChild(reset);
    
        //submit selection
        let handleSelection = document.createElement("button");
        handleSelection.innerHTML = "Select Region";
        handleSelection.addEventListener("click", (e) => {
            e.preventDefault();
            
        })
    }

    showBaseInfo(event){
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
}



export default ToolBox;