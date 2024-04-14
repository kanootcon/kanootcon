document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('countdown');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const postMessageElement = document.getElementById('post-countdown-message');
    const waitingImage = document.getElementById('waiting-image');

    const eventDate = new Date(Date.UTC(2024, 3, 20, 7, 0, 0)); // April 20th, 2024, 9:00 AM UTC+2

    function updateCountdown() {
        const now = new Date();
        const timeDifference = eventDate - now;

        if (timeDifference <= 0) {
            // Stop the countdown and display the event live message
            countdownElement.style.display = 'none'; // Hide the countdown
            postMessageElement.textContent = 'KanootCon is Live!';
            postMessageElement.style.display = 'block';
            waitingImage.style.display = 'none'; // Hide the waiting image
			clearInterval(updateInterval); // Stop the interval
            return; // Exit the function
        }

        // Continue updating countdown
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        daysSpan.textContent = days;
        hoursSpan.textContent = hours;
        minutesSpan.textContent = minutes;
        secondsSpan.textContent = seconds;

        // Toggle color for seconds
        if (seconds % 2 === 0) {
            secondsSpan.className = 'countdown-number red';
        } else {
            secondsSpan.className = 'countdown-number blue';
        }

        waitingImage.style.display = 'block'; // Ensure the waiting image is visible during countdown
    }

    let updateInterval = setInterval(updateCountdown, 1000);
	updateCountdown(); // Immediately update on load
});
