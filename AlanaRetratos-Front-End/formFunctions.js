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

async function listAppointments() {
  const data = await fetch(`${url}/appointment`, {
    method: "get",
  });
  const allAppointments = await data.json();

  allAppointments.map(function (item, index) {
    const tableBody = document.getElementById("appointments");
    const element = document.createElement("tr");
    element.classList.add("row");
    element.innerHTML = `
        <td>${item.id}</td>
        <td>${item.clientName}</td>
        <td>${item.description}</td>
        <td>${item.date}</td>
        <td>${item.photoShootType}</td>
        <td>${item.photoShootPricing}</td>
        <td><i class="fa-solid fa-pen-to-square"></i></td>
        <td><i class="fa-solid fa-trash"></i></td>
      `;

    // document.body.appendChild(tableBody);
    // console.log(item.clientName, index);

    tableBody.appendChild(element);
  });
}

//Executes the function above
listAppointments();

const calendar = document.getElementById("calendar");
const table = document.getElementById("appointment-table");
const selectCalendarIcon = document.querySelector(".btn-hide-list");
const selectListIcon = document.querySelector(".btn-hide-calendar");

const showCalendar = function () {
  table.classList.remove("hidden"),
    selectCalendarIcon.classList.add("disabled");
  selectListIcon.classList.remove("disabled");
  document.getElementById("calendar").innerHTML = "";
};

const showList = function () {
  table.classList.add("hidden");
  createCalendar();
  selectListIcon.classList.add("disabled");
  selectCalendarIcon.classList.remove("disabled");

  // document.getElementById("calendar").outerHTML = "";
};

selectCalendarIcon.addEventListener("click", showCalendar);
selectListIcon.addEventListener("click", showList);
