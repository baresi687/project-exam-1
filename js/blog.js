import {getListPosts} from "./listApiFunction.js";

const blogPostsContainer = document.querySelector(".blog-posts-container");
const url = "https://hreinngylfason.site/projectexam/wp-json/wp/v2/posts?_embed&per_page=12";
const viewMoreButton = document.querySelector(".view-more-btn button");

getListPosts(blogPostsContainer, url, getBlogs, sortByComments, sortByName);

viewMoreButton.onclick = () => {
  getListPosts(blogPostsContainer, url, getBlogs, sortByComments, sortByName);
}

function sortByComments(a, b) {
  if (a._embedded.replies && b._embedded.replies) {
    return b._embedded.replies[0].length - a._embedded.replies[0].length;
  } else {
    return !a._embedded.replies ? 1 : -1 && !b._embedded.replies ? -1 : 1
  }
}

function sortByName(a, b) {
  return a.title.rendered > b.title.rendered ? 1 : -1
}

function getBlogs(itemId, thumbnail, altText, heading, excerpt) {
  return `<a href="./single-blog.html?id=${itemId}">
            <div class="blog-posts-element">
              <div>
                <img src="${thumbnail}" alt="${altText}" class="img-width-100">
              </div>
              <div>
                <h2>${heading}</h2>
                ${excerpt}
                <button class="button button-transparent">Read More</button>
              </div>
            </div>
          </a>`
}
