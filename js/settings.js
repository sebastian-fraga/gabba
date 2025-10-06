const aboutBtn = document.getElementById('aboutBtn');
const aboutPanel = document.getElementById('aboutPanel');
const aboutClose = document.getElementById('aboutClose');

aboutBtn.addEventListener('click', () => {
    aboutPanel.classList.add('open');
});

aboutClose.addEventListener('click', () => {
    aboutPanel.classList.remove('open');
});

const modalBtn = document.getElementById('modalBtn');
const modalPanel = document.getElementById('modalPanel');
const modalClose = document.getElementById('modalClose');

modalBtn.addEventListener('click', () => {
    modalPanel.classList.add('open');
    modalBtn.classList.add('open');
});

modalClose.addEventListener('click', () => {
    modalPanel.classList.remove('open');
    modalBtn.classList.remove('open');
});
