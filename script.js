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
// WEBGIS MAP SECTION (LEAFLET)
// ================================

// 1. CREATE MAP
var map = L.map('map').setView([28.3949, 84.1240], 7);

// 2. ADD BASE MAP (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ================================
// 3. FUNCTION TO GET COLOR (CHOROPLETH)
// ================================
function getColor(area) {
    return area > 0.15 ? '#08306b' :
           area > 0.10 ? '#2171b5' :
           area > 0.07 ? '#4292c6' :
           area > 0.04 ? '#6baed6' :
                        '#c6dbef';
}

// ================================
// 4. STYLE EACH DISTRICT
// ================================
function style(feature) {

    // Safe check (in case data is missing)
    let area = feature.properties.Shape_Area || 0;

    return {
        color: '#ffffff',
        weight: 1,
        fillOpacity: 0.7,
        fillColor: getColor(area)
    };
}

// ================================
// 5. HOVER INFO BOX (CONTROL)
// ================================
var info = L.control();

info.onAdd = function () {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// Update info box content
info.update = function (props) {
    this._div.innerHTML =
        '<h4>District Information</h4>' +
        (props
            ? '<b>District:</b> ' + props.DIST_EN +
              '<br><b>Area:</b> ' + props.Shape_Area
            : 'Hover over a district');
};

info.addTo(map);

// ================================
// 6. HIGHLIGHT FUNCTION (ON HOVER)
// ================================
function highlightFeature(e) {

    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#000',
        fillOpacity: 0.9
    });

    info.update(layer.feature.properties);
}

// ================================
// 7. RESET STYLE (WHEN MOUSE OUT)
// ================================
function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
    info.update();
}

// ================================
// 8. ON EACH FEATURE (EVENTS)
// ================================
function onEachFeature(feature, layer) {

    // Popup on click
    layer.bindPopup(feature.properties.DIST_EN);

    // Hover events
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

// ================================
// 9. LOAD GEOJSON AND ADD TO MAP
// ================================
var geojsonLayer;

fetch('data/nepal-districts-new.geojson')
    .then(response => response.json())
    .then(data => {

        geojsonLayer = L.geoJSON(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);

        // Zoom to full Nepal
        map.fitBounds(geojsonLayer.getBounds());
        
// ================================
// FINAL PROFESSIONAL LEGEND
// ================================
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');

    div.innerHTML = "<b>District Area Classification</b><br><br>";

    var grades = [0, 0.04, 0.07, 0.10, 0.15];

    var labels = [
        "Very Small Area",
        "Small Area",
        "Moderate Area",
        "Large Area",
        "Very Large Area"
    ];

    var colors = [
        '#c6dbef',
        '#6baed6',
        '#4292c6',
        '#2171b5',
        '#08306b'
    ];

    for (var i = 0; i < grades.length; i++) {

        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            labels[i] +
            ' <span style="font-size:11px; color:gray;">(' +
            grades[i] + (grades[i + 1] ? ' – ' + grades[i + 1] : '+') +
            ')</span><br>';
    }

    return div;
};

legend.addTo(map);
    })
    .catch(error => {
        console.log("Error loading GeoJSON:", error);
    });