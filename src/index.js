import {drawToolBox} from './seq_selection/toolbox';
import drawDropdown from './seq_selection/dropdown';
import {displaySeq} from './display_seq';

document.addEventListener("DOMContentLoaded", () => {
    drawDropdown();
    drawToolBox();
    displaySeq();
})
