/* ============================================================
   PRELOADER
   ============================================================ */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('hide'), 400);
});

/* ============================================================
   NAVBAR — mobile toggle
   ============================================================ */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('#navbar');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

// Close mobile menu after clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});

/* ============================================================
   HEADER background on scroll + scroll progress bar
   + active nav-link highlighting based on visible section
   ============================================================ */
const header = document.querySelector('#header');
const scrollProgress = document.querySelector('#scrollProgress');
const backToTop = document.querySelector('#backToTop');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // header background
  header.classList.toggle('scrolled', scrollY > 60);

  // back to top button
  backToTop.classList.toggle('show', scrollY > 500);

  // scroll progress bar
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;

  // active section highlight
  let currentSection = sections[0];
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.4) {
      currentSection = section;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === currentSection.id);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ============================================================
   SCROLL REVEAL — fade/slide in elements as they enter viewport
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   RESUME TABS
   ============================================================ */
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    resumeBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    resumeDetails.forEach(detail => detail.classList.remove('active'));
    resumeDetails[idx].classList.add('active');
  });
});

/* ============================================================
   PORTFOLIO CAROUSEL
   ============================================================ */
const arrowRight = document.querySelector('.navigation .arrow-right');
const arrowLeft = document.querySelector('.navigation .arrow-left');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
const portfolioDetails = document.querySelectorAll('.portfolio-detail');
const totalSlides = portfolioDetails.length;

let slideIndex = 0;

function updateCarousel() {
  imgSlide.style.transform = `translateX(-${slideIndex * 100}%)`;

  portfolioDetails.forEach(detail => detail.classList.remove('active'));
  portfolioDetails[slideIndex].classList.add('active');

  arrowLeft.classList.toggle('disabled', slideIndex === 0);
  arrowRight.classList.toggle('disabled', slideIndex === totalSlides - 1);
}

arrowRight.addEventListener('click', () => {
  if (slideIndex < totalSlides - 1) {
    slideIndex++;
    updateCarousel();
  }
});

arrowLeft.addEventListener('click', () => {
  if (slideIndex > 0) {
    slideIndex--;
    updateCarousel();
  }
});

/* ============================================================
   CONTACT FORM — EmailJS (client-safe, no exposed secrets)
   ============================================================ */

const EMAILJS_SERVICE_ID = 'service_sn8ot7q';
const EMAILJS_TEMPLATE_ID = 'template_tc6j6zy';
const EMAILJS_PUBLIC_KEY = 'sukTF5Bw3wbLYm4h3';

if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'sukTF5Bw3wbLYm4h3') {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const form = document.querySelector('#contactForm');
const submitBtn = document.querySelector('#submitBtn');

function showAlert(title, text, icon) {
  if (window.Swal) {
    Swal.fire({ title, text, icon, background: '#323946', color: '#fff' });
  } else {
    alert(`${title}: ${text}`);
  }
}

function validateForm(data) {
  if (!data.name || !data.email || !data.subject || !data.message) {
    showAlert('Error', 'Please fill in all required fields.', 'error');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showAlert('Error', 'Please enter a valid email address.', 'error');
    return false;
  }
  return true;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

  if (!validateForm(data)) return;

  if (EMAILJS_SERVICE_ID === 'service_sn8ot7q') {
    showAlert(
      'Almost there!',
      'Contact form isn\'t connected yet — add your EmailJS IDs in script.js to activate it.',
      'info'
    );
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending...';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data)
    .then(() => {
      showAlert('Success!', 'Your message has been sent. I\'ll get back to you soon.', 'success');
      form.reset();
    })
    .catch((error) => {
      showAlert('Error', 'Something went wrong. Please try again or email me directly.', 'error');
      console.error('EmailJS error:', error);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    });
});

/* ============================================================
   FOOTER YEAR
   ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();
