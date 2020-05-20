import {drawToolBox} from './seq_selection/toolbox';
import drawDropdown from './seq_selection/dropdown';
import {displaySeq} from './seq_selection';

document.addEventListener("DOMContentLoaded", () => {
    drawDropdown();
    drawToolBox();
    displaySeq();
})
