
function mapLocation() {
    var directionsDisplay;
    var map;
    var latlong_tree = {lat: 51.50346844984542, lng: -0.18084555272162106};
    var latlong_you

    google.maps.event.addDomListener(window, 'load', initialize);

  function initialize() {

        //initial map
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setOptions( { suppressMarkers: true } );
        var mapOptions = {
            zoom: 10,
            center: latlong_tree
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        //add marker for the tree
        var tree_icon = {
                  url: 'https://raw.githubusercontent.com/margaritakop/treemap/master/tree.png', // url
                  scaledSize: new google.maps.Size(50, 50), // scaled size
              };

        marker = new google.maps.Marker({
          position: latlong_tree,
          map: map,
          icon: tree_icon
          });

        // Get the user`s location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            latlong_you = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
        //TODO: Add an alert if the browser access to location is turned off, to prompt the user to turn it back.
        //use bootbox.alert() - needed libraries are ready to use

          //add marker for user`s position
          var you_icon = {
                  url: 'https://raw.githubusercontent.com/margaritakop/treemap/master/you.png', // url
                  scaledSize: new google.maps.Size(50, 50), // scaled size
              };
          marker = new google.maps.Marker({
          position: latlong_you,
          map: map,
          icon: you_icon
          });

          //set new bounds to the map accordingly
          var bounds = new google.maps.LatLngBounds();
          bounds.extend(latlong_tree);
          bounds.extend(latlong_you);
          map.fitBounds(bounds);

          transport = 'WALKING'
          calcRoute(latlong_you)
          });
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
                              document.getElementById("WALKING").classList.remove('active');
                              calcRoute(latlong_you);
                  });
        google.maps.event.addDomListener(document.getElementById('TRANSIT'), 'click',
                          function() {
                              transport = this.id;
                              document.getElementById("WALKING").classList.remove('active');
                              calcRoute(latlong_you);
                  });
    }

  function calcRoute(latlong_you) {

        var request = {
            origin: latlong_you,
            destination: latlong_tree,
            travelMode: google.maps.TravelMode[transport]
        };

        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
            } else {
                bootbox.alert("Unfortunately, the rout from your location to the Tree by " + transport.toLowerCase() + " could not be found." );
            }
        });
    }
}

mapLocation();