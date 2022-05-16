async function getListPosts(htmlCont, apiUrl, htmlFunction) {

  htmlCont.innerHTML += `<div class="loader"></div>`;

  try {
    const response = await fetch(apiUrl);
    const responseJSON = await response.json();

    if (document.querySelector(".sort-filter")) {
      const sortBlogs = document.querySelector(".sort-filter #sort-blogs")

      if (sortBlogs.value === "comments") {
        responseJSON.sort(sortByComments);
      }
      if (sortBlogs.value === "name") {
        responseJSON.sort(sortByName);
      }

      sortBlogs.onchange = (() => {
        htmlCont.innerHTML = "";
        getListPosts(blogPostsContainer, url, getBlogs);
      })

      const filterBlogs = document.querySelector("#filter-blogs")
      filterBlogs.addEventListener("keyup", (event) => {
        htmlCont.innerHTML = "";
        const currentValue = event.target.value.trim().toLowerCase();
        const renderedBlog = responseJSON.filter(function (arr) {
          return arr.title.rendered.toLowerCase().includes(currentValue)
        })
        sortablePosts(renderedBlog);
      })
    }

    sortablePosts(responseJSON);

    function sortablePosts(responseJSON) {
      responseJSON.forEach((item) => {
        const itemId = item.id;
        const thumbnail = item._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
        const altText = item._embedded["wp:featuredmedia"][0].alt_text;
        const heading = item.title.rendered;
        const excerpt = item.excerpt.rendered;

        htmlCont.innerHTML += htmlFunction(itemId, thumbnail, altText, heading, excerpt);

      })
    }

  } catch (error) {
    console.log(error)
    htmlCont.innerHTML = `<div class="error-msg">
                            <strong>Something went wrong ...</strong>
                            <strong>Please try again later</strong>
                          </div>`

    if (document.querySelector(".view-more-btn")) {
      document.querySelector(".view-more-btn").style.display = "none";
    }

  } finally {
    const loader = document.querySelectorAll(".loader");
    loader.forEach((item) => {
      item.style.display = "none";
    })
  }
}
