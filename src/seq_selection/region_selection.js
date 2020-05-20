import * as SeqUtil from './util';
import * as ToolBox from './toolbox';

const selectRegion = () => {
    let overlay = document.getElementById("overlay");
    let ctx = overlay.getContext('2d');
    let selection = false; //flag start of selection
    let start = 0;
    let xCoord = 0;

    const startSelection = (event) => {
        SeqUtil.clearCanvas(overlay);
        selection = true;
        start = xCoord = SeqUtil.getMouseCoord(event);
        ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
    }

    const stopSelection = () => {
        selection = false;
        if (start < xCoord) {
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height);
        }
    }

    const drawRect = (event) => {
        if (!selection) return;
        SeqUtil.clearCanvas(overlay);
        ctx.fillStyle = "#757575";
        if (start < xCoord) { //draw rect left to right
            ctx.fillRect(start - 5, 0, 5, overlay.height); //start bar
            ctx.globalAlpha = 0.3;
            ctx.fillRect(start, 0, xCoord - start, overlay.height);
            ctx.globalAlpha = 1;
        }
        xCoord = SeqUtil.getMouseCoord(event);
    }

    let tooltip = document.getElementById("tooltip");
    
    //remove existing listeners
    overlay.removeEventListener('mousedown', startSelection);
    overlay.removeEventListener('mouseup', stopSelection);
    overlay.removeEventListener('mousemove', drawRect);
    overlay.removeEventListener('mousemove', ToolBox.showBaseInfo);
    overlay.removeEventListener('mouseout', () => SeqUtil.clearCanvas(tooltip));

    //add overlay listeners
    overlay.addEventListener('mousedown', startSelection);
    overlay.addEventListener('mouseup', stopSelection);
    overlay.addEventListener('mousemove', drawRect);
    //add tooltip listeners
    overlay.addEventListener('mouseout', () => SeqUtil.clearCanvas(tooltip));
    overlay.addEventListener('mousemove', ToolBox.showBaseInfo);
}

export default selectRegion;