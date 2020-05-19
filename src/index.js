import * as d3 from "d3";
import * as DataSet from '../datasets/sequences';
import drawChart from './draw_chart';

document.addEventListener("DOMContentLoaded", () => {

    drawChart(DataSet.testSeq);
})
