"use strict";
// Select Elements
const dateEl = document.querySelector(".info .date");
const timeEl = document.querySelector(".info .time");
const startBtn = document.getElementById("startBtn");
const checkError = document.querySelector(".checkError");

// Create Date and Time Object
const now = new Date();
const date = now.getDate(); //get Date
const month = now.getMonth() + 1; // get Month
const year = now.getFullYear(); // get Year
let hours = now.getHours(); // get hours in 24 format
const minutes = now.getMinutes(); // get minutes

// Custom Date
function dateFormat() {
  const fullDate = `${date < 10 ? "0" + date : date}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  return fullDate;
}

// custom Time
function timeFormat() {
  // check if am or pm 24 format(0 to 23)
  const amOrPm = hours >= 12 ? "PM" : "AM";
  // convert to 12 hours format and check if it is zero then assign 12
  hours = hours % 12 || 12;
  // combine
  const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${amOrPm}`;

  return time;
}

// Display content
dateEl.textContent = dateFormat();
timeEl.textContent = timeFormat();

// select element
const check = document.getElementById("check");

//add event on click button
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let checked = check.checked;
  // console.log("First" + checked);
  if (!checked) {
    checkError.innerHTML = "Click CheckBox";
    // add event on checkbox dynamically showing status
    check.addEventListener("change", () => {
      checked = check.checked;
      // console.log("third" + checked);
      checked
        ? (checkError.innerHTML = "")
        : (checkError.innerHTML = "Click CheckBox");
    });
  } else {
    window.location.href = "exam.html";
  }
});
