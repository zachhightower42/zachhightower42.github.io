document.addEventListener('DOMContentLoaded', () => {
    const timeSlotsContainer = document.getElementById('timeSlots');
    const calendar = document.getElementById('calendar');

    // Add new time slot
    document.querySelector('.add-time-slot').addEventListener('click', () => {
        const newTimeSlot = document.createElement('div');
        newTimeSlot.className = 'time-slot';
        newTimeSlot.innerHTML = `
            <input type="time" class="start-time" name="startTime[]">
            <span>to</span>
            <input type="time" class="end-time" name="endTime[]">
            <button type="button" class="remove-time-slot">-</button>
        `;
        timeSlotsContainer.appendChild(newTimeSlot);

        // Add remove button functionality
        newTimeSlot.querySelector('.remove-time-slot').addEventListener('click', () => {
            newTimeSlot.remove();
        });
    });

    // Initialize calendar
    initializeCalendar();
});

function initializeCalendar() {
    const calendar = document.getElementById('calendar');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const calendarGrid = document.createElement('div');
    calendarGrid.style.display = 'grid';
    calendarGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
    calendarGrid.style.gap = '4px';
    
    // Add day headers
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.textAlign = 'center';
        dayHeader.style.fontWeight = 'bold';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Add selectable days
    for (let i = 0; i < 31; i++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = i + 1;
        dayCell.style.textAlign = 'center';
        dayCell.style.padding = '8px';
        dayCell.style.border = '1px solid #ddd';
        dayCell.style.cursor = 'pointer';
        
        dayCell.addEventListener('click', () => {
            dayCell.classList.toggle('selected');
            dayCell.style.backgroundColor = dayCell.classList.contains('selected') ? '#14213D' : 'white';
            dayCell.style.color = dayCell.classList.contains('selected') ? 'white' : 'black';
        });
        
        calendarGrid.appendChild(dayCell);
    }
    
    calendar.appendChild(calendarGrid);
}

function createDayTimeSlot(day) {
    return `
        <div class="day-time-slot">
            <h3>${day}</h3>
            <div class="time-slots">
                <input type="time" class="start-time" name="${day.toLowerCase()}StartTime[]">
                <span>to</span>
                <input type="time" class="end-time" name="${day.toLowerCase()}EndTime[]">
                <button type="button" class="add-slot">+</button>
            </div>
        </div>
    `;
}
