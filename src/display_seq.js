import * as DataSet from '../datasets/sequences';
import * as SeqUtil from './util';
import * as ToolBox from './toolbox';
import drawChart from './draw_chart';
import displayCitation from './citation_box';
import Sequence from './seq_selection';

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