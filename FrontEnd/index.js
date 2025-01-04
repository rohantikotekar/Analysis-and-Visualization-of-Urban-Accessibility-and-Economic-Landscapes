// Initialize the map
const map = L.map('map').setView([34.05, -118.25], 8);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define Layer Groups for each ID type
const roadsLayer = L.layerGroup().addTo(map);
const buildingsLayer = L.layerGroup().addTo(map);
const airportsLayer = L.layerGroup().addTo(map);
const portsLayer = L.layerGroup().addTo(map);
const populationLayer = L.layerGroup().addTo(map);
const gowallaLayer = L.layerGroup().addTo(map);  

// Define custom icons
const airportIcon = L.icon({
    iconUrl: 'airport.svg',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -16]
});

const portIcon = L.icon({
    iconUrl: 'seaport.svg',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -16]
});

const populationIcons = [
    L.icon({ iconUrl: 'population1.svg', iconSize: [8, 8], iconAnchor: [4, 4], popupAnchor: [0, -8] }),
    L.icon({ iconUrl: 'population2.svg', iconSize: [12, 12], iconAnchor: [6, 6], popupAnchor: [0, -12] }),
    L.icon({ iconUrl: 'population3.svg', iconSize: [16, 16], iconAnchor: [8, 8], popupAnchor: [0, -16] }),
    L.icon({ iconUrl: 'population4.svg', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -24] }),
];

// Fetch the dataset
// place the cleaned dataset inside the export folder
fetch('export/dataset.json')
    .then(response => response.json())
    .then(dataset => {
        dataset.forEach(item => {
            const coords = item.geometry.match(/-?\d+\.\d+/g)?.map(Number);

            if (!coords || coords.length < 2) {
                console.error('Invalid geometry:', item.geometry);
                return;
            }

            if (item.id === "roads") {
                const latLngs = [];
                for (let i = 0; i < coords.length; i += 2) {
                    if (coords[i + 1] !== undefined && coords[i] !== undefined) {
                        latLngs.push([coords[i + 1], coords[i]]);
                    }
                }
                if (latLngs.length > 0) {
                    L.polyline(latLngs, { color: 'blue' })
                        .bindPopup(`${item.id}<br>${item.metadata}`)
                        .addTo(roadsLayer);
                }
            } else if (item.id === "buildings") {
                const latLngs = [];
                for (let i = 0; i < coords.length; i += 2) {
                    if (coords[i + 1] !== undefined && coords[i] !== undefined) {
                        latLngs.push([coords[i + 1], coords[i]]);
                    }
                }
                if (latLngs.length >0) {
                    L.polygon(latLngs, { color: 'red' })
                        .bindPopup(`${item.id}`)
                        .addTo(buildingsLayer);
                }
            } else if (item.id === "airport") {
                const [lng, lat] = coords;
                if (lat !== undefined && lng !== undefined) {
                    L.marker([lat, lng], { icon: airportIcon })
                        .bindPopup(`${item.id}<br>${item.metadata}`)
                        .addTo(airportsLayer);
                }
            } else if (item.id === "port") {
                const [lng, lat] = coords;
                if (lat !== undefined && lng !== undefined) {
                    L.marker([lat, lng], { icon: portIcon })
                        .bindPopup(`${item.id}<br>${item.metadata}`)
                        .addTo(portsLayer);
                }
            } else if (item.id === "gowalla") { 
                const [lng, lat] = coords;
                if (lat !== undefined && lng !== undefined) {
                    L.circleMarker([lat, lng], {
                        color: 'orange',
                        radius: 2,  // Adjust the size as needed
                        fillOpacity: 0.7,
                    })
                    .bindPopup(`${item.id}<br>${item.metadata}`)
                    .addTo(gowallaLayer);
                }
            } else if (item.id === "population") {
                const [lng, lat] = coords;
                const population = parseFloat(item.metadata);

                if (lat !== undefined && lng !== undefined && !isNaN(population)) {
                    let iconIndex;
                    if (population > 547.999 && population <= 15440.0) {
                        iconIndex = 0;
                    } else if (population > 15440.0 && population <= 92489.0) {
                        iconIndex = 1;
                    } else if (population > 92489.0 && population <= 383669.5) {
                        iconIndex = 2;
                    } else if (population > 383669.5 && population <= 12500000.0) {
                        iconIndex = 3;
                    } else {
                        console.error('Population out of range:', population);
                        return;
                    }

                    L.marker([lat, lng], { icon: populationIcons[iconIndex] })
                        .bindPopup(`${item.name}<br> ${population}`)
                        .addTo(populationLayer);
                }
            }
        });
    })
    .catch(error => console.error('Error loading the dataset:', error));

// Add a Layer Control with custom styles
const overlayMaps = {
    "<span style='color: blue; font-size: 14px;'>Roads</span>": roadsLayer,
    "<span style='color: red; font-size: 14px;'>Buildings</span>": buildingsLayer,
    "<span style='color: red; font-size: 14px;'>Airports</span>": airportsLayer,
    "<span style='color: navy; font-size: 14px;'>Ports</span>": portsLayer,
    "<span style='color: purple; font-size: 14px;'>Population</span>": populationLayer,
    "<span style='color: orange; font-size: 14px;'>Gowalla</span>": gowallaLayer 
};
L.control.layers(null, overlayMaps, { collapsed: true }).addTo(map);

// Create a Legend
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
        <h4 style="text-align: left;">Legend</h4>
        <div style="text-align: left;">
            <i style="background: blue; display: inline-block; width: 16px; height: 16px; margin-right: 8px;"></i> Roads<br>
            <i style="background: red; display: inline-block; width: 16px; height: 16px; margin-right: 8px;"></i> Buildings<br>
            <img src="airport.svg" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 8px;"> Airports<br>
            <img src="seaport.svg" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 8px;"> Ports<br>
            <img src="population4.svg" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 8px;"> Population<br>
            <i style="background: orange; display: inline-block; width: 16px; height: 16px; margin-right: 8px;"></i> Gowalla<br>
        </div>
    `;
    return div;
  };
  legend.addTo(map);