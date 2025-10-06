document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.dark-mode-buttons');
    if (!toggle) return;

    const options = toggle.querySelectorAll('button');

    options.forEach(btn => {
        btn.addEventListener('click', () => {
            options.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const isOn = btn.textContent.trim() === 'ENCENDIDO';
            if (isOn) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            localStorage.setItem('darkMode', isOn ? 'on' : 'off');
        });
    });
    const savedMode = localStorage.getItem('darkMode');

options.forEach(b => b.classList.remove('active'));

if (savedMode === 'off') {
    toggle.querySelector('button:last-child').classList.add('active');
} else {
    toggle.querySelector('button:first-child').classList.add('active');
}
});
