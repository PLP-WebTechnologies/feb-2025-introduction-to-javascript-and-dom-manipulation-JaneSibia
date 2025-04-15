// DOM Elements
const demoBtn = document.getElementById('demo-btn');
const learnMoreBtn = document.getElementById('learn-more');
const changeThemeBtn = document.getElementById('change-theme');
const toggleServiceBtn = document.getElementById('toggle-service');
const servicesContainer = document.getElementById('services-container');
const nextTestimonialBtn = document.getElementById('next-testimonial');
const testimonialText = document.getElementById('testimonial-text');
const subscribeForm = document.getElementById('subscribe-form');
const subscriptionMessage = document.getElementById('subscription-message');
const backToTopBtn = document.getElementById('back-to-top');
const dynamicHeading = document.getElementById('dynamic-heading');

// Text content to cycle through for dynamic heading
const headingTexts = [
    "Transform Your Digital Presence",
    "Grow Your Business Online",
    "Data-Driven Marketing Solutions",
    "Maximize Your ROI"
];
let currentHeadingIndex = 0;

// Additional services data
const additionalServices = [
    {
        icon: 'fas fa-users',
        title: 'Social Media Marketing',
        description: 'Build brand awareness and engage your audience across all social platforms.'
    },
    {
        icon: 'fas fa-pencil-alt',
        title: 'Content Marketing',
        description: 'Attract and retain customers with compelling, relevant content.'
    },
    {
        icon: 'fas fa-mobile-alt',
        title: 'Conversion Optimization',
        description: 'Turn more visitors into customers with our CRO strategies.'
    }
];

// Testimonials data
const testimonials = [
    {
        text: '"PrimeGrowth increased our website traffic by 300% in just 6 months!"',
        author: '- Sarah Kimani, CEO of TechSolutions'
    },
    {
        text: '"Our conversion rates doubled after implementing their marketing strategies."',
        author: '- Michael Chen, Marketing Director at UrbanFit'
    },
    {
        text: '"The team at PrimeGrowth truly understands digital marketing. Highly recommended!"',
        author: '- Emily Rodriguez, Founder of GreenLife'
    }
];
let currentTestimonialIndex = 0;

// Event Listeners
demoBtn.addEventListener('click', showDemoModal);
learnMoreBtn.addEventListener('click', scrollToServices);
changeThemeBtn.addEventListener('click', toggleDarkMode);
toggleServiceBtn.addEventListener('click', toggleAdditionalServices);
nextTestimonialBtn.addEventListener('click', showNextTestimonial);
subscribeForm.addEventListener('submit', handleSubscription);
backToTopBtn.addEventListener('click', scrollToTop);
window.addEventListener('scroll', toggleBackToTopButton);

// Change heading text every 3 seconds
setInterval(changeHeadingText, 3000);

// Functions
function showDemoModal() {
    // In a real application, this would show a modal
    alert("Thank you for your interest! Our team will contact you shortly to schedule your free demo.");
    // Change button text temporarily
    demoBtn.textContent = "Request Sent!";
    setTimeout(() => {
        demoBtn.textContent = "Get Free Demo";
    }, 2000);
}

function scrollToServices() {
    document.querySelector('#services').scrollIntoView({
        behavior: 'smooth'
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    changeThemeBtn.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
}

function toggleAdditionalServices() {
    const isShowingMore = toggleServiceBtn.textContent.includes("More");
    
    if (isShowingMore) {
        // Add additional services
        additionalServices.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <i class="${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesContainer.appendChild(serviceCard);
        });
        toggleServiceBtn.textContent = "Show Less Services";
    } else {
        // Remove additional services
        const services = servicesContainer.querySelectorAll('.service-card');
        for (let i = services.length - 1; i >= 3; i--) {
            servicesContainer.removeChild(services[i]);
        }
        toggleServiceBtn.textContent = "Show More Services";
    }
}

function showNextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    const testimonial = testimonials[currentTestimonialIndex];
    
    // Fade out
    testimonialText.style.opacity = 0;
    
    setTimeout(() => {
        testimonialText.textContent = testimonial.text;
        // Update author in the next sibling element
        testimonialText.nextElementSibling.querySelector('p').textContent = testimonial.author;
        // Fade in
        testimonialText.style.opacity = 1;
    }, 300);
}

function handleSubscription(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    
    // Simulate subscription processing
    subscriptionMessage.textContent = "Subscribing...";
    subscriptionMessage.style.color = "var(--light-color)";
    
    setTimeout(() => {
        subscriptionMessage.textContent = `Thank you for subscribing with ${email}!`;
        e.target.reset();
    }, 1500);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
}

function changeHeadingText() {
    currentHeadingIndex = (currentHeadingIndex + 1) % headingTexts.length;
    
    // Fade out
    dynamicHeading.style.opacity = 0;
    
    setTimeout(() => {
        dynamicHeading.textContent = headingTexts[currentHeadingIndex];
        // Fade in
        dynamicHeading.style.opacity = 1;
    }, 300);
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    changeThemeBtn.textContent = "Light Mode";
}

// Initialize back to top button visibility
toggleBackToTopButton();