let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Show the current slide
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    slides[slideIndex - 1].classList.add('active');

    // Change slide every 5 seconds
    setTimeout(showSlides, 1000);
}

// Initialize the slider
showSlides();
