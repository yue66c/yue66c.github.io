// Hamburger menu toggle for mobile view
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});


// Update footer year automatically
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Optional: Active link highlighting on scroll (more advanced)
// You can add this if you want the navbar links to highlight as you scroll through sections.
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50; // Adjust offset as needed
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link'); // Create this class in CSS if you use it
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active-link');
        }
    });
    // If you use active-link, add to CSS:
    // .nav-link.active-link { color: #007bff; font-weight: bold; }
});