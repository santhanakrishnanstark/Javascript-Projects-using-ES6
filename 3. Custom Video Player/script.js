var video = document.querySelector('video');
var play = document.querySelector('.play-btn');
var stop = document.querySelector('.stop');
var progress = document.querySelector('.progress');
var timestamp = document.querySelector('.timestamp');

function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlayIcon() {
    if (video.paused) {
        play.innerText = 'play_circle_filled';
    } else {
        play.innerText = 'pause_circle_filled';
    }
}

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

function setVideoProgress() {
    console.dir(Object(video))
    video.currentTime = (progress.value * video.duration) / 100;
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
progress.addEventListener('click', setVideoProgress);