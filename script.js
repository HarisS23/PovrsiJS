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

    const orbitRadiusX = screenWidth / 3;
    const orbitRadiusY = screenHeight / 6;

    function createStars() {
      for (let i = 0; i < 100; i++) {
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
    let baseSpeed = 0.03; 
    let direction = 1; 

    function update() {
      const xPos = centerX + orbitRadiusX * Math.cos(angle);
      const yPos = centerY + orbitRadiusY * Math.sin(angle);

      const depthFactor = Math.sin(angle); 
      const scaleFactor = 1 + 0.6 * depthFactor;
      
      const scaleX = scaleFactor; 
      const scaleY = scaleFactor; 

      const speedFactor = scaleX; 

      planet.style.left = `${xPos - planet.offsetWidth / 2}px`;
      planet.style.top = `${yPos - planet.offsetHeight / 2}px`;
      planet.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`;

      shadow.style.left = `${xPos - shadow.offsetWidth / 2}px`;
      shadow.style.top = `${yPos + planet.offsetHeight / 2}px`;
      
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

    update();