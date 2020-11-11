function initVideoPlayer(){

  /* Get Our Elements */
  const player = document.querySelector('.player');
  const video = player.querySelector('.viewer');
  const progress = player.querySelector('.progress');
  const progressBar = player.querySelector('.progress__filled');
  const toggle = player.querySelector('.toggle');
  const skipButtons = player.querySelectorAll('[data-skip]');
  const ranges = player.querySelectorAll('.player__slider');
  const screenSizeButton = player.querySelector('.screen');

  /* Build out functions */
  function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }

  function updateButton() {
    if(toggle.classList.contains('active')){
      toggle.textContent = '❚ ❚';
    } else {
      toggle.textContent = '►';
    }
  }


  function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleRangeUpdate() {
    const percent = Math.round(this.value / this.getAttribute('max') * 100);
    video[this.name] = this.value;
    this.style.setProperty('--input-track-vol', percent + '%');
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  function playAgain() {
      video.currentTime = 0;
      video();
    }

  function changeSizeScreen () {
      player.classList.toggle('sizeScreen');
  } 

  /* Hook up the event listeners */
  video.addEventListener('click', togglePlay);
  video.addEventListener('timeupdate', handleProgress);
  video.addEventListener('dblclick', playAgain);


  toggle.addEventListener('click', togglePlay);
  toggle.addEventListener('click', function(){
    this.classList.toggle('active');
  });
  toggle.addEventListener('click', updateButton);

  skipButtons.forEach(button => button.addEventListener('click', skip));
  screenSizeButton.addEventListener('click', changeSizeScreen);
  ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
  ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
  let mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
}

initVideoPlayer();