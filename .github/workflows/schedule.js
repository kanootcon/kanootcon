// Update the 'schedule.js' file to include:
document.addEventListener('DOMContentLoaded', function () {
    // Define the schedule and corresponding images
    const scheduleItems = [
        { start: '08:30', end: '12:30', image: 'Game1.png' },
        { start: '12:30', end: '13:15', image: 'Lunch.png' },
        { start: '13:15', end: '17:00', image: 'Game2.png' },
        { start: '17:00', end: '17:45', image: 'Dinner.png' },
        { start: '17:45', end: '21:30', image: 'Game3.png' }
    ];

    // Function to update the schedule based on the current time
    function updateSchedule() {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        let activeFound = false;

        for (let i = 0; i < scheduleItems.length; i++) {
            const item = scheduleItems[i];
            const startTime = parseInt(item.start.split(':')[0]) * 60 + parseInt(item.start.split(':')[1]);
            const endTime = parseInt(item.end.split(':')[0]) * 60 + parseInt(item.end.split(':')[1]);

            if (currentTime >= startTime && currentTime <= endTime) {
                document.getElementById('schedule-image').src = 'images/' + item.image;
                document.getElementById('schedule-table').rows[i].classList.add('active');
                activeFound = true;
            } else {
                document.getElementById('schedule-table').rows[i].classList.remove('active');
            }
        }

        // If no active slot is found, clear the image
        if (!activeFound) {
            document.getElementById('schedule-image').src = '';
        }
    }

    // Run the function every minute
    setInterval(updateSchedule, 60000);
    // And run it once on load
    updateSchedule();
});