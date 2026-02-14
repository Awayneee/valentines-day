const form = document.getElementById("puzzleForm");
const surprise = document.getElementById("surprise");
const feedback = document.getElementById("feedback");

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
  q1: ["gokkusagi", "gokkusagi", "gok kusagi"],
  q2: ["cisli bokum"]
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const q1 = normalize(document.getElementById("q1").value).replace(/\s/g, "");
  const q2 = normalize(document.getElementById("q2").value);

  const isQ1Correct = acceptedAnswers.q1.includes(q1);
  const isQ2Correct = acceptedAnswers.q2.includes(q2);

  if (isQ1Correct && isQ2Correct) {
    feedback.textContent = "Kilit açıldı. Sürpriz mesaj burada ❤️";
    feedback.className = "feedback ok";
    surprise.classList.remove("hidden");
    form.querySelector("button").disabled = true;
  } else {
    feedback.textContent = "Cevaplardan biri yanlış. Tekrar dene.";
    feedback.className = "feedback err";
    surprise.classList.add("hidden");
  }
});
