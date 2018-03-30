
function mapLocation() {
    var directionsDisplay;
    var map;
    var latlong_tree = {lat: 51.50346844984542, lng: -0.18084555272162106};
    var latlong_you = {lat: 46.2579605, lng: 20.155540100000003};

    google.maps.event.addDomListener(window, 'load', initialize);

  function initialize() {

        //initial map
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptions = {
            zoom: 4,
            center: latlong_tree
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
          marker = new google.maps.Marker({
          position: latlong_tree,
          map: map
        });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            bootbox.alert('Your location: ' + String(position.coords.latitude) + ' ' + String(position.coords.longitude));
          }, function() {});
        }; 

        //transport buttons
        google.maps.event.addDomListener(document.getElementById('WALKING'), 'click', 
                  function() {
                              transport = this.id;
                              calcRoute(latlong_you);
                  });
        google.maps.event.addDomListener(document.getElementById('DRIVING'), 'click',
                          function() {
                              transport = this.id;
                              calcRoute(latlong_you);
                  });
        google.maps.event.addDomListener(document.getElementById('TRANSIT'), 'click',
                          function() {
                              transport = this.id;
                              calcRoute(latlong_you);
                  });
    }

  function calcRoute(latlong_you) {
        //remove the original marker and define the new end-start points
        marker.setMap(null);
        var end = new google.maps.LatLng(latlong_tree);
        var start = new google.maps.LatLng(latlong_you);

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

        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
            } else {
                var address = document.getElementById('pac-input').value;
                bootbox.alert("Could not fid rout from " + address + " by " + transport.toLowerCase() + " to The Tree." );
            }
        });
    }
}

mapLocation();