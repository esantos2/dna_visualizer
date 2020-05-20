import * as d3 from "d3";
import * as DataSet from '../datasets/sequences';
import * as ToolBox from './seq_selection/toolbox';
import drawDropdown from './seq_selection/dropdown';
import drawChart from './draw_chart';
import {displaySeq} from './seq_selection';

document.addEventListener("DOMContentLoaded", () => {

    drawDropdown();
    ToolBox.drawToolBox();

    //select strand (default selected)
    displaySeq();

    //display 2d seq layout, selectable regions 

    //toggle bases to highlight
    
    //bar graph to right side

    //3d model below

})
