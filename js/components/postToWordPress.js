import {displayMessage} from "./message.js";

export async function postToWordPress(endPoint, data, elem, message1, message2) {
  elem.querySelector(".button").style.display = "none";
  elem.innerHTML += '<div class="loader"></div>'
  try {
    const response = await fetch(endPoint, {
      method: 'post',
      body: data
    })

    response.ok ? displayMessage(elem, "success-message", message1, message2) : displayMessage(elem, "error-message");

  } catch (error) {
    displayMessage(elem, "error-message");

  } finally {
    elem.querySelector(".button").style.display = "block";
    elem.querySelector(".loader").style.display = "none";
  }
}
