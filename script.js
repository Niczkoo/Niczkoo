let config = {
  minZoom: 12,
  maxZomm: 18
};

// początkowy zoom
const zoom = 18;

const lat = 53.744104;
const lon = 20.48991;

// dodawanie ustawień mapy
const map = L.map('map', config).setView([lat, lon], zoom);

// warstwa 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// dodanie markera
map.on('click', addMarker);


const markerPlace = document.querySelector('.marker-position');

// funkcja dodająca marker po kliknięciu
function addMarker(e) {

  // draggable - możliwe do przesunięcia
  const marker = new L.marker(e.latlng, {
    draggable: true
  })
    .addTo(map)
    .bindPopup(buttonRemove);

  marker.on("popupopen", removeMarker);
  marker.on('dragend', dragedMaker);

  // pokazanie pozycji markera
  markerPlace.textContent = `
    new marker: ${e.latlng.lat}, ${e.latlng.lng}
  `;
}

// przycisk usuwający marker
const buttonRemove = '<button type="button" class="remove">Usuń</button>';

// funkcja usuwająca marker
function removeMarker() {
  const marker = this;
  const btn = document.querySelector('.remove');

  btn.addEventListener('click', function () {
    
    map.removeLayer(marker);
  })
}

function dragedMaker() {
  markerPlace.textContent = `
    change position: ${this.getLatLng().lat}, ${this.getLatLng().lng}
  `;
};



// współrzędne do których chcemy się przenosić po kliknięciu 
let featureGroups = [
  L.marker([53.74410129418308, 20.489998804012032],{title: '1'}).bindPopup('2'),
  L.marker([53.76043801206768, 20.458006870788324],{title: '2'}).bindPopup('2'),
];

function markerOpen(id) {
  for(let i in featureGroups) {
    const markerId = featureGroups[i].options.title;
    if(markerId === id) {
      featureGroups[i].openPopup();
      centerMarker(featureGroups[i].getLatLng());
    }
  }
}

function centerMarker(latlng) {
  console.log(latlng);
  const marker = L.marker([latlng.lat, latlng.lng]);
  let group = new L.featureGroup([marker]);
  map.fitBounds(group.getBounds());
}

window.addEventListener('DOMContentLoaded', () => {
  const markersDiv = document.querySelectorAll('.marker-click');

  markersDiv.forEach(marker => {
    marker.addEventListener('click', () => {
      markerOpen(marker.id);
    });
  });
});



















