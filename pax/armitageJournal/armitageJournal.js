document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Elements ---
    const video = document.getElementById('bookVideo');
    const iframeWrapper = document.getElementById('iframeWrapper');
    const bgMusic = document.getElementById('bgMusic');

    // --- Initial State: Make video clickable and show pointer ---
    video.style.cursor = 'pointer';

    // --- Hover effect for video (only before first click) ---
    video.addEventListener('mouseenter', function() {
        if (!video.classList.contains('clicked')) {
            video.style.boxShadow = '0 0 0 8px #000000ff, 0 4px 10px rgba(0,0,0,0.534)';
        }
    });
    video.addEventListener('mouseleave', function() {
        video.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.534), 0 1.5px 6px rgba(0, 0, 0, 0.719)';
    });

    // --- On first click: play video, music, and disable hover effect ---
    video.addEventListener('click', function() {
        video.classList.add('clicked'); // disables hover effect via CSS
        video.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.534), 0 1.5px 6px rgba(0, 0, 0, 0.719)';
        video.play();
        bgMusic.style.display = 'block';
        bgMusic.play();
        video.style.pointerEvents = 'none'; // prevent further clicks
    });

    // --- When video ends: hide video, show iframe, show last frame ---
    video.addEventListener('ended', function() {
        video.style.display = 'none';
        iframeWrapper.style.display = 'flex';
        iframeWrapper.classList.add('opened'); // disables iframe hover effect via CSS
    });
});