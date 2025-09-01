document.addEventListener('DOMContentLoaded', function () {
    const scheduleItems = [
        { start: '08:00', end: '12:30', image: 'Game1.png' },
        { start: '12:30', end: '13:15', image: 'Lunch.png' },
        { start: '13:15', end: '17:00', image: 'Game2.png' },
        { start: '17:00', end: '17:45', image: 'Dinner.png' },
        { start: '17:45', end: '21:30', image: 'Game3.png' },
        { start: '21:30', end: '03:00', image: 'post930.png' }
    ];

    function updateSchedule() {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const startDate = new Date(Date.UTC(2024, 3, 20));
        if (now < startDate) {
            return; // Stop execution if the current date is before the start date
        }

        let activeFound = false;
        for (let i = 0; i < scheduleItems.length; i++) {
            const item = scheduleItems[i];
            const startTime = parseInt(item.start.split(':')[0]) * 60 + parseInt(item.start.split(':')[1]);
            let endTime = parseInt(item.end.split(':')[0]) * 60 + parseInt(item.end.split(':')[1]);

            if (endTime < startTime) {
                endTime += 1440; // Adjust for next day
            }

            if (currentTime >= startTime && currentTime < endTime) {
                document.getElementById('schedule-image').src = 'images/' + item.image;
                document.getElementById('schedule-table').rows[i].classList.add('active');
                activeFound = true;
            } else {
                document.getElementById('schedule-table').rows[i].classList.remove('active');
            }
        }

		if (!activeFound) {
			const scheduleImage = document.getElementById('schedule-image');
			scheduleImage.style.display = 'none'; // Hide the image container
		} else {
			const scheduleImage = document.getElementById('schedule-image');
			scheduleImage.style.display = 'block'; // Show the image container when active
		}

    }

    setInterval(updateSchedule, 60000);
    updateSchedule();
});
