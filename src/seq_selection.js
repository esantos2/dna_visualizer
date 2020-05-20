import * as DataSet from '../datasets/sequences';
import * as SeqUtil from './seq_selection/util';
import drawChart from './draw_chart';
import displayCitation from './citation_box';
import selectRegion from './seq_selection/region_selection';

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
    drawSeq(selected.seq);
}

const drawSeq = (chosenSeq) => {
    let baseColor = {
        "A": "#FFC6CE", //red
        "T": "#95E0FF", //blue
        "C": "#95FFC0", //green
        "G": "#ECC6FA" //purple
    }

    //clear overlay
    SeqUtil.clearCanvas(document.getElementById("overlay"));

    //draw seq to canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let rectWidth = 5;
    for(let i = 0; i < 1000; i++){
        ctx.fillStyle = baseColor[chosenSeq[i]];
        ctx.fillRect(rectWidth*(i), 0, rectWidth, 100);
    }

    //add listeners for region selection
    selectRegion();
    //draw bar graph
    drawChart(chosenSeq);
}



export default displaySeq;