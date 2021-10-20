var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";
})

var eng_lang = true; // boolean for whether we are currently in English Language

// defines where the navigation bar will be FIXED!
var navbar_sticky_Y = window.scrollY + window.innerHeight;

// defines where the program begins
// var program_pos = document.getElementById("program-content").getBoundingClientRect();

// defines the current day that people are looking at on the program
var program_day = 0 // 0 = Saturday, 1 = Sunday, 2 = Monday
check_today_date(); // change program_day if necessary
display_events_and_times(program_day);
// set the program to be the day
var day_labels = ["Saturday, November 13, 2021", "Sunday, November 14, 2021",
    "Monday, November 15, 2021"];
var events = [
    ["Saturday Event 1", "Saturday Event 2", "Saturday Event 3",
        "Saturday Event 4", "Saturday Event 5", "Saturday Event 6", "Saturday Event 7",
        "Saturday Event 8"],
    ["Sunday Event 1", "Sunday Event 2", "Sunday Event 3",
        "Sunday Event 4", "Sunday Event 5", "Sunday Event 6", "Sunday Event 7",
        "Sunday Event 8"],
    ["Monday Event 1", "Monday Event 2", "Monday Event 3",
        "Monday Event 4", "Monday Event 5", "Monday Event 6", "Monday Event 7",
        "Monday Event 8"]
]; // events for days 0, 1, 2, respectively
var times = [
    ["1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm",
        "7:00pm", "8:00pm"],
    ["1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm",
        "7:00pm", "8:00pm"],
    ["1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm",
        "7:00pm", "8:00pm"]
]; // times for events on days 0, 1, 2, respectively

////////////////////////////////////////////////////////////////////////////
// SCROLLING TAKEN CARE OF HERE //
const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            hideScrollElement(el)
        }
    })
}

window.addEventListener("scroll", () => {
    handleScrollAnimation();
});

////////////////////////////////////////////////////////////////////////////

// when users scroll on the window, make sure that the navigation is sticky
window.onscroll = function() {sticky_nav()};

// define a function that goes to diff days when user scrolls LEFT or RIGHT

function display_events_and_times(day) {
    if (day != program_day) { // only change things if we're changing the day
        program_day = day; // update the program day
        let day_events = events[program_day]; // collect all event names
        let day_times = times[program_day]; // collect all event times
        // get rid of everything that's currently in there
        let day_inner_container = document.getElementById("day-inner-container");
        let items = day_inner_container.childNodes; // get list of children to remove
        while (items.length > 0) { // remove all children in the day's inner container
            day_inner_container.removeChild(items[0]);
        }
        // add everything new
        document.getElementById("day-label").innerHTML = day_labels[program_day];
        for (let i = 0; i < day_events.length; i++) { // for each event
            let program_item = document.createElement("div"); // create the item
            program_item.classList.add("program-item");
            program_item.classList.add("row");
            let program_item_name = document.createElement("div"); // create the name
            program_item_name.classList.add("program-item-name");
            program_item_name.classList.add("col");
            program_item_name.innerHTML = day_events[i];
            let program_item_time = document.createElement("div"); // create the time
            program_item_time.classList.add("program-item-time");
            program_item_time.classList.add("col");
            program_item_time.innerHTML = day_times[i];

            program_item.appendChild(program_item_name); // add name to item
            program_item.appendChild(program_item_time); // add time to item

            day_inner_container.appendChild(program_item); // add item to container
        }
    }
}

// define a function that goes to diff days when the user presses LEFT or RIGHT
// function switch_program_day(dir) {
//     console.log("we are trying to switch the program day");
//     if (dir > 0 && program_day < 2) { // forward
//         program_day = program_day + 1;
//         get_events_and_times(program_day);
//     } else if (dir < 0 && program_day > 0) { // backward
//         program_day = program_day - 1;
//         get_events_and_times(program_day);
//     }
// }

// define a function for hovering over the family tree

// function that makes navigation sticky
function sticky_nav() {
    var navbar_list = document.getElementsByClassName("navbar-expand-md");
    var navbar = navbar_list[0]; // gets the navigation bar
    if (window.pageYOffset >= navbar_sticky_Y) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

// define a function for when they click on each button in the navigation
function top_of_page() {
    document.body.scrollTop = 0; // for Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// function that scrolls the div into view when user presses on the navigation bar
function scroll_to_view(to_view) {
    console.log('we are in the correct function');
    let element = document.getElementById(to_view);
    console.log(element);
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

// function that changes program_day to today's date if applicable,
// or the first day of the funeral
function check_today_date() {
    // console.log("Checking today's date");
    let today_date = new Date();
    if (today_date.getFullYear() == 2021) {
        // console.log("We are in the year 2021");
        if (today_date.getMonth() == 10) { // change this to 10 for final
            // console.log("We are in the month October");
            let date = today_date.getDate();
            if (date > 12 && date < 16) {
                if (date == 13) {
                    // console.log("day 13");
                    program_day = 0;
                } else if (date == 14) {
                    // console.log("day 14");
                    program_day = 1;
                } else {
                    // console.log("day 15");
                    program_day = 2;
                }
            }
        }
    }
}

// function that switches whole website to Hmong
function switch_to_hmong() {
    if (eng_lang == true) {
        document.getElementById("celebration-of-life").innerHTML = "Kev Ua Koob Tsheej Ntawm Lub Neej"; // translate "A Celebration of Life"
        document.getElementById("top").text = "Hmong for Top"; // translate "Top"
        document.getElementById("program").text = "Hmong for Funeral Program"; // translate "Funeral Program"
        document.getElementById("son").text = "Hmong for As a Son"; // translate "As a Son"
        document.getElementById("brother").text = "Hmong for As a Brother"; // translate "As a Brother"
        document.getElementById("husband").text = "Hmong for As a Husband"; // translate "As a Husband"
        document.getElementById("father").text = "Hmong for As a Father"; // translate "As a Father"
        document.getElementById("grandfather").text = "Hmong for As a Grandfather"; // translate "As a Grandfather"
        document.getElementById("family").text = "Hmong for Family Tree and Memories"; // translate "Family Tree and Memories"
        document.getElementById("memvideo").text = "Hmong for Memorial Video"; // translate "Memorial Video"
    }
    eng_lang = false;
}

// function that switches whole website to English
function switch_to_english() {
    if (eng_lang == false) {
        document.getElementById("celebration-of-life").innerHTML = "A Celebration of Life"; // translate "A Celebration of Life"
        document.getElementById("top").text = "Top"; // translate "Top"
        document.getElementById("program").text = "Funeral Program"; // translate "Funeral Program"
        document.getElementById("son").text = "As a Son"; // translate "As a Son"
        document.getElementById("brother").text = "As a Brother"; // translate "As a Brother"
        document.getElementById("husband").text = "As a Husband"; // translate "As a Husband"
        document.getElementById("father").text = "As a Father"; // translate "As a Father"
        document.getElementById("grandfather").text = "As a Grandfather"; // translate "As a Grandfather"
        document.getElementById("family").text = "Family Tree and Memories"; // translate "Family Tree and Memories"
        document.getElementById("memvideo").text = "Memorial Video"; // translate "Memorial Video"
    }
    eng_lang = true;
}