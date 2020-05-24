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
        this.prevEndIdx = 0;
        this.toolbox = new ToolBox(selectedSeq);
        this.newStartIdx = 0;
        this.newEndIdx = 0;
        this.inSelection = false;
        this.toggled = false;
        this.getNewSelection = this.getNewSelection.bind(this);
    }

    newSeq(){//draws initial seq
        this.inSelection = false;
        this.toolbox.drawToolBox();
        this.drawSeq();
        this.createToggleButtons();
        SeqUtil.clearBottomToolTips();
        drawChart(this.baseTotals, ".total-seq-box");
    }

    drawSeq(startIdx = this.prevStartIdx, endIdx = null, bases = "ATCG"){ //draws seq in specified range
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        if (!endIdx) endIdx = Math.floor(canvas.width / this.rectWidth) + this.prevStartIdx;
        if (this.inSelection) this.toolbox.allowReset();

        let baseColor = {
            "A": "#FF6358", //red
            "T": "#FFD246", //yellow
            "C": "#78D237", //green
            "G": "#28B4C8"  //blue
        }

        if (startIdx !== this.prevStartIdx){ //check if selecting new seq or toggling bases
            startIdx += this.prevStartIdx; //adjust new range
            endIdx += this.prevStartIdx;
        }
        this.prevStartIdx = startIdx;
        this.prevEndIdx = endIdx;

        if (startIdx >= endIdx){
            return;
        } else if (endIdx - startIdx < 160){ //use dynamic widths
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

        for (let i = startIdx; i <= endIdx; i++) {
            if (bases.includes(this.mainSeq[i])){ //filter missing data points
                baseCounts[this.mainSeq[i]]++;
                ctx.fillStyle = baseColor[this.mainSeq[i]];
            } else {
                ctx.fillStyle = "#171717";
            }
            ctx.fillRect(this.rectWidth * (i - startIdx), 0, this.rectWidth, canvas.height);
        }
        this.selectRegion(); //add listeners for region selection

        //update bar graph and immersion
        let newSeq = this.mainSeq.slice(startIdx, endIdx + 1);
        drawChart(baseCounts, ".current-seq-box");
        if (!this.toggled) immersion(newSeq);
    }

    createToggleButtons() {
        let baseToggle = document.getElementById("base-toggle");
        baseToggle.innerHTML = "";

        //toggle specific base
        let bases = "ATCG"
        for (let base of bases){
            let baseButton = document.createElement("button");
            baseButton.setAttribute("class", `base ${base}${base}${base}`);
            baseButton.innerHTML = `${base}`;
            baseButton.addEventListener("click", (e) => {
                e.preventDefault();
                SeqUtil.clearBottomToolTips();
                this.toggled = true;
                this.enableToggleButtons();
                this.deactivateButton(document.getElementById("new-seq-btn"));
                this.deactivateButton(baseButton);
                this.drawSeq(this.prevStartIdx, this.prevEndIdx, `${base}`);
            })
            baseToggle.appendChild(baseButton);
        }

        //clear toggles
        let clearBases = document.createElement("button");
        clearBases.setAttribute("class", "base");
        clearBases.innerHTML = "Clear";
        clearBases.addEventListener("click", (e) => {
            e.preventDefault();
            SeqUtil.clearBottomToolTips();
            this.toggled = true;
            this.enableToggleButtons();
            this.deactivateButton(document.getElementById("new-seq-btn"));
            this.drawSeq(this.prevStartIdx, this.prevEndIdx, bases);
        })
        baseToggle.appendChild(clearBases);

    }

    activateButton(button){
        button.removeAttribute("disabled");
        button.classList.remove("disabled-btn");
    }

    deactivateButton(button){
        button.setAttribute("disabled", true);
        button.classList.add("disabled-btn");
    }

    enableToggleButtons(){
        let baseButtons = document.querySelectorAll("#base-toggle .disabled-btn");
        baseButtons.forEach((base) => this.activateButton(base));
    }

    handleNewSelection() {
        if (this.newStartIdx >= this.newEndIdx) return;
        let submitButton = document.getElementById("new-seq-btn");
        submitButton.removeEventListener("click", this.getNewSelection);
        submitButton.addEventListener("click", this.getNewSelection);
        this.activateButton(submitButton);
    }

    getNewSelection(e) {
        e.preventDefault();
        let submitButton = document.getElementById("new-seq-btn");
        this.deactivateButton(submitButton);
        SeqUtil.clearBottomToolTips();
        this.enableToggleButtons();
        this.inSelection = true;
        this.toggled = false;
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