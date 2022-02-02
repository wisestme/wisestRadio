const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist')
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

const songs = [
  {
    name: 'phil_1',
    displayName: 'Anthem',
    artist: 'Phil Wickham'
  },
  {
    name: 'phil_2',
    displayName: 'Hold On',
    artist: 'Phil Wickham'
  },
  {
    name: 'phil_3',
    displayName: 'Lord I need you',
    artist: 'Phil Wickham'
  },
  {
    name: 'phil_4',
    displayName: 'Secret Place',
    artist: 'Phil Wickham'
  },
  {
    name: 'phil_5',
    displayName: 'Wide Awake',
    artist: 'Phil Wickham'
  }
]

// Check playing
let isPlaying = false;
// PLAY
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'pause')
  music.play();
}

// PAUSE
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'play');
  music.pause();
}

// Play or Pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
