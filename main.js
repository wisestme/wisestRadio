const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// Check playing
let isPlaying = false;
// PLAY
function playSong() {
  isPlaying = true;
  music.play();
}

// PAUSE
function pauseSong() {
  isPlaying = false;
  music.pause();
}

// Play or Pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
