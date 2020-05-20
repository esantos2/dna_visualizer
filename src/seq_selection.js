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

const selectRegion = () => {
    let overlay = document.getElementById("overlay");
    let seqBox = document.getElementById("main-seq");
    let ctx = overlay.getContext('2d');
    let coord = { x: 0, y: 0 };
    let selection = false;
    let start = 0;
    let lastRect = 0;
    
    const getMouseCoord = (event) => {
        coord.x = event.clientX - seqBox.offsetLeft;
    }

    const startSelection = (event) => {
        selection = true;
        getMouseCoord(event);
        start = coord.x;
    }

    const stopSelection = () => {
        selection = false;
    }

    const drawRect = (event) => {
        if (!selection) return;
        ctx.beginPath();

        //rectangle selection properties
        ctx.fillStyle = "#757575";
        // ctx.lineWidth = 5;
        // ctx.lineCap = 'round';
        // ctx.strokeStyle = 'green';
        
        //create rect
        // ctx.moveTo(coord.x, coord.y);   //selection start
        // ctx.strokeRect(coord.x, 0, 5, overlay.height);                   //draw rect
        
        
        if ((start < coord.x) && (coord.x % 10 === 0)){
            ctx.globalAlpha = 0.5;
            ctx.fillRect(coord.x, 0, 10, overlay.height);
            ctx.globalAlpha = 1;
        } 

        getMouseCoord(event);           //mouse coord
        // ctx.lineTo(coord.x, coord.y);   //selection end
        // ctx.stroke();                   //draw rect

    } 

    //add overlay mouse listeners
    overlay.addEventListener('mousedown', startSelection);
    overlay.addEventListener('mouseup', stopSelection);
    overlay.addEventListener('mousemove', drawRect);
}


export default displaySeq;