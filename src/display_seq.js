import * as DataSet from '../datasets/sequences';
import * as SeqUtil from './seq_selection/util';
import * as ToolBox from './seq_selection/toolbox';
import drawChart from './draw_chart';
import displayCitation from './citation_box';
import Sequence from './region_selection';

export const selectSeq = (selected) => {
    return (e) => {
        e.preventDefault();
        let dropdown = document.getElementById("dropdown");
        dropdown.innerHTML = selected.name; //update text
        SeqUtil.toggleDropdown(e);
        displaySeq(selected); //update citation, draw seq
    }
}

export const displaySeq = (selected = DataSet.zika) => {

    displayCitation(selected.cite);
    let seq = new Sequence(selected);
    seq.drawSeq();
}

const drawSeq = (chosenSeq) => {
    let baseColor = {
        "A": "#FFC6CE", //red
        "T": "#95E0FF", //blue
        "C": "#95FFC0", //green
        "G": "#ECC6FA" //purple
    }
    SeqUtil.clearCanvas(document.getElementById("overlay")); //clear overlay

    //draw seq to canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let rectWidth = 5;
    for(let i = 0; i < 1000; i++){
        ctx.fillStyle = baseColor[chosenSeq[i]];
        ctx.fillRect(rectWidth*(i), 0, rectWidth, 100);
    }

    selectRegion(); //add listeners for region selection
    drawChart(chosenSeq); //draw bar graph
}


const selectRegion = () => {
    let overlay = document.getElementById("overlay");
    let ctx = overlay.getContext('2d');
    let selection = false; //flag start of selection
    let start = 0;
    let xCoord = 0;

    const startSelection = (event) => {
        SeqUtil.clearCanvas(overlay);
        selection = true;
        start = xCoord = SeqUtil.getMouseCoord(event);
        ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
    }

    const stopSelection = () => {
        selection = false;
        if (start < xCoord) {
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
        }
        //update bar graph

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


export default displaySeq;