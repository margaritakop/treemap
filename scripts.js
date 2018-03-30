
var latlong_tree = {lat: 51.50346844984542, lng: -0.18084555272162106};

function mapLocation() {
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;


  function initialize() {

        //initial map
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptions = {
            zoom: 10,
            center: latlong_tree
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
          marker = new google.maps.Marker({
          position: latlong_tree,
          map: map
        });

        //imput search box
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        //bias the search towards the area displayed on the map
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        //transport buttons
        google.maps.event.addDomListener(document.getElementById('WALKING'), 'click', 
                  function() {
                              transport = this.id
                              GetLatlong();
                  });
        google.maps.event.addDomListener(document.getElementById('DRIVING'), 'click',
                          function() {
                              transport = this.id
                              GetLatlong();
                  });
        google.maps.event.addDomListener(document.getElementById('TRANSIT'), 'click',
                          function() {
                              transport = this.id
                              GetLatlong();
                  });
    }

    function GetLatlong()
    {   marker.setMap(null);
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('pac-input').value;
        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var lat_address = results[0].geometry.location.lat();
                var long_address = results[0].geometry.location.lng();
                calcRoute(lat_address, long_address);
            }
        });
    }

  function calcRoute(lat, long) {
        var end = new google.maps.LatLng(latlong_tree);
        var start = new google.maps.LatLng(lat, long);

        //set new bounds to the map
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(start);
        bounds.extend(end);
        map.fitBounds(bounds);

        //calculate the route
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode[transport]
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
            } else {
                alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
            }
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
}
mapLocation();