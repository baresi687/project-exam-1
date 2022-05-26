import {validateString, checkLength, validateEmail} from "./components/validation.js";
import {postToWordPress} from "./components/postToWordPress.js";

const form = document.querySelector("#form");
const inputs = document.querySelectorAll("form > div :nth-child(2)");
const nameError = "Name must be more than 5 characters";
const emailError = "Email must be in a valid format";
const subjectError = "Subject must be more than 15 characters";
const messageError = "Message must be more than 25 characters";
const contactEndPoint = `https://hreinngylfason.site/projectexam/wp-json/contact-form-7/v1/contact-forms/77/feedback`;

inputs.forEach((item) => {
  item.addEventListener("focus", function () {
    item.addEventListener("keyup", function () {
      switch (item.id) {
        case "your-name":
          checkLength(this, item.value, 5);
          break;
        case "your-email":
          validateEmail(this, item.value);
          break;
        case "your-subject":
          checkLength(this, item.value, 15);
          break;
        case "your-message":
          checkLength(this, item.value, 25);
          break;
      }
    })
    item.addEventListener("blur", function () {
      if (item.value) {
        switch (item.id) {
          case "your-name":
            validateString(this, item.value, 5, nameError);
            break;
          case "your-email":
            validateString(this, item.value, null, emailError);
            break;
          case "your-subject":
            validateString(this, item.value, 15, subjectError);
            break;
          case "your-message":
            validateString(this, item.value, 25, messageError);
            break;
        }
      }
    })
  })
})

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#your-name")
  const email = document.querySelector("#your-email")
  const subject = document.querySelector("#your-subject")
  const message = document.querySelector("#your-message")

  const nameVal = validateString(name, name.value, 5, nameError)
  const emailVal = validateString(email, email.value, null, emailError)
  const subjectVal = validateString(subject, subject.value, 15, subjectError)
  const messageVal = validateString(message, message.value, 25, messageError)

  if (nameVal && emailVal && subjectVal && messageVal) {
    const formData = new FormData(event.target)

    postToWordPress(contactEndPoint, formData, this, "Form submitted successfully", "You will hear from us soon")
  }
})
