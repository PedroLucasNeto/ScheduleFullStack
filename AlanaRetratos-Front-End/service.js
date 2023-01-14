const url = "http://localhost:8080";
// Save appointment on DB;
function saveInDb(jsonFormat) {
  fetch(`${url}/appointment`, {
    method: "post",
    body: jsonFormat,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      Toastify({
        text: "Appointment created successfully",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    })
    .catch(function (error) {
      Toastify({
        text: "Sorry! It was not possible to save the appointment on the data base!",
        className: "info",
        style: {
          background: "linear-gradient(to right, #000000, #96c93d)",
        },
      }).showToast();
      console.error(error);
    });
}
//END
//Delete appointmentById
function deleteAppointment(appointmentId) {
  fetch(`${url}/appointment/${appointmentId}`, { method: "DELETE" }).then(() =>
    Toastify({
      text: "Appointment deleted successfully",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast()
  );
}

// Get all appointments from DB;
const getAppointments = async function () {
  const dataFromBD = await fetch(`${url}/appointment`, {
    method: "get",
  });
  return dataFromBD;
};
//END

const getAppointmentById = async function (objId) {
  const appointment = await fetch(`${url}/appointment/id/${objId}`, {
    method: "get",
  });
  return appointment;
};

//Edit the appointment with the matching ID
const editAppointment = function (appointment) {
  const id = appointment.id;
  const json = JSON.stringify(appointment);
  fetch(`${url}/appointment/${id}`, {
    method: "PUT",
    body: json,
    headers: { "content-type": "application/json" },
  })
    .then(() => {
      Toastify({
        text: "Appointment edited successfully",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    })
    .catch(function (error) {
      console.error(error);
    });
};
