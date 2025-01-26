// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hide loader when the page finishes loading
window.addEventListener('load', function () {
    console.log('Page loaded!'); // Debugging
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Fallback: Hide loader after 5 seconds
setTimeout(function () {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
}, 5000);

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Log the values to make sure they're being captured
    console.log({name, email, subject, message});

    const submitButton = document.getElementById('submitButton');
    const formStatus = document.getElementById('formStatus');
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    // Send email using EmailJS
    emailjs.send('service_aagcoy3', 'template_contacct', {
        to_name: 'Sanif',
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        reply_to: email
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        submitButton.style.background = 'var(--secondary)';
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Thank you for your message. I will get back to you soon!';
        
        document.getElementById('contactForm').reset();
        
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            submitButton.style.background = '';
        }, 3000);
    })
    .catch(function(error) {
        console.error('Failed to send email:', error);
        submitButton.disabled = false;
        submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Oops! Something went wrong. Please try again.';
    });
});
