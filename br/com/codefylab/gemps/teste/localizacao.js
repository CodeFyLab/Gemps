let h2 = document.querySelector('h2');
var map;

function success(pos) {
    console.log(pos.coords.latitude, pos.coords.longitude);

    //Inicializa o mapa, reutilizando a variável sem recriar o elemento
    if (!map) {
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    } else {
        map.setView([pos.coords.latitude, pos.coords.longitude], 13);
    }

    //camada de tiles (OpenStreetMap)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // marcador de localização atual
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('Eu estou aqui!')
        .openPopup();

    /* Adiciona polígono com coordenadas corretas
    var polygon = L.polygon([
        [-14.864055, -40.833812], // Coordenada 1
        [-14.864090, -40.833924], // Coordenada 2
        [-14.864133, -40.833818]  // Coordenada 3
    ]).addTo(map);
    polygon.bindPopup("Prédio ou área delimitada.");*/

}

function error(err) {
    console.log(`Erro ao obter localização: ${err.message}`);
}

// Configura a geolocalização
var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});
