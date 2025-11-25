
document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('liked');
            button.textContent = button.classList.contains('liked') ? 'Liked' : 'Like';
        });
    });
});
