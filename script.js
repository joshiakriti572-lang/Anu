// ================================
// TYPING TEXT ANIMATION
// ================================

const words = [
    "Geomatics Engineering Student",
    "GIS Analyst",
    "Remote Sensing Enthusiast",
    "WebGIS Developer",
    "Python Learner"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;
            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();


// ================================
// SCROLL REVEAL ANIMATION
// ================================

const sections = document.querySelectorAll(".section");

function revealSections() {

    sections.forEach(section => {

        const sectionTop =
            section.getBoundingClientRect().top;

        const screenHeight =
            window.innerHeight;

        if (sectionTop < screenHeight - 100) {

            section.style.opacity = "1";
            section.style.transform = "translateY(0)";

        }

    });

}

sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition =
        "all 0.8s ease";

});

window.addEventListener(
    "scroll",
    revealSections
);

revealSections();


// ================================
// PROFILE IMAGE GLOW EFFECT
// ================================

const profileImage =
    document.querySelector(".profile-pic");

if (profileImage) {

    profileImage.addEventListener("mouseenter", () => {

        profileImage.style.boxShadow =
            "0 0 40px #38bdf8";

    });

    profileImage.addEventListener("mouseleave", () => {

        profileImage.style.boxShadow =
            "0 0 30px rgba(56,189,248,0.4)";

    });

}


// ================================
// SMOOTH ACTIVE NAVIGATION
// (Future Use)
// ================================

console.log(
    "Akriti Joshi Portfolio Loaded Successfully"
);