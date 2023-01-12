//ADD APPOINTMENT THROUGH FORM
const form = document.querySelector("form");

const createAppointment = function () {
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
    closeModal();
    window.location.reload();
  }, 2000);
};
//END

const appointmentList = [];
const calendarAppointmentList = [];

//POPULATE LIST AND CALENDAR

const populate = async function (getAppointments) {
  const dataFromFetch = await getAppointments();
  const allAppointments = await dataFromFetch.json();

  allAppointments.map(function (item) {
    appointmentList.push(item);
    calendarAppointmentList.push({
      title: item.clientName,
      start: item.date,
      extendedProps: {
        type: item.photoShootType,
      },
    });
  });
  // Create calendar for the first time
  createCalendar(
    allAppointments.map((obj) => {
      return {
        title: obj.clientName,
        start: obj.date,
        extendedProps: {
          type: obj.photoShootType,
        },
      };
    })
  );
};
populate(getAppointments);
// END //

//Create a list of appointments on the TableBody with ID:appointments in the INDEX;
function createAppointmentsList() {
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
        <td><button id="editButton" class="btn-edit"
        onclick={changeAppointment(${item.id})}><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="btn-remove"
        onclick={removeAppointment(${item.id})}><i class="fa-solid fa-trash"></i></button></td>
      `;
    tableBody.appendChild(element);
    // element.classList.add('')
  });
}

//END

const changeAppointment = async function (objId) {
  openModal("editButton");
  const submitButton = document.getElementById("submit");
  const appointmentFromFetch = await getAppointmentById(objId);
  const appointment = await appointmentFromFetch.json();
  const clientName = document.getElementById("clientName");
  const formDescription = document.getElementById("description");
  const formDate = document.getElementById("date");
  const formTime = document.getElementById("time");
  const formPricing = document.getElementById("photoShootPricing");
  const formType = document.getElementById("photoShootType");
  const date = new Date(appointment.date).toLocaleDateString();
  const time = new Date(appointment.date).toLocaleTimeString();

  clientName.value = appointment.clientName;
  formDescription.value = appointment.description;
  formDate.value = date;
  formTime.value = time;
  formPricing.value = appointment.photoShootPricing;
  formType.value = appointment.photoShootType;

  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);
  const objDate = obj.date.split("-");
  const objTime = obj.time.split(":");
  const fullDate = new Date(
    objDate[0],
    objDate[1],
    objDate[2],
    objTime[0],
    objTime[1]
  );
  console.log(fullDate);
  const newObj = {
    clientName: obj.clientName,
    description: obj.description,
    date: obj.date,
    photoShootType: obj.photoShootType,
    photoShootPricing: obj.photoShootPricing,
  };
  const jsonFormat = JSON.stringify(newObj);

  submitButton.addEventListener("click", editAppointment(jsonFormat));

  console.log(newObj);
  console.log(appointment);
  setTimeout(() => {
    closeModal();
    window.location.reload();
  }, 2000);
};

// Remove appointment function using ID
const removeAppointment = function (appointmentId) {
  const confirmationModal = document.getElementById("confirmation-modal");
  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");
  const tableRow = document.getElementById(appointmentId);

  const cancelAction = function () {
    confirmationModal.classList.add("hidden");
  };

  const deleteRow = function () {
    deleteAppointment(appointmentId);
    tableRow.remove();
    confirmationModal.classList.add("hidden");
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

//END

//  OPEN-AND-CLOSE LIST and CALENDAR FUNCTIONS
const calendar = document.getElementById("calendar");
const table = document.getElementById("appointment-table");
const selectCalendarIcon = document.getElementById("hide-list");
const selectListIcon = document.getElementById("hide-calendar");

const listIcon = function () {
  createAppointmentsList();
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

//Reloads the page when clicked
const refreshButton = document.getElementById("btn-refresh");
const refreshPage = function () {
  window.location.reload();
};
refreshButton.addEventListener("click", refreshPage);
//END
