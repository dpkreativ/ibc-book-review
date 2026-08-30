document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const indicator = document.getElementById("progressIndicator");

  if (typeof questions !== "undefined" && track && questions.length > 0) {
    track.innerHTML = "";

    questions.forEach((q, index) => {
      const card = document.createElement("div");
      card.className = `question-card`;
      if (index === 0) card.classList.add("active");
      if (index === 1) card.classList.add("next");

      let questionText = q;
      let sourceHtml = "";

      if (typeof q === "object" && q !== null) {
        questionText = q.text || q.question;
        if (q.source) {
          sourceHtml = `<span class="question-source text-sm md:text-base font-normal text-gray-600">${q.source}</span>`;
        }
      }

      card.innerHTML = `
                <div class="flex items-center justify-between flex-wrap gap-2 mb-6">
                  <div class="flex items-center gap-3 flex-wrap">
                    <span class="question-number !mb-0">Question ${index + 1}</span>
                    <button type="button" class="question-timer" aria-label="Start 5 minute timer" title="Click to start / pause 5-minute timer">
                      <svg class="w-4 h-4 timer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="timer-display">05:00</span>
                    </button>
                  </div>
                  ${sourceHtml}
                </div>
                <p class="question-text">${questionText}</p>
            `;

      setupCardTimer(card);
      track.appendChild(card);
    });

    setupCarouselNavigation();
  }
});

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function setupCardTimer(card) {
  const timerBtn = card.querySelector(".question-timer");
  if (!timerBtn) return;

  const display = timerBtn.querySelector(".timer-display");
  const DURATION_SECONDS = 300; // 5 minutes
  let remaining = DURATION_SECONDS;
  let intervalId = null;
  let isRunning = false;

  function updateDisplay() {
    display.textContent = formatTimer(remaining);
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isRunning = false;
    timerBtn.classList.remove("timer-running");
  }

  function start() {
    if (remaining <= 0) {
      remaining = DURATION_SECONDS;
      timerBtn.classList.remove("timer-ended");
    }
    isRunning = true;
    timerBtn.classList.add("timer-running");
    timerBtn.classList.remove("timer-paused");
    intervalId = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        remaining = 0;
        stop();
        display.textContent = "00:00 (Time's up)";
        timerBtn.classList.add("timer-ended");
      } else {
        updateDisplay();
      }
    }, 1000);
  }

  function pause() {
    stop();
    timerBtn.classList.add("timer-paused");
  }

  timerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (remaining <= 0) {
      remaining = DURATION_SECONDS;
      timerBtn.classList.remove("timer-ended", "timer-paused", "timer-running");
      updateDisplay();
    } else if (isRunning) {
      pause();
    } else {
      start();
    }
  });
}

function setupCarouselNavigation() {
  let currentIndex = 0;
  const cards = document.querySelectorAll(".question-card");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!cards.length) return;

  function updateCards() {
    cards.forEach((card, index) => {
      card.className = "question-card";
      if (index === currentIndex) {
        card.classList.add("active");
      } else if (index === currentIndex - 1) {
        card.classList.add("prev");
      } else if (index === currentIndex + 1) {
        card.classList.add("next");
      }
    });
    updateProgress(currentIndex);
  }

  function updateProgress(index) {
    const indicator = document.getElementById("progressIndicator");
    if (indicator) {
      indicator.textContent = `${index + 1} / ${cards.length}`;
    }

    if (prevBtn) {
      prevBtn.style.display = index === 0 ? "none" : "flex";
    }

    if (nextBtn) {
      if (index === cards.length - 1) {
        nextBtn.innerHTML = "&#x21bb;";
      } else {
        nextBtn.innerHTML = "→";
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCards();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex === cards.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCards();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
      updateCards();
    } else if (e.key === "ArrowRight") {
      if (currentIndex === cards.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCards();
    }
  });

  updateProgress(0);
}
