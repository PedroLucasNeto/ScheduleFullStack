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
//END
//Delete appointmentById
function deleteAppointment(appointmentId) {
  fetch(`${url}/appointment/${appointmentId}`, { method: "DELETE" }).then(() =>
    alert("Appointment deleted succesfully")
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
  fetch(
    `${url}/appointment/${appointment.id}`,
    { method: "PUT" },
    { body: JSON.stringify(appointment) }
  ).then(() => alert("Appointment updated succesfully"));
};

// const obj = {
//   id: item.id,
//   clientName: item.clientName,
//   description: item.description,
//   date: item.date,
//   photoShootType: item.photoShootType,
//   photoShootPricing: item.photoShootPricing,
//   photoShootStatus: item.photoShootStatus,
// };
