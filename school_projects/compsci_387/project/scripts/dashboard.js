/**
 * dashboard.js
 * Adds event listeners to dropdown elements on the page to show and hide their content when the user hovers over them.
 * This function is called when the DOM content has finished loading.
 */
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropdown.addEventListener('mouseenter', () => {
      dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!dropdown.matches(':hover') && !dropdownContent.matches(':hover')) {
          dropdownContent.style.display = 'none';
        }
      }, 100);
    });

    // Add event listener to the dropdown content
    dropdownContent.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!dropdown.matches(':hover') && !dropdownContent.matches(':hover')) {
          dropdownContent.style.display = 'none';
        }
      }, 100);
    });
  });

  const eventsContainer = document.querySelector('.events-container');
  const showLikedEventsBtn = document.getElementById('showLikedEventsBtn');
  let showingLiked = false;
  let events = [
    { 
      title: 'Spring Concert', 
      time: 'April 15, 2024, 7:00 PM', 
      location: 'The Grove', 
      description: 'Annual spring concert featuring popular artists.',
      liked: false,
      organizerID: null // Will store the event creator's ID
    },
  ];


  function isDateValid(selectedDate) {
    try {
      const currentDate = new Date();
      const eventDate = new Date(selectedDate);
    
      if (isNaN(eventDate.getTime())) {
        throw new Error('Invalid date format');
      }
    
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
      return eventDate - currentDate >= threeDaysInMs;
    } catch (error) {
      console.error('Date validation error:', error);
      return false;
    }
}

  // function renderEvents(eventsToRender) {
  //   eventsContainer.innerHTML = '';

  //   eventsToRender.forEach((event, index) => {
  //     const eventCard = document.createElement('div');
  //     eventCard.className = 'event-card collapsed';
  //     const { date, time } = formatDateTime(event.time);
  //     eventCard.innerHTML = `
  //       <h2>${event.title}</h2>
  //       <div class="event-details">
  //         <p><strong>Date:</strong> ${date}</p>
  //         <p><strong>Time:</strong> ${time}</p>
  //         <p><strong>Location:</strong> ${event.location}</p>
  //         <p class="event-description"><strong>Description:</strong> ${event.description}</p>
  //         <div>
  //           <button class="like-btn ${event.liked ? 'liked' : ''}">${event.liked ? 'Liked' : 'Like'}</button>
  //           <button class="delete-btn">Delete</button>
  //           <button class="edit-btn">Edit</button>
  //         </div>
  //       </div>
  //     `;

  //     eventsContainer.appendChild(eventCard);
  //   });

  //   eventsContainer.addEventListener('click', (e) => {
  //     const target = e.target;
    
  //     if (target.classList.contains('like-btn')) {
  //       handleLikeClick(e);
  //     } else if (target.classList.contains('delete-btn')) {
  //       handleDeleteClick(e);
  //     } else if (target.classList.contains('edit-btn')) {
  //       handleEditClick(e);
  //     } else if (target.closest('.event-card')) {
  //       handleCardCollapse(e);
  //     }
  //   });

  //   function handleLikeClick(e) {
  //     e.stopPropagation();
  //     const likeBtn = e.target;
  //     const eventCard = likeBtn.closest('.event-card');
  //     const index = Array.from(eventsContainer.children).indexOf(eventCard);
  //     const event = events[index];
  //     event.liked = !event.liked;
  //     console.log(`Event ${event.title} liked status: ${event.liked}`);
  //     likeBtn.textContent = event.liked ? 'Liked' : 'Like';
  //     likeBtn.classList.toggle('liked');
  //   }

  //   function handleDeleteClick(e) {
  //     e.stopPropagation();
  //     const eventCard = e.target.closest('.event-card');
  //     const index = Array.from(eventsContainer.children).indexOf(eventCard);
  //     deleteEvent(index);
  //   }

  //   // Clear events array when needed
  //   const clearEvents = () => {
  //     events = [];
  //     eventsContainer.innerHTML = '';
  //   };

  //   // Add proper garbage collection for removed events
  //   const deleteEvent = (index) => {
  //     events[index] = null; // Mark for garbage collection
  //     events.splice(index, 1);
  //     renderEvents(showingLiked ? events.filter(event => event.liked) : events);
  //   };

  //   function handleEditClick(e) {
  //     e.stopPropagation();
  //     const eventCard = e.target.closest('.event-card');
  //     const index = Array.from(eventsContainer.children).indexOf(eventCard);
  //     const event = events[index];
    
  //     console.log('Edit button clicked for event:', event);
  //     console.log('Current events array:', events);
  //     console.log('Editing event at index:', index);
    
  //     document.getElementById('eventName').value = event.title;
  //     document.getElementById('eventDescription').value = event.description;
  //     document.getElementById('eventLocation').value = event.location;
    
  //     const dateTime = new Date(event.time);
  //     document.getElementById('eventDate').value = dateTime.toISOString().split('T')[0];
  //     document.getElementById('eventTime').value = dateTime.toTimeString().slice(0,5);
    
  //     console.log('Modal populated with event data');
  //     modal.style.display = 'block';
    
  //     createEventForm.onsubmit = (e) => {
  //       e.preventDefault();
      
  //       const updatedTitle = document.getElementById('eventName').value;
  //       const updatedDescription = document.getElementById('eventDescription').value;
  //       const updatedLocation = document.getElementById('eventLocation').value;
  //       const updatedDate = document.getElementById('eventDate').value;
  //       const updatedTime = document.getElementById('eventTime').value;

  //       if (!updatedTitle && !updatedDescription && !updatedLocation && !updatedDate && !updatedTime) {
  //         events.splice(index, 1);
  //       } else {
  //         events[index] = {
  //           title: updatedTitle,
  //           description: updatedDescription,
  //           location: updatedLocation,
  //           time: `${updatedDate} ${updatedTime}`,
  //           liked: event.liked
  //         };
  //       }

  //       const eventsToRender = showingLiked ? events.filter(event => event.liked) : events;
  //       // renderEvents(eventsToRender);
  //       modal.style.display = 'none';
  //       createEventForm.reset();
  //     };
  //   }

  //   function handleCardCollapse(e) {
  //     const eventCard = e.target.closest('.event-card');
  //     eventCard.classList.toggle('collapsed');
  //   }
  // }

  showLikedEventsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showingLiked = !showingLiked;
    console.log('Show Liked Events clicked. Showing liked only:', showingLiked);

    showLikedEventsBtn.textContent = showingLiked ? 'Show All Events' : 'Show Liked Events';
    showLikedEventsBtn.classList.toggle('active', showingLiked);

    const filteredEvents = showingLiked ? events.filter(event => {
      console.log(`Filtering event ${event.title}, liked status: ${event.liked}`);
      return event.liked;
    }) : events;

    console.log('Filtered events:', filteredEvents);
    // renderEvents(filteredEvents);
  });

  // Initial render
  // renderEvents(events);

  // Event creation functionality
  const modal = document.getElementById('eventModal');
  const createEventBtn = document.getElementById('createEventBtn');
  const closeBtn = document.querySelector('.close');
  const createEventForm = document.getElementById('createEventForm');

  createEventBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Create Event button clicked');
  
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3);
    document.getElementById('eventDate').min = minDate.toISOString().split('T')[0];
  
    modal.style.display = 'block';
  });

  const cleanup = () => {
    modal.style.display = 'none';
    createEventForm.reset();
    // Remove any temporary event listeners
  };

  // Use cleanup in appropriate places
  closeBtn.addEventListener('click', cleanup);

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  createEventForm.addEventListener('submit', (e) => {
    // e.preventDefault();
    const title = document.getElementById('eventName').value;
    const description = document.getElementById('eventDescription').value;
  
    // Validate title length (10 words AND 20 characters)
    const titleWords = title.trim().split(/\s+/);
    if (titleWords.length > 10) {
      alert('Title must be 10 words or less');
      return;
    }
    if (title.length > 25) {
      alert('Title must be 20 characters or less');
      return;
    }
  
    // Validate description length (200 words AND 500 characters)
    const descriptionWords = description.trim().split(/\s+/);
    if (descriptionWords.length > 200) {
      alert('Description must be 200 words or less');
      return;
    }
    if (description.length > 500) {
      alert('Description must be 500 characters or less');
      return;
    }

    const selectedDate = document.getElementById('eventDate').value;
    if (!isDateValid(selectedDate)) {
      alert('Events must be scheduled at least 3 days in advance');
      return;
    }

    const newEvent = {
      title: title,
      description: description,
      location: document.getElementById('eventLocation').value,
      time: `${document.getElementById('eventDate').value} ${document.getElementById('eventTime').value}`,
      liked: false,
      organizerID: sessionStorage.getItem("OrganizerID") // Add organizer ID to new events
    };
    events.push(newEvent);
    // renderEvents(events);
    modal.style.display = 'none';
    createEventForm.reset();
  });

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
    
  const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
  });
    
  return { date: formattedDate, time: formattedTime };
}
class NotificationSystem {
    constructor(maxNotifications = 50) {
        this.maxNotifications = maxNotifications;
        this.notifications = [];
        this.setupNotificationIcon();
    }

