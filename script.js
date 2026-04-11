/* ======================================================
LOAD HEADER & FOOTER COMPONENTS
====================================================== */

function loadComponent(id, file){
  fetch(file)
  .then(response => response.text())
  .then(data => {
    document.getElementById(id).innerHTML = data;

    /* run navbar JS only AFTER header loads */
    if(id === "header"){
      initNavbar();
      checkStickyHeader();
    }
  })
  .catch(err => console.error('Error loading component:', err));
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");


/* ======================================================
NAVBAR FUNCTION
====================================================== */

function initNavbar(){
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if(menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      
      // Animate icon based on active state if it's FA icon (optional toggle)
      const icon = menuToggle.querySelector('i');
      if(icon) {
        if(navLinks.classList.contains("active")) {
          icon.classList.replace('fa-bars', 'fa-times');
        } else {
          icon.classList.replace('fa-times', 'fa-bars');
        }
      }
    });
  }
}

/* ======================================================
STICKY NAVBAR SHADOW
====================================================== */

function checkStickyHeader() {
  const header = document.querySelector("header");
  if(!header) return;

  if(window.scrollY > 50){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", checkStickyHeader);


/* ======================================================
SCROLL REVEAL (Intersection Observer)
====================================================== */

// Use modern IntersectionObserver API for performant scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  reveals.forEach(element => {
    revealObserver.observe(element);
  });
  
  // Initialize Counters
  initCounters();
});


/* ======================================================
NUMBER COUNTER ANIMATION
====================================================== */

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if(counters.length === 0) return;
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        
        let count = 0;
        const speed = 2000; // Total ms for animation
        const increment = target / (speed / 16); // 60fps approx
        
        function updateCount() {
          count += increment;
          if(count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target;
          }
        }
        
        updateCount();
        observer.unobserve(counter); // Only run once
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}


/* ======================================================
BACK TO TOP BUTTON
====================================================== */

const backToTop = document.createElement("button");
// Using FontAwesome icon inside
backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTop.id = "backToTop";

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if(window.scrollY > 400){
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});