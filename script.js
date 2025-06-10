const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function updateSlide() {
  slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
}

document.getElementById('next').addEventListener('click', () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlide();
  }
});

document.getElementById('prev').addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const photoImages = document.querySelectorAll(".photo img");

photoImages.forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("toggle-music");

let playing = true;
toggleBtn.addEventListener("click", () => {
  if (playing) {
    music.pause();
    toggleBtn.textContent = "🔇";
  } else {
    music.play();
    toggleBtn.textContent = "🔊";
  }
  playing = !playing;
});

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusDisplay = document.getElementById("game-status");
const cells = document.querySelectorAll(".cell");

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusDisplay.textContent = `${currentPlayer} menang! 🎉`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusDisplay.textContent = "Seri 😅";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c];
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = "";
  cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

function updateTime() {
  const now = new Date();

  const days = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  document.getElementById("days").textContent = `${days} Days`;
  document.getElementById("hours").textContent = `${hours} Hours`;
  document.getElementById("minutes").textContent = `${minutes} Minutes`;
  document.getElementById("seconds").textContent = `${seconds} Seconds`;
}

setInterval(updateTime, 1000);
updateTime(); // panggil langsung saat load


function clock() {
    var time = new Date();
    var jam = time.getHours();
    var menit = time.getMinutes();
    var detik = time.getSeconds();
    var hari = time.toLocaleDateString('id-ID', { weekday: 'long' });
    var tanggal = time.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    jam = jam < 10 ? '0' + jam : jam;
    menit = menit < 10 ? '0' + menit : menit;
    detik = detik < 10 ? '0' + detik : detik;

    var tanggalSekarang = hari + ', ' + tanggal;

    document.getElementById('jam').innerText = jam;
    document.getElementById('menit').innerText = menit;
    document.getElementById('detik').innerText = detik;
    document.getElementById('date').innerText = tanggalSekarang;
}

setInterval(clock, 1000);
clock();

// delay possible clicks until page is turned
document.getElementById('book').addEventListener('click', function(e) {
  e = this
  e.style.pointerEvents = "none"
  setTimeout(function(){
    e.style.pointerEvents = ""
  }, 2000)
})


        // JAM DIGITAL
function updateDays() {
  const startDate = new Date("2024-06-11");
  const now = new Date();

  // Buat tanggal murni tanpa jam
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const timeDiff = today - start;
  const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // ← tambahkan +1 di sini

  document.getElementById("days-count").textContent = daysPassed;
}

setInterval(() => {
  updateClock();
  updateDays(); // Tambahkan ini di sini
}, 1000);

