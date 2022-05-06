async function getListPosts(htmlCont, apiUrl, htmlFunction) {

  htmlCont.innerHTML += `<div class="loader"></div>`;

  try {
    const response = await fetch(apiUrl);
    const responseJSON = await response.json();

    responseJSON.forEach((item) => {

      const itemId = item.id;
      const thumbnail = item._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
      const altText = item._embedded["wp:featuredmedia"][0].alt_text;
      const heading = item.title.rendered;
      const excerpt = item.excerpt.rendered;

      htmlCont.innerHTML += htmlFunction(itemId, thumbnail, altText, heading, excerpt);

    })

  } catch (error) {
    htmlCont.innerHTML = `<div class="error-msg">
                            <strong>Something went wrong ...</strong>
                            <strong>Please try again later</strong>
                          </div>`
  } finally {
    const loader = document.querySelectorAll(".loader");
    loader.forEach((item) => {
      item.style.display = "none";
    })
  }
}

function getLatestBlogs(itemId, thumbnail, altText, heading) {
  return `<a href="./single-blog.html?id=${itemId}">
            <div class="post-element">                                     
              <img src="${thumbnail}" alt="${altText}">
              <h3>${heading}</h3>                                     
              <button class="button button-transparent">Read More</button>    
            </div>
          </a>`
}

function getBlogs(itemId, thumbnail, altText, heading, excerpt) {
  return `<div class="blog-posts-element">
            <div>
              <a href="./single-blog.html?id=${itemId}">
                <img src="${thumbnail}" alt="${altText}" class="img-width-100">
              </a>
            </div>
            <div>
              <h2>${heading}</h2>
              ${excerpt}
              <a href="./single-blog.html?id=${itemId}">
                <button class="button button-transparent">Read More</button>
              </a>
           </div>
         </div>`
}
