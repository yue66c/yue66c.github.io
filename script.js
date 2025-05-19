// Hamburger menu toggle for mobile view
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) { // Check if elements exist
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active"); // This class now makes the menu display
    });

    // Optional: Close menu if a link is clicked (though page navigation will do this)
    // This is more for single-page apps or if the menu doesn't auto-close.
    // For a multi-page site, this might be redundant but harmless.
    document.querySelectorAll(".nav-menu .nav-link").forEach(n => n.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    }));
}


// Smooth scrolling for any anchor links on the *current* page (e.g., a link to footer)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Make sure it's not just a placeholder href="#"
    if (anchor.getAttribute('href') === '#') return;

    // Check if the target element exists on the current page
    const targetId = anchor.getAttribute('href').substring(1); // Get ID without #
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump

            const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // If hamburger menu is open, close it after scrolling
            if (hamburger && navMenu && navMenu.classList.contains("active")) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }
});


// Update footer year automatically
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Active page link in navbar (CSS handles this with .active-page class added in HTML)
// No complex JS needed for this in a multi-page setup.
// The previously provided scroll-based active link highlighting is removed
// as it's not ideal for a multi-page site.
