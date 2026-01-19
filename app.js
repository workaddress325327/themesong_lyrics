const player = document.getElementById("player");
const box = document.getElementById("lyrics");

async function loadLyrics() {
  const res = await fetch("./lyrics/lyrics.json");
  return await res.json();
}

function render(lyrics) {
  box.innerHTML = "";
  lyrics.forEach((line) => {
    const div = document.createElement("div");
    div.className = "line";
    div.textContent = line.text;
    box.appendChild(div);
  });
}

function updateActive(lyrics, time) {
  let idx = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].start <= time) idx = i;
    else break;
  }

  [...box.children].forEach((el, i) => {
    el.classList.toggle("active", i === idx);
  });

  box.children[idx]?.scrollIntoView({ block: "center", behavior: "smooth" });
}

(async function () {
  const lyrics = await loadLyrics();
  render(lyrics);

  player.addEventListener("timeupdate", () => {
    updateActive(lyrics, player.currentTime);
  });
})();
