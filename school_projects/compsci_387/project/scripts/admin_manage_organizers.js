document.addEventListener('DOMContentLoaded', () => {
    const organizersTableBody = document.getElementById('organizersTableBody');
    const addOrganizerBtn = document.getElementById('addOrganizerBtn');
    const addOrganizerModal = document.getElementById('addOrganizerModal');
    const messageModal = document.getElementById('messageModal');
    const closeButtons = document.querySelectorAll('.close');

    // Sample data structure - replace with actual data fetch from backend
    let organizers = [
        {
            id: 1,
            name: "John Doe",
            pendingEvents: ["Spring Festival", "Summer Concert"],
            approvedEvents: ["Winter Gala"],
            pastEvents: ["Fall Fair 2023", "Holiday Party 2023"]
        }
    ];

    function renderOrganizers() {
        organizersTableBody.innerHTML = '';
        organizers.forEach(organizer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${organizer.name}</td>
                <td>${organizer.pendingEvents.length}</td>
                <td>${organizer.approvedEvents.length}</td>
                <td>${organizer.pastEvents.slice(0, 10).join(', ')}</td>
                <td>
                    <button class="action-btn message-btn" data-id="${organizer.id}">Message</button>
                    <button class="action-btn delete-btn" data-id="${organizer.id}">Delete</button>
                </td>
            `;
            organizersTableBody.appendChild(row);
        });
    }

    // Modal handlers
    addOrganizerBtn.addEventListener('click', () => {
        addOrganizerModal.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            addOrganizerModal.style.display = 'none';
            messageModal.style.display = 'none';
        });
    });

    // Form submissions
    document.getElementById('addOrganizerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('organizerName').value;
        const email = document.getElementById('organizerEmail').value;

        // Add new organizer logic here
        organizers.push({
            id: organizers.length + 1,
            name: name,
            pendingEvents: [],
            approvedEvents: [],
            pastEvents: []
        });

        renderOrganizers();
        addOrganizerModal.style.display = 'none';
        e.target.reset();
    });

    document.getElementById('messageForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('messageContent').value;
        // Message sending logic here
        messageModal.style.display = 'none';
        e.target.reset();
    });

    // Delete and message button handlers
    organizersTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const organizerId = e.target.dataset.id;
            organizers = organizers.filter(org => org.id !== parseInt(organizerId));
            renderOrganizers();
        }
        
        if (e.target.classList.contains('message-btn')) {
            messageModal.style.display = 'block';
        }
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === addOrganizerModal || e.target === messageModal) {
            addOrganizerModal.style.display = 'none';
            messageModal.style.display = 'none';
        }
    });

    // Initial render
    renderOrganizers();
});
