// Inicializa o mapa apenas uma vez (se ainda não foi criado)
var map;

var faculdadeCoords = [-14.864416, -40.834072];

if (!map) {
    map = L.map('mapid', {
        center: faculdadeCoords, // Fixa o mapa nas coordenadas da faculdade
        zoom: 19, // Nível de zoom
        dragging: true, // Permite arrastar a tela
        zoomControl: true, // Mostra o controle de zoom
        scrollWheelZoom: true, // Permite o zoom com a roda do mouse
        doubleClickZoom: true, // Permite o zoom com duplo clique
        touchZoom: true, // Desativa o zoom com toque (dispositivos móveis)
        maxBounds: [
          [-14.865295, -40.834851], // Coordenadas sudoeste (SW)
          [-14.863511, -40.833092]  // Coordenadas nordeste (NE)
      ],
      maxBoundsViscosity: 1.0 // Define a viscosidade dos limites
  });
    map.on('click', function(e) {
      var coords = e.latlng; // Captura as coordenadas do ponto clicado

      L.popup()
          .setLatLng(coords) // Define a posição do popup
          .setContent(`Coordenadas:${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`) // Exibe as coordenadas
          .openOn(map); // Abre o popup no mapa
      });
}



// Adiciona  a camada tiles (mapa base)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 23,
        minZoom: 19,
        attribution: '&copy; <a href="https://www.carto.com/">Carto</a>'
    }).addTo(map);


// Carrega e adiciona os dados do GeoJSON
    fetch('https://raw.githubusercontent.com/CodeFyLab/Gemps/refs/heads/master/br/com/codefylab/gemps/teste/UNEX.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao carregar o GeoJSON");
    }
    return response.json();
  })
  .then(data => {
    L.geoJSON(data, {
      style: function (feature) { 
        // Personalize o estilo de acordo com as propriedades, se necessário
        return { color: "#ff7800", weight: 2 };
      },
      onEachFeature: function (feature, layer) {
        // Exibe um popup se a propriedade "nome" estiver disponível
        if (feature.properties && feature.properties.nome) {
          layer.bindPopup("<strong>Nome:</strong> " + feature.properties.nome);
        }
      }
    }).addTo(map);
  })
  .catch(error => console.error('Erro ao carregar o GeoJSON:', error));

// Orientacao do mapa
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        var alpha = event.alpha;
        
        // Corrigir a rotação do mapa com base na orientação do dispositivo
        var rotation = -alpha;
        var mapPane = map.getPanes().mapPane;
        mapPane.style.transform = 'rotate(' + rotation + 'deg)';
        mapPane.style.transformOrigin = 'center center';
    }, true);
} else {
    console.log("Device orientation not supported");
}

// Configura a geolocalização
var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});


