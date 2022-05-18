const param = new URLSearchParams(window.location.search);
const blogId = param.get("id")
const url = `https://hreinngylfason.site/projectexam/wp-json/wp/v2/posts/${blogId}?_embed`;
const singleBlogContainer = document.querySelector(".single-blog-container");
const commentsContainer = document.querySelector(".comments");

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
    singleBlogContainer.innerHTML = `<div class="error-msg">
                                       <strong>Something went wrong ...</strong>
                                       <strong>Please try again later</strong>
                                     </div>`
    document.querySelector(".single-blog-main-comments").style.display = "none";

  } finally {

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

setTimeout(openModal, 300);

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
