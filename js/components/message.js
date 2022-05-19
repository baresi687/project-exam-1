export function displayMessage(msgClass, message1 = "Something went wrong ...", message2 = "Please try again later") {
  return `<div class="message ${msgClass}">
            <strong>${message1}</strong>
            <strong>${message2}</strong>
          </div>`
}
