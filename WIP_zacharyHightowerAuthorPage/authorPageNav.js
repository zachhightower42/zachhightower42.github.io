document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const rpgSubnav = document.getElementById('rpg-subnav');
    const contentDisplay = document.getElementById('content-display');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            
            // Show/hide RPG subnav
            if (category === 'roleplaying_fluff') {
                rpgSubnav.classList.remove('hidden');
            } else {
                rpgSubnav.classList.add('hidden');
                loadContent(category);
            }
        });
    });

    document.querySelectorAll('.subcategory-btn').forEach(button => {
        button.addEventListener('click', () => {
            const subcategory = button.dataset.subcategory;
            loadContent('roleplaying_fluff/' + subcategory);
        });
    });
});

function loadContent(path) {
    // This is where you'd typically make an AJAX call to your server
    // For now, we'll simulate with some example content
    const contentDisplay = document.getElementById('content-display');
    contentDisplay.innerHTML = `<p>Loading content for ${path}...</p>`;
    
    // You'll need to implement server-side functionality to actually
    // list and serve the files from your directories
}