var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var vidArray;
var songArray;
var quotesArray;
var currentUser ="random@random.com";
var currentUserContent;
var map;
var currentPos;

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

$('[data-login-button], [data-logout-button]').click(function(){
  $('[data-login-form], [data-login-user]').toggleClass('state-hidden');
  $('[data-header]').toggleClass('state-logged-in');
});
  
// Geolocation
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 10
  });
  $("#map").height($("#map").width());
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) { // Asynscronous
      currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var marker = new google.maps.Marker({
        position: currentPos,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        zIndex: 200
      });
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
  infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
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
        lat: currentPos.lat,
        lon: currentPos.lng,
        radius: "25"
    }
  }).then(function(response) {
    for(var i = 0; i< response.data.length; i++){
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
      if(response.data.length == 0) {
        var event = $("<div>");
        event.text("NO UPCOMING EVENTS");
        event.appendTo(".eventList");
      }
      for(var i = 0; i < 1; i++) {
        var event = $("<div>");
        event.css("border", "solid black 2px");
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

function emptyContent(){
  var timeAnimation = 700;
  $('.content').fadeOut(timeAnimation, function(){
    $('#youtubeplayer').remove();
    var youtubeDiv = $('<div>').attr('id', 'youtubeplayer');
    youtubeDiv.prependTo('.content');
    $('#quote').empty();
    $('.image').attr('src', '');
    $('#spotifyplayer').remove();
   });
}

function youtubeAPI(content) {
  var currentVideo;
  if(content == undefined){
    currentVideo = vidArray[Math.floor(Math.random()*vidArray.length)].content;
  } else {
    currentVideo = content;
  }
  currentUserContent = currentVideo;
  var player = new YT.Player("youtubeplayer", 
  {
    height: '360',
    width: '640',
    videoId: currentVideo,                      
  });

}

function quotesAPI(content) {
  var currentQuote;
  if (content == undefined){
    currentQuote = quotesArray[Math.floor(Math.random()*quotesArray.length)].content;
  }else {
    currentQuote = content;
  }
  currentUserContent = currentQuote;
  $("#quote").text(currentQuote);
}

function spotifyAPI(content){
  var spotifyURL = "https://embed.spotify.com/?uri=spotify%3Atrack%3A";
  var randomSong;
  if(content == undefined){
    randomSong = songArray[Math.floor(Math.random()*songArray.length)].content;  
  } else {
    randomSong = content;
  }  
  currentUserContent = randomSong;
  var spotifyFrame = $("<iframe>");
  spotifyFrame.attr("src", spotifyURL + randomSong);
  spotifyFrame.attr("width", "300");
  spotifyFrame.attr("height", "300");
  spotifyFrame.attr("id", "spotifyplayer");
  $(".content").append(spotifyFrame);
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
      currentUserContent = response[0].media;
      $('.image').attr('src', response[0].media);
  });
}

function randomContent(){
  var currentContent = APIArray[Math.floor(Math.random()*APIArray.length)];
  currentContent();
}

$('#inspire').on('click', function(){
  var timeAnimation = 700;
  $('.content').fadeOut(timeAnimation, function(){
    $('#youtubeplayer').remove();
    var youtubeDiv = $('<div>').attr('id', 'youtubeplayer');
    youtubeDiv.prependTo('.content');
    $('#quote').empty();
    $('.image').attr('src', '');
    $('#spotifyplayer').remove();
    randomContent();
  });
  $('.content').fadeIn(timeAnimation);
})

$("#overload").on("click", function (){
  emptyContent();
  setTimeout(function(){
    for(i=0;i<APIArray.length;i++){
      APIArray[i]();
    }
     $('.content').fadeIn(700);
  }, 1000);
});
// Retrive 'youtube' content
function getVideos(){
  $.get("/content/youtube", function(data){
    vidArray = data;
  })
}

// Retrieve 'spotify' content
function getSongs(){
  $.get("/content/spotify", function(data){
    songArray = data;
  })
}

function getQuotes(){
  $.get("/content/quotes", function(data){
    quotesArray = data;
  })
}

//Testing POST (inserting data)
function newData(content, contentType) {
  $.post("/content/new", { content: content, contentType: contentType }, function(data) {
    console.log(data);
  }).fail(function(e) {
    console.log(e.statusText);
  })
}

// Get favorites of current user(provide email)
function getFavorites(email) {
  $.get("/favorites/" + email, function(data) {
    for(i=0; i<data.length; i++){
      var tableRow = $("<tr>");
      var tableDataContent = $("<td>");
      var tableDataDate = $("<td>");
      var tableDataTime = $("<td>");
      var dateTime = data[i].createdAt.split("T");
      tableDataContent.text(data[i].content);
      tableDataDate.text(dateTime[0]);
      tableDataTime.text(dateTime[1]);
      tableRow.append(tableDataContent);
      tableRow.append(tableDataDate);
      tableRow.append(tableDataTime);
      switch (data[i].content_type){
        case "spotify":
          $("#favSongs").append(tableRow);
        break;
        case "youtube":
          $("#favVideos").append(tableRow);
        break;
        case "quotes":
          $("#favQuotes").append(tableRow);
        break;        
      }
    }
  })
}

$("#saveContent").on("click", function(){
  saveContent(currentUser, currentUserContent);
});

// Add to favorites
function saveContent(email, content) {
  $.post("/favorites/save/", {email: email, content: content}, function(data) {
  })
}

$('document').ready(function(){
  getVideos();
  getSongs();
  getQuotes();
  setTimeout(function(){
    randomContent();
  }, 2000);
});

$("#saved").on("click", function(){
  $("#favSongs tr:not(:first-child)").remove();
  $("#favVideos tr:not(:first-child)").remove();
  $("#favQuotes tr:not(:first-child)").remove();
  getFavorites(currentUser);
});

$("#favVideos, #favQuotes, #favSongs").on("click", "tr:not(:first-child)", function() {
  var clickedSavedContent = $(this).children("td:first-child");
  emptyContent();
  var table = $(this).parentsUntil(".panel", "table");
  var contentType = table[0].id;
  setTimeout( function() {
    switch(contentType) {
      case "favVideos":
        youtubeAPI(clickedSavedContent.text());   
        break;
      case "favSongs":
        spotifyAPI(clickedSavedContent.text());
        break;
      case "favQuotes":
        quotesAPI(clickedSavedContent.text());
        break;   
    }
    $('.content').fadeIn(700);
  }, 800);  
});
