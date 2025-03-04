var map;

// Coordenadas da faculdade
var faculdadeCoords = [-14.8640158, -40.8341379];

// Inicializa o mapa apenas uma vez (se ainda não foi criado)
if (!map) {
    map = L.map('mapid', {
        center: faculdadeCoords, // Fixa o mapa nas coordenadas da faculdade
        zoom: 18, // Nível de zoom
        dragging: false, // Permite arrastar a tela
        zoomControl: false, // Mostra o controle de zoom
        scrollWheelZoom: false, // Permite o zoom com a roda do mouse
        doubleClickZoom: false, // Permite o zoom com duplo clique
        touchZoom: false, // Desativa o zoom com toque (dispositivos móveis)
        });

        // Adiciona a camada de tiles (mapa base)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.carto.com/">Carto</a>'
    }).addTo(map);

    // Adiciona um marcador na localização da faculdade
    L.marker(faculdadeCoords).addTo(map)
    .bindPopup('Localização da Faculdade')
    .openPopup();

    L.marker([-14.864018, -40.833612]).addTo(map)
        .bindPopup('Sala 01')
        .openPopup();

    var modulo1 = L.polygon([
        [-14.863982, -40.833816], // Coordenada 1
        [-14.863852, -40.833467], // Coordenada 2
        [-14.864075, -40.833478], // Coordenada 3
        [-14.864137, -40.833757],  // Coordenada 4
    ],{
        color: "#fcad0b", // Cor da borda (vermelho)
        fillColor: "rgba(247,255,0,0.58)", // Cor de preenchimento (amarelo)
        fillOpacity: 0.5, // Opacidade do preenchimento (50%)
        weight: 3, // Espessura da borda
        opacity: 0.8, // Opacidade da borda (80%)
        lineJoin: "round", // Estilo das junções das bordas
        dashArray: "10, 5", // Borda tracejada (10px de traço, 5px de espaço)
    }).addTo(map);

    modulo1.properties = {
        nome: "Módulo 1",
        descricao: "Este é o módulo 1 da faculdade."
    };
    modulo1.bindPopup(`Nome: ${modulo1.properties.nome}<br>Descrição: ${modulo1.properties.descricao}`);

    // Adiciona um evento de clique no mapa para exibir coordenadas
    map.on('click', function(e) {
    var coords = e.latlng; // Captura as coordenadas do ponto clicado

    L.popup()
        .setLatLng(coords) // Define a posição do popup
        .setContent(`Coordenadas: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`) // Exibe as coordenadas
        .openOn(map); // Abre o popup no mapa
    });
}

// Adiciona um marcador para a localização atual do usuário (opcional)
L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
    .bindPopup('Eu estou aqui!')
    .openPopup();

function error(err) {
    console.log(`Erro ao obter localização: ${err.message}`);
}

// Configura a geolocalização
var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});