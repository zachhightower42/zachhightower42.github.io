document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Elements ---
    const video = document.getElementById('bookVideo');
    const iframeWrapper = document.getElementById('iframeWrapper');
    const bgMusic = document.getElementById('bgMusic');

    // --- Make video clickable and show pointer ---
    video.style.cursor = 'pointer';

    // --- On first click: play video, music, and disable further clicks ---
    video.addEventListener('click', function() {
        video.play();
        bgMusic.style.display = 'block';
        bgMusic.play();
        video.style.pointerEvents = 'none'; // prevent further clicks
    });

    // --- When video ends: hide video, show iframe, show last frame ---
    video.addEventListener('ended', function() {
        video.style.display = 'none';
        iframeWrapper.style.display = 'flex';
    });
});