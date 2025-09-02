document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Elements ---
    const bookPreview = document.getElementById('bookPreview');
    const bookAnimated = document.getElementById('bookAnimated');
    const iframeWrapper = document.getElementById('iframeWrapper');
    const bgMusic = document.getElementById('bgMusic');

    // --- On click: show animated book opening, then show iframe and play music ---
    bookPreview.addEventListener('click', function() {
        // Prevent further clicks
        bookPreview.style.pointerEvents = 'none';
        // Hide preview, show animated webp
        bookPreview.style.display = 'none';
        bookAnimated.src = 'assets/book_opening_animated.webp';
        bookAnimated.style.display = 'block';
        // Wait for animation duration (e.g., 2.5 seconds)
        setTimeout(function() {
            // Leave bookAnimated visible as background
            iframeWrapper.style.display = 'flex';
            bgMusic.style.display = 'block';
            bgMusic.play();
        }, 4000); // Adjust this to match your .webp animation duration
    });
});