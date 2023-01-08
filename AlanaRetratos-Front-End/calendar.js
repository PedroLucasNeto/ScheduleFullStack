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
    buttonText: {
      month: "Month",
      agendaDay: "Day",
      listWeek: "Week",
      listMonth: "ListMonth",
      listYear: "ListYear",
      agendaWeek: "Week",
      today: "Today",
    },
    headerToolbar: {
      start: "title", // will normally be on the left. if RTL, will be on the right
      center: "dayGridMonth listWeek listMonth listYear",
      end: "today prev,next", // will normally be on the right. if RTL, will be on the left
    },
    eventColor: "var(--purple)",
    eventDidMount: function (info) {
      if (info.event.extendedProps.type === "FEMININE") {
        // Change background color of row
        info.el.style.backgroundColor = "var(--lightPurple)";

        // Change color of dot marker
        var dotEl = info.el.getElementsByClassName("fc-event-dot")[0];
        if (dotEl) {
          dotEl.style.backgroundColor = "white";
        }
      }
    },
  });

  calendar.render();
  document.addEventListener("DOMContentLoaded", createCalendar);
}

// customButtons: {
//   listYear: {
//     text: "year list",
//     click: function () {},
//   },

//   listMonth: {
//     text: "list",
//     click: function () {},
//   },
// },
