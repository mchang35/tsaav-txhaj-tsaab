var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";
})

// define a function for when they click on Hmong vs English
var eng_lang = true; // boolean for whether we are currently in English Language\

var navbar_list = document.getElementsByClassName("navbar-expand-md");
var navbar = navbar_list[0];
console.log("navbar:");
console.log(navbar);
var navbar_sticky_Y = window.scrollY + window.innerHeight;
console.log("sticky Y:");
console.log(navbar_sticky_Y);

// define a function for when they click on each button in the navigation

// when users scroll on the window, make sure that the navigation is sticky
window.onscroll = function() {sticky_nav()};



// define a function for hovering over the family tree

// function that makes navigation sticky
function sticky_nav() {
    console.log("Classes of navbar:")
    console.log(navbar.classList)
    // let list = navbar.classList
    if (window.pageYOffset >= navbar_sticky_Y) {
        // list.add("sticky");
        // navbar.classList.toggle("sticky", true);
        // if (!navbar.classList.contains("sticky")) {
            navbar.classList.add("sticky");
        // }
    } else {
        // list.remove("sticky");
        // navbar.classList.toggle("sticky", false);
        // if (navbar.classList.contains("sticky")) {
            navbar.classList.remove("sticky");
        // }
    }
}

// function that switches whole website to Hmong
function switch_to_hmong() {
    if (eng_lang == true) {
        document.getElementById("top").text = "Hmong for Top"; // translate "Top"
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