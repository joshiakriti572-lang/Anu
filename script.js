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
// WEBGIS MAP (FIXED VERSION)
// ================================

// 1. CREATE MAP
var map = L.map('map').setView([28.3949, 84.1240], 7);

// 2. BASE MAP
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// 3. GLOBAL VARIABLE (IMPORTANT)
var geojsonLayer;

// 4. COLOR FUNCTION
function getColor(area) {
    return area > 0.15 ? '#08306b' :
           area > 0.10 ? '#2171b5' :
           area > 0.07 ? '#4292c6' :
           area > 0.04 ? '#6baed6' :
                        '#c6dbef';
}

// 5. STYLE
function style(feature) {
    return {
        color: "#fff",
        weight: 1,
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.Shape_Area || 0)
    };
}

// 6. INFO BOX
var info = L.control();

info.onAdd = function () {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML =
        "<h4>District Info</h4>" +
        (props
            ? "<b>" + props.DIST_EN + "</b><br>Area: " + props.Shape_Area
            : "Hover over district");
};

info.addTo(map);

// 7. HIGHLIGHT
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: "#000",
        fillOpacity: 0.9
    });

    info.update(layer.feature.properties);
}

// 8. RESET
function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
    info.update();
}

// 9. EVENTS
function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.DIST_EN);

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

// 10. LOAD GEOJSON
fetch("data/nepal-districts-new.geojson")
    .then(res => res.json())
    .then(data => {

        geojsonLayer = L.geoJSON(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);

        map.fitBounds(geojsonLayer.getBounds());

        // 11. LEGEND (MOVED OUTSIDE PROBLEM AREA)
        var legend = L.control({ position: 'bottomright' });

        legend.onAdd = function () {

            var div = L.DomUtil.create('div', 'info legend');

            var grades = [0, 0.04, 0.07, 0.10, 0.15];

            var colors = [
                '#c6dbef',
                '#6baed6',
                '#4292c6',
                '#2171b5',
                '#08306b'
            ];

            div.innerHTML = "<b>Area Classification</b><br>";

            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + colors[i] + '"></i> ' +
                    grades[i] + (grades[i + 1] ? ' - ' + grades[i + 1] : '+') +
                    '<br>';
            }

            return div;
        };

        legend.addTo(map);
    })
    .catch(err => console.log(err));