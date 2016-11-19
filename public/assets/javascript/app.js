var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var vidArray = ['RYlCVwxoL_g', 'u2cMjeSvZSs', 'c1H92b_uLdU', 'eqhUHyVpAwE', '9vdN15--hro', 'xJ9e32MNEOk', 'xJ9e32MNEOk', 'g-jwWYX7Jlo', 'mgmVOuLgFB0', 'CPQ1budJRIQ', 'XNj_KDPp_iM', 'PyDlBy5tgYA']

var randomNumber = Math.floor(Math.random() * 4) + 1; 
console.log(randomNumber);

var APIArray = [youtubeAPI, quotesAPI, imageAPI ];

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

function youtubeAPI() { 

  var currentVideo = vidArray[Math.floor(Math.random()*vidArray.length)];

  var player = new YT.Player("player", {
                      height: '360',
                       width: '640',
                       videoId: currentVideo,                      
                 });

        console.log("API Ready");
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
              t: "Motivational"
            },
            headers: {
                "X-Mashape-Key": "DajIhcCO6emsh8uKH4Y06OID3hgUp12rSMHjsn9mLyW1nCivlD"
            }
         }).then(function(response) {
            $('.image').attr('src', response[0].media)
        });
}


function randomContent(){
  var currentContent = APIArray[Math.floor(Math.random()*APIArray.length)];
  currentContent();
  console.log('testing content');
  }

$('#inspire').on('click', function(){
  console.log('test');
 $('#player').remove();
 var youtubeDiv = $('<div>').attr('id', 'player');
 youtubeDiv.prependTo('.content');
 $('#quote').empty();
 $('.image').attr('src', '');
 randomContent();
})

function onYouTubeIframeAPIReady() {
  randomContent();
}
// function onYouTubeIframeAPIReady() {




// switch(randomNumber) {
//     case 1:
        
// 	var currentVideo = vidArray[Math.floor(Math.random()*vidArray.length)];

// 	var player = new YT.Player("player", {
// 	                    height: '360',
// 	                     width: '640',
// 	                     videoId: currentVideo,	                     
// 	               });

//         console.log("API Ready");
	
//         break;
//     case 2:
//         $(document).ready(function(){

// 	$.ajax({
//             url: "http://api.forismatic.com/api/1.0/",
//             jsonp: "jsonp",
//             dataType: "jsonp",
//             data: {
//               method: "getQuote",
//               lang: "en",
//               format: "jsonp"
//             }
//          }).then(function(response) {
//             $(".quote").empty().text(response.quoteText);
//         });

// 	})
//         break;
//      case 3:
//      $.ajax({
//             url: "https://healthruwords.p.mashape.com/v1/quotes/",
//             dataType: "json",
//             data: {
//             	t: "Motivational"
//             },
//             headers: {
//                 "X-Mashape-Key": "DajIhcCO6emsh8uKH4Y06OID3hgUp12rSMHjsn9mLyW1nCivlD"
//             }
//          }).then(function(response) {
//             $('.image').attr('src', response[0].media)
//         });
//      	break;
//     default:
     
// 	var currentVideo = vidArray[Math.floor(Math.random()*vidArray.length)];

// 	var player = new YT.Player("player", {
// 	                    height: '360',
// 	                     width: '640',
// 	                     videoId: 'RYlCVwxoL_g',	                     
// 	               });

//         console.log("API Ready");
// }
// }

