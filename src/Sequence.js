import drawChart from './draw_chart';
import * as SeqUtil from './util';
import ToolBox from './toolbox';
import immersion from './immersion';

export default class Sequence {
    constructor(selectedSeq) {
        this.mainSeq = selectedSeq.seq;
        this.name = selectedSeq.name;
        this.baseTotals = selectedSeq.baseTotals;
        this.rectWidth = 5;
        this.prevStartIdx = 0;
        this.prevEndIdx = null;
        this.toolbox = new ToolBox(selectedSeq);
        this.newStartIdx = 0;
        this.newEndIdx = 0;
        this.inSelection = false;
        this.toggled = false;
        this.newRange = true;
        this.getNewSelection = this.getNewSelection.bind(this);
        this.resizeCanvases = this.resizeCanvases.bind(this);
        window.addEventListener('resize', this.resizeCanvases);
    }

    newSeq() {
        //draws initial seq
        this.inSelection = false;
        this.toolbox.drawToolBox();
        this.resizeCanvases();
        this.createFilters();
        SeqUtil.clearBottomToolTips();
        drawChart(this.baseTotals, '.total-seq-box');
    }

    resizeCanvases() {
        SeqUtil.closeDropdowns();
        SeqUtil.clearBottomToolTips();
        const canvases = [document.getElementById('canvas'), document.getElementById('tooltip'), document.getElementById('overlay')];
        //determine dimensions based on window size
        let newWidth = 0;
        const windowWidth = window.innerWidth;
        if (windowWidth > 1740) {
            newWidth = 800;
        } else if (windowWidth > 1340) {
            newWidth = 600;
        } else if (windowWidth > 1100) {
            newWidth = 400;
        } else if (windowWidth > 930) {
            newWidth = 800;
        } else if (windowWidth > 730) {
            newWidth = 600;
        } else {
            newWidth = 300;
        }
        //apply changes
        canvases.forEach((c) => {
            c.width = newWidth;
        });
        this.drawSeq(this.prevStartIdx, this.prevEndIdx, 'ATCG');
    }

    drawSeq(startIdx = this.prevStartIdx, endIdx = null, bases = 'ATCG') {
        //draws seq in specified range
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const cWidth = ctx.canvas.clientWidth + 4;
        const cHeight = ctx.canvas.clientHeight + 4;
        if (!endIdx) endIdx = Math.floor(cWidth / this.rectWidth) + this.prevStartIdx;
        if (this.inSelection) this.toolbox.allowReset();

        const baseColor = {
            A: '#FF6358', //red
            T: '#FFD246', //yellow
            C: '#78D237', //green
            G: '#28B4C8', //blue
        };

        if (startIdx !== this.prevStartIdx) {
            //check if selecting new seq or toggling bases
            startIdx += this.prevStartIdx; //adjust new range
            endIdx += this.prevStartIdx;
            this.newRange = true;
        }
        this.prevStartIdx = startIdx;
        this.prevEndIdx = endIdx;

        if (startIdx >= endIdx) {
            return;
        } else if (endIdx - startIdx < Math.floor(this.rectWidth * cWidth)) {
            //use dynamic widths
            this.rectWidth = cWidth / (endIdx - startIdx + 1);
        } else {
            this.rectWidth = 5;
        }

        //reset overlay
        SeqUtil.clearCanvas(document.getElementById('canvas')); //clear seq
        let overlay = document.getElementById('overlay');
        const mainSeq = document.getElementById('main-seq');
        mainSeq.removeChild(overlay);
        overlay = document.createElement('canvas');
        overlay.setAttribute('width', cWidth);
        overlay.setAttribute('height', cHeight);
        overlay.setAttribute('id', 'overlay');
        mainSeq.appendChild(overlay);

        //count bases
        const baseCounts = {
            A: 0,
            T: 0,
            C: 0,
            G: 0,
        };

        for (let i = startIdx; i <= endIdx; i++) {
            if (bases.includes(this.mainSeq[i])) {
                //filter missing data points
                baseCounts[this.mainSeq[i]]++;
                ctx.fillStyle = baseColor[this.mainSeq[i]];
            } else {
                ctx.fillStyle = '#171717';
            }
            ctx.fillRect(this.rectWidth * (i - startIdx), 0, this.rectWidth, canvas.height);
        }
        this.selectRegion(); //add listeners for region selection

        //update details, bar graph, immersion
        const newSeq = this.mainSeq.slice(startIdx, endIdx + 1);
        drawChart(baseCounts, '.current-seq-box');
        if (this.newRange) {
            this.newRange = false;
            this.strandDetails();
            if (!this.toggled) immersion(newSeq);
        }
    }

    strandDetails() {
        const detailBox = document.getElementById('strand-details');
        detailBox.innerHTML = '';
        const name = document.createElement('h3');
        name.innerHTML = this.name;
        const baseRange = document.createElement('h5');
        baseRange.innerHTML = `Viewing ${this.prevStartIdx + 1} - ${this.prevEndIdx + 1} of ${this.baseTotalSum()} base pairs`;
        detailBox.appendChild(name);
        detailBox.appendChild(baseRange);
    }

    baseTotalSum() {
        let sum = 0;
        Object.values(this.baseTotals).forEach((num) => (sum += num));
        return sum;
    }

