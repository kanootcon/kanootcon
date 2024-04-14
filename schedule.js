document.addEventListener('DOMContentLoaded', function () {
    // Define the schedule and corresponding images
    const scheduleItems = [
        { start: '08:30', end: '12:30', image: 'Game1.png' },
        { start: '12:30', end: '13:15', image: 'Lunch.png' },
        { start: '13:15', end: '17:00', image: 'Game2.png' },
        { start: '17:00', end: '17:45', image: 'Dinner.png' },
        { start: '17:45', end: '21:30', image: 'Game3.png' },
        { start: '21:30', end: '08:30', image: 'post930.png' }
    ];

    function updateSchedule() {
        const now = new Date();
        let currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

        let activeFound = false;

        scheduleItems.forEach((item, index) => {
            const startTime = parseInt(item.start.split(':')[0]) * 60 + parseInt(item.start.split(':')[1]);
            let endTime = parseInt(item.end.split(':')[0]) * 60 + parseInt(item.end.split(':')[1]);

            // Adjust for events that span past midnight
            if (endTime < startTime) {
                if (currentTime >= startTime || currentTime < endTime) {
                    // We are currently in a period that spans past midnight
                    displayActivity(item, index);
                    activeFound = true;
                }
            } else if (currentTime >= startTime && currentTime < endTime) {
                // Normal condition where event does not span past midnight
                displayActivity(item, index);
                activeFound = true;
            } else {
                document.getElementById('schedule-table').rows[index].classList.remove('active');
            }
        });

        // If no active slot is found, clear the image
        if (!activeFound) {
            document.getElementById('schedule-image').src = '';
        }
    }

    function displayActivity(item, index) {
        document.getElementById('schedule-image').src = 'images/' + item.image;
        document.getElementById('schedule-table').rows[index].classList.add('active');
    }

    // Run the function every minute
    setInterval(updateSchedule, 60000);
    // And run it once on load
    updateSchedule();
});
