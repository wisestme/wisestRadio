const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist')
const music = document.querySelector('audio');
const musicProgress = document.getElementById('progress');
const musicDuration = document.getElementById('duration');
const musicCurrentTime = document.getElementById('current_time');
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

// Ubdate DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.m4a`;
  image.src = `images/${song.name}.jpg`
}

// On load, select first song
loadSong(songs[0])

// Play Next/Previous Track
let trackNumber = 0;
nextBtn.addEventListener('click', () => {
  trackNumber++;
  if(trackNumber >= songs.length) {
    trackNumber = 0
  }
  loadSong(songs[trackNumber]);
  playSong();
});

prevBtn.addEventListener('click', () => {
  trackNumber--;
  if(trackNumber < 0) {
    trackNumber = songs.length - 1;
  }
  
  loadSong(songs[trackNumber]);
  playSong();
})

// Music progress
function getMusicProgress(e) {
  const {currentTime, duration} = e.target;
  if(isPlaying) {
    musicProgress.style.width = (currentTime / duration) * 100;
  }
  musicDuration.textContent = (duration / 60).toFixed(1);

  musicCurrentTime.textContent = (currentTime/60).toFixed(2);
}

music.addEventListener('timeupdate', getMusicProgress)