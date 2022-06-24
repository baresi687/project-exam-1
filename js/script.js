const navigationMenu = document.querySelector(".navigation");
const hamburgerIcon = document.querySelector(".hamburger-menu");
const footer = document.querySelector("footer");
const scrollToTop = document.createElement("div");
const observeFooter = new IntersectionObserver(footerIntersecting, ({threshold: 0.7}));

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

window.addEventListener("click", function (event) {
  if (event.target !== navigationMenu && event.target !== hamburgerIcon && navigationMenu.classList.contains("show-menu")) {
    navigationMenu.classList.remove("show-menu")
    hamburgerIcon.classList.remove("fa-solid", "fa-x");
    hamburgerIcon.classList.add("fa", "fa-bars");
  }
})

scrollToTop.classList.add("scroll-to-top");
scrollToTop.setAttribute("title", "Go to top")
scrollToTop.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
footer.appendChild(scrollToTop)
scrollToTop.onclick = (() => window.scrollTo({top: 0}))

observeFooter.observe(footer);

function footerIntersecting(entries) {
  entries.forEach((entry) => {
    entry.isIntersecting ?
        scrollToTop.classList.add("show-scroll-to-top") : scrollToTop.classList.remove("show-scroll-to-top")
  })
}
