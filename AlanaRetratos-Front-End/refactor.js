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
    objTime[0],
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

  setTimeout(() => {
    window.location.reload();
  }, 2000);
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
    .then(() => alert("Appointment added succesfully"))
    .catch(function (error) {
      console.error(error);
    });
}
const appointmentList = [];
const calendarAppointmentList = [];
// FETCH DATA FROM DATABASE - POPULATE LISTS and RENDER CALENDAR FOR THE FIRST TIME//
const getAppointments = async function () {
  const dataFromBd = await fetch(`${url}/appointment`, {
    method: "get",
  });
  const allAppointments = await dataFromBd.json();
  createCalendar(
    allAppointments.map((obj) => {
      return {
        title: obj.clientName,
        start: obj.date,
      };
    })
  );
  allAppointments.map(function (item) {
    appointmentList.push(item);
    calendarAppointmentList.push({
      title: item.clientName,
      start: item.date,
    });
  });
};
// END //
getAppointments();

function listAppointments() {
  const tbody = document.getElementById("appointments");
  tbody.innerHTML = "";
  appointmentList.map(function (item) {
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
  console.log(calendarAppointmentList);
}

// Edit and Remove appointments functions using ID !!
const removeAppointment = function (appointmentId) {
  const confirmationModal = document.getElementById("confirmation-modal");
  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");
  const tableRow = document.getElementById(appointmentId);

  const cancelAction = function () {
    confirmationModal.classList.add("hidden");
  };

  const deleteRow = function () {
    tableRow.remove();
    confirmationModal.classList.add("hidden");
    fetch(`${url}/appointment/${appointmentId}`, { method: "DELETE" }).then(
      () => alert("Appointment deleted succesfully")
    );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  if (tableRow) {
    confirmationModal.classList.remove("hidden");
    yesButton.addEventListener("click", deleteRow);
    noButton.addEventListener("click", cancelAction);
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

const listIcon = function () {
  listAppointments();
  table.classList.remove("hidden"),
    selectCalendarIcon.classList.add("disabled"),
    selectListIcon.classList.remove("disabled"),
    (calendar.innerHTML = "");
};

const calendarIcon = function () {
  createCalendar(calendarAppointmentList),
    table.classList.add("hidden"),
    selectListIcon.classList.add("disabled"),
    selectCalendarIcon.classList.remove("disabled");
};
//  END
