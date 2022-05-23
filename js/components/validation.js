function validateString(elem, value, length, errorMsg) {
  if (elem.id === "your-email" || elem.id === "comment-email") {
    if (!validateEmail(elem, elem.value)) {
      document.querySelector(`#${elem.id} ~ .input-error`).innerHTML = errorMsg;
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

export {validateString, checkLength, validateEmail};
