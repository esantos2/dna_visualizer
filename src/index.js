import drawDropdown from './dropdown';
import { displaySeq } from './display_seq';
import { openTutorial } from './tutorial_modals/create_modals';

document.addEventListener('DOMContentLoaded', () => {
    openTutorial();
    document.getElementById('tutorial').addEventListener('click', openTutorial);
    document.getElementById('tutorial-mobile').addEventListener('click', openTutorial);
    document.getElementById('content').style.display = 'flex';
    drawDropdown();
    displaySeq();
});
