// Hamburger menu toggle for mobile view
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) { // Check if elements exist
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked (useful for SPA-like behavior or if menu stays open)
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        // For a multi-page site, the menu will close on page load anyway,
        // but this can be useful if you have anchor links within the same page
        // or if the menu needs to explicitly close for other reasons.
        if (navMenu.classList.contains("active")) { // Only if menu is active
             // Check if the link is an internal page link
            if (n.getAttribute('href').startsWith('#') || n.getAttribute('href').includes('#')) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        }
    }));
}


// Smooth scrolling for anchor links (primarily for #contact-info-home now)
document.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(anchor => {
    // Ensure it's not just a link with href="#"
    if (anchor.getAttribute('href') === '#') return;

    // Check if the anchor link points to an element on the current page
    const targetId = anchor.getAttribute('href').split('#')[1];
    if (!targetId) return; // Not an anchor link or malformed

    // Check if the link is meant for the current page.
    // This check is basic; for more complex scenarios, you might need more robust logic.
    const isSamePageLink = anchor.pathname === window.location.pathname ||
                           "/" + anchor.pathname.split('/').pop() === window.location.pathname ||
                           anchor.pathname.split('/').pop() === window.location.pathname.split('/').pop();


    if (isSamePageLink && document.getElementById(targetId)) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    }
});


// Update footer year automatically
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Note: The active link highlighting on scroll is removed as it's better
// to set the active link based on the current HTML page ('active-page' class).
