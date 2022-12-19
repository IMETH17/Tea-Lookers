const currentDate = document.querySelector(".current_date");
const days = document.querySelector(".days");
const prevNextIcons = document.querySelectorAll(".prev-next_icons span");
const calendarHelp = document.getElementById("calendarHelp");

// To get user selection
let selectedDate, selectedYear, selectedMonth, selectedDay;


// Get current date, month and year
let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDay = date.getDate();

//months of the year
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const createCalendar =()=> {
  // gets the index of the day of the week
  let firstDayOfTheMonth = new Date(currentYear, currentMonth, 1).getDay();
  // console.log(firstDayOfTheMonth);
  // Gives the date of the last day of the current month
  let lastDateOfTheMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // console.log(lastDateOfTheMonth);
  // gets the index of the last day of the current month
  let lastDayOfTheMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfTheMonth
  ).getDay();
  // console.log(lastDayOfTheMonth);
  // Gives the date of the last day of the previous month
  let lastDateOfTheLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  // console.log(lastDateOfTheLastMonth);
  // create variable for the list item
  let listItem = "";

  // The first few days of the previous months should fill into the week, if month starts from any index other than zero
  // display the last few days of the previous month
  for (let i = firstDayOfTheMonth; i > 0; i--) {
    listItem += `<li class="inactive">${lastDateOfTheLastMonth - i + 1}</li>`;
  }

  // display the days of the current month
  for (let i = 1; i <= lastDateOfTheMonth; i++){
    // check which day is today
    let isToday = i === currentDay && currentMonth === new Date().getMonth &&  currentYear === new Date().getFullYear ?"active" : "";
    listItem += `<li class="isToday"> ${i}</li>`;
  }

  // display the first des days of the next month
  for (let i = lastDayOfTheMonth; i < 6; i++){
    listItem += `<li class="inactive "> ${i - lastDayOfTheMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
  days.innerHTML = listItem;


  // Date selection
  const today = document.querySelectorAll(".isToday");
  
    today.forEach((day) => {
      day.addEventListener("click", () => {
        // day.classList.toggle("selected");
        // console.log(`selected day is ${day.innerText}`);
        selectedDate = new Date(currentYear, currentMonth, day.innerText);
        selectedYear = selectedDate.getFullYear();
        selectedMonth = selectedDate.getMonth()+1;
        selectedDay = selectedDate.getDate();
          if (selectedDay > currentDay){
            console.log(`${selectedDay}/${selectedMonth}/${selectedYear}`);
            calendarHelp.innerText =`You have selected ${selectedDay}/${selectedMonth}/${selectedYear}`;
          }else{
            calendarHelp.innerText = `Please select a valid date, Booking available from ${currentDay}/${currentMonth}/${currentYear}`;
          }
      });
    });
}

createCalendar();

prevNextIcons.forEach(element => {
  element.addEventListener("click", ()=>{
    currentMonth = element.id === "prev"? currentMonth - 1 : currentMonth + 1;
    if (currentMonth < 0 || currentMonth > 11){
      date = new Date (currentYear, currentMonth);
      currentYear = date.getFullYear();
      currentMonth = date.getMonth();
    }else{
      date = new Date();
    } 
    createCalendar();
  })
})

// function selected(){
//   document.querySelector(".isToday").classList.toggle("selected");
//   }