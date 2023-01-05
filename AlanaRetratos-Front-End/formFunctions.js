const form = document.querySelector("form");
const url = "http://localhost:8080";

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);
  const objDate = obj.date.split("-");
  const objTime = obj.time.split(":");
  const fullDate = new Date(
    objDate[0],
    objDate[1] - 1,
    objDate[2],
    objTime[0] - 3,
    objTime[1]
  );

  const newObj = {
    clientName: obj.clientName,
    description: obj.description,
    date: fullDate,
    photoShootType: obj.photoShootType,
    photoShootPricing: obj.photoShootPricing,
  };

  console.log(newObj);

  const jsonFormat = JSON.stringify(newObj);

  saveInDb(jsonFormat);
});

function saveInDb(jsonFormat) {
  fetch(`${url}/appointment`, {
    method: "post",
    body: jsonFormat,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      console.log(text);
    })
    .catch(function (error) {
      console.error(error);
    });
}

const appointments = getAppointments();

async function getAppointments() {
  const data = await fetch(`${url}/appointment`, {
    method: "get",
  });
  return data;
}
