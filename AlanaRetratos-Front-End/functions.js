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

  allAppointments.map(function (item) {
    const tableBody = document.getElementById("appointments");
    const element = document.createElement("tr");
    element.classList.add("row");
    const date = new Date(item.date).toLocaleDateString();
    const time = new Date(item.date).toLocaleTimeString();
    element.setAttribute("id", item.id);
    element.innerHTML = `
        <td>${item.id}</td>
        <td>${item.clientName}</td>
        <td>${item.description}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${item.photoShootType}</td>
        <td>${item.photoShootPricing}</td>
        <td><button class="btn-edit"
        onClick={editAppointment(${item.id})}><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="btn-remove"
        onClick={removeAppointment(${item.id})}><i class="fa-solid fa-trash"></i></button></td>
      `;
    tableBody.appendChild(element);
  });
}
//Executes the function above, iniciating the list;
listAppointments();

// Edit and Remove appointments functions using ID !!
const removeAppointment = function (appointmentId) {
  const tableRow = document.getElementById(appointmentId);
  if (tableRow) {
    fetch(`${url}/appointment/${appointmentId}`, { method: "DELETE" }).then(
      () => alert("Success")
    );

    tableRow.remove();
  }
};

const editAppointment = function (appointmentId) {};

//END

const refreshButton = document.getElementById("btn-refresh");
const refreshPage = function () {
  window.location.reload();
};
refreshButton.addEventListener("click", refreshPage);

//  OPEN-AND-CLOSE LIST and CALENDAR FUNCTIONS
const calendar = document.getElementById("calendar");
const table = document.getElementById("appointment-table");
const selectCalendarIcon = document.getElementById("hide-list");
const selectListIcon = document.getElementById("hide-calendar");

const showCalendar = function () {
  table.classList.remove("hidden"),
    selectCalendarIcon.classList.add("disabled"),
    selectListIcon.classList.remove("disabled"),
    (calendar.innerHTML = "");
};

const showList = function () {
  table.classList.add("hidden"),
    createCalendar(),
    selectListIcon.classList.add("disabled"),
    selectCalendarIcon.classList.remove("disabled");
};
// selectCalendarIcon.addEventListener("click", showCalendar);
// selectListIcon.addEventListener("click", showList);

//  END
