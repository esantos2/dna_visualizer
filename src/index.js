import {drawToolBox} from './toolbox';
import drawDropdown from './dropdown';
import {displaySeq} from './display_seq';

document.addEventListener("DOMContentLoaded", () => {
    drawDropdown();
    drawToolBox();
    displaySeq();
})
