
function initMap() {
  var uluru = {lat: 51.50346844984542, lng: -0.18084555272162106};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
     map: map
  });
}
