var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";
})

// var eng_lang = true; // boolean for whether we are currently in English Language

// defines where the navigation bar will be FIXED!
var navbar_sticky_Y = window.scrollY + window.innerHeight;

// defines the current day that people are looking at on the program
var program_day = 0; // 0 = Saturday, 1 = Sunday, 2 = Monday
var curr_lang = 2; // 0 = English, 1 = Hmong, 2 = both
check_today_date(); // change program_day if necessary
display_events_and_times(day=0, lang=2); // set the program to be the day

var day_labels = ["Saturday, November 13, 2021", "Sunday, November 14, 2021",
    "Monday, November 15, 2021"];
var events = [
    [
        "Arrival",
        "Guide The Way Ceremony (Taw Kev)",
        ["Life Transition Song (Qeej Tu Sav)",
            "The Mounting Song (Qeej Nce Neeg)",
            "The Breakfast Song (Qeej Tshais)",
            "The Lunch Song (Qeej Su)",
            "The Dinner Song (Qeej Mo)"
        ],
        "Lunch Provided (Noj Su)",
        "Councel of Funeral Rites Ceremony (Rooj Tam Thawj Lwm Tub Ncig)",
        "Dinner (Noj Mo)"
    ],
    [
        "Special Invited Guests Rituals (Hauv Qhua)",
        "Breakfast Provided (Noj Tshais)",
        "Lunch Provided (Noj Su)",
        ["Guest Speakers (Qhua Tshwj Xeeb Has Lug)",
            "Cousin Toua Yang, France (Npawg Tuam Yaaj, Faabkis Teb)",
            "Xyooj, College Classmate, need to verify full name",
            "College de Samthong Group Presentation (Need name of speaker)",
            "Minnesota Representatives Jay Xiong, Tou Xiong, and Elected Officials Presentation"
        ],
        ["Family Program (Tsev Tuab Neeg Has Lug)",
            "Yee Chang, Narrator for Video Presentation (Nyaj Yig Tsaab, Tug Cev Lug Rua Kev Tso Video Saib)",
            "Sia Chang's Life Story Video Presentation (Tso Video Txug Tsaav Txhaj Tsaab Lub Neej)",
            "Mai Hang, A Personal Tribute (Maim Haam, Txuj Kev Ncu hab Tshua)"
        ],
        "Sia Chang Dinner (Tsaav Txhaj Tsaab Pluag Mo)",
        "Setup Table of Blessings and Bequests (Tsaa Rooj Xais Rooj Xwm)",
        "Table of Blessings and Bequests Ceremony (Rooj Xai Rooj Xwm)",
        ["Blessing Ceremony (Has Xwm)",
            "Wang True Chang, Master of Blessing Ceremony (Vaam Rwg Tsaab, Txiv Coj Xai)",
            "Family Blessings Request Ritual (Tsev Tuab Neeg Xyom)"]
    ],
    [
        ["The Blessing Bows Song (Qeej Xyom)",
            "Blessings Received Ritual (Txais Koob Txais Moov)"
        ],
        "The Offer Making (Hlawv Ntawv)",
        "The Breakfast Song (Qeej Tshais)",
        "Breakfast Provided (Noj Tshais)",
        "The Lunch Song (Qeej Su)",
        "The Departure Song (Qeej Sawv Kev)",
        "Procession to Lakewood Cemetery (Moog Chaw Zais Lakewood Cemetery)",
        "Internment Services",
        "Guest Dinner at House (Qhua Lug Noj Mo Tom Tsev)"
    ]
]; // events for days 0, 1, 2, respectively
var hmong_events = [
    [
        "Arrival",
        "Taw Kev",
        ["Qeej Tu Sav",
            "Qeej Nce Neeg",
            "Qeej Tshais",
            "Qeej Su",
            "Qeej Mo"
        ],
        "Noj Su",
        "Rooj Tam Thawj Lwm Tub Ncig",
        "Noj Mo"
    ],
    [
        "Hauv Qhua",
        "Noj Tshais",
        "Noj Su",
        [
            "Qhua Tshwj Xeeb Has Lug",
            "Npawg Tuam Yaaj, Faabkis Teb",
            "Xyooj, College Classmate, need to verify full name",
            "College de Samthong Group Presentation (Need name of speaker)",
            "Minnesota Representatives Jay Xiong, Tou Xiong, and Elected Officials Presentation"
        ],
        [
            "Tsev Tuab Neeg Has Lug",
            "Nyaj Yig Tsaab, Tug Cev Lug Rua Kev Tso Video Saib",
            "Tso Video Txug Tsaav Txhaj Tsaab Lub Neej",
            "Maim Haam, Txuj Kev Ncu hab Tshua"
        ],
        "Tsaav Txhaj Tsaab Pluag Mo",
        "Tsaa Rooj Xais Rooj Xwm",
        "Rooj Xai Rooj Xwm",
            ["Has Xwm",
            "Vaam Rwg Tsaab, Txiv Coj Xai",
            "Tsev Tuab Neeg Xyom"]
    ],
    [
        ["Qeej Xyom",
            "Txais Koob Txais Moov"
        ],
        "Hlawv Ntawv",
        "Qeej Tshais",
        "Noj Tshais",
        "Qeej Su",
        "Qeej Sawv Kev",
        "Moog Chaw Zais Lakewood Cemetery",
        "Internment Services",
        "Qhua Lug Noj Mo Tom Tsev"
    ]
]; // events for days 0, 1, 2, respectively (IN HMONG)
var eng_events = [
    [
        "Arrival",
        "Guide The Way Ceremony",
        ["Life Transition Song",
            "The Mounting Song",
            "The Breakfast Song",
            "The Lunch Song",
            "The Dinner Song"
        ],
        "Lunch Provided",
        "Council of Funeral Rites Ceremony",
        "Dinner"
    ],
    [
        "Special Invited Guests Rituals",
        "Breakfast Provided",
        "Lunch Provided",
        ["Guest Speakers",
            "Cousin Toua Yang, France",
            "Xyooj, College Classmate, need to verify full name",
            "College de Samthong Group Presentation (Need name of speaker)",
            "Minnesota Representatives Jay Xiong, Tou Xiong, and Elected Officials Presentation"
        ],
        ["Family Program",
            "Yee Chang, Narrator for Video Presentation",
            "Sia Chang's Life Story Video Presentation",
            "Mai Hang, A Personal Tribute"
        ],
        "Sia Chang Dinner",
        "Setup Table of Blessings and Bequests",
        "Table of Blessings and Bequests Ceremony",
            ["Blessing Ceremony",
            "Wang True Chang, Master of Blessing Ceremony",
            "Family Blessings Request Ritual"]
    ],
    [
        ["The Blessing Bows Song",
            "Blessings Received Ritual"
        ],
        "The Offer Making",
        "The Breakfast Song",
        "Breakfast Provided",
        "The Lunch Song",
        "The Departure Song",
        "Procession to Lakewood Cemetery",
        "Internment Services",
        "Guest Dinner at House"
    ]
]; // events for days 0, 1, 2, respectively (in ENGLISH)
var times = [
    ["8:00am", "9:00am", "12:00pm", "1:00pm", "3:00pm", "7:00pm"],
    ["8:00am", "8:30am", "12:00pm", "2:00pm", "4:00pm", "6:00pm",
        "7:00pm", "8:00pm", "12:00am"],
    ["4:00am", "5:00am", "6:00am", "8:30am", "10:00am", "11:00am",
        "12:15pm", "1:00pm", "5:00pm"]
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

// function that switches the program content based on the button day pressed
function display_events_and_times(day=program_day, lang=curr_lang) {
    console.log('A NEW BUTTON PRESSED! The day is ' + day + ' and the language is ' + lang);
    if (day != program_day || lang != curr_lang) { // only change things if we're changing the day
        program_day = day; // update the program day
        curr_lang = lang; // update the current language
        let day_events = events[program_day]; // default is both languages
        if (curr_lang == 0) {
            day_events = eng_events[program_day]; // collect all event names in English
        } else if (curr_lang == 1) {
            day_events = hmong_events[program_day]; // collect all event names in Hmong
        }
        console.log("the day's events are ");
        for (let i = 0; i < day_events.length; i++) {
            console.log(day_events[i]);
        }
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
            let all_events = day_events[i];
            let sub_events = null;
            // console.log('Sub events: ' + sub_events);
            let name_event = '';
            let sub_events_exist = false;
            if (typeof all_events != 'string') {
                name_event = all_events[0];
                sub_events = all_events.slice(2);
                sub_events_exist = true;
            } else {
                name_event = all_events;
            }
            // console.log('Name of main event: ' + name_event);
            // console.log('Now Sub events: ' + sub_events);
            let time = day_times[i];
            let program_item = document.createElement("div"); // create the item
            program_item.classList.add("program-item");
            program_item.classList.add("row");
            program_item.classList.add("my-2");
            let program_item_name = document.createElement("div"); // create the name
            program_item_name.classList.add("program-item-name");
            program_item_name.classList.add("col");
            program_item_name.classList.add("text-left");
            program_item_name.innerHTML = name_event;
            if (sub_events_exist) {
                let ul = document.createElement("ul");
                ul.style.listStyleType = "none"; // ("list-style-type:none;");
                for (let j = 0; j < sub_events.length; j++) {
                    let li = document.createElement("li");
                    li.innerHTML = sub_events[j];
                    ul.appendChild(li);
                }
                program_item_name.appendChild(ul);
            }
            let program_item_time = document.createElement("div"); // create the time
            program_item_time.classList.add("program-item-time");
            program_item_time.classList.add("col");
            program_item_time.classList.add("text-right");
            program_item_time.innerHTML = time;

            program_item.appendChild(program_item_name); // add name to item
            program_item.appendChild(program_item_time); // add time to item

            day_inner_container.appendChild(program_item); // add item to container
        }
    }
}

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
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
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