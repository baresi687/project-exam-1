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
    const formattedDate = new Date(responseJSON.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const imageFull = responseJSON._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    const altText = responseJSON._embedded["wp:featuredmedia"][0].alt_text;
    const singleBlogContent = responseJSON.content.rendered;

    document.querySelectorAll(".single-blog-title").forEach((element) => {
      element.innerHTML += heading
    })
    document.querySelector(".blog-author-date").innerText = `By ${author} on ${formattedDate}`;

    singleBlogContainer.innerHTML = `<div class="single-blog-img">
                                       <img src="${imageFull}" alt="${altText}" class="img-width-100">  
                                     </div>
                                     <div class="single-blog-content">
                                       ${singleBlogContent}
                                     </div>`

  } catch (error) {
    singleBlogContainer.innerHTML = `<div class="error-msg">
                                       <strong>Something went wrong ...</strong>
                                       <strong>Please try again later</strong>
                                     </div>`

  } finally {

  }
}

getSingleBlogPost()
