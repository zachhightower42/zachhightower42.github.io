document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bookVideo');
    const overlay = document.getElementById('videoOverlay');
    const iframeWrapper = document.getElementById('iframeWrapper');
    const bgMusic = document.getElementById('bgMusic');

    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
        video.play();
        bgMusic.style.display = 'block';
        bgMusic.play();
    });

    video.addEventListener('ended', function() {
        video.style.display = 'none';
        iframeWrapper.style.display = 'flex';
    });
});