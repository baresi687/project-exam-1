# Project Exam 1 - Pawtalk

<div>
  <img src="/img/project-exam-1-readme-mobile.jpg" height="500" alt="Pawtalk Mobile view">
  &nbsp&nbsp&nbsp  
  <img src="/img/project-exam-1-readme-desktop.jpg" height="500" alt="Pawtalk Mobile Desktop view">
</div>

My Project exam 1.

## Description

To put into practice the skills I have learned over my first year of studies at Noroff Frontend Development,
I was tasked with creating a blog site. I could choose the design and topics covered on the blog, but it should have at
least the following pages:

- Home page
- About page
- List of blog posts
- Blog post specific pages
- Contact page.

### Requirements of the project

#### Home Page

The home page should have a ‘Latest Posts’ section which uses a carousel (slider) for users to click to view more posts.
For example, by default the user can see four posts, then they can click an arrow on the right to view the next four
posts, and click it again to view the next four posts. The user can also click back to view results they had previously
seen. This must be implemented for desktop at least, but a simpler layout for mobile is allowed.

#### Blog Page

The blog posts page should show the first 10 blogs, and the user should click to view more results which then show
underneath the first 10 blogs.

#### Blog Specific Page

The content of the blog specific page should be dynamically built using a query string parameter based on whatever link
the user clicked. The title of the blog specific page should change based on the blog that has been clicked on e.g. “My
Blog | An Article I Wrote”.

If images on the blog post page are clicked, a modal should appear giving the user a bigger view of that image. Clicking
outside the image should hide the modal.

#### Contact page

There should be 4 textboxes on this page.

- Name (Should be more than 5 characters long)
- Email address (Must be a valid email address)
- Subject (Should be more than 15 characters long)
- Message content (Should be more than 25 characters long)

Use JavaScript for validation, show error messages if the values in the textboxes do not meet the requirements.

#### WordPress

The blog posts content for the website will be stored on a WordPress installation used as a Headless REST API.

#### Optional Level 2 Process (Completed)

1. Add sorting, filtering or search functionality to the blog page.
2. Post the data from the Contact form to WordPress and save the details
3. Allow users to submit comments on a blog post, and post this data to WordPress

## Built With

- HTML
- CSS
- JavaScript
- WordPress Headless REST API

## Contact

[My LinkedIn page](https://www.linkedin.com/in/hreinn-gylfason-b9a48521a/)
