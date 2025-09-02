document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bookVideo');
    const iframeWrapper = document.getElementById('iframeWrapper');
    const bgMusic = document.getElementById('bgMusic');

    video.style.cursor = 'pointer';

    video.addEventListener('mouseenter', function() {
        if (!video.classList.contains('playing')) {
            video.style.boxShadow = '0 0 0 8px #000000ff, 0 4px 10px rgba(0,0,0,0.534)';
        }
    });
    video.addEventListener('mouseleave', function() {
        video.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.534), 0 1.5px 6px rgba(0, 0, 0, 0.719)';
    });

    video.addEventListener('click', function() {
        video.classList.add('playing');
        video.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.534), 0 1.5px 6px rgba(0, 0, 0, 0.719)';
        video.play();
        bgMusic.style.display = 'block';
        bgMusic.play();
        video.style.pointerEvents = 'none';
    });

    video.addEventListener('ended', function() {
        video.style.display = 'none';
        iframeWrapper.style.display = 'flex';
        iframeWrapper.classList.add('opened');
    });
});