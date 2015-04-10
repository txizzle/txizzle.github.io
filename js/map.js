var map;
var remove_poi = [
        {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [
            { "visibility": "off" }
          ]
        }
    ]

function initialize() {
    var mapOptions = {
    //draggable: false,
    draggableCursor: 'crosshair',
    draggingCursor: 'crosshair',
    zoom: 18,
    minZoom: 15,
    tilt: 45,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    streetViewControl: false,
    panControl: false,
    styles: remove_poi,
    center: new google.maps.LatLng(37.872026, -122.258535)

    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //google.maps.event.addListener(map, 'click', function(event){alert('Lat: ' + event.latLng.lat() + ' Lng: ' + event.latLng.lng())});
    //google.maps.event.addListener(map, 'click', switchImage('slideImg'));
    google.maps.event.addListener(map, 'click', function(event){
                                    debugger;
                                    receiveGuess(event.latLng.lat(), event.latLng.lng());
                                    switchImage('slideImg');
                                    //alert('Lat: ' + event.latLng.lat() + ' Lng: ' + event.latLng.lng());
    });
}

google.maps.event.addDomListener(window, 'load', initialize);