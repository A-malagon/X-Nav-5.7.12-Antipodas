$(document).ready(function() {
    
    $(".location").click(get_Location);
    
    //La API de geolocalización se publica a través del objeto navigator.geolocation,si éxito vamos showPosition, si fallo
    //escribimos en el innerHTML del identificador.
    function get_Location() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(show_map);
        } else { 
            document.getElementById('texto1').innerHTML = 'Tu navegador no soporta la API de geolocalizacion.';
        }
    }
    
    //Muestra mi geolocalización en un mapa.
    function show_map(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        document.getElementById('mia').innerHTML = 'Mi localización:';
        var map1 = L.map('map').setView([lat, long], 14);
        
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {

        attribution: '&copy; <a href="http://osm.org/copyright">MiUbicación</a>',}).addTo(map1);

        var marker = L.marker([lat, long],{draggable: true}).addTo(map1);
        marker.bindPopup("Tu Posición").openPopup();
        
        document.getElementById('tipo1').innerHTML = "COORDENADAS GEOGRÁFICAS EN DECIMAL Y EN GRADOS:";
        document.getElementById('texto1').innerHTML = "LATITUD: " + lat + " /    LONGITUD: " + long;
        
        var convertido = decimal2sexagesimal(lat);
        
        console.log(deg);
        console.log(min);
        console.log(sec);
        document.getElementById('grados').innerHTML = "LATITUD: " + deg + '° ' + min + "' " + sec + '"';

        console.log(convertido);
        var degLatAnt = latAntipodas();
        console.log(degLatAnt);
        
        var convertido = decimal2sexagesimal(long);
        
        console.log(deg);
        console.log(min);
        console.log(sec);
        document.getElementById('grados').innerHTML += " /    LONGITUD: " + deg + '° ' + min + "' " + sec + '"';

        console.log(convertido);
        var degLongAnt = longAntipodas();
        console.log(degLongAnt);

        show_mapAntipodas(degLatAnt, degLongAnt);

        
    }

    //Muestra mi geolocalización en caso de que estuviese en las antípodas.
    function show_mapAntipodas(degLatAnt, degLongAnt){
        var lat = degLatAnt;
        var long = degLongAnt;

        document.getElementById('misAnti').innerHTML = 'Mis antípodas:';
        var map2 = L.map('antipodas').setView([lat, long],4);
        
        //Carga la imagen en el mapa
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {

        attribution: '&copy; <a href="http://osm.org/copyright">UbicacionAntipodas</a>',}).addTo(map2);

        var marker = L.marker([lat, long]).addTo(map2);
        marker.bindPopup("Tu posición en Antípodas").openPopup();

        document.getElementById('tipo2').innerHTML = "COORDENADAS GEOGRÁFICAS EN DECIMAL:";
        document.getElementById('texto2').innerHTML = "LATITUD: " + lat + " /    LONGITUD: " + long;        
    }

    function latAntipodas() {
       var grados = deg + (min/60) + (sec/3600);
       var degLatAnt = -grados ;
       return degLatAnt;         
    }

    function longAntipodas() {
       deg = 180 - deg;
       var grados = deg + (min/60) + (sec/3600);
       return grados;         
    }  

    
    function decimal2sexagesimal(dec) {

        var tmp = dec.toString().split('.');

        deg = Math.abs(tmp[0]);
        min = ('0.' + (tmp[1] || 0))*60;
        sec = min.toString().split('.');

        min = Math.floor(min);
        sec = (('0.' + (sec[1] || 0)) * 60).toFixed(2);

        var nuevo = (deg + '° ' + min + "' " + sec + '"');

        return nuevo;

    }
  
});
