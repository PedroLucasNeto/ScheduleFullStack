// document.addEventListener("DOMContentLoaded", function () {
//   var calendarEl = document.getElementById("calendar");
//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: "dayGridMonth",
//   });
//   calendar.render();
// });

function createCalendar(data) {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    timeZone: "local",
    events: data,
  });

  calendar.render();
  document.addEventListener("DOMContentLoaded", createCalendar);
}
