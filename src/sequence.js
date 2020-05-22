import drawChart from './draw_chart';
import * as SeqUtil from './util';
import ToolBox from './toolbox';
import immersion from './immersion';

class Sequence{
    constructor(selectedSeq){
        this.mainSeq = selectedSeq.seq;
        this.rectWidth = 5;
        this.prevStartIdx = 0;
        this.toolbox = new ToolBox(selectedSeq);
        this.newStartIdx = 0;
        this.newEndIdx = 0;
        this.getNewSelection = this.getNewSelection.bind(this);
    }

    newSeq(){//draws initial seq
        this.toolbox.drawToolBox();
        this.drawSeq();
    }

    drawSeq(startIdx = this.prevStartIdx, endIdx = this.mainSeq.length){ //draws seq in specified range
        let baseColor = {
            "A": "#FFC6CE", //red
            "T": "#95E0FF", //blue
            "C": "#95FFC0", //green
            "G": "#ECC6FA" //purple
        }

        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');

        startIdx += this.prevStartIdx; //adjust new range
        endIdx += this.prevStartIdx;

        if (startIdx >= endIdx || (endIdx - startIdx < 5)) return;
        if (endIdx - startIdx < 160){ //use dynamic widths
            this.rectWidth = canvas.width / (endIdx - startIdx);
        } else {
            this.rectWidth = 5;
        }

        //reset overlay
        SeqUtil.clearCanvas(document.getElementById("canvas")); //clear seq
        let overlay = document.getElementById("overlay");
        let mainSeq = document.getElementById("main-seq");
        mainSeq.removeChild(overlay);
        overlay = document.createElement("canvas");
        overlay.setAttribute("width", "800");
        overlay.setAttribute("height", "100");
        overlay.setAttribute("id", "overlay");
        mainSeq.appendChild(overlay);

        //count bases
        let baseCounts = {
            "A": 0,
            "T": 0,
            "C": 0,
            "G": 0
        }
        const bases = ["A", "T", "C", "G"];

        for (let i = startIdx; i < endIdx; i++) {
            if (bases.includes(this.mainSeq[i])){
                baseCounts[this.mainSeq[i]]++;
                ctx.fillStyle = baseColor[this.mainSeq[i]];
                ctx.fillRect(this.rectWidth * (i - startIdx), 0, this.rectWidth, canvas.height);
            }
        }
        this.prevStartIdx = startIdx;
        this.selectRegion(); //add listeners for region selection

        //update bar graph and immersion
        let newSeq = this.mainSeq.slice(startIdx, endIdx);
        drawChart(baseCounts);
        immersion(newSeq);
    }

    handleNewSelection() {
        if (this.newStartIdx >= this.newEndIdx || (this.newEndIdx - this.newStartIdx < 5)) return;
        let submitButton = document.getElementById("new-seq-btn");
        submitButton.removeEventListener("click", this.getNewSelection);
        submitButton.addEventListener("click", this.getNewSelection);
        submitButton.removeAttribute("disabled");
        // SeqUtil.toggleNewSeqButton();
    }

    getNewSelection(e) {
        e.preventDefault();
        let submitButton = document.getElementById("new-seq-btn");
        submitButton.setAttribute("disabled", true);
        this.drawSeq(this.newStartIdx, this.newEndIdx);
        // SeqUtil.toggleNewSeqButton();
    }

    selectRegion(){
        let overlay = document.getElementById("overlay");
        let ctx = overlay.getContext('2d');
        let selection = false; //flag start of selection
        let start = 0;
        let xCoord = 0;

        const getSeqIdx = () => {
            return Math.floor(xCoord / this.rectWidth);
        }

        const startSelection = (event) => {
            SeqUtil.clearCanvas(overlay);
            selection = true;
            start = xCoord = SeqUtil.getMouseCoord(event);
            this.newStartIdx = getSeqIdx();
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
        }

        const stopSelection = () => {
            selection = false;
            if (start >= xCoord) return;
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
            this.newEndIdx = getSeqIdx();
            this.handleNewSelection();
        }

        const drawRect = (event) => {
            if (!selection) return;
            SeqUtil.clearCanvas(overlay);
            ctx.fillStyle = "#757575";
            if (start < xCoord) { //draw rect left to right
                ctx.fillRect(start - 5, 0, 5, overlay.height); //start bar
                ctx.globalAlpha = 0.3;
                ctx.fillRect(start, 0, xCoord - start, overlay.height);
                ctx.globalAlpha = 1;
            }
            xCoord = SeqUtil.getMouseCoord(event);
        }

        let tooltip = document.getElementById("tooltip");
        overlay.addEventListener('mousedown', startSelection);
        overlay.addEventListener('mouseup', stopSelection);
        overlay.addEventListener('mousemove', drawRect);
        overlay.addEventListener('mouseout', () => SeqUtil.clearCanvas(tooltip));
        overlay.addEventListener('mousemove', this.toolbox.showBaseInfo);
    }

}

export default Sequence;