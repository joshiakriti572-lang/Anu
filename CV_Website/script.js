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

// ================================
// WEBGIS MAP
// ================================

// Create map
var map = L.map('map').setView([28.3949, 84.1240], 7);

// OpenStreetMap Basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load Nepal District GeoJSON
fetch('data/nepal-districts-new.geojson')
    .then(response => response.json())
    .then(data => {

      // Information Box
const info = L.control();

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function(props) {
    this._div.innerHTML =
        '<h4>District Information</h4>' +
        (props
            ? '<b>District:</b> ' + props.DIST_EN +
              '<br><b>Area:</b> ' + props.Shape_Area
            : 'Hover over a district');
};

info.addTo(map);

// Highlight District
function highlightFeature(e) {
    const layer = e.target;
    console.log(layer.feature.properties);
    layer.setStyle({
        weight: 3,
        color: '#000',
        fillOpacity: 0.9
    });

    info.update(layer.feature.properties);
}

// Reset Style
function resetHighlight(e) {
    districtLayer.resetStyle(e.target);
    info.update();
}

// Events
function onEachFeature(feature, layer) {

    layer.bindPopup(feature.properties.DIST_EN);

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

// District Layer
const districtLayer = L.geoJSON(data, {

    style: function(feature) {

        const area = feature.properties.Shape_Area;

        return {
            color: '#ffffff',
            weight: 1,
            fillOpacity: 0.7,

            fillColor:
                area > 0.15 ? '#08306b' :
                area > 0.10 ? '#2171b5' :
                area > 0.07 ? '#4292c6' :
                area > 0.04 ? '#6baed6' :
                '#c6dbef'
        };
    },

    onEachFeature: onEachFeature

});

districtLayer.addTo(map);

map.fitBounds(districtLayer.getBounds());
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
    });