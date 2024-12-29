const planet = document.getElementById('planet');
const shadow = document.getElementById('shadow');
const centerDot = document.getElementById('center-dot');
const screen = document.getElementById('screen');
const toggleButton = document.getElementById('toggle-button');
const speedUpButton = document.getElementById("speed-up-button");
const slowDownButton = document.getElementById("slow-down-button");
const sizeUpButton = document.getElementById("size-up-button");
const sizeDownButton = document.getElementById("size-down-button");
const sfera = document.getElementById("sfera");
const elipsoid = document.getElementById("elipsoid");
const konus = document.getElementById("konus");
const cilindar = document.getElementById("cilindar");
const restart = document.getElementById("restartBtn");
const dontClick = document.getElementById("dontClickBtn");
const startBtn = document.getElementById("startBtn");

function changePlanetShape(shape) {
  let computedStyles = getComputedStyle(shape);

  for (let i = 0; i < computedStyles.length; i++) {
    let styleName = computedStyles[i];
    planet.style[styleName] = computedStyles.getPropertyValue(styleName);
  }
}

sfera.addEventListener('click', () => { changePlanetShape(sfera) });
elipsoid.addEventListener('click', () => { changePlanetShape(elipsoid) });
konus.addEventListener('click', () => { changePlanetShape(konus) });
cilindar.addEventListener('click', () => { changePlanetShape(cilindar) });

const screenWidth = screen.offsetWidth;
const screenHeight = screen.offsetHeight;

const centerX = screenWidth / 2;
const centerY = screenHeight / 2;

let orbitRadiusX = screenWidth / 3;
let orbitRadiusY = screenHeight / 6;

function createStars() {
  for (let i = 0; i < 300; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const x = Math.random() * screenWidth;
    const y = Math.random() * screenHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    screen.appendChild(star);
  }
}

createStars();

let angle = 1;
let baseSpeed = 0.02; 
let direction = 1; 

function update() {
  const xPos = centerX + orbitRadiusX * Math.cos(angle);
  const yPos = centerY + orbitRadiusY * Math.sin(angle);

  const depthFactor = Math.sin(angle); 
  const scaleFactor = 1 + 0.6 * depthFactor;
  
  const scaleX = scaleFactor; 
  const scaleY = scaleFactor; 

  const speedFactor = scaleFactor; 

  planet.style.left = `${xPos - planet.offsetWidth / 2}px`;
  planet.style.top = `${yPos - planet.offsetHeight / 2}px`;
  planet.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`;
  
  angle += baseSpeed * speedFactor * direction; 

  requestAnimationFrame(update);
}

toggleButton.addEventListener('click', () => {
  direction = -direction; 
});

speedUpButton.addEventListener('click', () => {
  baseSpeed += 0.01;
});

slowDownButton.addEventListener('click', () => {
  if(baseSpeed > 0){
    baseSpeed -= 0.01;
  }
});

sizeUpButton.addEventListener('click', () => {
  const scaleFactor = 1.1; 

  const currentWidth = planet.offsetWidth;
  const currentHeight = planet.offsetHeight;

  const newWidth = currentWidth * scaleFactor;
  const newHeight = currentHeight * scaleFactor;

  planet.style.width = `${newWidth}px`;
  planet.style.height = `${newHeight}px`;
});

sizeDownButton.addEventListener('click', () => {
  const scaleFactor = 0.9; 

  const currentWidth = planet.offsetWidth;
  const currentHeight = planet.offsetHeight;

  const newWidth = currentWidth * scaleFactor;
  const newHeight = currentHeight * scaleFactor;

  planet.style.width = `${newWidth}px`;
  planet.style.height = `${newHeight}px`;
});

restart.addEventListener('click', () => {
  location.reload();
});

let isDisappearing = false; 

dontClick.addEventListener('click', () => {
  if (!isDisappearing) {
    isDisappearing = true; 

    const disappearInterval = setInterval(() => {
      const randomNum = Math.random() * 0.1 + 1.01; 
      orbitRadiusX *= randomNum;
      orbitRadiusY *= randomNum;

      baseSpeed += 0.002; 

      const xPos = centerX + orbitRadiusX * Math.cos(angle);
      const yPos = centerY + orbitRadiusY * Math.sin(angle);

      if (xPos < -1000 || xPos > screenWidth + 1000 || yPos < -1000 || yPos > screenHeight + 1000) {
        clearInterval(disappearInterval); 
        planet.style.display = 'none'; 
        shadow.style.display = 'none'; 
        isDisappearing = false; 
      }
    }, 50); 
  }
});

startBtn.addEventListener('click', () => {
  document.getElementById("startMenu").style.display = 'none';
  document.getElementById("wrapper").style.filter = 'blur(0px)';
  update();
})