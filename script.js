document.addEventListener("DOMContentLoaded", () => {
  // Populate Carousel
  const track = document.getElementById("carouselTrack");
  const indicator = document.getElementById("progressIndicator");

  // Check if questions array exists and carousel track is present
  if (typeof questions !== "undefined" && track && questions.length > 0) {
    // Clear existing content just in case
    track.innerHTML = "";

    questions.forEach((q, index) => {
      const card = document.createElement("div");
      card.className = `question-card`;
      // Initial classes for positioning
      if (index === 0) card.classList.add("active");
      if (index === 1) card.classList.add("next");

      card.innerHTML = `
                <span class="question-number">Question ${index + 1}</span>
                <p class="question-text">${q}</p>
            `;

      track.appendChild(card);
    });

    setupCarouselNavigation();
  }
});

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
      nextBtn.style.display = index === cards.length - 1 ? "none" : "flex";
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
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCards();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
      updateCards();
    } else if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
      currentIndex++;
      updateCards();
    }
  });

  // Initial progress update
  updateProgress(0);
}
