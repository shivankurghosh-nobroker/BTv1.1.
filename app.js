(() => {
  const slidesData = [
    { text: "Are you still paying a high EMI every month?", duration: 4000 },
    { text: "What if you could bring that down—without changing your home, your job, or your routine?", duration: 5000 },
    { text: "With NoBroker's Balance Transfer, you can shift your existing home loan to a new lender offering lower interest rates", duration: 5000 },
    { text: 'Starting at just <span class="highlight">7.35%</span>', duration: 3000 },
    { text: "That means: Lower monthly outflow. More savings in your hands. Extra cash for your needs.", duration: 5000 },
    { text: "Extra cash that could go towards your family, your future, or even that long-overdue renovation.", duration: 5000 },
    { text: "You don't have to run from bank to bank. We take care of everything—document collection, loan closure, and paperwork—right at your doorstep.", duration: 6000 },
    { text: "No hidden charges. No guesswork. Just a smarter way to manage your loan.", duration: 4000 },
    { text: "And if you're eligible, you could also unlock a top-up loan, giving you funds for anything that matters—education, emergencies, or your next big step.", duration: 6000 },
    { text: "You're already paying your loan. Now make it work better for you.", duration: 4000 },
    { text: "Get started with NoBroker Balance Transfer today", duration: 3000, isCta: true }
  ];

  const phoneNumber = "+919632321997";
  const slidesContainer = document.querySelector(".slides-container");
  const slideIndicators = document.getElementById("slideIndicators");
  const progressBar = document.querySelector(".progress-bar");
  const progressFill = document.querySelector(".progress-fill");
  const timeDisplay = document.getElementById("timeDisplay");
  const ctaBtn = document.getElementById("ctaBtn");

  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const stopBtn = document.getElementById("stopBtn");
  const rewindBtn = document.getElementById("rewindBtn");
  const forwardBtn = document.getElementById("forwardBtn");
  (() => {
    const audio = document.getElementById('backgroundMusic');
    let currentSlide = 0;
    let isPlaying = false;
    let slideTimeout = null;
    let progressInterval = null;
    let startTime = null;
    let pausedTime = 0;

    // Your existing variables, slide data, DOM refs...

  function play() {
    if (currentSlide >= slidesData.length) {
      restart();
      return;
    }
    isPlaying = true;
    startTime = Date.now() - pausedTime;
    togglePlayPauseButtons(true);
    scheduleNextSlide();
    startProgressUpdater();
    if (audio) audio.play().catch(() => {});
  }

  function pause() {
    isPlaying = false;
    pausedTime = Date.now() - startTime;
    togglePlayPauseButtons(false);
    clearSlideTimeout();
    clearProgressInterval();
    if (audio) audio.pause();
  }

  function stop() {
    pause();
    currentSlide = 0;
    pausedTime = 0;
    startTime = null;
    showSlide(currentSlide);
    updateProgress(0);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  // rest of your existing logic...

  // Also, control elements event listeners as before

})();

  function renderSlides() {
    slidesData.forEach((slide, i) => {
      const div = document.createElement("div");
      div.className = "slide";
      div.setAttribute("aria-hidden", "true");
      div.style.display = "none";
      div.setAttribute("tabindex", "-1");
      div.innerHTML = slide.text;
      slidesContainer.appendChild(div);
    });
  }

  function renderIndicators() {
    slideIndicators.innerHTML = "";
    slidesData.forEach((_slide, i) => {
      const btn = document.createElement("button");
      btn.className = "slide-indicator";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-label", `Go to slide ${i + 1}`);
      btn.setAttribute("aria-selected", "false");
      btn.tabIndex = -1;
      btn.addEventListener("click", () => goToSlide(i));
      slideIndicators.appendChild(btn);
    });
  }

  function showSlide(index) {
    const slides = slidesContainer.querySelectorAll(".slide");
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.display = "flex";
        slide.classList.add("active");
        slide.setAttribute("aria-hidden", "false");
        slide.setAttribute("tabindex", "0");
      } else {
        slide.style.display = "none";
        slide.classList.remove("active");
        slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("tabindex", "-1");
      }
    });

    [...slideIndicators.children].forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
      btn.setAttribute("aria-selected", i === index ? "true" : "false");
      btn.tabIndex = i === index ? 0 : -1;
    });

    if (slidesData[index].isCta) {
      ctaBtn.style.display = "inline-block";
    } else {
      ctaBtn.style.display = "none";
    }
  }

  function updateProgress(elapsedMs) {
    const progress = Math.min(1, elapsedMs / totalDuration);
    progressFill.style.width = `${progress * 100}%`;
    timeDisplay.textContent = `${formatTime(Math.floor(elapsedMs / 1000))} / ${formatTime(Math.floor(totalDuration / 1000))}`;

    progressBar.setAttribute("aria-valuenow", elapsedMs);
    progressBar.setAttribute("aria-valuemax", totalDuration);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function elapsedTimeForSlide(index) {
    return slidesData.slice(0, index).reduce((sum, s) => sum + s.duration, 0);
  }

  function play() {
    if (currentSlide >= slidesData.length) {
      restart();
      return;
    }
    isPlaying = true;
    startTime = Date.now() - pausedTime;
    togglePlayPauseButtons(true);
    scheduleNextSlide();
    startProgressUpdater();
    playAudio();
  }

  function pause() {
    isPlaying = false;
    pausedTime = Date.now() - startTime;
    togglePlayPauseButtons(false);
    clearSlideTimeout();
    clearProgressInterval();
    pauseAudio();
  }

  function stop() {
    pause();
    currentSlide = 0;
    pausedTime = 0;
    startTime = null;
    showSlide(currentSlide);
    updateProgress(0);
    playAudio(true);
  }

  function restart() {
    stop();
    play();
  }

  function nextSlide() {
    if (currentSlide < slidesData.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
      if (isPlaying) {
        pausedTime = elapsedTimeForSlide(currentSlide);
        startTime = Date.now() - pausedTime;
        scheduleNextSlide();
      }
    } else {
      currentSlide = 0;
      showSlide(currentSlide);
      if (isPlaying) {
        pausedTime = 0;
        startTime = Date.now();
        scheduleNextSlide();
      }
      if (audio) audio.currentTime = 0;
    }
  }

  function previousSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
      if (isPlaying) {
        pausedTime = elapsedTimeForSlide(currentSlide);
        startTime = Date.now() - pausedTime;
        scheduleNextSlide();
      }
    }
  }

  function goToSlide(i) {
    if (i >= 0 && i < slidesData.length) {
      currentSlide = i;
      showSlide(i);
      if (isPlaying) {
        pausedTime = elapsedTimeForSlide(currentSlide);
        startTime = Date.now() - pausedTime;
        scheduleNextSlide();
      }
    }
  }

  function scheduleNextSlide() {
    clearSlideTimeout();
    const duration = slidesData[currentSlide].duration / playbackSpeed;
    slideTimeout = setTimeout(() => {
      if (isPlaying) nextSlide();
    }, duration);
  }

  function clearSlideTimeout() {
    if (slideTimeout) {
      clearTimeout(slideTimeout);
      slideTimeout = null;
    }
  }

  function startProgressUpdater() {
    clearProgressInterval();
    progressInterval = setInterval(() => {
      if (!isPlaying || !startTime) return;
      const elapsed = Date.now() - startTime;
      updateProgress(elapsed);
      if (elapsed >= totalDuration) {
        currentSlide = 0;
        showSlide(currentSlide);
        pausedTime = 0;
        startTime = Date.now();
        updateProgress(0);
        if (audio) audio.currentTime = 0;
      }
    }, 100);
  }

  function clearProgressInterval() {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }

  function togglePlayPauseButtons(playing) {
    if (playing) {
      playBtn.style.display = "none";
      pauseBtn.style.display = "inline";
    } else {
      playBtn.style.display = "inline";
      pauseBtn.style.display = "none";
    }
  }

  function playAudio() {
    if (audio) {
      audio.play().catch(() => {});
    }
  }

  function pauseAudio() {
    if (audio) {
      audio.pause();
    }
  }

  playBtn.addEventListener("click", play);
  pauseBtn.addEventListener("click", pause);
  stopBtn.addEventListener("click", stop);
  rewindBtn.addEventListener("click", previousSlide);
  forwardBtn.addEventListener("click", nextSlide);
  ctaBtn.addEventListener("click", () => {
    window.location.href = `tel:${phoneNumber}`;
  });

  window.addEventListener("keydown", e => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
    switch(e.code) {
      case "ArrowRight":
      case "PageDown":
        e.preventDefault();
        nextSlide();
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        previousSlide();
        break;
      case "Space":
        e.preventDefault();
        if (isPlaying) pause(); else play();
        break;
      case "KeyR":
        e.preventDefault();
        restart();
        break;
    }
  });

  renderSlides();
  renderIndicators();
  showSlide(currentSlide);
  updateProgress(0);
  togglePlayPauseButtons(false);
})();
