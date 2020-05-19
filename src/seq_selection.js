import * as DataSet from '../datasets/sequences';

const displaySeq = (fileName) => {
    let testSeq = DataSet.testSeq;
    let baseColor = {
        "A": "#FFC6CE", //orange
        "T": "#95E0FF", //blue
        "C": "#95FFC0", //green
        "G": "#ECC6FA" //purple
    }

    //create canvas, set dimensions
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');

    let cWidth = canvas.getAttribute("width");
    let rectWidth = 5;
    // let rectWidth = Math.floor(cWidth / testSeq.length);

    for(let i = 0; i < testSeq.length; i++){
        ctx.fillStyle = baseColor[testSeq[i]];
        ctx.fillRect(rectWidth*(i), 0, rectWidth, 100);
    }
}

export default displaySeq;