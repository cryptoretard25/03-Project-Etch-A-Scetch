const { log } = console;
let x = 0;
const canvas = document.querySelector("div.grid-window");
const leftMenu = document.querySelector(".left-menu");

createCanvas();

canvas.addEventListener("mousedown", onmousedown);
leftMenu.addEventListener("input", handleInputs);
leftMenu.addEventListener("mousedown", handleClicks);

// canvas handlers
function onmousedown(e) {
  e.preventDefault();
  const btnRainbow = document.querySelector(".rainbow-mode");
  const btnShadow = document.querySelector(".shadow-mode");
  if (btnRainbow.classList.contains("btn-active")) {
    window.addEventListener("mouseout", rainbow);
  } else if (btnShadow.classList.contains("btn-active")) {
    window.addEventListener("mouseout", shadow);
  } else {
    window.addEventListener("mousemove", onmousemove);
  }
  window.addEventListener("mouseup", onmouseup);
}

function rainbow(e) {
  e.preventDefault();
  e.stopPropagation();
  const target = e.target;
  if (target.classList.contains("item")) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    target.style.backgroundColor = `#${randomColor}`;
  }
}

function shadow(e) {
  e.preventDefault();
  e.stopPropagation();
  const target = e.target;
  if (target.classList.contains("item")) {
    const pencolor = document.querySelector(".pen-color");
    if (target.style.opacity) {
      if (target.style.opacity >= 1) return;
      target.style.opacity = +target.style.opacity + 0.1;
      log(target.style.opacity);
    } else {
      const color = pencolor.value;
      Object.assign(target.style, {
        opacity: "0.1",
        "background-color": `${color}`,
      });
    }
  }
}

function onmouseup() {
  this.removeEventListener("mousemove", onmousemove);
  this.removeEventListener("mouseup", onmouseup);
  this.removeEventListener("mouseout", rainbow);
  this.removeEventListener("mouseout", shadow);
}

function onmousemove(e) {
  e.preventDefault();
  const pixel = e.target;
  if (pixel.classList.contains("item")) {
    const pencolor = document.querySelector(".pen-color");
    const color = pencolor.value;
    pixel.style.backgroundColor = `${color}`;
  }
}

// left menu handlers
function handleInputs(e) {
  if (e.target.classList.contains("canvas-color")) {
    const value = e.target.value;
    canvas.style.backgroundColor = value;
  }
  if (e.target.classList.contains("slider")) {
    e.preventDefault();
    canvas.replaceChildren();
    const sliderValue = e.target.value;
    createCanvas(sliderValue);
  }
}

function handleClicks(e) {
  const button = e.target;
  if (button.classList.contains("button")) {
    button.classList.add("btn-clicked");
    button.addEventListener("transitionend", function (e) {
      if (e.propertyName !== "transform") return;
      button.classList.remove("btn-clicked");
    });
  }
  if (button.classList.contains("rainbow-mode")) {
    if (!button.classList.contains("btn-active")) {
      button.classList.add("btn-active");
      button.nextElementSibling.classList.remove("btn-active");
      log("added");
    } else {
      button.classList.remove("btn-active");
      log("removed");
    }
  }
  if (button.classList.contains("shadow-mode")) {
    if (!button.classList.contains("btn-active")) {
      button.classList.add("btn-active");
      button.previousElementSibling.classList.remove("btn-active");
      log("added");
    } else {
      button.classList.remove("btn-active");
      log("removed");
    }
  }
}

// helper functions
function createCanvas(x = 16) {
  if (x > 60 || x < 1) return;

  const slider = document.querySelector(".slider");
  const current = document.querySelectorAll(".current-value");
  current[0].textContent = slider.value;
  current[1].textContent = slider.value;
  const total = Math.pow(x, 2);
  canvas.setAttribute(
    "style",
    `grid-template-columns: repeat(${x}, 1fr); grid-template-rows: repeat(${x}, 1fr);`
  );
  for (let i = 1; i <= total; i++) {
    const item = document.createElement("div");
    item.classList.add(`item${i}`, `item`, `border-bottom-right`);
    canvas.appendChild(item);
  }
}
