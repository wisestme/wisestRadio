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
nextBtn.addEventListener('click', playNextTrack);
function playNextTrack() {
  trackNumber++;
  if(trackNumber >= songs.length) {
    trackNumber = 0
  }
  loadSong(songs[trackNumber]);
  playSong();
}

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
  let {currentTime, duration} = e.target;
  if(isPlaying) {
    progressPercent = (currentTime / duration) * 100;
    musicProgress.style.width = `${progressPercent}%`
  }

  // Calculate duration
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if(durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }
  // delay switching duration element to avoid NaN
  if(durationSeconds) {
    musicDuration.textContent = `${durationMinutes}:${durationSeconds}`;
  }

  // Calculate currentTime
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if(currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }
  musicCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
}

// Set progress bar
const progressContainer = document.querySelector('.progress_container');
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  console.log(clickX)
  console.log(width);
  const { duration } = music;
  music.currentTime = (clickX / width) * duration
}

music.addEventListener('timeupdate', getMusicProgress);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', playNextTrack);

// repeat track
const repeatButton = document.getElementById('repeat');

function setRepeat(){
  repeatButton.classList.toggle('repeat_on');
  music.toggleAttribute('loop');
}
repeatButton.addEventListener('click', setRepeat);


