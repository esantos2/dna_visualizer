import drawDropdown from './dropdown';
import {displaySeq} from './display_seq';
import { openModal } from './intro_modal';
import { resizeCanvas } from './util';

document.addEventListener("DOMContentLoaded", () => {
    openModal();
    document.getElementById("tutorial").addEventListener("click", openModal);
    document.getElementById("content").style.display = "flex";
    // window.addEventListener("resize", resizeCanvas);
    drawDropdown();
    displaySeq();
})
