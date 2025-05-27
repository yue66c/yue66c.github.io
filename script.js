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

// Scrollspy for year navigation in publications page
document.addEventListener('DOMContentLoaded', () => {
    const yearNav = document.querySelector('.year-navigation');
    // Check if we are on publications page with the new layout
    if (yearNav && document.querySelector('.publications-content')) {
        const yearLinks = Array.from(yearNav.querySelectorAll('ul li a.year-link'));
        const yearSections = Array.from(document.querySelectorAll('.publication-year-section'));
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        // Adjust offset: navbar height + some extra space so the title is well visible
        const scrollOffset = navbarHeight + 30;

        function changeActiveYearLink() {
            let currentSectionId = null;
            // Find the current section scrolled to
            // Iterate backwards to find the last section that is above the offset
            for (let i = yearSections.length - 1; i >= 0; i--) {
                const section = yearSections[i];
                if (section.offsetTop - scrollOffset <= window.pageYOffset) {
                    currentSectionId = section.getAttribute('id');
                    break;
                }
            }
            // If no section is found (e.g. scrolled to top before first section), activate first link
            if (!currentSectionId && yearSections.length > 0 && window.pageYOffset < yearSections[0].offsetTop - scrollOffset) {
                 currentSectionId = yearSections[0].getAttribute('id');
            }


            yearLinks.forEach(link => {
                link.classList.remove('active');
                // Check if the link's href matches the current section ID (without the #)
                if (link.getAttribute('href') === '#' + currentSectionId) {
                    link.classList.add('active');
                }
            });
        }

        // Debounce scroll event for performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(changeActiveYearLink, 50); // Adjust debounce rate as needed
        });

        // Initial call to set active link on page load (e.g. if there's a hash)
        changeActiveYearLink();

        // Update active link on click immediately and handle smooth scroll
        yearLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Smooth scroll is handled by the global smooth scroll function
                // We just need to update the active class here if not covered by scroll event quickly enough
                // (though scroll event should ideally handle it)
                setTimeout(() => { // Allow scroll to happen then update, or let scrollspy handle it
                    yearLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }, 0); // Small delay or rely on scroll event triggered by navigation
            });
        });
    }
});

// --- Showcase Slideshow ---
let slideIndex = 1;
let slideInterval;

// Function to initialize slideshow (call this if on showcase page)
function initializeSlideshow() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) { // Check if slideshow elements exist on the page
        showSlides(slideIndex);
        startAutoSlide();

        // Optional: Pause on hover
        slideshowContainer.addEventListener('mouseenter', pauseAutoSlide);
        slideshowContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
    resetAutoSlide();
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    resetAutoSlide();
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return; // No slides found

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].classList.add("active");
    if (dots.length > 0) {
        dots[slideIndex-1].classList.add("active");
    }
}

function startAutoSlide() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) { // Only start if on the right page
       clearInterval(slideInterval); // Clear existing interval
       slideInterval = setInterval(function() {
           plusSlides(1);
       }, 5000); // Change image every 5 seconds
    }
}

function pauseAutoSlide() {
    clearInterval(slideInterval);
}

function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
}

// Initialize slideshow when the DOM is ready, specifically if on showcase page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we are on the showcase page by looking for a specific element
    if (document.getElementById('showcase-page')) {
        initializeSlideshow();
    }
});
// Active page link in navbar (CSS handles this with .active-page class added in HTML)
// No complex JS needed for this in a multi-page setup.
// The previously provided scroll-based active link highlighting is removed
// as it's not ideal for a multi-page site.
