document.addEventListener('DOMContentLoaded', () => {
    // Sample data - Replace with actual data from your database
    const workers = [
        {
            id: 1,
            name: "John Doe",
            schedule: "Mon-Wed 9AM-5PM",
            events: ["Spring Concert", "Football Game"]
        },
        {
            id: 2,
            name: "Jane Smith",
            schedule: "Thu-Sat 10AM-6PM",
            events: ["Basketball Tournament"]
        }
    ];

    const tableBody = document.getElementById('workersTableBody');

    function renderWorkers() {
        tableBody.innerHTML = workers.map(worker => `
            <tr>
                <td>${worker.name}</td>
                <td>${worker.schedule}</td>
                <td>${worker.events.join(', ')}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editWorker(${worker.id})">Edit Schedule</button>
                    <button class="action-btn" onclick="assignEvent(${worker.id})">Add to Event</button>
                    <button class="action-btn remove-btn" onclick="removeFromEvent(${worker.id})">Remove from Event</button>
                </td>
            </tr>
        `).join('');
    }

    // renderWorkers();
});

function editWorker(workerId) {
    // Implement edit functionality
    console.log('Edit worker:', workerId);
}

function assignEvent(workerId) {
    // Implement assign event functionality
    console.log('Assign worker:', workerId);
}

function removeFromEvent(workerId) {
    // Implement remove from event functionality
    console.log('Remove worker:', workerId);
}