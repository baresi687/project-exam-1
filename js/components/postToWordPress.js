import {displayMessage} from "./message.js";

export async function postToWordPress(endPoint, data, elem, message1, message2) {
  try {
    const response = await fetch(endPoint, {
      method: 'post',
      body: data
    })
    await response.json()
    displayMessage(elem, "success-message", message1, message2)

  } catch (error) {
    displayMessage(elem, "error-message");
  }
}