    setupNotificationIcon() {
        const notificationIcon = document.querySelector('.notification-icon');
        const notificationDot = document.querySelector('.notification-dot');
        const notificationDropdown = document.querySelector('.notification-dropdown');

        notificationIcon.addEventListener('click', () => {
            notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
            if (notificationDropdown.style.display === 'block') {
                this.markAllAsRead();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationIcon.contains(e.target)) {
                notificationDropdown.style.display = 'none';
            }
        });
    }

    addNotification(message, type) {
        if (this.notifications.length >= this.maxNotifications) {
            this.notifications.pop(); // Remove oldest notification
        }
        const notification = {
            message,
            type,
            timestamp: new Date(),
            read: false
        };
        this.notifications.unshift(notification);
        this.updateNotificationDisplay();
    }
    markAllAsRead() {
        this.notifications.forEach(notification => notification.read = true);
        document.querySelector('.notification-dot').classList.remove('active');
    }

    updateNotificationDisplay() {
        const notificationList = document.querySelector('.notification-list');
        const notificationDot = document.querySelector('.notification-dot');
        
        // Update notification dot
        const hasUnread = this.notifications.some(notification => !notification.read);
        notificationDot.classList.toggle('active', hasUnread);

        // Update notification list with delete buttons
        notificationList.innerHTML = this.notifications
            .map((notification, index) => `
                <div class="notification-item">
                    <span class="notification-delete" data-index="${index}">×</span>
                    <div>${notification.message}</div>
                    <small>${notification.timestamp.toLocaleString()}</small>
                </div>
            `).join('');

        // Add click handlers for delete buttons
        notificationList.querySelectorAll('.notification-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(e.target.dataset.index);
                this.notifications.splice(index, 1);
                this.updateNotificationDisplay();
            });
        });
    }
}

// Initialize notification system
const notificationSystem = new NotificationSystem();

// Example usage:
 notificationSystem.addNotification('Your event "Spring Concert" has been approved!', 'approval');
 notificationSystem.addNotification('New event needs approval', 'admin');
// Place this at the root level of the file
const viewCreatedEventsBtn = document.querySelector('a[title="View Created Events"]');
let showingCreatedOnly = false;

if (viewCreatedEventsBtn) {
    console.log('Found View Created Events button');
    
    viewCreatedEventsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('View Created Events button clicked');
        showingCreatedOnly = !showingCreatedOnly;
        
        const organizerID = sessionStorage.getItem("OrganizerID");
        console.log('Current organizer ID:', organizerID);
        
        const filteredEvents = showingCreatedOnly 
            ? events.filter(event => {
                console.log('Checking event:', event.title, 'Creator ID:', event.organizerID);
                return event.organizerID === organizerID;
              })
            : events;
        
        console.log('Filtered events count:', filteredEvents.length);
        viewCreatedEventsBtn.textContent = showingCreatedOnly ? 'Show All Events' : 'View Created Events';
        viewCreatedEventsBtn.classList.toggle('active', showingCreatedOnly);
        // renderEvents(filteredEvents);
    });
}
});