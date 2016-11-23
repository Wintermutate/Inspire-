var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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


function onYouTubeIframeAPIReady() {

var vidArray = ['RYlCVwxoL_g', 'u2cMjeSvZSs', 'c1H92b_uLdU', 'eqhUHyVpAwE', '9vdN15--hro', 'xJ9e32MNEOk', 'xJ9e32MNEOk', 'g-jwWYX7Jlo', 'mgmVOuLgFB0', 'CPQ1budJRIQ', 'XNj_KDPp_iM', 'PyDlBy5tgYA']

var randomNumber = Math.floor(Math.random() * 4) + 1; 
console.log(randomNumber);

switch(randomNumber) {
    case 1:
        
	var currentVideo = vidArray[Math.floor(Math.random()*vidArray.length)];

	var player = new YT.Player("player", {
	                    height: '360',
	                     width: '640',
	                     videoId: currentVideo,	                     
	               });

        console.log("API Ready");
	
        break;
    case 2:
        $(document).ready(function(){

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
            $(".quote").empty().text(response.quoteText);
        });

	})
        break;
     case 3:
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
     	break;
     case 4:
    // var widget = SC.Widget('soundcloud');
    // widget.load("https://soundcloud.com/on-air-with-ella", {});
    SC.initialize({
		client_id: 'YOUR_CLIENT_ID'
	});

	var track_url = 'http://soundcloud.com/forss/flickermood';
	SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
  		console.log('oEmbed response: ', oEmbed);
	});
    default:
     
	var currentVideo = vidArray[Math.floor(Math.random()*vidArray.length)];

	var player = new YT.Player("player", {
	                    height: '360',
	                     width: '640',
	                     videoId: 'RYlCVwxoL_g',	                     
	               });

        console.log("API Ready");
}
}