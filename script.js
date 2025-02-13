document.addEventListener("DOMContentLoaded", () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let musicSource = null;
  let musicGainNode = null;
  
  let stage = 1;
  
  document.querySelectorAll("video").forEach(video => {
    if (video.id !== "lobbyVideo") {
      video.muted = true;
    }
  });
  
  // Grab essential elements.
  const lobbyVideo = document.getElementById("lobbyVideo");
  const playButton = document.getElementById("playButton");
  const triviaBackgroundVideo = document.getElementById("triviaBackgroundVideo");
  const finalScreen = document.getElementById("finalScreen");
  
  // NOTE: We are no longer using the HTML audio element for the main music.
  // const music = document.getElementById("music");
  const musicEnding = document.getElementById("musicEnding");
  
  const Q1_entrance = document.getElementById("Q1_entrance");
  const Q1_A = document.getElementById("Q1_A");
  const Q1_B = document.getElementById("Q1_B");
  const Q1_C = document.getElementById("Q1_C");
  const Q1_D = document.getElementById("Q1_D");
  
  const Q2_entrance = document.getElementById("Q2_entrance");
  const Q2_A = document.getElementById("Q2_A");
  const Q2_B = document.getElementById("Q2_B");
  const Q2_C = document.getElementById("Q2_C");
  const Q2_D = document.getElementById("Q2_D");
  
  const Q3_entrance = document.getElementById("Q3_entrance");
  const Q3_A = document.getElementById("Q3_A");
  const Q3_B = document.getElementById("Q3_B");
  const Q3_C = document.getElementById("Q3_C");
  const Q3_D = document.getElementById("Q3_D");
  
  const Q4_entrance = document.getElementById("Q4_entrance");
  const Q4_A = document.getElementById("Q4_A");
  const Q4_B = document.getElementById("Q4_B");
  const Q4_C = document.getElementById("Q4_C");
  const Q4_D = document.getElementById("Q4_D");
  
  const triviaBtnWrapper = document.querySelector(".trivia-btn-wrapper");
  const aButton = document.getElementById("aButton");
  const bButton = document.getElementById("bButton");
  const cButton = document.getElementById("cButton");
  const dButton = document.getElementById("dButton");
  
  const mehVideo = document.getElementById("mehVideo");
  const goodVideo = document.getElementById("goodVideo");
  const excellentVideo = document.getElementById("excellentVideo");
  const brilliantVideo = document.getElementById("brilliantVideo");
  const brilliantLightVideo = document.getElementById("brilliantLightVideo");
  
  const first = document.getElementById("first");
  const second = document.getElementById("second");
  const third = document.getElementById("third");
  const fourth = document.getElementById("fourth");
  
  // Start the game by displaying the lobby.
  displayStartScreen();
  
  playButton.addEventListener("click", () => {
    if (areAllVideosPaused()) {
      // === CHANGE: Use Web Audio API function to play seamless looping music ===
      playLoopingMusic('assets/music.mp3', 0.3, 1);
      
      lobbyVideo.style.display = "none";
      playButton.style.display = "none";
  
      playVideoOnDemand(triviaBackgroundVideo);
      triviaBtnWrapper.style.display = "flex";
      playVideoOnDemand(mehVideo);
  
      triviaBackgroundVideo.addEventListener("timeupdate", function onUpdate() {
        if (this.currentTime >= this.duration - 0.3) {
          triviaBackgroundVideo.removeEventListener("timeupdate", onUpdate);
          Q1_entrance.style.display = "flex";
          first.style.display = "flex";
          playVideoOnDemand(Q1_entrance);
          playVideoOnDemand(first);
        }
      });
    }
  });
  
  aButton.addEventListener("click", () => {
    if (areAllVideosPaused()) {
      if (stage === 1) {
        stage += 1;
        Q1_entrance.style.display = "none";
        mehVideo.style.display = "none";
        playVideoOnDemand(Q1_A);
        playVideoOnDemand(goodVideo);
        Q1_A.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q1_A.style.display = "none";
            first.style.display = "none";
            playVideoOnDemand(Q2_entrance);
            playVideoOnDemand(second);
            Q1_A.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 2) {
        Q2_entrance.style.display = "none";
        playVideoOnDemand(Q2_A);
        Q2_A.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q2_A.style.display = "none";
            Q2_entrance.style.display = "flex";
            Q2_A.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 3) {
        stage += 1;
        Q3_entrance.style.display = "none";
        excellentVideo.style.display = "none";
        playVideoOnDemand(Q3_A);
        playVideoOnDemand(brilliantVideo);
        brilliantVideo.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            brilliantVideo.style.display = "none";
            brilliantLightVideo.setAttribute("loop", "");
            playVideoOnDemand(brilliantLightVideo);
            brilliantVideo.removeEventListener("timeupdate", onUpdate);
          }
        });
        Q3_A.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q3_A.style.display = "none";
            third.style.display = "none";
            playVideoOnDemand(Q4_entrance);
            playVideoOnDemand(fourth);
            Q3_A.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 4) {
        Q4_entrance.style.display = "none";
        playVideoOnDemand(Q4_A);
        Q4_A.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            triviaBtnWrapper.style.display = "none";
            playVideoOnDemand(finalScreen);
            let musicStarted = false;
            finalScreen.addEventListener("timeupdate", function onUpdate() {
              if (!musicStarted && this.currentTime >= 4.19) {
                musicStarted = true;
                fadeOutLoopingMusic(2, musicEnding);
                finalScreen.removeEventListener("timeupdate", onUpdate);
              }
            });
            Q4_A.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
    }
  });
  
  bButton.addEventListener("click", () => {
    if (areAllVideosPaused()) {
      if (stage === 1) {
        Q1_entrance.style.display = "none";
        playVideoOnDemand(Q1_B);
        Q1_B.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q1_B.style.display = "none";
            Q1_entrance.style.display = "flex";
            Q1_B.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 2) {
        Q2_entrance.style.display = "none";
        playVideoOnDemand(Q2_B);
        Q2_B.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q2_B.style.display = "none";
            Q2_entrance.style.display = "flex";
            Q2_B.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 3) {
        Q3_entrance.style.display = "none";
        playVideoOnDemand(Q3_B);
        Q3_B.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q3_B.style.display = "none";
            Q3_entrance.style.display = "flex";
            Q3_B.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 4) {
        Q4_entrance.style.display = "none";
        playVideoOnDemand(Q4_B);
        Q4_B.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q4_B.style.display = "none";
            Q4_entrance.style.display = "flex";
            Q4_B.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
    }
  });
  
  cButton.addEventListener("click", () => {
    if (areAllVideosPaused()) {
      if (stage === 1) {
        Q1_entrance.style.display = "none";
        playVideoOnDemand(Q1_C);
        Q1_C.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q1_C.style.display = "none";
            Q1_entrance.style.display = "flex";
            Q1_C.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 2) {
        Q2_entrance.style.display = "none";
        playVideoOnDemand(Q2_C);
        Q2_C.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q2_C.style.display = "none";
            Q2_entrance.style.display = "flex";
            Q2_C.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 3) {
        Q3_entrance.style.display = "none";
        playVideoOnDemand(Q3_C);
        Q3_C.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q3_C.style.display = "none";
            Q3_entrance.style.display = "flex";
            Q3_C.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 4) {
        Q4_entrance.style.display = "none";
        playVideoOnDemand(Q4_C);
        Q4_C.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q4_C.style.display = "none";
            Q4_entrance.style.display = "flex";
            Q4_C.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
    }
  });
  
  dButton.addEventListener("click", () => {
    if (areAllVideosPaused()) {
      if (stage === 1) {
        Q1_entrance.style.display = "none";
        playVideoOnDemand(Q1_D);
        Q1_D.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q1_D.style.display = "none";
            Q1_entrance.style.display = "flex";
            Q1_D.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 2) {
        stage += 1;
        Q2_entrance.style.display = "none";
        goodVideo.style.display = "none";
        playVideoOnDemand(Q2_D);
        playVideoOnDemand(excellentVideo);
        Q2_D.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q2_D.style.display = "none";
            second.style.display = "none";
            playVideoOnDemand(Q3_entrance);
            playVideoOnDemand(third);
            Q2_D.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 3) {
        Q3_entrance.style.display = "none";
        playVideoOnDemand(Q3_D);
        Q3_D.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q3_D.style.display = "none";
            Q3_entrance.style.display = "flex";
            Q3_D.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
      else if (stage === 4) {
        Q4_entrance.style.display = "none";
        playVideoOnDemand(Q4_D);
        Q4_D.addEventListener("timeupdate", function onUpdate() {
          if (this.currentTime >= this.duration - 0.3) {
            Q4_D.style.display = "none";
            Q4_entrance.style.display = "flex";
            Q3_D.removeEventListener("timeupdate", onUpdate);
          }
        });
      }
    }
  });
  
  function displayStartScreen() {
    lobbyVideo.style.display = "flex";
    lobbyVideo.play();
    playButton.style.display = "block";
  }
  
  function areAllVideosPaused() {
    const videos = [...document.querySelectorAll("video")].filter(v => !v.paused);
    return videos.length === 0 || (videos.length === 1 && videos[0].id === "brilliantLightVideo");
  }
  
  function playVideoOnDemand(videoElement) {
    videoElement.preload = "auto";
    videoElement.style.display = "flex";
    videoElement.muted = false;
    // videoElement.load();
    videoElement.play();
  }
  
  function fadeInMusic(audio, targetVolume = 1, duration = 2000) {
    targetVolume = Math.min(Math.max(targetVolume, 0), 1);
  
    audio.volume = 0;
    audio.play();
  
    const step = 0.1;
    const steps = Math.max(1, targetVolume / step);
    const interval = duration / steps;
  
    const fadeIn = setInterval(() => {
      if (audio.volume < targetVolume) {
        audio.volume = Math.min(audio.volume + step, targetVolume);
      } else {
        clearInterval(fadeIn);
      }
    }, interval);

    musicEnding.remove();
  }

  function playLoopingMusic(url, targetVolume = 1, fadeInDuration = 2) {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        musicSource = audioCtx.createBufferSource();
        musicSource.buffer = audioBuffer;
        musicSource.loop = true;
  
        musicGainNode = audioCtx.createGain();
        musicGainNode.gain.value = 0;
  
        musicSource.connect(musicGainNode);
        musicGainNode.connect(audioCtx.destination);
  
        musicSource.start(0);
  
        musicGainNode.gain.linearRampToValueAtTime(
          targetVolume,
          audioCtx.currentTime + fadeInDuration
        );
      })
      .catch(error => console.error('Error loading music:', error));
  }
  
  function fadeOutLoopingMusic(fadeOutDuration = 2, newAudioElement = null) {
    if (musicGainNode) {
      const fadeOutEndTime = audioCtx.currentTime + fadeOutDuration;
      
      musicGainNode.gain.linearRampToValueAtTime(0, fadeOutEndTime);
  
      if (newAudioElement) {
        setTimeout(() => {
          fadeInMusic(newAudioElement, 0.3);
        }, fadeOutDuration * 1000); // Convert seconds to milliseconds
      }
    }
  }
});
