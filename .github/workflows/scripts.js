document.addEventListener('DOMContentLoaded', (event) => {
    // Function to remove the anchor part from the href
    function stripHash(url) {
        return url.split('#')[0];
    }

    // Highlight the active navigation link
    const navLinks = document.querySelectorAll('nav a');
    // Get the current path without the hash
    const currentPath = stripHash(window.location.pathname.split('/').pop());

    navLinks.forEach(link => {
        // Get the href attribute without the hash
        const linkPath = stripHash(link.getAttribute('href'));
        // Check if the link's href matches the current path
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
