export function displayMessage(elem, msgClass, message1 = "Something went wrong ...", message2 = "Please try again later") {
  elem.innerHTML += `<div class="message ${msgClass}">
                      <strong>${message1}</strong>
                      <strong>${message2}</strong>
                    </div>`
  if (elem.tagName === "FORM") {
    elem.querySelector(".message").scrollIntoView({behavior: "smooth", block: "center"})
  }
}
