import * as DataSet from '../datasets/sequences';
import * as SeqUtil from './util';
import {selectSeq} from './display_seq';

const drawDropdown = () => {
    let seqList = [
        DataSet.cannabis,
        DataSet.covid,
        DataSet.drosophila,
        DataSet.saccharomyces,
        DataSet.salmonella,
        DataSet.zika
    ]

    //setup dropdown
    let dropdown = document.getElementById("dropdown");
    dropdown.textContent = "-- Choose a sequence to analyze --";
    dropdown.addEventListener("click", SeqUtil.toggleDropdown);

    //build list
    let seqSelection = document.getElementById("seq-selection");
    for (let i = 0; i < seqList.length; i++) {
        let listItem = document.createElement("li");
        listItem.innerHTML = seqList[i].name;
        listItem.addEventListener("click", selectSeq(seqList[i]));
        seqSelection.appendChild(listItem);
    }
}

export default drawDropdown;