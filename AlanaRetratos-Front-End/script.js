const appointment = {
  id: 0,
  description: "",
  date: Date,
  type: "",
  clientName: "",
};

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();

  // calendar.on("dateClick", () => {
  //   console.log("Clicked on" + info.dateStr);
  // });
});

// fetch("http://localhost:8080/user");
fetch("34.122.183.75/user")
  .then((response) => console.log("Response".response))
  .catch((error) => console.log(error));
