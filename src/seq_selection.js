import * as DataSet from '../datasets/sequences';
import drawChart from './draw_chart';

const selectSeq = (selected) => {
    return (e) => {
        e.preventDefault();

        //update seqSelection
        let dropdown = document.getElementById("dropdown");
        dropdown.innerHTML = selected.name;
        toggleDropdown(e);
        
        //update citation

        //draw seq
        drawSeq(selected.seq);
    }
}

const toggleDropdown = (e) =>{
    e.preventDefault();
    document.getElementById("seq-selection").classList.toggle("show-list");
}

const displaySeq = () => {
    
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
    dropdown.addEventListener("click", toggleDropdown);
    
    //build list
    let seqSelection = document.getElementById("seq-selection");
    for (let i = 0; i < seqList.length; i++){
        let listItem = document.createElement("li");
        listItem.innerHTML = seqList[i].name;
        listItem.addEventListener("click", selectSeq(seqList[i]));
        seqSelection.appendChild(listItem);
    }
    //draw default
    drawSeq(DataSet.zika.seq); //default seq
}

const drawSeq = (chosenSeq) => {
    
    let baseColor = {
        "A": "#FFC6CE", //red
        "T": "#95E0FF", //blue
        "C": "#95FFC0", //green
        "G": "#ECC6FA" //purple
    }

    //draw seq to canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    // let cWidth = canvas.getAttribute("width");
    // let rectWidth = Math.floor(cWidth / chosenSeq.length);
    let rectWidth = 5;
    for(let i = 0; i < chosenSeq.length; i++){
        ctx.fillStyle = baseColor[chosenSeq[i]];
        ctx.fillRect(rectWidth*(i), 0, rectWidth, 100);
    }

    //draw bar graph
    drawChart(chosenSeq);
}

export default displaySeq;