const form = document.querySelector("form");
const inputs = document.querySelectorAll("form > div :nth-child(2)");
const nameError = "Name must be more than 5 characters";
const emailError = "Email must be in a valid format";
const subjectError = "Subject must be more than 15 characters";
const messageError = "Message must be more than 25 characters";

inputs.forEach((item) => {
  item.addEventListener("focus", function () {
    item.addEventListener("keyup", function () {
      switch (item.id) {
        case "name":
          checkLength(this, item.value, 5);
          break;
        case "email":
          validateEmail(this, item.value);
          break;
        case "subject":
          checkLength(this, item.value, 15);
          break;
        case "message":
          checkLength(this, item.value, 25);
          break;
      }
    })
    item.addEventListener("blur", function () {
      if (item.value) {
        switch (item.id) {
          case "name":
            validateString(this, item.value, 5, nameError);
            break;
          case "email":
            validateString(this, item.value, null, emailError);
            break;
          case "subject":
            validateString(this, item.value, 15, subjectError);
            break;
          case "message":
            validateString(this, item.value, 25, messageError);
            break;
        }
      }
    })
  })
})

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#name")
  const email = document.querySelector("#email")
  const subject = document.querySelector("#subject")
  const message = document.querySelector("#message")

  const nameVal = validateString(name, name.value, 5, nameError)
  const emailVal = validateString(email, email.value, null, emailError)
  const subjectVal = validateString(subject, subject.value, 15, subjectError)
  const messageVal = validateString(message, message.value, 25, messageError)

  if (nameVal && emailVal && subjectVal && messageVal) {
    document.querySelector(".form-success").style.display = "block";
    form.reset();
  }
})

function validateString(elem, value, length, errorMsg) {
  if (elem.id === "email") {
    if (!validateEmail(elem, elem.value)) {
      document.querySelector(`#${elem.id} ~ .input-error`).innerHTML = emailError;
      elem.classList.add("input-error-border")
      return false
    } else {
      elem.classList.remove("input-error-border")
      return true
    }
  } else {
    if (!checkLength(elem, value, length)) {
      elem.classList.add("input-error-border")
      document.querySelector(`#${elem.id} ~ .input-error`).innerHTML = errorMsg;
      return false
    } else {
      elem.classList.remove("input-error-border")
      document.querySelector(`#${elem.id} ~ .input-error`).innerHTML = "";
      return true;
    }
  }
}

function checkLength(elem, value, length) {
  if (value.trim().length > length) {
    elem.nextElementSibling.classList.add("show-checkmark")
    document.querySelector(`#${elem.id} ~ .input-error`).innerHTML = "";
    return true;
  } else {
    elem.nextElementSibling.classList.remove("show-checkmark")
    return false
  }
}

function validateEmail(elem, email) {
  const regExp = /\S+@\S+\.\S+/;
  if (regExp.test(email)) {
    elem.nextElementSibling.classList.add("show-checkmark")
    document.querySelector(`#${elem.id} ~ .input-error`).innerHTML = "";
    return true;
  } else {
    elem.nextElementSibling.classList.remove("show-checkmark")
    return false;
  }
}
