const Formb = document.querySelector("form");
const search = document.querySelector("input");
const msgone = document.querySelector("#msg1");
const msgtwo = document.querySelector("#msg2");

Formb.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  msgone.textContent = "Loading...";
  msgtwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.Error) {
        msgone.textContent = data.Error;
      } else {
        msgone.textContent = data.Address;
        msgtwo.textContent = data.Weather_report;
      }
    });
  });
});
