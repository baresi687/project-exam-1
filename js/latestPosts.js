const arrowLeft = document.querySelector(".fa-angle-left");
const arrowRight = document.querySelector(".fa-angle-right");
const scrollValue = document.querySelector(".posts")

arrowLeft.onclick = () => {
  scrollValue.scrollLeft -= 832;
}

arrowRight.onclick = () => {
  scrollValue.scrollLeft += 832;
}

const postsContainer = document.querySelector(".posts");
const url = "https://hreinngylfason.site/projectexam/wp-json/wp/v2/posts?_embed&per_page=12";

getListPosts(postsContainer, url, getLatestBlogs);
