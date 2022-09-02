const { log } = console;

const drawField = document.querySelector("div.grid-window");

drawField.addEventListener("mousedown", onmousedown);

function onmousedown() {
  window.addEventListener("mousemove", onmousemove);
  window.addEventListener("mouseup", onmouseup);
}

function onmouseup() {
  this.removeEventListener("mousemove", onmousemove);
  this.removeEventListener("mouseup", onmouseup);
}

function onmousemove(e) {
  const pixel = e.target;
  const check = [...pixel.classList];
  if (!check.includes("item")) return;
  setTargetColor(pixel, 100, 100, 100);
}

function createDrawField(x, y) {
  if (x !== y || x > 60 || x < 1) return;
  const total = x * y;
  drawField.setAttribute(
    "style",
    `grid-template-columns: repeat(${x}, 1fr); grid-template-rows: repeat(${y}, 1fr);`
  );
  for (let i = 1; i <= total; i++) {
    const item = document.createElement("div");
    item.classList.add(`item${i}`, `item`, `border-bottom-right`);
    drawField.appendChild(item);
  }
}

function setTargetColor(target, r, g, b) {
  target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

createDrawField(60, 60);
//setTargetColor(document.querySelector(".item25"), 67, 114, 156);
