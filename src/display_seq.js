import * as DataSet from '../datasets/sequences';
import * as SeqUtil from './util';
import displayCitation from './citation_box';
import Sequence from './sequence';

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
    seq.newSeq();
}