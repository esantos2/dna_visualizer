import drawChart from './draw_chart';
import * as SeqUtil from './seq_selection/util';
import * as ToolBox from './seq_selection/toolbox';

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
        SeqUtil.clearCanvas(document.getElementById("overlay")); //clear overlay
        SeqUtil.clearCanvas(document.getElementById("canvas")); //clear seq
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        startIdx += this.prevStartIdx; //adjust new range
        endIdx += this.prevStartIdx;
        if (startIdx >= endIdx) return;
        if (endIdx - startIdx < 160){ //use dynamic widths
            this.rectWidth = Math.floor(canvas.width / (endIdx - startIdx));
        } else{
            endIdx = Math.floor(canvas.width / this.rectWidth);
        }
        for (let i = startIdx; i < endIdx; i++) {
            ctx.fillStyle = baseColor[this.mainSeq[i]];
            ctx.fillRect(this.rectWidth * (i - startIdx), 0, this.rectWidth, canvas.height);
        }
        this.prevStartIdx = startIdx;
        this.selectRegion(); //add listeners for region selection
        drawChart(this.mainSeq.slice(startIdx, endIdx)); //draw bar graph
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
            console.log("coord: ", Math.floor(xCoord / this.rectWidth))
            return Math.floor(xCoord / this.rectWidth);
        }

        const startSelection = (event) => {
            SeqUtil.clearCanvas(overlay);
            selection = true;
            start = xCoord = SeqUtil.getMouseCoord(event);
            newStartIdx = getSeqIdx();
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
        }

        const stopSelection = () => {
            selection = false;
            if (start < xCoord) {
                ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
            }
            //update bar graph
            newEndIdx = getSeqIdx();
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

        //remove existing listeners
        overlay.removeEventListener('mousedown', startSelection);
        overlay.removeEventListener('mouseup', stopSelection);
        overlay.removeEventListener('mousemove', drawRect);
        overlay.removeEventListener('mousemove', ToolBox.showBaseInfo);
        overlay.removeEventListener('mouseout', () => SeqUtil.clearCanvas(tooltip));

        //add overlay listeners
        overlay.addEventListener('mousedown', startSelection);
        overlay.addEventListener('mouseup', stopSelection);
        overlay.addEventListener('mousemove', drawRect);
        //add tooltip listeners
        overlay.addEventListener('mouseout', () => SeqUtil.clearCanvas(tooltip));
        overlay.addEventListener('mousemove', ToolBox.showBaseInfo);
    }

}

export default Sequence;