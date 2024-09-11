`use strict`

// Get current date information
const todayDate = new Date();
const todayMonth = todayDate.getMonth() + 1;
const todayDay = todayDate.getDate();
const todayYear = todayDate.getFullYear();

// Get user input date
const getDobMonth = document.getElementById("month-id");
const getDobDay = document.getElementById("day-id");
const getDobYear = document.getElementById("year-id");

// Get a calculated section
const calculatedSection = document.querySelector(".calculated-age-holder");

getDobMonth.setAttribute("placeholder", `${formatMonthDay(todayMonth)}`);
getDobDay.setAttribute("placeholder", `${formatMonthDay(todayDay)}`);
getDobYear.setAttribute("placeholder", `${todayYear}`);

getDobYear.setAttribute("max", `${todayYear}`);

// Get button
const calculateBtn = document.querySelector(".dob-form");

// age holder
let yearsOld = 0;
let monthsOld = 0;
let daysOld = 0;

// Show result
const calculatedYear = document.getElementById("num-year-old");
const calculatedMonth = document.getElementById("num-month-old");
const calculatedDay = document.getElementById("num-day-old");
const showErrorMsg = document.querySelector(".error-msg");
/**
 * Test the user entered date is correct. Convert string to int
 * @param {*} year : Year user was born
 * @param {*} month : Month user was born
 * @param {*} day : Day user was born
 * @returns {boolean} : return true or false for valid date
 */
function isValidDate(year, month, day) {
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);

    // create a date object with user inputs
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day
    );
}

/**
 * Calculate the age of the user and set the calculate age variables
 * @param {*} year : Year user was born
 * @param {*} month : Month user was born
 * @param {*} day : Day user was born
 */
function calculateAge(year, month, day) {
    yearsOld = todayYear - parseInt(year);
    monthsOld = todayMonth - parseInt(month);
    daysOld = todayDay - parseInt(day);

    // check if month hasn't occurred yet this year
    if (monthsOld < 0) {
        yearsOld--;
        monthsOld += 12;
    }

    // Check if days haven't occurred yet this month
    if (daysOld < 0) {
        monthsOld--;
        // Get days in previous month
        const prevMonth = (todayMonth - 1) === 0 ? 12 : (todayMonth - 1);
        const daysInPrevMonth = new Date(todayYear, prevMonth, 0).getDate();
        daysOld += daysInPrevMonth;
    }
}

/**
 * Set the preceding 0 to single digits as placeholder
 * @param {*} monthDay : Either month or day
 * @returns {string} : augmented string with leading 0 if its single digit
 */
function formatMonthDay(monthDay) {
    return String(monthDay).padStart(2, "0");
}

/**
 * Event listener that gets activated once user submits the form
 */
calculateBtn.addEventListener('submit', (event) => {
    event.preventDefault();

    // check to make sure the date is correct
    if (!isValidDate(getDobYear.value, getDobMonth.value, getDobDay.value)) {
        showErrorMsg.textContent = "Please enter a valid date.";
        showErrorMsg.style.display = "block";
        calculatedSection.style.display = "none";
        // Stop everything if its invalid
        return;
    }
    // Calculate the age and display it to user
    showErrorMsg.style.display = "none";
    calculateAge(getDobYear.value, getDobMonth.value, getDobDay.value)
    calculatedYear.textContent = yearsOld;
    calculatedMonth.textContent = monthsOld;
    calculatedDay.textContent = daysOld;
    calculatedSection.style.display = "block";
})