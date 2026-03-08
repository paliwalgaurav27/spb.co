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
}

});

}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");


/* ======================================================
NAVBAR FUNCTION
Runs after header loads
====================================================== */

function initNavbar(){

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

navLinks.classList.toggle("active");

});

}


/* ======================================================
STICKY NAVBAR SHADOW
====================================================== */

window.addEventListener("scroll", () => {

const header = document.querySelector("header");

if(!header) return;

if(window.scrollY > 50){
header.classList.add("scrolled");
}
else{
header.classList.remove("scrolled");
}

});


/* ======================================================
SCROLL REVEAL ANIMATION
====================================================== */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll(){

const windowHeight = window.innerHeight;

revealElements.forEach((element)=>{

const elementTop = element.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){

element.classList.add("active");

}

});

}

window.addEventListener("scroll", revealOnScroll);


/* ======================================================
BACK TO TOP BUTTON
====================================================== */

const backToTop = document.createElement("button");

backToTop.innerText = "↑";
backToTop.id = "backToTop";

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {

if(window.scrollY > 400){
backToTop.style.display = "block";
}
else{
backToTop.style.display = "none";
}

});

backToTop.addEventListener("click", () => {

window.scrollTo({
top:0,
behavior:"smooth"
});

});