import drawChart from './draw_chart';
import * as SeqUtil from './util';
import ToolBox from './toolbox';
import immersion from './immersion';

class Sequence{
    constructor(selectedSeq){
        this.mainSeq = selectedSeq.seq;
        this.baseTotals = selectedSeq.baseTotals;
        this.rectWidth = 5;
        this.prevStartIdx = 0;
        this.toolbox = new ToolBox(selectedSeq);
        this.newStartIdx = 0;
        this.newEndIdx = 0;
        this.inSelection = false;
        this.getNewSelection = this.getNewSelection.bind(this);
    }

    newSeq(){//draws initial seq
        this.inSelection = false;
        this.toolbox.drawToolBox();
        this.drawSeq();
        SeqUtil.clearBottomToolTips();
        drawChart(this.baseTotals, ".total-seq-box");
    }

    drawSeq(startIdx = this.prevStartIdx, endIdx = null){ //draws seq in specified range
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        if (!endIdx) endIdx = Math.floor(canvas.width / this.rectWidth) + this.prevStartIdx;
        if (this.inSelection) this.toolbox.allowReset();

        let baseColor = {
            "A": "#FF6358", //red
            "T": "#FFD246", //blue
            "C": "#78D237", //green
            "G": "#28B4C8" //purple
        }

        startIdx += this.prevStartIdx; //adjust new range
        endIdx += this.prevStartIdx;

        if (startIdx >= endIdx){
            //show error, must have at least 5 bases selected
            return;
        }
        if (endIdx - startIdx < 160){ //use dynamic widths
            this.rectWidth = canvas.width / (endIdx - startIdx + 1);
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

        for (let i = startIdx; i <= endIdx; i++) {
            if (bases.includes(this.mainSeq[i])){ //filter missing data points
                baseCounts[this.mainSeq[i]]++;
                ctx.fillStyle = baseColor[this.mainSeq[i]];
            } else {
                ctx.fillStyle = "#757575";
            }
            ctx.fillRect(this.rectWidth * (i - startIdx), 0, this.rectWidth, canvas.height);
        }
        this.prevStartIdx = startIdx;
        this.selectRegion(); //add listeners for region selection

        //update bar graph and immersion
        let newSeq = this.mainSeq.slice(startIdx, endIdx + 1);
        drawChart(baseCounts, ".current-seq-box");
        immersion(newSeq);
    }

    handleNewSelection() {
        if (this.newStartIdx >= this.newEndIdx || (this.newEndIdx - this.newStartIdx < 5)) return;
        let submitButton = document.getElementById("new-seq-btn");
        submitButton.removeEventListener("click", this.getNewSelection);
        submitButton.addEventListener("click", this.getNewSelection);
        submitButton.removeAttribute("disabled"); //enable button
        submitButton.classList.remove("disabled-btn");
    }

    getNewSelection(e) {
        e.preventDefault();
        let submitButton = document.getElementById("new-seq-btn");
        SeqUtil.clearBottomToolTips();
        submitButton.setAttribute("disabled", true); //disable button
        submitButton.classList.add("disabled-btn");
        this.inSelection = true;
        this.drawSeq(this.newStartIdx, this.newEndIdx);
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
            SeqUtil.clearBottomToolTips();
            this.toolbox.selectionEndpoint(this.prevStartIdx, this.rectWidth)(event);
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
        }

        const stopSelection = () => {
            selection = false;
            if (start >= xCoord){
                SeqUtil.clearCanvas(document.getElementById("tooltip"));
                return;
            }
            this.newEndIdx = getSeqIdx();
            this.toolbox.selectionEndpoint(this.prevStartIdx, this.rectWidth)(event);
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
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
        overlay.addEventListener('mousemove', (e) => {
            drawRect(e);
            this.toolbox.showBaseInfo(this.prevStartIdx, this.rectWidth)(e);
        });
        overlay.addEventListener('mouseover', () => {
            SeqUtil.toggleToolTip();
        })
        overlay.addEventListener('mouseout', () => {
            SeqUtil.clearCanvas(tooltip);
            SeqUtil.toggleToolTip();
        });
    }

}

export default Sequence;