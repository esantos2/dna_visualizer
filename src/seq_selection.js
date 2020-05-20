import * as DataSet from '../datasets/sequences';
import drawChart from './draw_chart';
import displayCitation from './citation_box';

const selectSeq = (selected) => {
    return (e) => {
        e.preventDefault();

        //update seqSelection
        let dropdown = document.getElementById("dropdown");
        dropdown.innerHTML = selected.name;
        toggleDropdown(e);
        
        //update citation
        displayCitation(selected.cite);
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
    displayCitation(DataSet.zika.cite);
    drawSeq(DataSet.zika.seq); //default seq
}

const drawSeq = (chosenSeq) => {
    
    let baseColor = {
        "A": "#FFC6CE", //red
        "T": "#95E0FF", //blue
        "C": "#95FFC0", //green
        "G": "#ECC6FA" //purple
    }

    //clear overlay
    clearCanvas(document.getElementById("overlay"));

    //draw seq to canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    // let cWidth = canvas.getAttribute("width");
    // let rectWidth = Math.floor(cWidth / chosenSeq.length);
    let rectWidth = 5;
    for(let i = 0; i < 1000; i++){
        ctx.fillStyle = baseColor[chosenSeq[i]];
        ctx.fillRect(rectWidth*(i), 0, rectWidth, 100);
    }

    //add listeners for region selection
    selectRegion();

    //draw bar graph
    drawChart(chosenSeq);
}

const clearCanvas = (canvas) => {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const getMouseCoord = (event) => {
    let seqBox = document.getElementById("main-seq");
    return event.clientX - seqBox.offsetLeft;
}

const selectRegion = () => {
    let overlay = document.getElementById("overlay");
    let ctx = overlay.getContext('2d');
    let selection = false; //flag start of selection
    let start = 0;
    let xCoord = 0;
    
    const startSelection = (event) => {
        clearCanvas(overlay);
        selection = true;
        start = xCoord = getMouseCoord(event);
        ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
    }

    const stopSelection = () => {
        selection = false;
        if (start < xCoord){
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
        }
    }

    const drawRect = (event) => {
        if (!selection) return;
        clearCanvas(overlay);
        ctx.fillStyle = "#757575";
        if (start < xCoord){ //draw rect left to right
            ctx.fillRect(start - 5, 0, 5, overlay.height); //start bar
            ctx.globalAlpha = 0.3;
            ctx.fillRect(start, 0, xCoord - start, overlay.height);
            ctx.globalAlpha = 1;
        }
        xCoord = getMouseCoord(event);
    }

    //add overlay listeners
    overlay.addEventListener('mousedown', startSelection);
    overlay.addEventListener('mouseup', stopSelection);
    overlay.addEventListener('mousemove', drawRect);

    //add tooltip listeners
    let tooltip = document.getElementById("tooltip");
    overlay.addEventListener('mouseout', () => clearCanvas(tooltip));
    overlay.addEventListener('mousemove', showBaseInfo);
}

const showBaseInfo = (event) => {
    let tooltip = document.getElementById("tooltip");
    let ctx = tooltip.getContext('2d');

    //draw rect
    clearCanvas(tooltip);
    let xCoord = getMouseCoord(event);
    let width = 10;
    ctx.fillStyle = "#757575";
    ctx.fillRect(xCoord - width, 0, width, tooltip.height);

    //display tool tip info

}

export default displaySeq;