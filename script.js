/* ==========================================================================
   CocoaTech — Interactive JavaScript
   Handles:
     1. Mobile navigation menu toggle
     2. Contact form client-side validation and success messaging
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // --------------------------------------------------------------------------
  // 1. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Contact Form Validation
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const formAlertSuccess = document.getElementById('formAlertSuccess');
    const formAlertError = document.getElementById('formAlertError');

    // Simple, reliable email regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Helper: Clear specific field error
    function clearFieldError(input, errorElement) {
      input.classList.remove('input-error');
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
      }
    }

    // Helper: Show specific field error
    function showFieldError(input, errorElement, message) {
      input.classList.add('input-error');
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('visible');
      }
    }

    // Clear errors when the user starts typing
    [nameInput, emailInput, messageInput].forEach(function (input) {
      if (input) {
        input.addEventListener('input', function () {
          if (input === nameInput) clearFieldError(nameInput, nameError);
          if (input === emailInput) clearFieldError(emailInput, emailError);
          if (input === messageInput) clearFieldError(messageInput, messageError);

          // Hide top alert banners on editing
          if (formAlertError) formAlertError.classList.remove('visible');
          if (formAlertSuccess) formAlertSuccess.classList.remove('visible');
        });
      }
    });

    // Form submit event handler
    contactForm.addEventListener('submit', function (event) {
      // Prevent default page reload
      event.preventDefault();

      let isValid = true;

      // Reset any existing global alert messages
      if (formAlertSuccess) formAlertSuccess.classList.remove('visible');
      if (formAlertError) formAlertError.classList.remove('visible');

      // 1. Validate Name
      const nameValue = nameInput.value.trim();
      if (nameValue === '') {
        showFieldError(nameInput, nameError, 'Please enter your full name.');
        isValid = false;
      } else {
        clearFieldError(nameInput, nameError);
      }

      // 2. Validate Email
      const emailValue = emailInput.value.trim();
      if (emailValue === '') {
        showFieldError(emailInput, emailError, 'Please enter your email address.');
        isValid = false;
      } else if (!emailRegex.test(emailValue)) {
        showFieldError(emailInput, emailError, 'Please enter a valid email address (e.g., name@example.com).');
        isValid = false;
      } else {
        clearFieldError(emailInput, emailError);
      }

      // 3. Validate Message
      const messageValue = messageInput.value.trim();
      if (messageValue === '') {
        showFieldError(messageInput, messageError, 'Please enter a message before sending.');
        isValid = false;
      } else if (messageValue.length < 10) {
        showFieldError(messageInput, messageError, 'Your message should be at least 10 characters long.');
        isValid = false;
      } else {
        clearFieldError(messageInput, messageError);
      }

      // 4. Handle Final Result
      if (!isValid) {
        if (formAlertError) {
          formAlertError.textContent = 'Please fix the highlighted fields above and try again.';
          formAlertError.classList.add('visible');
        }
      } else {
        // Display polite success message
        if (formAlertSuccess) {
          formAlertSuccess.textContent = 'Thank you for reaching out, ' + nameValue + '! We have received your message and will get back to you shortly.';
          formAlertSuccess.classList.add('visible');
        }

        // Reset the form inputs
        contactForm.reset();

        // Smooth scroll to the success message
        formAlertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});
