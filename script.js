const form = document.getElementById("puzzleForm");
const surprise = document.getElementById("surprise");
const feedback = document.getElementById("feedback");

const normalize = (value) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const answers = {
  q1: normalize("Gökkuşağı"),
  q2: normalize("çişli bokum")
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const q1 = normalize(document.getElementById("q1").value);
  const q2 = normalize(document.getElementById("q2").value);

  const isCorrect = q1 === answers.q1 && q2 === answers.q2;

  if (isCorrect) {
    feedback.textContent = "Kilit açıldı. Sürpriz mesaj burada ❤️";
    feedback.className = "feedback ok";
    surprise.classList.remove("hidden");
    form.querySelector("button").disabled = true;
  } else {
    feedback.textContent = "Bir cevap yanlış gibi. Bir daha dene.";
    feedback.className = "feedback err";
    surprise.classList.add("hidden");
  }
});
