const form = document.getElementById("puzzleForm");
const surprise = document.getElementById("surprise");
const feedback = document.getElementById("feedback");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");

let loveApproved = false;
let heartIntervalId = null;

const normalize = (value) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ı]/g, "i")
    .replace(/[ğ]/g, "g")
    .replace(/[ş]/g, "s")
    .replace(/[ç]/g, "c")
    .replace(/[ö]/g, "o")
    .replace(/[ü]/g, "u")
    .replace(/\s+/g, " ");

const acceptedAnswers = {
  q1: ["gokkusagi", "gok kusagi"],
  q2: ["cisli bokum"]
};

function triggerErrorMode() {
  document.body.classList.remove("error-mode");
  card.classList.remove("error-shake");
  void document.body.offsetWidth;
  document.body.classList.add("error-mode");
  card.classList.add("error-shake");

  setTimeout(() => {
    document.body.classList.remove("error-mode");
    card.classList.remove("error-shake");
  }, 1300);
}

function rejectNo() {
  feedback.textContent = "Yanlış cevap boklu ağzına tüküreyim senin";
  feedback.className = "feedback err";
  surprise.classList.add("hidden");
  triggerErrorMode();
}

function moveNoButton() {
  const x = Math.floor(Math.random() * 100) - 50;
  const y = Math.floor(Math.random() * 46) - 23;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function spawnHeart(
  x = Math.random() * window.innerWidth,
  y = window.innerHeight + 10
) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${16 + Math.random() * 20}px`;
  heart.style.animationDuration = `${2.4 + Math.random() * 1.5}s`;
  heart.style.opacity = `${0.55 + Math.random() * 0.4}`;
  heart.style.setProperty("--drift", `${-70 + Math.random() * 140}`);
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4200);
}

function startHeartCelebration() {
  for (let i = 0; i < 14; i += 1) {
    spawnHeart(
      window.innerWidth * 0.3 + Math.random() * (window.innerWidth * 0.4),
      window.innerHeight * 0.55 + Math.random() * 120
    );
  }

  if (heartIntervalId) {
    clearInterval(heartIntervalId);
  }

  heartIntervalId = setInterval(() => {
    spawnHeart();
  }, 260);

  setTimeout(() => {
    clearInterval(heartIntervalId);
    heartIntervalId = null;
  }, 3400);
}

yesBtn.addEventListener("click", () => {
  loveApproved = true;
  yesBtn.classList.add("active");
  noBtn.classList.remove("active");
  noBtn.style.transform = "translate(0, 0)";
  feedback.textContent = "Doğru cevap, devam et ❤️";
  feedback.className = "feedback ok";
  startHeartCelebration();
});

function handleNo(event) {
  event.preventDefault();
  moveNoButton();
  rejectNo();
}

["click", "pointerdown", "mousedown", "touchstart"].forEach((evt) => {
  noBtn.addEventListener(evt, handleNo, { passive: false });
});

noBtn.addEventListener("pointerenter", () => {
  moveNoButton();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const q1 = normalize(document.getElementById("q1").value).replace(/\s/g, "");
  const q2 = normalize(document.getElementById("q2").value);

  const isQ1Correct = acceptedAnswers.q1.includes(q1);
  const isQ2Correct = acceptedAnswers.q2.includes(q2);

  if (!loveApproved) {
    feedback.textContent = "Önce beni seviyor musun sorusunda Evet seçmelisin.";
    feedback.className = "feedback err";
    surprise.classList.add("hidden");
    return;
  }

  if (isQ1Correct && isQ2Correct) {
    feedback.textContent = "Kilit açıldı. Sürpriz mesaj burada ❤️";
    feedback.className = "feedback ok";
    surprise.classList.remove("hidden");
    form.querySelector("button[type='submit']").disabled = true;
  } else {
    feedback.textContent = "Cevaplardan biri yanlış. Tekrar dene.";
    feedback.className = "feedback err";
    surprise.classList.add("hidden");
  }
});
