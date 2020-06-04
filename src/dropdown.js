import * as DataSet from '../datasets/sequences';
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
    let listBoxes = [
        document.getElementById("dropdown"),
        document.getElementById("dropdown-mobile")
    ]
    listBoxes.forEach( dropdown => {
        let ele = "seq-selection";
        if (dropdown.id.includes("mobile")){
            ele += "-mobile";
        }
        dropdown.addEventListener("mouseover", () => {
            document.getElementById(ele).classList.add("show-list");
        });
    })
    
    //build list
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
        seqSelection.addEventListener("mouseleave", () => {
            seqSelection.classList.remove("show-list");
        });
    })
}

export default drawDropdown;