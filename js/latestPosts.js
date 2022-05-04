const latestPostsArrowLeft = document.querySelector(".fa-angle-left");
const latestPostsArrowRight = document.querySelector(".fa-angle-right");
const scrollValue = document.querySelector(".posts")

latestPostsArrowLeft.onclick = () => {
  scrollValue.scrollLeft -= 832;
}

latestPostsArrowRight.onclick = () => {
  scrollValue.scrollLeft = 0;
  scrollValue.scrollLeft += 832;
}

const postsContainer = document.querySelector(".posts");
const url = "https://hreinngylfason.site/projectexam/wp-json/wp/v2/posts?_embed&per_page=12";

async function getLatestPosts() {
  try {
    const response = await fetch(url);
    const responseJSON = await response.json();
    console.log(responseJSON);

    responseJSON.forEach((item) => {

      const thumbnail = item._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
      const altText = item._embedded["wp:featuredmedia"][0].alt_text;
      const heading = item.title.rendered;

      postsContainer.innerHTML += `<a href="./single-blog.html?id=${item.id}">
                                     <div class="post-element">                                     
                                       <img src="${thumbnail}" alt="${altText}">
                                       <h3>${heading}</h3>                                     
                                       <button class="button button-transparent">Read More</button>    
                                     </div>
                                   </a>`

    })

  } catch (error) {
    console.log(error)
  } finally {

  }
}

getLatestPosts();
