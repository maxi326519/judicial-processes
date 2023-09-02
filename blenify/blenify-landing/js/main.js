// Navbar menu variables
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
let menuOpen = false;

// Productivity variables
const withBtn = document.getElementById("btn-with");
const withoutBtn = document.getElementById("btn-without");
const withpanel = document.getElementById("with-data");
const withoutpanel = document.getElementById("without-data");

console.log(menuBtn);
console.log(withBtn);
console.log(withoutBtn);
console.log(withpanel);
console.log(withoutpanel);

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    menu.classList.add("active");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    menu.classList.remove("active");
    menuOpen = false;
  }
  console.log(menuOpen);
});

withBtn.addEventListener("click", () => {
  withpanel.classList.add("productivity__active");
  withoutpanel.classList.remove("productivity__active");
  withBtn.classList.add("productivity__btn__active");
  withoutBtn.classList.remove("productivity__btn__active");
  console.log(1);
});

withoutBtn.addEventListener("click", () => {
  withoutpanel.classList.add("productivity__active");
  withpanel.classList.remove("productivity__active");
  withoutBtn.classList.add("productivity__btn__active");
  withBtn.classList.remove("productivity__btn__active");
  console.log(2);
});
