// Hamburger menu toggle for mobile view
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) { // Check if elements exist
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active"); // This class now makes the menu display
    });

    document.querySelectorAll(".nav-menu .nav-link").forEach(n => n.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    }));
}


// Smooth scrolling for any anchor links on the *current* page (e.g., a link to footer)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') === '#') return;

    const targetId = anchor.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

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

// --- Showcase Slideshow --- //
let slideIndex = 1; //
let slideInterval; //

// Function to initialize slideshow (call this if on showcase page)
function initializeSlideshow() { //
    const slideshowContainer = document.querySelector('.slideshow-container'); //
    if (slideshowContainer) { //
        showSlides(slideIndex); //
        startAutoSlide(); //

        slideshowContainer.addEventListener('mouseenter', pauseAutoSlide); //
        slideshowContainer.addEventListener('mouseleave', startAutoSlide); //
    }
}

// Next/previous controls
function plusSlides(n) { //
    showSlides(slideIndex += n); //
    resetAutoSlide(); //
}

// Thumbnail image controls
function currentSlide(n) { //
    showSlides(slideIndex = n); //
    resetAutoSlide(); //
}

function showSlides(n) { //
    let i; //
    const slides = document.getElementsByClassName("slide"); //
    const dots = document.getElementsByClassName("dot"); //

    if (slides.length === 0) return; //

    if (n > slides.length) {slideIndex = 1} //
    if (n < 1) {slideIndex = slides.length} //

    for (i = 0; i < slides.length; i++) { //
        slides[i].style.display = "none"; //
        slides[i].classList.remove("active"); //
    }
    for (i = 0; i < dots.length; i++) { //
        dots[i].classList.remove("active"); //
    }

    slides[slideIndex-1].style.display = "block"; //
    slides[slideIndex-1].classList.add("active"); //
    if (dots.length > 0) { //
        dots[slideIndex-1].classList.add("active"); //
    }
}

function startAutoSlide() { //
    const slideshowContainer = document.querySelector('.slideshow-container'); //
    if (slideshowContainer) { //
       clearInterval(slideInterval); //
       slideInterval = setInterval(function() { //
           plusSlides(1); //
       }, 5000); //
    }
}

function pauseAutoSlide() { //
    clearInterval(slideInterval); //
}

function resetAutoSlide() { //
    pauseAutoSlide(); //
    startAutoSlide(); //
}

document.addEventListener('DOMContentLoaded', function() { //
    if (document.getElementById('showcase-page')) { //
        initializeSlideshow(); //
    }
});