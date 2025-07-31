document.addEventListener('DOMContentLoaded', () => {
    const verbiageLines = [
        document.getElementById('line-recovery'),
        document.getElementById('line-hydration'),
        document.getElementById('line-grams'),
        document.getElementById('line-protein'),
        document.getElementById('line-packed'),
        document.getElementById('line-shot')
    ];
    const lightningBoltMainContainer = document.querySelector('.lightning-bolt-main-container');
    const thunderSound = document.getElementById('thunder-sound'); // Ensure thunder-effect.mp3 is available
    const mainProductName = document.querySelector('.main-product-name');

    // Function to play thunder sound
    const playThunder = (volume = 100) => {
        if (thunderSound) {
            thunderSound.volume = volume;
            thunderSound.currentTime = 0; // Rewind to start
            thunderSound.play().catch(e => console.warn("Audio play failed:", e)); // Handle potential play errors
        }
    };

    // Sequence the verbiage and main lightning bolt animation
    const animateLandingPage = async () => {
        const delays = [1500, 1000, 1000, 1000, 1000, 1000]; // Delay before each line appears (first line delay, then delays between subsequent lines)

        // Animate each verbiage line sequentially
        for (let i = 0; i < verbiageLines.length; i++) {
            await new Promise(resolve => setTimeout(resolve, delays[i])); // Wait for delay

            verbiageLines[i].classList.add('active'); // Apply the fadeInOut animation
            playThunder(0.5); // Play subtle thunder for each line flash

            // Wait for the animation to complete before proceeding
            // Note: If you want lines to stay visible, remove the 'animationend' event logic here
            // and instead just let the 'active' class add the animation once.
            verbiageLines[i].addEventListener('animationend', () => {
                verbiageLines[i].classList.remove('active'); // Remove class to reset for potential replay or final state
            }, { once: true });
        }

        // After all verbiage, trigger the main lightning bolt and big thunder
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay before main bolt
        lightningBoltMainContainer.classList.add('flash'); // Trigger main bolt animation
        playThunder(1.0); // Play loud thunder for the main bolt

        // Make HYDROBLT name visible after bolt appears
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay for name to appear after bolt flash
        mainProductName.style.opacity = 1;
    };

    // Start the animation when the page loads
    animateLandingPage();

    // Placeholder for hamburger menu functionality (if needed for mobile)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // You'd add CSS for .nav-links.active to show/hide it
        });
    }

    // You can add form submission logic here for the "Join the Waiting List" button
    const joinBtn = document.querySelector('.join-waiting-list-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            alert('Thank you for your interest! We\'ll notify you when HYDROBLT is ready.');
            // In a real application, you would open a modal form or redirect
            // to a signup page, or send an AJAX request to your backend.
        });
    }
});