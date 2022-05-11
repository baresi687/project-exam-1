const arrowLeft = document.querySelector(".fa-angle-left");
const arrowRight = document.querySelector(".fa-angle-right");
const scrollValue = document.querySelector(".posts")
const dots = document.querySelectorAll(".dots");

let slideIndex = 0;

activeDot(slideIndex);

arrowLeft.onclick = () => {
  scrollValue.scrollLeft -= 832;
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = 2;
    scrollValue.scrollLeft = 1664;
  }
  activeDot(slideIndex);
}

arrowRight.onclick = () => {
  scrollValue.scrollLeft += 832;
  slideIndex++;
  if (slideIndex > 2) {
    slideIndex = 0;
    scrollValue.scrollLeft = 0;
  }
  activeDot(slideIndex);
}

function activeDot(index) {
  dots.forEach((item) => {
    item.classList.remove("active");
  })
  dots[index].classList.add("active");
}

const postsContainer = document.querySelector(".posts");
const url = "https://hreinngylfason.site/projectexam/wp-json/wp/v2/posts?_embed&per_page=12";

getListPosts(postsContainer, url, getLatestBlogs);
