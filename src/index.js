import drawDropdown from './dropdown';
import {displaySeq} from './display_seq';

document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("content").style.display = "flex";
    drawDropdown();
    displaySeq();
})
