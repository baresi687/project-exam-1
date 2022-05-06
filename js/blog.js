const blogPostsContainer = document.querySelector(".blog-posts-container");
const url = "https://hreinngylfason.site/projectexam/wp-json/wp/v2/posts?_embed&per_page=12";
const viewMoreButton = document.querySelector(".view-more-btn button");

getListPosts(blogPostsContainer, url, getBlogs);

viewMoreButton.onclick = () => {
  getListPosts(blogPostsContainer, url, getBlogs);
}