    createFilters() {
        const baseToggle = document.getElementById('base-toggle');
        baseToggle.innerHTML = '';

        //toggle specific base
        const bases = 'ATCG';
        for (const base of bases) {
            const baseButton = document.createElement('button');
            baseButton.setAttribute('class', `base ${base}${base}${base}`);
            baseButton.innerHTML = `${base}`;
            baseButton.addEventListener('click', (e) => {
                e.preventDefault();
                SeqUtil.clearBottomToolTips();
                this.toggled = true;
                this.enableToggleButtons();
                SeqUtil.disableBtn(document.getElementById('new-seq-btn'));
                SeqUtil.disableBtn(baseButton);
                this.drawSeq(this.prevStartIdx, this.prevEndIdx, `${base}`);
            });
            baseToggle.appendChild(baseButton);
        }

        //clear toggles
        const clearBases = document.createElement('button');
        clearBases.setAttribute('class', 'base');
        clearBases.innerHTML = 'Clear filters';
        clearBases.addEventListener('click', (e) => {
            e.preventDefault();
            SeqUtil.clearBottomToolTips();
            this.toggled = true;
            this.enableToggleButtons();
            SeqUtil.disableBtn(document.getElementById('new-seq-btn'));
            this.drawSeq(this.prevStartIdx, this.prevEndIdx, bases);
        });
        baseToggle.appendChild(clearBases);
    }

    activateButton(button) {
        button.removeAttribute('disabled');
        button.classList.remove('disabled-btn');
    }

    enableToggleButtons() {
        const baseButtons = document.querySelectorAll('#base-toggle .disabled-btn');
        baseButtons.forEach((base) => this.activateButton(base));
    }

    handleNewSelection() {
        if (this.newStartIdx >= this.newEndIdx) return;
        const clearButton = document.getElementById('clear-selection');
        const submitButton = document.getElementById('new-seq-btn');
        submitButton.removeEventListener('click', this.getNewSelection);
        submitButton.addEventListener('click', this.getNewSelection);
        this.activateButton(submitButton);
        this.activateButton(clearButton);
    }

    getNewSelection(e) {
        e.preventDefault();
        const clearButton = document.getElementById('clear-selection');
        const submitButton = document.getElementById('new-seq-btn');
        SeqUtil.disableBtn(submitButton);
        SeqUtil.disableBtn(clearButton);
        SeqUtil.clearBottomToolTips();
        this.enableToggleButtons();
        this.inSelection = true;
        this.toggled = false;
        this.drawSeq(this.newStartIdx, this.newEndIdx);
    }

    selectRegion() {
        const overlay = document.getElementById('overlay');
        const ctx = overlay.getContext('2d');
        let selection = false; //flag start of selection
        let start = 0;
        let xCoord = 0;

        const getSeqIdx = () => {
            return Math.floor(xCoord / this.rectWidth);
        };

        const startSelection = (event) => {
            SeqUtil.clearCanvas(overlay);
            selection = true;
            start = xCoord = SeqUtil.getMouseCoord(event);
            this.newStartIdx = getSeqIdx();
            SeqUtil.clearBottomToolTips();
            this.toolbox.selectionEndpoint(this.prevStartIdx, this.rectWidth, xCoord);
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height); //start bar
        };

        const stopSelection = () => {
            selection = false;
            if (start >= xCoord) {
                SeqUtil.clearCanvas(document.getElementById('tooltip'));
                return;
            }
            this.newEndIdx = getSeqIdx();
            this.toolbox.selectionEndpoint(this.prevStartIdx, this.rectWidth, xCoord);
            ctx.fillRect(xCoord - 5, 0, 5, overlay.height); //end bar
            this.handleNewSelection();
        };

        const drawRect = (event) => {
            if (!selection) return;
            SeqUtil.clearCanvas(overlay);
            ctx.fillStyle = '#757575';
            if (start < xCoord) {
                //draw rect left to right
                ctx.fillRect(start - 5, 0, 5, overlay.height); //start bar
                ctx.globalAlpha = 0.3;
                ctx.fillRect(start, 0, xCoord - start, overlay.height);
                ctx.globalAlpha = 1;
            }
            xCoord = SeqUtil.getMouseCoord(event);
        };

        const tooltip = document.getElementById('tooltip');
        //mouse events
        overlay.addEventListener('mousedown', startSelection);
        overlay.addEventListener('mouseup', stopSelection);
        overlay.addEventListener('mousemove', (e) => {
            drawRect(e);
            this.toolbox.showBaseInfo(this.prevStartIdx, this.rectWidth)(e);
        });
        overlay.addEventListener('mouseover', () => {
            SeqUtil.toggleToolTip();
        });
        overlay.addEventListener('mouseout', () => {
            SeqUtil.clearCanvas(tooltip);
            SeqUtil.toggleToolTip();
        });

        //touch events
        overlay.addEventListener('touchstart', startSelection);
        overlay.addEventListener('touchend', () => {
            SeqUtil.clearCanvas(tooltip);
            stopSelection();
        });
        overlay.addEventListener('touchmove', (e) => {
            drawRect(e);
            this.toolbox.showBaseInfo(this.prevStartIdx, this.rectWidth)(e);
        });
    }
}
