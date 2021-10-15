var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";
})

// define a function for when they click on Hmong vs English
var eng_lang = true; // boolean for whether we are currently in English Language

var navbar_list = document.getElementsByClassName("navbar-expand-md");
var navbar = navbar_list[0]; // gets the navigation bar
// defines where the navigation bar will be FIXED!
var navbar_sticky_Y = window.scrollY + window.innerHeight;

// defines where the program starts

// defines the current day that people are looking at on the program
var program_day = 0 // 0 = Saturday, 1 = Sunday, 2 = Monday
// Saturday events and times
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
];
var times = [
    ["1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm",
        "7:00pm", "8:00pm"],
    ["1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm",
        "7:00pm", "8:00pm"],
    ["1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm",
        "7:00pm", "8:00pm"]
];
// var day0events = ["Saturday Event 1", "Saturday Event 2", "Saturday Event 3",
//     "Saturday Event 4", "Saturday Event 5", "Saturday Event 6", "Saturday Event 7",
//     "Saturday Event 8"];
// var day0times = ["1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm",
//     "7:00pm", "8:00pm"];
// // Sunday events and times
// var day1events = ["Sunday Event 1", "Sunday Event 2", "Sunday Event 3",
//     "Sunday Event 4", "Sunday Event 5", "Sunday Event 6", "Sunday Event 7",
//     "Sunday Event 8"];
// var day1times = ["1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm",
//     "7:00pm", "8:00pm"];
// // Monday events and times
// var day2events = ["Monday Event 1", "Monday Event 2", "Monday Event 3",
//     "Monday Event 4", "Monday Event 5", "Monday Event 6", "Monday Event 7",
//     "Monday Event 8"];
// var day2times = ["1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm",
//     "7:00pm", "8:00pm"];

// defines where the Son portion starts

// defines where the Brother portion starts

// defines where the Husband portion starts

// defines where the Father portion starts

// defines where the Grandfather portion starts

// defines where the Family Tree/Memories portion starts

// defines where the Memorial Video portion starts

// when users scroll on the window, make sure that the navigation is sticky
window.onscroll = function() {sticky_nav()};

// define a function that goes to diff days when user scrolls LEFT or RIGHT

function get_events_and_times(program_day) {
    let day_events = events[program_day];
    let day_times = times[program_day];
    console.log(day_events);
    console.log(day_times);
    // get rid of everything that's currently in there
    // add everything new
}
// define a function that goes to diff days when the user presses LEFT or RIGHT
function switch_program_day(dir) {
    console.log("we are trying to switch the program day");
    if (dir > 0 && program_day < 2) { // forward
        program_day = program_day + 1;
        get_events_and_times(program_day);
    } else if (dir < 0 && program_day > 0) { // backward
        program_day = program_day - 1;
        get_events_and_times(program_day);
    }
}

// document.getElementById("right-arrow").addEventListener("click", switch_program_day(1));
// document.getElementById("left-arrow").addEventListener("click", switch_program_day(-1));

// define a function for hovering over the family tree

// function that makes navigation sticky
function sticky_nav() {
    if (window.pageYOffset >= navbar_sticky_Y) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

// define a function that makes things appear as you scroll
// make things VISIBLE vs NOT (they're always there though)

// define a function for when they click on each button in the navigation
function top_of_page() {
    console.log("Top of the page");
    document.body.scrollTop = 0; // for Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function program() {

}

function son() {

}

function brother() {

}

function husband() {

}

function father() {

}

function grandfather() {

}

function family() {

}

function memvideo() {

}

// function that switches whole website to Hmong
function switch_to_hmong() {
    if (eng_lang == true) {
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