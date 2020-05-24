import * as DataSet from '../datasets/sequences';
import * as SeqUtil from './util';
import displayCitation from './citation_box';
import Sequence from './sequence';

export const selectSeq = (selected) => {
    return (e) => {
        e.preventDefault();
        document.getElementById("dropdown").innerHTML = selected.name; //update text
        document.getElementById("seq-selection").classList.remove("show-list"); //close dropdown
        displaySeq(selected); //update citation, draw seq
    }
}

export const displaySeq = (selected = DataSet.zika) => {
    displayCitation(selected.cite);
    let seq = new Sequence(selected);
    seq.newSeq();
}