const answers = {
  q1: "haziran",
  q2: "waffle",
  q3: "papatyam"
};

const form = document.getElementById("puzzleForm");
const surprise = document.getElementById("surprise");
const feedback = document.getElementById("feedback");

const normalize = (value) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const q1 = normalize(document.getElementById("q1").value);
  const q2 = normalize(document.getElementById("q2").value);
  const q3 = normalize(document.getElementById("q3").value);

  const isCorrect = q1 === answers.q1 && q2 === answers.q2 && q3 === answers.q3;

  if (isCorrect) {
    feedback.textContent = "Kilit açıldı. Seni çok seviyorum ❤️";
    feedback.className = "feedback ok";
    surprise.classList.remove("hidden");
    form.querySelector("button").disabled = true;
  } else {
    feedback.textContent = "Bir iki cevap yanlış olabilir. İpucu: Tatlı cevap tek kelime.";
    feedback.className = "feedback err";
    surprise.classList.add("hidden");
  }
});
