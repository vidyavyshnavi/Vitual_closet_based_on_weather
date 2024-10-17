function validateForm() {
    let isValid = true;

    // Name validation
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('nameError');
    if (name === "") {
        nameError.textContent = "Name is required.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
    if (email === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Password validation
    const password = document.getElementById('password').value.trim();
    const passwordError = document.getElementById('passwordError');
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }
    
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        isValid = false;
    } else {
        confirmPasswordError.textContent = "";
    }

    // Mobile validation
    const mobile = document.getElementById('mobile').value.trim();
    const mobileError = document.getElementById('mobileError');
    const mobilePattern = /^[0-9]{10}$/;
    if (mobile && !mobilePattern.test(mobile)) {
        mobileError.textContent = "Please enter a valid 10-digit mobile number.";
        isValid = false;
    } else {
        mobileError.textContent = "";
    }

    return isValid;
}
