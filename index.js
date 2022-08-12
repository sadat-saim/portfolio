const $$ = (s) => Array.prototype.slice.call(document.querySelectorAll(s));
const isEl = (obj) => obj instanceof HTMLElement;
const isStr = (obj) =>
  Object.prototype.toString.call(obj) === "[object String]";

const cursorDot = ({
  zIndex = 1,
  diameter = 80,
  borderWidth = 1,
  borderColor = "#ddd",
  easing = 4,
  background = "transparent",
} = {}) => {
  let inited = false;
  const alt = { x: 0, y: 0, o: 1, d: diameter };
  const cur = { x: 0, y: 0, o: 0, d: diameter };
  const dot = document.createElement("div");
  const tim = easing / 15;
  dot.style = `position:fixed;top:0;left:0;border-radius:100%;pointer-events:none;opacity:0;z-index:${zIndex};height:${diameter}px;width:${diameter}px;background:${background};border:${borderWidth}px solid ${borderColor};mix-blend-mode:exclusion;transition:background ${tim}s,border ${tim}s;will-change:transform`;

  document.addEventListener("mousemove", (e) => {
    alt.x = e.clientX;
    alt.y = e.clientY;
    dot.style.opacity = 1;
    if (!inited) {
      document.body.append(dot);
      cur.x = alt.x;
      cur.y = alt.y;
      inited = true;
      draw();
    }
  });

  const draw = () => {
    const dX = alt.x - cur.x;
    const dY = alt.y - cur.y;
    cur.x += dX / easing;
    cur.y += dY / easing;
    const t3d = `translate3d(${cur.x - cur.d / 2}px,${cur.y - cur.d / 2}px,0)`;
    dot.style.webkitTransform = t3d;
    dot.style.transform = t3d;

    const dO = alt.o - cur.o;
    cur.o += dO / easing;
    dot.style.opacity = cur.o;

    const dD = alt.d - cur.d;
    cur.d += dD / easing;
    dot.style.height = cur.d + "px";
    dot.style.width = cur.d + "px";

    try {
      requestAnimationFrame(draw);
    } catch (_) {
      setImmediate(draw);
    }
  };

  dot.over = (any, style) => {
    const fn = (el) => {
      el.addEventListener("mouseover", (_) => {
        if (style.background) dot.style.backgroundColor = style.background;
        if (style.borderColor) dot.style.borderColor = style.borderColor;
        if (style.scale) alt.d = diameter * style.scale;
      });
      el.addEventListener("mouseout", (_) => {
        if (style.background) dot.style.backgroundColor = background;
        if (style.borderColor) dot.style.borderColor = borderColor;
        if (style.scale) alt.d = diameter;
      });
    };
    if (isEl(any)) fn(any);
    else if (isStr(any)) $$(any).forEach(fn);
  };

  return dot;
};

//The code above is not mine
//owner of this code https://github.com/gaoryrt/cursor-dot
//All codes below are mine
const screenWidth = screen.width;
//Cursor only works on screen larger than 701px
if (screenWidth > 701) {
  const secondaryColor = "#393E46";
  //cursorDot options
  const cursor = cursorDot({
    diameter: 80,
    // border width
    borderWidth: 1,
    // border color
    borderColor: `${secondaryColor}`,
    easing: 4,
  });

  let classList = [
    ".name",
    ".section-title",
    ".my-skills",
    ".projects",
    ".contact-heading",
    ".copyright",
  ];

  for (classes in classList) {
    cursor.over(classList[classes], {
      scale: 1.4,
      background: `${secondaryColor}`,
    });
  }

  cursor.over(".hero-section", {
    scale: 1.4,
    background: `${secondaryColor}`,
  });
}

//scroll progress bar
const Progress1 = document.getElementById("scroll-progress1");
const Progress2 = document.getElementById("scroll-progress2");

function scrollProgress(progress) {
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight -
    20;

  window.addEventListener("scroll", () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    progress.style.height = `calc(${(scrollTop / height) * 100}%)`;
  });
}
scrollProgress(Progress1);
scrollProgress(Progress2);

//skills section animation
//getBoundingClientRect not work with getElementByClassName
//intersection obserber api = learn more about it.
//height is the height of the document
const height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
const skillSection = document.querySelector(".skills-section");
window.addEventListener(
  "scroll",
  function () {
    const elementPosition = skillSection.getBoundingClientRect().top;
    //position ===0 when reaches top of the element
    let position = (2 * (elementPosition / height)).toFixed(2);
    // console.log(position);
    if (position < 0.2) {
      const classArr = ["one", "two", "three", "four", "five", "six"];
      const hidden = document.querySelectorAll(".hidden");
      hidden.forEach((element, i) => {
        element.classList.replace("hidden", classArr[i]);
      });
      //add grow animation to the skill-card reaching scroll position
      const skillCard = document.querySelectorAll(".skill-card");
      skillCard.forEach((element, i) => {
        element.classList.replace("dummy", "grow");
      });
    }
  },
  false
);

//Dark mode toggle
const mode = document.querySelector(".toggleMode");
let root = document.documentElement;
let darkMode = false;
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  // dark mode
  darkMode = true;
  mode.addEventListener("click", changeMode);
}
mode.addEventListener("click", changeMode);

function changeMode(mode) {
  if (darkMode) {
    darkMode = false;
    root.style.setProperty("--background-color", "#FDF6EC");
    root.style.setProperty("--text-color", "#3C2C3E");
    root.style.setProperty("--primary-color", "#a42ce9");
    root.style.setProperty("--secondary-color", "#fcba28");
  } else {
    darkMode = true;
    root.style.setProperty("--background-color", "#000");
    root.style.setProperty("--text-color", "#FFF");
    root.style.setProperty("--primary-color", "#fcba28");
    root.style.setProperty("--secondary-color", "#a42ce9");
  }
}

// alert("Use Dark Mode for Better User Experience");
