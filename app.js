const referenceInput = document.getElementById("referenceInput");
const referenceImage = document.getElementById("referenceImage");
const comparisonReference = document.getElementById("comparisonReference");
const caricatureInput = document.getElementById("caricatureInput");
const comparisonCaricature = document.getElementById("comparisonCaricature");
const gallery = document.getElementById("gallery");

const timerDisplay = document.getElementById("timerDisplay");
const minutesInput = document.getElementById("minutes");
const startTimerBtn = document.getElementById("startTimer");
const pauseTimerBtn = document.getElementById("pauseTimer");
const resetTimerBtn = document.getElementById("resetTimer");

const STORAGE_KEY = "caricature-sprint-gallery";

let countdown = null;
let remainingSeconds = Number(minutesInput.value) * 60;

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function stopTimer() {
  if (countdown) {
    clearInterval(countdown);
    countdown = null;
  }
}

function startTimer() {
  stopTimer();
  countdown = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      alert("Time is up! Save your caricature and compare results.");
      return;
    }

    remainingSeconds -= 1;
    renderTimer();
  }, 1000);
}

function resetTimer() {
  stopTimer();
  remainingSeconds = Number(minutesInput.value) * 60;
  renderTimer();
}

function readImage(file, onLoad) {
  const reader = new FileReader();
  reader.onload = (event) => onLoad(event.target.result);
  reader.readAsDataURL(file);
}

function saveCaricature(dataUrl) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  existing.unshift({
    image: dataUrl,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 30)));
}

function renderGallery() {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  gallery.innerHTML = "";

  if (!existing.length) {
    gallery.textContent = "No caricatures saved yet.";
    return;
  }

  for (const item of existing) {
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = `Saved caricature ${item.createdAt}`;
    gallery.appendChild(img);
  }
}

referenceInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  readImage(file, (dataUrl) => {
    referenceImage.src = dataUrl;
    comparisonReference.src = dataUrl;
  });
});

caricatureInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  readImage(file, (dataUrl) => {
    comparisonCaricature.src = dataUrl;
    saveCaricature(dataUrl);
    renderGallery();
  });
});

startTimerBtn.addEventListener("click", startTimer);
pauseTimerBtn.addEventListener("click", stopTimer);
resetTimerBtn.addEventListener("click", resetTimer);
minutesInput.addEventListener("change", resetTimer);

renderTimer();
renderGallery();
