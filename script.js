// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");

    if (targetId.startsWith("#") && targetId.length > 1) {
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  });
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  // Close menu after clicking a nav link
  navLinkItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", e => {
    const clickedInsideNav =
      navToggle.contains(e.target) || navLinks.contains(e.target);

    if (!clickedInsideNav) {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    }
  });
}

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

let ticking = false;

function setActiveNav() {
  let currentId = "";
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      currentId = section.id;
    }
  });

  navItems.forEach(link => {
    const href = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", href === currentId);
  });

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(setActiveNav);
      ticking = true;
    }
  },
  { passive: true }
);

// Scroll reveal animations
const revealItems = document.querySelectorAll(".reveal");
const revealOnLoadItems = document.querySelectorAll(".reveal-on-load");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add("visible"));
}

// Reveal hero on load
window.addEventListener("load", () => {
  revealOnLoadItems.forEach(el => el.classList.add("visible"));
  setActiveNav();
});

// Testimonials slider
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.getElementById("testimonialPrev");
const nextBtn = document.getElementById("testimonialNext");

let testimonialIndex = 0;
let testimonialInterval;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });
}

function restartTestimonials() {
  clearInterval(testimonialInterval);
  startTestimonials();
}

function startTestimonials() {
  if (testimonials.length > 1) {
    testimonialInterval = setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    }, 8000);
  }
}

if (prevBtn && nextBtn && testimonials.length) {
  prevBtn.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
    restartTestimonials();
  });

  nextBtn.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
    restartTestimonials();
  });

  startTestimonials();
}

// Contact form
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", async e => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formSuccess.textContent = "Thanks! Your message has been sent successfully.";
        formSuccess.style.display = "block";
        contactForm.reset();

        setTimeout(() => {
          formSuccess.style.display = "none";
        }, 6000);
      } else {
        formSuccess.textContent = "Something went wrong. Please try again.";
        formSuccess.style.display = "block";
      }
    } catch (error) {
      formSuccess.textContent = "Network error. Please try again later.";
      formSuccess.style.display = "block";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// Dynamic year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}