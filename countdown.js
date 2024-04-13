function updateCountdown() {
    const targetTime = new Date(Date.UTC(2024, 3, 20, 7, 0, 0)); // Month is 0-indexed, 3 means April
    const currentTime = new Date();
    const timeDifference = targetTime - currentTime;

    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');

    if (timeDifference >= 0) {
        days.textContent = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        hours.textContent = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        minutes.textContent = Math.floor((timeDifference / (1000 * 60)) % 60);
        seconds.textContent = Math.floor((timeDifference / 1000) % 60);

        // Toggle color of seconds for visual tick
        seconds.style.color = seconds.style.color === 'red' ? 'blue' : 'red'; // Change colors as needed
    } else {
        document.getElementById('countdown-text').textContent = "The date has passed!";
        document.getElementById('countdown-timer').style.display = 'none';
    }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

document.addEventListener('DOMContentLoaded', updateCountdown);
