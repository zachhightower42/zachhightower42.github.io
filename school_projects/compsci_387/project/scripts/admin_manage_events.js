// document.addEventListener('DOMContentLoaded', () => {
//     const eventsTableBody = document.getElementById('eventsTableBody');
    
//     // Sample data structure - replace with actual data fetch from backend
//     const events = [
//         {
//             id: 1,
//             name: 'Spring Concert',
//             description: 'Annual spring concert featuring popular artists',
//             time: '2024-04-15 19:00',
//             likes: 45,
//             status: 'approved',
//             creator: 'John Smith'
//         }
//     ];

//     function renderEventsTable() {
//         eventsTableBody.innerHTML = '';
        
//         events.forEach(event => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${event.name}</td>
//                 <td>${event.description}</td>
//                 <td>${formatDateTime(event.time)}</td>
//                 <td>${event.likes}</td>
//                 <td class="status-${event.status.toLowerCase()}">${event.status}</td>
//                 <td>${event.creator}</td>
//                 <td>
//                     <button class="action-btn approve-btn" data-id="${event.id}" 
//                             ${event.status === 'approved' ? 'disabled' : ''}>
//                         Approve
//                     </button>
//                     <button class="action-btn reject-btn" data-id="${event.id}">
//                         Reject
//                     </button>
//                     <button class="action-btn edit-btn" data-id="${event.id}">
//                         Edit
//                     </button>
//                 </td>
//             `;
//             eventsTableBody.appendChild(row);
//         });

//         // Add event listeners for action buttons
//         addButtonListeners();
//     }

//     function formatDateTime(dateTimeStr) {
//         const date = new Date(dateTimeStr);
//         return date.toLocaleString();
//     }

//     function addButtonListeners() {
//         document.querySelectorAll('.approve-btn').forEach(btn => {
//             btn.addEventListener('click', () => approveEvent(btn.dataset.id));
//         });

//         document.querySelectorAll('.reject-btn').forEach(btn => {
//             btn.addEventListener('click', () => rejectEvent(btn.dataset.id));
//         });

//         document.querySelectorAll('.edit-btn').forEach(btn => {
//             btn.addEventListener('click', () => editEvent(btn.dataset.id));
//         });
//     }

//     function approveEvent(eventId) {
//         // Add API call to approve event
//         console.log(`Approving event ${eventId}`);
//         // Update UI after successful approval
//         renderEventsTable();
//     }

//     function rejectEvent(eventId) {
//         // Add API call to reject event
//         console.log(`Rejecting event ${eventId}`);
//         // Update UI after successful rejection
//         renderEventsTable();
//     }

//     function editEvent(eventId) {
//         // Add edit event functionality
//         console.log(`Editing event ${eventId}`);
//         // Implement edit modal or redirect to edit page
//     }

//     // Initial render
//     renderEventsTable();
// });
