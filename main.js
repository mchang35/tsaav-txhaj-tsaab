var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";
})

// defines where the navigation bar will be FIXED!
var navbar_sticky_Y = window.scrollY + window.innerHeight;

// defines the current day that people are looking at on the program
var program_day = 0; // 0 = Saturday, 1 = Sunday, 2 = Monday
var curr_lang = 2; // 0 = English, 1 = Hmong, 2 = both

var day_labels = ["Saturday, November 13, 2021", "Sunday, November 14, 2021",
    "Monday, November 15, 2021"];

var events = [
    [
        "Arrival (Tuaj Txug)",
        "Ceremony: Guide The Way (Taw Kev)",
        "Breakfast Provided (Noj Tshais)",
        "Ceremony: Council of Rites (Lub Rooj Txhij Thawj Lwm Tub Ncig)",
        ["Opening Ceremonial Rituals",
            "Life Transition Song (Qeej Tu Sav)",
            "The Mounting Song (Qeej Nce Neeg)",
            "Animal Offering Song (Qeej Cob Tsag)",
            "The Lunch Song (Qeej Su)",
            "The Dinner Song (Qeej Mo)"
        ],
        "Lunch Provided (Noj Sus)",
        // "Ceremony: Council of Rites (Lub Rooj Txhij Thawj Lwm Tub Ncig)",
        "Dinner Provided (Noj Mo)",
        "Ceremony: Qeej Poets Night (Txiv Qeej Mo)"
    ],
    [
        "Ceremony: Ceremonial Guests Rituals (Hauv Qhua)",
        "Breakfast Provided (Noj Tshais)",
        ["Ceremony: Qeej Songs",
            "The Breakfast Song (Qeej Tshais)",
            "The Lunch Song (Qeej Su)"
        ],
       "Lunch Provided (Noj Sus)",
        "Guest Speakers Program (Qhua Tshwj Xeeb Has Lug)",
        ["Yee Chang, Program MC (Nyaj Yig Tsaab, Tug Cev Lug)",
            "Num Fwv Tsaab, Chang Association of Minnesota Presentation " +
                "(Pabthaa Num Fwv Tsaab Has Lug Sawv Cev Koomhum Kwv Tij " +
                "Moob Tsaab Minnesota)",
            "Minnesota State Representatives Jay Xiong and Tou Xiong, " +
                "and Elected Officials Presentation (Phub Thee Ntses Xyooj " +
                "hab Tub Xyooj, Has Lug Sawv Cev Cov Num Tswv Lub Xeev Minnesota)",
            "Nao Houa Moua, Hmong 18 Council Presentation (Pabthaa Nom Huas Muas " +
                "Has Lug Sawv Cev Koomhum 18 Xeem)",
            "Toua Yang, Personal Remark, France (Npawg Vaam Tuam Yaaj Tuaj " +
                "Faabkis Teb Tuaj Has Lug)",
            "Txooj Hawj Xyoo, Personal Remark (Phooj Ywg Txooj Hawj Xyooj Has Lus)",
            "Kong Xiong, College de Samthong Group Presentation (Koo Xyoo, Has " +
                "Lug Sawv Cev Rua Paab Pawg Tub Kawm Ntawv College de Samthong)",
            "La Pao Chang, Family Remark (Laj Pov Tsaab, Has Lug Sawv " +
                "Cev Tsev Tuab Neeg)"
        ],
        ["Family Program (Tsev Tuab Neeg Has Lug)",
            "Sia Chang’s Life Story Video Presentation (Tso Video Txug Tsaav " +
                "Txhaj Tsaab Lub Neej)",
            "Mai Hang, A Personal Tribute (Maim Haam, Txuj Kev Ncu hab Tshua)",
            "Boua Leng Hang, Hang Family Remark (Npuag Leej Haam, Has Lug Sawv " +
                "Cev Tsev Xeem Haam)",
            "Yee Chang, Closing Remark (Nyaj Yig Tsaab, Cev Lug Xaus)"
        ],
        ["Ceremony: Ceremonial Guests Gratitude Ritual (Ncej Xub Qeeg)",
            "The Dinner Song (Qeej Mo)",
            "The Offer Making Song for Ceremonial Guests (Qeej Hlawv Ntawv)"
        ],
        "Sia Chang Dinner (Tsaav Txhaj Tsaab Pluag Mo)",
        "Ceremony: Setup Council of Elders Table (Pib Rooj Xai Rooj Xim)",
        ["Ceremony: Blessing Ceremony (Pib Has Xim)",
            "Wung True Chang, Master of Blessing Ceremony (Vaam Rwg Tsaab, " +
                "Txiv Coj Xai)",
            "Family Blessings Request Ritual (Tsev Tuab Neeg Xyom)"
        ]
    ],
    [
        ["Ceremony: Early Morning Rituals",
            "Offer Making Song (Qeej Hlawv Ntawv)",
            "Offer Making Bowing Ritual (Xyom Txais Koob Txais Moov)"
        ],
        "Breakfast Provided (Noj Tshais)",
        ["Ceremony: Mid Morning Rituals",
            "The Breakfast Song (Qeej Tshais)",
            "The Departure Song (Qeej Sawv Kev)"
        ],
        "Procession to Lakewood Cemetery, Minneapolis",
        "Interment Services"
    ]
]; // events for days 0, 1, 2, respectively
var hmong_events = [
    [
        "Tuaj Txug",
        "Taw Kev",
        "Noj Tshais",
        "Lub Rooj Txhij Thawj Lwm Tub Ncig",
        ["Opening Ceremonial Rituals",
            "Qeej Tu Sav",
            "Qeej Nce Neeg",
            "Qeej Cob Tsag",
            "Qeej Su",
            "Qeej Mo"
        ],
        "Noj Sus",
        "Noj Mo",
        "Txiv Qeej Mo"
    ],
    [
        "Hauv Qhua",
        "Noj Tshais",
        ["Ceremony: Qeej Songs",
            "Qeej Tshais",
            "Qeej Su"
        ],
        "Noj Sus",
        "Qhua Tshwj Xeeb Has Lug",
        ["Nyaj Yig Tsaab, Tug Cev Lug",
            "Pabthaa Num Fwv Tsaab Has Lug Sawv Cev Koomhum Kwv Tij" +
                "Moob Tsaab Minnesota",
            "Phub Thee Ntses Xyooj hab Tub Xyooj, Has Lug Sawv Cev " +
                "Cov Num Tswv Lub Xeev Minnesota",
            "Pabthaa Nom Huas Muas Has Lug Sawv Cev Koomhum 18 Xeem",
            "Npawg Vaam Tuam Yaaj Tuaj Faabkis Teb Tuaj Has Lug",
            "Phooj Ywg Txooj Hawj Xyooj Has Lus",
            "Koo Xyoo, Has Lug Sawv Cev Rua Paab Pawg Tub Kawm Ntawv College de Samthong",
            "Laj Pov Tsaab, Has Lug Sawv Cev Tsev Tuab Neeg"
        ],
        ["Tsev Tuab Neeg Has Lug",
            "Tso Video Txug Tsaav Txhaj Tsaab Lub Neej",
            "Maim Haam, Txuj Kev Ncu hab Tshua",
            "Npuag Leej Haam, Has Lug Sawv Cev Tsev Xeem Haam",
            "Nyaj Yig Tsaab, Cev Lug Xaus"
        ],
        ["Ncej Xub Qeeg",
            "Qeej Mo",
            "Qeej Hlawv Ntawv"
        ],
        "Tsaav Txhaj Tsaab Pluag Mo",
        "Pib Rooj Xai Rooj Xim",
        ["Pib Has Xim",
            "Vaam Rwg Tsaab, Txiv Coj Xai",
            "Tsev Tuab Neeg Xyom"
        ]
    ],
    [
        ["Ceremony: Early Morning Rituals",
            "Qeej Hlawv Ntawv",
            "Xyom Txais Koob Txais Moov"
        ],
        "Noj Tshais",
        ["Ceremony: Mid Morning Rituals",
            "Qeej Tshais",
            "Qeej Sawv Kev"
        ],
        "Procession to Lakewood Cemetery, Minneapolis",
        "Interment Services"
    ]
]; // events for days 0, 1, 2, respectively (IN HMONG)
var eng_events = [
    [
        "Arrival",
        "Ceremony: Guide The Way",
        "Breakfast Provided",
        "Ceremony: Council of Rites",
        ["Opening Ceremonial Rituals",
            "Life Transition Song",
            "The Mounting Song",
            "Animal Offering Song",
            "The Lunch Song",
            "The Dinner Song"
        ],
        "Lunch Provided",
        "Dinner Provided",
        "Ceremony: Qeej Poets Night"
    ],
    [
        "Ceremony: Ceremonial Guests Rituals",
        "Breakfast Provided",
        ["Ceremony: Qeej Songs",
            "The Breakfast Song",
            "The Lunch Song"
        ],
        "Lunch Provided",
        "Guest Speakers Program",
        ["Yee Chang, Program MC",
            "Num Fwv Tsaab, Chang Association of Minnesota Presentation",
            "Minnesota State Representatives Jay Xiong and Tou Xiong, " +
                "and Elected Officials Presentation",
            "Nao Houa Moua, Hmong 18 Council Presentation",
            "Toua Yang, Personal Remark, France",
            "Txooj Hawj Xyoo, Personal Remark",
            "Kong Xiong, College de Samthong Group Presentation",
            "La Pao Chang, Family Remark"
        ],
        ["Family Program",
            "Sia Chang’s Life Story Video Presentation",
            "Mai Hang, A Personal Tribute",
            "Boua Leng Hang, Hang Family Remark",
            "Yee Chang, Closing Remark"
        ],
        ["Ceremony: Ceremonial Guests Gratitude Ritual",
            "The Dinner Song",
            "The Offer Making Song for Ceremonial Guests"
        ],
        "Sia Chang Dinner",
        "Ceremony: Setup Council of Elders Table",
        ["Ceremony: Blessing Ceremony",
            "Wung True Chang, Master of Blessing Ceremony",
            "Family Blessings Request Ritual"
        ]
    ],
    [
        ["Ceremony: Early Morning Rituals",
            "Offer Making Song",
            "Offer Making Bowing Ritual"
        ],
        "Breakfast Provided",
        ["Ceremony: Mid Morning Rituals",
            "The Breakfast Song",
            "The Departure Song"
        ],
        "Procession to Lakewood Cemetery, Minneapolis",
        "Interment Services"
    ]
]; // events for days 0, 1, 2, respectively (in ENGLISH)

