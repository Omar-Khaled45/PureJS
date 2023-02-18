// Check Color In Local Storage
let mainColor = localStorage.getItem("color");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".color-list li").forEach((e) => {
    // Remove Active Class From Color List
    e.classList.remove("active");

    // Add Active Class To Color in Local Storage
    if (e.dataset.color === mainColor) {
      e.classList.add("active");
    }
  });
}

// Random Background Option Variables
let backgroundOpt = true;
let backgroundInterval;

// Switch Random Background Option
const randomOpts = document.querySelectorAll(".random-bg span");

// Select Landing Page
const landing = document.querySelector(".landing");

// Check Background Option In Local Storage
let background_option = localStorage.getItem("random_background");

if (background_option !== null) {
  randomOpts.forEach((e) => {
    // Remove Active Class From All Spans
    e.classList.remove("active");
  });

  if (background_option === "yes") {
    backgroundOpt = true;

    // Add Active Class To Clicked Span
    document.querySelector(".random-bg .yes").classList.add("active");
  } else {
    backgroundOpt = false;

    // Add Active Class To Clicked Span
    document.querySelector(".random-bg .no").classList.add("active");

    landing.style.backgroundImage = `${localStorage.getItem(
      "current_background"
    )}`;
  }
}

// Show Or Hide Bullets Option
let bulletsOpts = document.querySelectorAll(".show-bullets span");

let bulletsContainer = document.querySelector(".bullets-container");

// Check Show Bullets Option In Local Storage
let bullet_option = localStorage.getItem("bullet_option");

if (bullet_option !== null) {
  bulletsOpts.forEach((e) => {
    // Remove Active Class From All Spans
    e.classList.remove("active");
  });

  if (bullet_option === "show") {
    // Add Active Class To Clicked Span
    document.querySelector(".show-bullets .yes").classList.add("active");

    // Remove Hide Class From Bullets Container
    bulletsContainer.classList.remove("hide");
  } else {
    // Add Active Class To Clicked Span
    document.querySelector(".show-bullets .no").classList.add("active");

    // Add Hide Class From Bullets Container
    bulletsContainer.classList.add("hide");
  }
}

// Click On Toggle Menu Button
document.querySelector(".burger-btn").addEventListener("click", () => {
  document.querySelector(".links").classList.toggle("open");
  document.querySelector(".burger-btn").classList.toggle("active");
});

// Switch Colors
let colors = document.querySelectorAll(".settings .option-box .color-list li");
colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color To Local Storage
    localStorage.setItem("color", e.target.dataset.color);

    active(e);
  });
});

randomOpts.forEach((span) => {
  span.addEventListener("click", (e) => {
    active(e);

    if (e.target.dataset.background === "yes") {
      backgroundOpt = true;
      randomizeImg();

      // Set Background Option To Local Storage
      localStorage.setItem("random_background", e.target.dataset.background);

      // Set Current Background To Local Storage
      localStorage.setItem("current_background", landing.style.backgroundImage);
    } else {
      backgroundOpt = false;
      clearInterval(backgroundInterval);

      // Set Background Option To Local Storage
      localStorage.setItem("random_background", e.target.dataset.background);

      // Set Current Background To Local Storage
      localStorage.setItem("current_background", landing.style.backgroundImage);
    }
  });
});

bulletsOpts.forEach((span) => {
  span.addEventListener("click", (e) => {
    active(e);

    if (span.dataset.bullet === "show") {
      // Remove Hide Class From Bullets Container
      bulletsContainer.classList.remove("hide");

      // Set Bullets Option To Local Storage
      localStorage.setItem("bullet_option", span.dataset.bullet);
    } else {
      // Add Hide Class From Bullets Container
      bulletsContainer.classList.add("hide");

      // Set Bullets Option To Local Storage
      localStorage.setItem("bullet_option", span.dataset.bullet);
    }
  });
});

// Change Background
const imgsArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Randomize Image Function
function randomizeImg() {
  if (backgroundOpt === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let rand = Math.floor(Math.random() * imgsArr.length);

      landing.style.backgroundImage = `url(../images/${imgsArr[rand]})`;
    }, 1000);
  }
}

randomizeImg();

// Skill Progress
const skillsSec = document.querySelector(".skills");
const progressBars = document.querySelectorAll(
  ".skills .skill .skill-progress span"
);

window.addEventListener("scroll", () => {
  if (window.scrollY >= skillsSec.offsetTop - 200) {
    progressBars.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
});

// Go To Section Through Nav Bar Links
let links = document.querySelectorAll(".landing .list-unstyled li a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    window.scrollTo(0, document.querySelector(link.dataset.section).offsetTop);
    document.querySelector(".links").classList.toggle("open");
    document.querySelector(".burger-btn").classList.toggle("active");
  });
});

// Go To Section Through Nav Bullets
let bullets = document.querySelectorAll(".bullet");
bullets.forEach((bullet) => {
  bullet.addEventListener("click", () => {
    window.scrollTo(
      0,
      document.querySelector(bullet.dataset.section).offsetTop
    );
  });
});

// Setting Box Toggle
let toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => {
  document.querySelector(".toggle i").classList.toggle("fa-spin");
  document.querySelector(".settings").classList.toggle("open");
});

// Image Pop-up
let imgs = document.querySelectorAll(".gallery .img-container img");

imgs.forEach((img) => {
  img.addEventListener("click", () => {
    // Create Pop-up Overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Create Image Pop-up
    let popUp = document.createElement("div");
    popUp.className = "popup-box";

    let boxHeader = document.createElement("h3");
    boxHeader.textContent = `Image ${img.alt}`;
    popUp.append(boxHeader);

    // Create Image Element
    let selectedImg = document.createElement("img");
    selectedImg.src = img.src;
    popUp.append(selectedImg);

    // Create Close Button
    let close = document.createElement("div");
    close.innerHTML = '<i class="fa-solid fa-x"></i>';
    close.className = "close";
    popUp.append(close);

    close.addEventListener("click", () => {
      overlay.remove();
      popUp.remove();
    });

    overlay.addEventListener("click", () => {
      overlay.remove();
      popUp.remove();
    });

    // Append Pop-up Box
    document.body.appendChild(popUp);
  });
});

function active(ev) {
  // Remove Active Class From All Colors
  ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });

  // Add Active Class To Clicked Colors
  ev.target.classList.add("active");
}

// Reset Option
document.querySelector(".reset").addEventListener("click", () => {
  // Clear Local Storage
  localStorage.removeItem("color");
  localStorage.removeItem("random_background");
  localStorage.removeItem("current_background");
  localStorage.removeItem("bullet_option");

  // Reload
  window.location.reload();
});
