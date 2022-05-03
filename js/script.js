const navigationMenu = document.querySelector(".navigation");
const hamburgerIcon = document.querySelector(".hamburger-menu");

hamburgerIcon.onclick = () => {
  navigationMenu.classList.toggle("show-menu")
  if (navigationMenu.classList.contains("show-menu")) {
    hamburgerIcon.classList.remove("fa", "fa-bars");
    hamburgerIcon.classList.add("fa-solid", "fa-x");
  } else {
    hamburgerIcon.classList.remove("fa-solid", "fa-x");
    hamburgerIcon.classList.add("fa", "fa-bars");
  }
}
