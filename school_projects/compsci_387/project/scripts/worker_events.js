/**
 * worker_events.js
 * Handles messaging functionality for workers to communicate with organizers and admins
 */

// EXAMPLE DATA - REMOVE WHEN DATABASE IMPLEMENTATION IS COMPLETE
// const sampleEvents = [
//     {
//         eventId: "E001",
//         eventName: "Spring Concert",
//         startTime: "2024-04-15 17:00",
//         endTime: "2024-04-15 23:00",
//         role: "Security",
//         organizerId: "ORG1"
//     },
//     {
//         eventId: "E002",
//         eventName: "Basketball Tournament",
//         startTime: "2024-04-20 08:00",
//         endTime: "2024-04-20 18:00",
//         role: "Ticket Scanner",
//         organizerId: "ORG2"
//     },
//     {
//         eventId: "E003",
//         eventName: "Career Fair",
//         startTime: "2024-04-25 09:00",
//         endTime: "2024-04-25 16:00",
//         role: "Information Desk",
//         organizerId: "ORG3"
//     }
// ];

// EXAMPLE FUNCTION - REMOVE WHEN DATABASE IMPLEMENTATION IS COMPLETE
// function populateTableWithSampleData() {
//     const tableBody = document.querySelector('.events-table tbody');
//     sampleEvents.forEach(event => {
//         const row = document.createElement('tr');
//         row.dataset.eventId = event.eventId;
//         row.innerHTML = `
//             <td>${event.eventName}</td>
//             <td>${event.startTime}</td>
//             <td>${event.endTime}</td>
//             <td><span class="role-badge">${event.role}</span></td>
//         `;
//         tableBody.appendChild(row);
//     });
// }

// Add message button to each event row
const addMessageButtons = () => {
    const tableRows = document.querySelectorAll('.events-table tbody tr');
    tableRows.forEach(row => {
        const actionCell = document.createElement('td');
        actionCell.innerHTML = `
            <button class="message-btn" onclick="openMessageDialog('${row.dataset.eventId}')">
                Message Organizer
            </button>
        `;
        row.appendChild(actionCell);
    });
};

// Create message dialog
const createMessageDialog = () => {
    const dialog = document.createElement('div');
    dialog.id = 'messageDialog';
    dialog.className = 'message-dialog';
    dialog.innerHTML = `
        <div class="message-content">
            <span class="close-dialog">×</span>
            <h3>Send Message</h3>
            <select id="recipientType">
                <option value="organizer">Organizer</option>
                <option value="admin">Admin</option>
            </select>
            <textarea id="messageText" placeholder="Type your message here..."></textarea>
            <button id="sendMessage">Send</button>
        </div>
    `;
    document.body.appendChild(dialog);
};

// Handle opening the message dialog
window.openMessageDialog = (eventId) => {
    const dialog = document.getElementById('messageDialog');
    dialog.style.display = 'block';
    dialog.dataset.eventId = eventId;
};

// Handle sending the message
const handleSendMessage = () => {
    document.getElementById('sendMessage').addEventListener('click', () => {
        const eventId = document.getElementById('messageDialog').dataset.eventId;
        const recipientType = document.getElementById('recipientType').value;
        const messageText = document.getElementById('messageText').value;

        // Here you would add the API call to send the message
        fetch('../php/send_message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: eventId,
                recipientType: recipientType,
                message: messageText
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message sent successfully!');
                closeMessageDialog();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        });
    });
};

// Close dialog functionality
const closeMessageDialog = () => {
    const dialog = document.getElementById('messageDialog');
    dialog.style.display = 'none';
    document.getElementById('messageText').value = '';
};

// Initialize all functionality
const initialize = () => {
    createMessageDialog();
    addMessageButtons();
    handleSendMessage();

    // Add close button functionality
    document.querySelector('.close-dialog').addEventListener('click', closeMessageDialog);
};
// TEMPORARY: Sample data population - REMOVE WHEN IMPLEMENTING DATABASE
// document.addEventListener('DOMContentLoaded', () => {
//     populateTableWithSampleData();
//     initialize();
// });
