function createCalendar(data) {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    timeZone: "local",
    events: data,
    contentHeight: 700,

    buttonText: {
      month: "Default",
      agendaDay: "Day",
      listWeek: "Week List",
      listMonth: "Month List",
      listYear: "Year List",
      agendaWeek: "Week List",
      today: "Today",
    },
    dayMaxEventRows: true, // for all non-TimeGrid views
    views: {
      timeGrid: {
        dayMaxEventRows: 8, // adjust to 6 only for timeGridWeek/timeGridDay
      },
    },
    headerToolbar: {
      start: "title", // will normally be on the left. if RTL, will be on the right
      center: "dayGridMonth listWeek listMonth listYear",
      end: "today prev,next", // will normally be on the right. if RTL, will be on the left
    },
    footerToolbar: {
      start: "", // will normally be on the left. if RTL, will be on the right
      center: "",
      end: "", // will normally be on the right. if RTL, will be on the left
    },
    eventColor: "var(--purple)",
    eventDidMount: function (info) {
      const types = info.event.extendedProps.type;
      switch (types) {
        case "FEMININE":
          info.el.style.backgroundColor = "var(--lightPurple)";
          break;
        case "FASHION":
          info.el.style.backgroundColor = "var(--fashion)";
          break;
        case "MOM":
          info.el.style.backgroundColor = "var(--mom)";
          break;
        case "CAREER":
          info.el.style.backgroundColor = "var(--career)";
          break;
        case "EVENT":
          info.el.style.backgroundColor = "var(--event)";
          break;
        case "DEBUTANT":
          info.el.style.backgroundColor = "var(--debutant)";
          break;
      }

      // if (info.event.extendedProps.type === "FEMININE") {
      //   // Change background color of row
      //   info.el.style.backgroundColor = "var(--lightPurple)";
      // }
    },
  });
  calendar.render();

  const gear = document.getElementById("hide-list");

  const destroy = function () {
    calendarEl.classList.add("hidden");
    calendar.destroy();
  };
  gear.addEventListener("click", destroy);
}

// TO CHANGE THE DOT COLOR
// // Change color of dot marker
// var dotEl = info.el.getElementsByClassName("fc-event-dot")[0];
// if (dotEl) {
//   dotEl.style.backgroundColor = "white";
// }
