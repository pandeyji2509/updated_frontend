var player;
var live;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        videoId: 'vrWPGI2cr5E',
        playerVars: {
            autoplay: 1, // Start playing the video automatically
            mute: 1,     // Mute the video
            controls: 1, // Show video controls
            loop: 1      // Loop the video playback
        }
    });
    live = new YT.Player('live-tv', {
        videoId: 'vrWPGI2cr5E',
        playerVars: {
            autoplay: 1, // Start playing the video automatically
            mute: 1,     // Mute the video
            controls: 1, // Show video controls
            loop: 1      // Loop the video playback
        }
    });
}


// Get the current date
var currentDate = new Date();

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

const longDate = currentDate.toLocaleDateString(undefined, options);
const day_name = longDate.split(',')[0];
const month = longDate.split(',')[1].split(' ')[1];
const year = currentDate.getFullYear(); // 4-digit year
const day = String(currentDate.getDate()).padStart(2, '0'); // Day with leading zero
const formattedDate = `<strong>${day_name}</strong><br>
${day} ${month}, ${year}`;

// Update the content of the HTML element with the formatted date
document.getElementById("current-date").innerHTML = formattedDate;