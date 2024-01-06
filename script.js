function init() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

init();

const cursor = document.getElementById("custom-cursor");
const cursorLittle = document.getElementById("little-cursor");
const links = document.querySelectorAll("#pic");

const springStrength = 0.003;
const springFriction = 0.1;
const springSpeed = 0.5;

const scaleTarget = 1.5;
const scaleSpeed = 0.05;
const scaleStrength = 0.15;
const scaleFriction = 0.5;

const cursorSize = 50;
const cursorLittleSize = 5;

let cursorX = 0;
let cursorY = 0;
let actualX = 0;
let actualY = 0;
let velocityX = 0;
let velocityY = 0;
let scale = 1;
let scaleVelocity = 0;
let scaleSpring = 0;
let isHoveringLink = false;

window.addEventListener("mousemove", updateCursorPosition);

function updateCursorPosition(event) {
  cursorX = event.clientX;
  cursorY = event.clientY;
}

links.forEach((link) => {
  link.addEventListener("mouseenter", handleLinkHover);
  link.addEventListener("mouseleave", handleLinkLeave);
});

function handleLinkHover() {
  isHoveringLink = true;
}

function handleLinkLeave() {
  isHoveringLink = false;
}

function animateCursor() {
  const dx = cursorX - cursorSize / 2 - actualX - 1;
  const dy = cursorY - cursorSize / 2 - actualY - 1;

  const forceX = dx * springStrength;
  const forceY = dy * springStrength;

  velocityX += (forceX - velocityX * springFriction) * springSpeed;
  velocityY += (forceY - velocityY * springFriction) * springSpeed;

  actualX += velocityX;
  actualY += velocityY;

  cursor.style.transform = `translate(${Math.round(actualX)}px, ${Math.round(
    actualY
  )}px) scale(${Math.round(scale * 100) / 100})`;

  if (isHoveringLink) {
    const scaleDistance = scaleTarget - scale;
    scaleVelocity = scaleDistance * scaleSpeed;
    scaleSpring += scaleVelocity * scaleStrength;
    cursor.style.backgroundColor = "white";
    cursor.style.mixBlendMode = "difference";
  } else {
    const scaleDistance = 1 - scale;
    scaleVelocity = scaleDistance * scaleSpeed;
    scaleSpring += scaleVelocity * scaleStrength;
    cursor.style.backgroundColor = "transparent";
    cursor.style.mixBlendMode = "none";
  }

  scale += scaleVelocity + scaleSpring;
  scaleVelocity *= scaleFriction;

  requestAnimationFrame(animateCursor);
}

function animateCursorLittle() {
  const targetX = cursorX - cursorLittleSize / 2;
  const targetY = cursorY - cursorLittleSize / 2;

  const startX = parseFloat(cursorLittle.style.left) || targetX;
  const startY = parseFloat(cursorLittle.style.top) || targetY;

  const dx = targetX - startX;
  const dy = targetY - startY;

  const newX = startX + dx;
  const newY = startY + dy;

  cursorLittle.style.transform = `translate(${newX}px, ${newY}px)`;

  requestAnimationFrame(animateCursorLittle);
}

animateCursorLittle();
animateCursor();

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    start: "top 27%",
    end: "top 0",
    scrub: 3,
  },
});

tl.to(
  ".page1 h1",
  {
    x: -150,
  },
  "anim"
);

tl.to(
  ".page1 h2",
  {
    x: 150,
  },
  "anim"
);

tl.to(
  ".page1 img",
  {
    width: "50%",
  },
  "anim"
);

var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    start: "top -90%",
    end: "top -120%",
    scrub: 3,
  },
});
tl2.to(".main", {
  backgroundColor: "#fff",
});

var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    start: "top -170%",
    end: "top -210%",
    scrub: 3,
  },
});

tl3.to(
  ".main",
  {
    backgroundColor: "#001459",
  },
  "same"
);

var tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    start: "top -200%",
    end: "top -210%",
    scrub: 3,
  },
});

tl4.fromTo(".pic1", 2, { opacity: 0, x: -150 }, { opacity: 1, x: 15 }, "same");
tl4.fromTo(".pic2", 2, { opacity: 0, x: 50 }, { opacity: 1, x: -15 }, "same");

var boxes = document.querySelectorAll(".box");
boxes.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    var att = elem.getAttribute("data-image");
    cursor.style.width = "300px";
    cursor.style.height = "250px";
    cursor.style.borderRadius = "0px";
    cursor.style.backgroundImage = `url(${att})`;
    cursor.style.mixBlendMode = "normal";
  });
  elem.addEventListener("mouseleave", function () {
    cursor.style.width = cursorSize + "px";
    cursor.style.height = cursorSize + "px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundImage = "none";
    cursor.style.backgroundColor = "transparent";
    cursor.style.mixBlendMode = "difference";
  });
});
var images = document.querySelectorAll("#imgt");

images.forEach(function (image) {
  image.addEventListener("mouseenter", function () {
    this.style.filter = "blur(0)";
  });
});
