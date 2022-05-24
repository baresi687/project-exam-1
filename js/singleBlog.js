import {displayMessage} from "./components/message.js";
import {checkLength, validateEmail, validateString} from "./components/validation.js";

const param = new URLSearchParams(window.location.search);
const blogId = param.get("id")
const url = `https://hreinngylfason.site/projectexam/wp-json/wp/v2/posts/${blogId}?_embed`;
const singleBlogContainer = document.querySelector(".single-blog-container");

async function getSingleBlogPost() {

  singleBlogContainer.innerHTML += `<div class="loader"></div>`;

  try {
    const response = await fetch(url);
    const responseJSON = await response.json();

    const heading = responseJSON.title.rendered;
    const author = responseJSON._embedded.author[0].name;
    const formattedDate = formatWpDate(responseJSON.date);
    const imageFull = responseJSON._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    const altText = responseJSON._embedded["wp:featuredmedia"][0].alt_text;
    const singleBlogContent = responseJSON.content.rendered;

    document.querySelectorAll(".single-blog-title").forEach((element) => {
      element.innerHTML += heading
    })
    document.querySelector(".blog-author-date").innerText = `By ${author} on ${formattedDate}`;

    singleBlogContainer.innerHTML = `<div class="single-blog-img">
                                       <div class="featured-img">
                                         <img src="${imageFull}" alt="${altText}" class="blog-img img-width-100">
                                       </div>                                                           
                                     </div>
                                     <div class="single-blog-content">
                                       ${singleBlogContent}
                                       <span class="author-signed">- ${author}</span>
                                     </div>`

    if (responseJSON._embedded.replies) {
      const comments = responseJSON._embedded.replies[0];

      comments.forEach((item) => {
        const commentDate = formatWpDate(item.date)
        commentsContainer.innerHTML += `<div class="single-comment">
                                          <strong>${item.author_name} </strong>on <span>${commentDate}</span>
                                           ${item.content.rendered}
                                        </div>`
      })
    } else {
      document.querySelector(".single-blog-comments h3").style.display = "none";
    }

  } catch (error) {
    displayMessage(singleBlogContainer, "error-message")
    document.querySelector(".single-blog-main-comments").style.display = "none";
    document.querySelector(".loader").style.display = "none";

  } finally {
    openModal();
  }
}

getSingleBlogPost();

const formatWpDate = (wpdate) => {
  return new Date(wpdate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function openModal() {
  const modal = document.querySelector(".modal")
  const modalImg = document.querySelector(".modal-img");
  const imgClick = document.querySelectorAll(".single-blog-img img");

  imgClick.forEach((item) => {
    item.onclick = function () {
      modal.classList.add("show-modal");
      modalImg.src = this.src;
      modalImg.alt = this.alt;
    }
  })

  modal.onclick = function (event) {
    if (!event.target.classList.contains("modal-img")) {
      modal.classList.remove("show-modal");
      modalImg.src = "";
      modalImg.alt = "";
    }
  }
}

const commentsContainer = document.querySelector(".comments");
const commentForm = document.querySelector("#commentForm");
const corsFix = "https://noroffcors.herokuapp.com/";
const commentEndPoint = corsFix + "https://hreinngylfason.site/projectexam/wp-json/wp/v2/comments";
const inputs = document.querySelectorAll("form > div :nth-child(2)");
const commentError = "Comment must be 10 characters or more";
const nameError = "Name must be 5 characters or more";
const emailError = "Email must be in a valid format";

inputs.forEach((item) => {
  item.addEventListener("blur", function () {
    if (item.value) {
      switch (item.id) {
        case "comment-message":
          validateString(this, item.value, 10, commentError);
          break;
        case "comment-name":
          validateString(this, item.value, 5, nameError);
          break;
        case "comment-email":
          validateString(this, item.value, undefined, emailError);
          break;
      }
    }
  })
  item.addEventListener("keyup", function () {
    switch (item.id) {
      case "comment-message":
        checkLength(this, item.value, 10);
        break;
      case "comment-name":
        checkLength(this, item.value, 5);
        break;
      case "comment-email":
        validateEmail(this, item.value);
        break;
    }
  })
})

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const message = document.querySelector("#comment-message");
  const name = document.querySelector("#comment-name");
  const email = document.querySelector("#comment-email");
  const commentVal = validateString(message, message.value, 10, commentError)
  const nameVal = validateString(name, name.value, 5, nameError)
  const emailVal = validateString(email, email.value, null, emailError)

  if (commentVal && nameVal && emailVal) {
    const data = JSON.stringify({
      post: blogId,
      author_name: name.value,
      author_email: email.value,
      content: message.value,
    });

    postComment(data);
  }
})

async function postComment(data) {
  try {
    const response = await fetch(commentEndPoint, {
      method: 'post',
      headers: {'Content-Type': 'application/json; charset=utf-8', "cache-control": "no-cache"}, body: data
    })
    await response.json()
    displayMessage(commentForm, "success-message", "Thank you for commenting", "It will be appear when approved")

  } catch (error) {
    console.log(error);
    displayMessage(commentForm, "error-message");
  }
}
