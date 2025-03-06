var map;

// Coordenadas da faculdade
var faculdadeCoords = [-14.864416, -40.834072];

var salas = [
    { nome: "Sala 101", coords: [-14.863809, -40.833317] },
    { nome: "Sala 102", coords: [-14.863950, -40.833550] },
    { nome: "Laboratório 1", coords: [-14.864213, -40.833512] },
];

// Inicializa o mapa apenas uma vez (se ainda não foi criado)
if (!map) {
    map = L.map('mapid', {
        center: faculdadeCoords, // Fixa o mapa nas coordenadas da faculdade
        zoom: 18, // Nível de zoom
        dragging: true, // Permite arrastar a tela
        zoomControl: true, // Mostra o controle de zoom
        scrollWheelZoom: true, // Permite o zoom com a roda do mouse
        doubleClickZoom: true, // Permite o zoom com duplo clique
        touchZoom: true, // Desativa o zoom com toque (dispositivos móveis)
        });

        // Adiciona a camada de tiles (mapa base)

    const key = 'xfjEnIcQ0ERJBgeBHhBc'; //starting position
    const mtLayer = L.maptiler.maptilerLayer({
        apiKey: key,
        style: L.maptiler.MapStyle.STREETS, // optional
    }).addTo(map);

    // Adiciona um marcador na localização da faculdade
    L.marker(faculdadeCoords).addTo(map)
    .bindPopup('Localização da Faculdade')
    .openPopup();

    salas.forEach(function (sala) {
        L.marker(sala.coords)
            .addTo(map)
            .bindPopup(sala.nome);
    });

    var waypoints = [
        [-14.863809, -40.833317], // Sala 101
        [-14.864019, -40.833274], // Ponto intermediário
        [-14.864213, -40.833512]  // Laboratório 1
    ];

    // Desenha a rota manualmente usando L.polyline
    L.polyline(waypoints, {
        color: '#fcad0b', // Cor da linha
        weight: 5, // Espessura da linha
        opacity: 0.8, // Opacidade da linha
        lineJoin: 'round' // Estilo das junções
    }).addTo(map);


    /* Testando colocar formas geométricas personalizadas no mapa

    var modulo1 = L.polygon([
        [-14.863827, -40.833398], // Coordenada 1
        [-14.863687, -40.833092], // Coordenada 2
        [-14.864080, -40.832895], // Coordenada 3
        [-14.864231, -40.833151],  // Coordenada 4
    ],{
        color: "#fcad0b", // Cor da borda (vermelho)
        fillColor: "rgba(247,255,0,0.58)", // Cor de preenchimento (amarelo)
        fillOpacity: 0.5, // Opacidade do preenchimento (50%)
        weight: 3, // Espessura da borda
        opacity: 0.5, // Opacidade da borda (80%)
        lineJoin: "round", // Estilo das junções das bordas
        dashArray: "0.2", // Borda
    }).addTo(map);

    modulo1.properties = {
        nome: "Módulo 1",
    };
    modulo1.bindPopup(`${modulo1.properties.nome}`);

    var modulo2 = L.polygon([
        [-14.863998, -40.833714], // Coordenada 1
        [-14.864179, -40.834079], // Coordenada 2
        [-14.864599, -40.833832], // Coordenada 3
        [-14.864391, -40.833499],  // Coordenada 4
    ],{
        color: "#fcad0b", // Cor da borda (vermelho)
        fillColor: "rgba(247,255,0,0.58)", // Cor de preenchimento (amarelo)
        fillOpacity: 0.5, // Opacidade do preenchimento (50%)
        weight: 3, // Espessura da borda
        opacity: 0.5, // Opacidade da borda (80%)
        lineJoin: "round", // Estilo das junções das bordas
        dashArray: "1", //Borda
    }).addTo(map);

    modulo2.properties = {
        nome: "Módulo 2",
    };
    modulo2.bindPopup(`${modulo2.properties.nome}`);*/

    // Adiciona um evento de clique no mapa para exibir coordenadas
    map.on('click', function(e) {
    var coords = e.latlng; // Captura as coordenadas do ponto clicado

    L.popup()
        .setLatLng(coords) // Define a posição do popup
        .setContent(`Coordenadas: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`) // Exibe as coordenadas
        .openOn(map); // Abre o popup no mapa
    });
}

function success(pos) {
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
}

function error(err) {
    console.log(`Erro ao obter localização: ${err.message}`);
}

// Configura a geolocalização
var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});