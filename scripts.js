$(".btn-group > .btn").click(function(){
    transport = this.value
});


function mapLocation() {
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;


  function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var uluru_tree = {lat: 51.50346844984542, lng: -0.18084555272162106};
        var mapOptions = {
            zoom: 10,
            center: uluru_tree
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        var marker = new google.maps.Marker({
          position: uluru_tree,
          map: map
        });
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });


        directionsDisplay.setMap(map);
        google.maps.event.addDomListener(document.getElementById('walking'), 'click', GetLatlong);
        google.maps.event.addDomListener(document.getElementById('driving'), 'click', GetLatlong);
        google.maps.event.addDomListener(document.getElementById('transiting'), 'click', GetLatlong);
    }

    function GetLatlong()
    {   var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('pac-input').value;
        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                calcRoute(latitude, longitude);
            }
        });
    }

  function calcRoute(latitude, longitude) {
        var end = new google.maps.LatLng(51.50346844984542, -0.18084555272162106);
        var start = new google.maps.LatLng(latitude, longitude);

        var bounds = new google.maps.LatLngBounds();
        bounds.extend(start);
        bounds.extend(end);
        map.fitBounds(bounds);
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