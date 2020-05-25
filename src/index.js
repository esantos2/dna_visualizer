import drawDropdown from './dropdown';
import {displaySeq} from './display_seq';
import { openModal } from './intro_modal';

document.addEventListener("DOMContentLoaded", () => {
    openModal();
    document.getElementById("content").style.display = "flex";
    drawDropdown();
    displaySeq();
})
