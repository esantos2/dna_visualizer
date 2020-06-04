import * as DataSet from '../datasets/sequences';
import {selectSeq} from './display_seq';
import { closeDropdowns } from './util';

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
    let listBoxes = [
        document.getElementById("dropdown"),
        document.getElementById("dropdown-mobile")
    ]
    let lists = [
        document.getElementById("seq-selection"),
        document.getElementById("seq-selection-mobile")
    ]
    lists.forEach( seqSelection => {
        for (let i = 0; i < seqList.length; i++) {
            let listItem = document.createElement("li");
            listItem.innerHTML = seqList[i].name;
            listItem.addEventListener("click", selectSeq(seqList[i]));
            seqSelection.appendChild(listItem);
        }
    })

    window.addEventListener("click", (e) => {
        if (listBoxes.includes(e.target)){
            document.getElementById("seq-selection").classList.toggle("show-list");
            document.getElementById("seq-selection-mobile").classList.toggle("show-list");
        } else if (!(listBoxes.includes(e.target)) && !(lists.includes(e.target))){
            closeDropdowns();
        }
    })
}

export default drawDropdown;