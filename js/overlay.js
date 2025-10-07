document.addEventListener('click', function (e) {
    const img = e.target;

    if (img.matches('.event-item img, .past-events-flyer')) {
        const overlay = document.getElementById('imageOverlay');
        const overlayImg = document.getElementById('overlayImg');

        overlayImg.src = img.src;
        overlay.classList.add('open');
    }
});

document.getElementById('closeBtn').addEventListener('click', () => {
    const overlay = document.getElementById('imageOverlay');
    overlay.classList.remove('open');
});