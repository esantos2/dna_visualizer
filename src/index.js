import * as d3 from "d3";
import * as DataSet from '../datasets/sequences';
import drawChart from './draw_chart';
import displaySeq from './seq_selection';

document.addEventListener("DOMContentLoaded", () => {

    //select strand (default selected)
    displaySeq("test");

    //display 2d seq layout, selectable regions 

    //toggle bases to highlight
    
    //bar graph to right side
    drawChart(DataSet.testSeq);

    //3d model below

})