var times = [
    ["7:00 AM", "8:00 AM*", "9:00 AM", " ", "11:00 AM*", "1:00 PM",
        "7:00 PM", "9:00 PM*"],
    ["8:00 AM*", "9:00 AM", "10:00 AM*", "12:00 PM", "2:00 PM", " ", "3:30 PM",
        "5:00 PM*", "7:00 PM", "8:00 PM*", "12:00 AM*"],
    ["5:00 AM*", "8:30 AM", "10:00 AM*", "12:15 PM*", "1:00 PM"]
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

function change_btn_colors(day_true, val) {
    let old_btn = null; // to store the old button
    let new_btn = null; // to store the new button
    if (day_true) { // if we are changing a DAY button
        // get the old button first
        if (program_day == 0) {
            old_btn = document.getElementById("saturday-btn");
        } else if (program_day == 1) {
            old_btn = document.getElementById("sunday-btn");
        } else {
            old_btn = document.getElementById("monday-btn");
        }
        // get the new button
        if (val == 0) {
            new_btn = document.getElementById("saturday-btn");
        } else if (val == 1) {
            new_btn = document.getElementById("sunday-btn");
        } else {
            new_btn = document.getElementById("monday-btn");
        }
    } else { // if we are changing a LANGUAGE button
        // get the old button
        if (curr_lang == 0) {
            old_btn = document.getElementById("en-btn");
        } else if (curr_lang == 1) {
            old_btn = document.getElementById("hm-btn");
        } else {
            old_btn = document.getElementById("both-lang-btn");
        }
        // get the new button
        if (val == 0) {
            new_btn = document.getElementById("en-btn");
        } else if (val == 1) {
            new_btn = document.getElementById("hm-btn");
        } else {
            new_btn = document.getElementById("both-lang-btn");
        }
    }

    // change the colors
    old_btn.style.backgroundColor = "#aeddfc";
    new_btn.style.backgroundColor = "black"; // #aeddfc
    old_btn.style.color = "black";
    new_btn.style.color = "white";
}

// function that switches the program content based on the button day pressed
function display_events_and_times(day=program_day, lang=curr_lang) {
    if (day != program_day || lang != curr_lang) { // only change things if we're changing the day or language
        // change the color of the buttons
        if (day != program_day) {
            change_btn_colors(true, day);
        } else if (lang != curr_lang) {
            change_btn_colors(false, lang);
        }
        program_day = day; // update the program day
        curr_lang = lang; // update the current language
        let day_events = events[program_day]; // default is both languages
        if (curr_lang == 0) {
            day_events = eng_events[program_day]; // collect all event names in English
        } else if (curr_lang == 1) {
            day_events = hmong_events[program_day]; // collect all event names in Hmong
        }

        let day_times = times[program_day]; // collect all event times
        // get rid of everything that's currently in there
        let day_inner_container = document.getElementById("day-inner-container"); // get the container of the program
        let items = day_inner_container.childNodes; // get list of children to remove
        while (items.length > 0) { // remove all children in the day's inner container
            day_inner_container.removeChild(items[0]);
        }

        // add everything new
        document.getElementById("day-label").innerHTML = day_labels[program_day]; // change the day label
        for (let i = 0; i < day_events.length; i++) { // for each event
            let all_events = day_events[i]; // the event or all events for the row
            let sub_events = null; // to store the sub-events
            // console.log('Sub events: ' + sub_events);
            let name_event = ''; // to get the name of the primary event of the row
            let sub_events_exist = false; // to store whether there are sub-events
            if (typeof all_events != 'string') { // if there ARE sub-events
                name_event = all_events[0]; // the primary event of the row is the first item
                sub_events = all_events.slice(1); // the sub-events are the rest of the items
                sub_events_exist = true; // there ARE sub-events
            } else { // if there are NO sub-events
                name_event = all_events; // the name of the event is the all_events item
            }

            let time = day_times[i]; // get the time for the event
            let program_item = document.createElement("div"); // create the program item
            program_item.classList.add("program-item");
            program_item.classList.add("row");
            program_item.classList.add("my-2");

            let program_item_time = document.createElement("div"); // create the time
            program_item_time.classList.add("program-item-time");
            program_item_time.classList.add("text-right");
            program_item_time.classList.add("col");
            program_item_time.innerHTML = time;

            let program_item_name = document.createElement("div"); // create the name
            program_item_name.classList.add("program-item-name");
            program_item_name.classList.add("col-8");
            program_item_name.classList.add("text-left");
            program_item_name.innerHTML = name_event;
            if (sub_events_exist) { // if there are sub-events
                let ul = document.createElement("ul"); // make an unordered list
                // ul.style.listStyleType = "none"; // no bullet points in the list
                for (let j = 0; j < sub_events.length; j++) { // for each sub-event
                    let li = document.createElement("li"); // make a list item
                    li.classList.add("text-left");
                    li.innerHTML = sub_events[j];
                    ul.appendChild(li); // add the list item to the unordered list
                }
                program_item_name.appendChild(ul); // add the unordered list to the item name
            }

            program_item.appendChild(program_item_time); // add time to item
            program_item.appendChild(program_item_name); // add name to item

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
    let element = document.getElementById(to_view);
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
}