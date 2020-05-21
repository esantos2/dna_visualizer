import {drawToolBox} from './seq_selection/toolbox';
import drawDropdown from './seq_selection/dropdown';
import {displaySeq} from './display_seq';
import immersion from './immersion';

document.addEventListener("DOMContentLoaded", () => {
    drawDropdown();
    drawToolBox();
    displaySeq();
    // immersion();
})
