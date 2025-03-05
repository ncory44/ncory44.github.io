document.addEventListener("DOMContentLoaded", function () {
    console.log("Script is running!");

    const aboutSection = document.getElementById("About");

    function fadeInOnScroll() {
        const rect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.75) {  // When about section enters viewport
            aboutSection.classList.add("fade-in");
        }
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // Trigger once in case it's already visible

    // POPUP
    function openForm() {
        document.getElementById('contactPopup').style.display = "block";
    }

    function closeForm() {
        document.getElementById('contactPopup').style.display = "none";
    }

    // Listeners for popup
    document.getElementById('openPopupBtn').addEventListener("click", openForm);
    document.getElementById('closePopupBtn').addEventListener("click", closeForm);

    // Closes popup when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === document.getElementById('contactPopup')) {
            closeForm();
        }
    });

    // New form validation code
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener("submit", function (event) {
        const name = document.getElementById('Name').value.trim();
        const email = document.getElementById('Email').value.trim();
        const phone = document.getElementById('Phone').value.trim();
        const message = document.getElementById('Message').value.trim();

        // Checks if field is empty
        if (name === "" || email === "" || phone === "" || message === "") {
            event.preventDefault();
            alert('Please fill out all fields before submitting!');
        }
    });
});