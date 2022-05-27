import {displayMessage} from "./message.js";

export async function postToWordPress(endPoint, data, elem, message1, message2) {
  try {
    const response = await fetch(endPoint, {
      method: 'post',
      body: data
    })
    console.log(response.status)
    response.ok ? displayMessage(elem, "success-message", message1, message2) : displayMessage(elem, "error-message", response.status, response.status);
    return await response.json();

  } catch (error) {
    displayMessage(elem, "error-message");
  }
}
