document.addEventListener("DOMContentLoaded", function() {
    const emailButton = document.querySelector('.email-button');
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');

    // Add click event listener
    emailButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default button behavior

        const email = emailInput.value; // Get email value

        if (email) {
            // Construct the mailto link and clear the input
            window.location.href = `mailto:support@example.com?subject=Support Inquiry&body=Email: ${email}`;
            successMessage.textContent = "Your email has been sent successfully!"; // Success message
            emailInput.value = ""; // Clear input after submission
        } else {
            successMessage.textContent = "Please enter a valid email address."; // Error message
        }
    });
});
