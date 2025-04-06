document.addEventListener('DOMContentLoaded', function () {
    let map;

    // Coordenadas da faculdade
    const faculdadeCoords = [-14.864416, -40.834072];

    // Armazena os marcadores em um objeto
    let marcadores = {};

    // Inicializa o mapa
    if (!map) {
        map = L.map('mapid', {
            center: faculdadeCoords, // Inicializa o mapa nas coordenadas da faculdade
            zoom: 18,
            maxZoom: 22,
            minZoom: 18,
            dragging: true,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            touchZoom: true,
        });

        // Adiciona a camada de tiles do MapTiler
        const key = 'xfjEnIcQ0ERJBgeBHhBc';
        const mtLayer = L.maptiler.maptilerLayer({
            apiKey: key,
            style: L.maptiler.MapStyle.STREETS,
        }).addTo(map);

        // Adiciona um marcador na localização da faculdade
        L.marker(faculdadeCoords).addTo(map)
            .bindPopup('Localização da Faculdade')
            .openPopup();

        /*Adiciona marcadores para as salas
        salas.forEach(function (sala) {
            marcadores[sala.nome] = L.marker(sala.coords, { icon: salaIcon })
                .addTo(map)
                .bindPopup(sala.nome);
        })
        */

        // Adiciona um evento de clique no mapa para exibir coordenadas
        map.on('click', function (e) {
            var coords = e.latlng; // Captura as coordenadas do ponto clicado
            L.popup()
                .setLatLng(coords)
                .setContent(`Coordenadas: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`)
                .openOn(map);
        });
    }

    // Função para buscar salas
    function buscarSala() {
        const searchInput = document.getElementById('searchInput'); // Campo de busca
        const query = searchInput.value.trim().toLowerCase(); // Texto digitado pelo usuário

        // Filtra as salas que correspondem à busca
        const salaEncontrada = salas.find(sala => sala.nome.toLowerCase().includes(query));

        if (salaEncontrada) {
            // Centraliza o mapa na sala encontrada
            map.setView(salaEncontrada.coords, 18);

            // Abre o popup do marcador existente
            marcadores[salaEncontrada.nome].openPopup();
        } else {
            alert('Sala não encontrada!'); // Exibe um alerta se a sala não for encontrada
        }
    }
    fetch('https://raw.githubusercontent.com/CodeFyLab/Gemps/refs/heads/master/br/com/codefylab/gemps/teste/GEMPS.geojson')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar o GeoJSON");
            }
            return response.json();
        })
        .then(data => {
            L.geoJSON(data, {
                // Estilização das features (linhas/polígonos)
                style: function (feature) {
                    return { color: "#ff7800", weight: 2 };
                },

                // Personalização dos marcadores (pontos)
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: L.icon({
                            iconUrl: 'img/Vector.svg' ,
                            iconSize: [20, 30]
                        })
                    });
                },

                // Pop-ups e interatividade
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.Name) {
                        layer.bindPopup(feature.properties.Name);
                    }
                }
            }).addTo(map);
        })
        .catch(error => console.error('Erro ao carregar o GeoJSON:', error));
    fetch('https://raw.githubusercontent.com/CodeFyLab/Gemps/refs/heads/master/br/com/codefylab/gemps/teste/Rota.geojson') // Substitua pelo caminho do seu arquivo de rotas
        .then(response => response.json())
        .then(dataRotas => {
            L.geoJSON(dataRotas, {
                style: (feature) => ({
                    color: feature.properties.cor || "#0078ff",
                    weight: 4,
                    opacity: 0.7
                }),
                onEachFeature: (feature, layer) => {
                    if (feature.properties.nome) {
                        layer.bindPopup(`<b>${feature.properties.nome}</b>`);
                    }
                }
            }).addTo(map);
        });
    // Adiciona um evento de input ao campo de busca
    document.getElementById('searchInput').addEventListener('input', buscarSala);

    // Função de sucesso para geolocalização
    function success(pos) {
        // Adiciona um marcador para a localização do usuário
        L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
            .bindPopup('Você está aqui!')

        // Opcional: Centraliza o mapa na localização do usuário (comente se não quiser)
        // map.setView([pos.coords.latitude, pos.coords.longitude], 18);
    }

    function error(err) {
        console.log(`Erro ao obter localização: ${err.message}`);
    }

    // Configura a geolocalização
    if (navigator.geolocation) {
        let watchID = navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 5000
        });
    }
});