const form = document.querySelector("form");
const inputs = document.querySelectorAll("form > div :nth-child(2)");
const nameError = "Name must be more than 5 characters";
const emailError = "Email must be in valid format";
const subjectError = "Subject must be more than 15 characters";
const messageError = "Message must be more than 25 characters";

inputs.forEach((item) => {
  item.addEventListener("focus", function () {
    item.addEventListener("keyup", function () {
      if (item.id === "name") {
        checkLength(this, item.value, 5)
      }
      if (item.id === "email") {
        validateEmail(this, item.value)
      }
      if (item.id === "subject") {
        checkLength(this, item.value, 15)
      }
      if (item.id === "message") {
        checkLength(this, item.value, 25)
      }
    })
    item.addEventListener("blur", function () {
      if (item.value) {
        if (item.id === "name") {
          validateOnBlur(this, item.value, 5, nameError)
        }
        if (item.id === "email") {
          if (!validateEmail(this, item.value)) {
            document.querySelector(`#${this.id} ~ .input-error`).innerHTML = emailError;
            this.classList.add("input-error-border")
          } else {
            this.classList.remove("input-error-border")
          }
        }
        if (item.id === "subject") {
          validateOnBlur(this, item.value, 15, subjectError)
        }
        if (item.id === "message") {
          validateOnBlur(this, item.value, 25, messageError)
        }
      }
    })
  })
})

form.addEventListener("submit", function () {
  
})

function validateOnBlur(elem, value, length, errorMsg) {
  if (!checkLength(elem, value, length)) {
    elem.classList.add("input-error-border")
    document.querySelector(`#${elem.id} ~ .input-error`).innerHTML = errorMsg;
  } else {
    elem.classList.remove("input-error-border")
    document.querySelector(`#${elem.id} ~ .input-error`).innerHTML = "";
  }
}

function checkLength(elem, value, len) {
  if (value.trim().length > len) {
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
