import drawChart from './draw_chart';
import * as SeqUtil from './seq_selection/util';
import * as ToolBox from './seq_selection/toolbox';
import immersion from './immersion';

class Sequence{
    constructor(selectedSeq){
        this.mainSeq = selectedSeq.seq;
        this.rectWidth = 5;
        this.prevStartIdx = 0;
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

        for (let i = startIdx; i < endIdx; i++) {
            ctx.fillStyle = baseColor[this.mainSeq[i]];
            ctx.fillRect(this.rectWidth * (i - startIdx), 0, this.rectWidth, canvas.height);
        }
        this.prevStartIdx = startIdx;
        this.selectRegion(); //add listeners for region selection

        //update bar graph and immersion
        let newSeq = this.mainSeq.slice(startIdx, endIdx);
        drawChart(newSeq);
        immersion(newSeq);
    }

    selectRegion(){
        let overlay = document.getElementById("overlay");
        let ctx = overlay.getContext('2d');
        let selection = false; //flag start of selection
        let start = 0;
        let xCoord = 0;
        let newStartIdx = 0;
        let newEndIdx = 0;

        const getSeqIdx = () => {
            return Math.floor(xCoord / this.rectWidth);
        }

        const startSelection = (event) => {
            SeqUtil.clearCanvas(overlay);
            selection = true;
            start = xCoord = SeqUtil.getMouseCoord(event);
            newStartIdx = getSeqIdx();
            // console.log("start coord: ", Math.floor(xCoord / this.rectWidth))
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
        }

        const stopSelection = () => {
            selection = false;
            if (start < xCoord) {
                ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
            }
            //update bar graph
            newEndIdx = getSeqIdx();
            // console.log("end coord: ", Math.floor(xCoord / this.rectWidth))
            this.drawSeq(newStartIdx, newEndIdx);
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
        overlay.addEventListener('mousemove', ToolBox.showBaseInfo);
    }
}

export default Sequence;