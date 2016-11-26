var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var vidArray;// = ['RYlCVwxoL_g', 'u2cMjeSvZSs', 'c1H92b_uLdU', 'eqhUHyVpAwE', '9vdN15--hro', 'xJ9e32MNEOk', 'g-jwWYX7Jlo', 'mgmVOuLgFB0', 'CPQ1budJRIQ', 'XNj_KDPp_iM', 'PyDlBy5tgYA'];
var songArray;// =["2HHtWyy5CgaQbC7XSoOb0e","2KxIMZDazuXN3yvPC6Kqwn", "2zvXUc9nn5Uwer8dbWxN8F"];

var APIArray = [youtubeAPI, quotesAPI, imageAPI, spotifyAPI];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// sidebar
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
  }
}

//toggling login
$('document').ready(function(){
  
  $('[data-login-button], [data-logout-button]').click(function(){
    $('[data-login-form], [data-login-user]').toggleClass('state-hidden');
    $('[data-header]').toggleClass('state-logged-in');
  });
  
});


function youtubeAPI() { 

  var currentVideo = vidArray[Math.floor(Math.random()*vidArray.length)].content;

  var player = new YT.Player("player", {
                      height: '360',
                       width: '640',
                       videoId: currentVideo,                      
                 });

}
function quotesAPI() {
  $.ajax({
            url: "http://api.forismatic.com/api/1.0/",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
              method: "getQuote",
              lang: "en",
              format: "jsonp"
            }
         }).then(function(response) {
            $("#quote").empty().text(response.quoteText);
        });
}

function imageAPI(){
  $.ajax({
            url: "https://healthruwords.p.mashape.com/v1/quotes/",
            dataType: "json",
            data: {
              t: "Motivational",
              size:"medium"
            },
            headers: {
                "X-Mashape-Key": "DajIhcCO6emsh8uKH4Y06OID3hgUp12rSMHjsn9mLyW1nCivlD"
            }
         }).then(function(response) {
            $('.image').attr('src', response[0].media)
        });
}

function spotifyAPI(){
  var spotifyURL = "https://embed.spotify.com/?uri=spotify%3Atrack%3A";
  var randomSong = songArray[Math.floor(Math.random()*songArray.length)].content;
  var spotifyFrame = $("<iframe>");
  spotifyFrame.attr("src", spotifyURL + randomSong);
  spotifyFrame.attr("width", "300");
  spotifyFrame.attr("height", "300");
  $(".content").append(spotifyFrame);
}


function randomContent(){
  var currentContent = APIArray[Math.floor(Math.random()*APIArray.length)];
  currentContent();
  console.log('testing content');
  }

$('#inspire').on('click', function(){
  console.log('test');
    var timeAnimation = 700;
  $('.content').fadeOut(timeAnimation, function(){
     $('#player').remove();
 var youtubeDiv = $('<div>').attr('id', 'player');
 youtubeDiv.prependTo('.content');
 $('#quote').empty();
 $('.image').attr('src', '');
 $('iframe').remove();
 randomContent();
  });
  $('.content').fadeIn(timeAnimation);
})

function onYouTubeIframeAPIReady() {
  randomContent();
}
var map;
var currentPos;

  // Geolocation
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 10
  });
  //var infoWindow = new google.maps.InfoWindow({map: map});

  $("#map").height($("#map").width());
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) { // Asynscronous
      currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      //console.log(currentPos);
      var marker = new google.maps.Marker({
        position: currentPos,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        zIndex: 200
      });
      //infoWindow.setPosition(pos);
      //infoWindow.setContent('Current Location.');
      map.setCenter(currentPos);
      markGroups();
    }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
    });


  } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(currentPos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

var markers = [];
function addMarker(location, map, urlname, groupInfo) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

  marker.addListener("click", function() {
    console.log(urlname);
    $(".eventList").empty();
    getEvents(urlname);
    console.log(groupInfo);
    var contentString = 
        "<div>" +
          "<div><b>" + groupInfo.name + "</b></div>" +
          "<div>" + groupInfo.city + ", " + groupInfo.state + "</div>" +
          "<div><a target='_blank' href=" + groupInfo.link + ">Meetup Group Link</a>" + 
        "</div>" 
    var infowindow = new google.maps.InfoWindow({
      content: contentString 
    });
    infowindow.open(map, this);
    //mapDirections(currentPos, location);
  })
}

function markGroups() {
  $.ajax({
      url: "https://api.meetup.com/find/groups",
      method: "GET",
      dataType: "jsonp",
      data: {
        key: "1b167d2b5c2a66754245583622762e74",
        text: "inspirational",
        // zip: "95816",
        lat: currentPos.lat,
        lon: currentPos.lng,
        radius: "25"
    }
  }).then(function(response) {
    for(var i = 0; i< response.data.length; i++){
      // var group = $("<div>").addClass("group");
      // group.text(response.data[i].name);
      // group.appendTo(".content");
      // group.data("name", response.data[i].name);
      var coord = {
        lat: response.data[i].lat,
        lng: response.data[i].lon
      };
      var urlname = response.data[i].urlname;
      addMarker(coord, map, urlname, response.data[i]);
    }
  });
}

function getEvents(groupURL) {
 $.ajax({
     url: "https://api.meetup.com/" + groupURL + "/events",
     method: "GET",
     dataType: "jsonp",
     data: {
       key: "1b167d2b5c2a66754245583622762e74",
     }
 }).then(function(response) {
       console.log(response);
       if(response.data.length == 0) {
           var event = $("<div>");
           event.text("NO UPCOMING EVENTS");
           event.appendTo(".eventList");
       }
       for(var i = 0; i < 1; i++) {
           console.log("Events");
           var event = $("<div>");
           event.css("border", "solid black 2px");
           //var description = $(response.data[i].description);
           var name = $("<div>").text(response.data[i].name);
           event.append(name);
           if(response.data[i].venue) {
            var address = $("<div>").text(response.data[i].venue.address_1);
            var city_state = $("<div>").text(response.data[i].venue.city + ", " + response.data[i].venue.state);
            event.append(address);
            event.append(city_state);
           }
           var time = new Date(response.data[i].time);
           var date = $("<div>").text(time.toDateString() + " " + time.toLocaleTimeString());
           event.append(date);
           var link = $("<a>").text("More Info").attr("href", response.data[i].link).attr("target", "_blank");
           event.append($("<div>").append(link));
           event.appendTo(".eventList");
       }
 });
}

// function mapDirections(cord1, cord2){
//   $.ajax(
//     {url:"https://maps.googleapis.com/maps/api/directions/json", 
//     data:{
//       key:"AIzaSyBwWhFI5G61GrAWmITWKwtq93Btg1zS3mA",
//       origin:cord1.lat + "," + cord1.lng,
//       waypoints:cord2.lat + "," + cord2.lng,
//       destination:cord2.lat + "," + cord2.lng
//     },
//     dataType:"jsonp",
//     type:"GET",
//     jsonpCallback: "jsonCallback",
//     crossDomain : true
    
//   }).then(function(response){
//     console.log(response);
//   });

// }

function getVideos(){
  $.get("/content/youtube", function(data){
    vidArray = data;
    console.log(data);
  })
}

function getSongs(){
  $.get("/content/spotify", function(data){
    songArray = data;
    console.log(data);
  })
}

getVideos();
getSongs();