document.addEventListener('DOMContentLoaded', (e) => {
  let body = document.querySelector("body");
  let nav = document.querySelector("nav");
  let img = document.querySelector(".header__image");
  let h1 = document.querySelector(".header .title");
  body.classList.add("active");
  img.classList.add("active");
  nav.classList.add("active");
  h1.classList.add("active");
} )