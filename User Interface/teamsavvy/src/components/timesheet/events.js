var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

const events = [
  {
    title: "Sick Leave(s)",
    allDay: true,
    start: new Date(y, m, 1),
    end: new Date(y, m, 2),
    color:"orange",
  },
  {
    title: "Vacation Leave(s)",
    start: new Date(y, m, d - 1, 10, 30),
    end: new Date(y, m, d - 1, 11, 30),
    allDay: false,
    color: "orange"
  },
  {
    title: "Sick Leave(s)",
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Sick Leave(s)",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    color: "green"
  },
  {
    title: "Vacation Leave(s)",
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    color: "orange"
  },
  {
    title: "CLock In",
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    color: "white"
  },

  // {
  //   title: "Click for meeting",
  //   start: new Date(y, m, 21),
  //   end: new Date(y, m, 22),
  //   color: "orange"
  // },
  // {
  //   title: "Click for Google",
  //   start: new Date(y, m, 21),
  //   end: new Date(y, m, 22),
  //   color: "orange"
  // }
];

export default events;