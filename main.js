const videoHeight = document.getElementById("videoWraper");
const maximizeButton = document.getElementById("maximizeArrow");
const headerButtons = document.getElementsByClassName("headerButton");
const headerBar = document.querySelector(".menuBar");
const myName = document.getElementById("myName");
const projectsScroller = document.getElementById("projectsScroller");
const aboutMeText = document.getElementById("aboutMeScroller");
const contactScroller = document.getElementById("contactSendButton");
const aboutButtons = document.getElementsByClassName("aboutButton");
const projectsButtons = document.getElementsByClassName("projectsButton");
const contactButtons = document.getElementsByClassName("contactButton");
const scrollwatcher = document.createElement("div");
const cards = document.getElementsByClassName("card");
const skillFlexContainers = document.getElementsByClassName("skillFlexContainer");
const progressBar = document.getElementById("progressBar");
const destinations = undefined;
let cardsObserved = 0;
let canScroll = true;
let totalHeight = undefined;
let showSkillCounter = 0;
let justScrolledFromOtherPage = "1";

scrollwatcher.setAttribute("data-scroll-watcher", "");
headerBar.before(scrollwatcher);

headerObserver = new IntersectionObserver((entries) => {
    toggleButtons();
})
cardObserver = new IntersectionObserver((entries) => {
    playCard();
}, {
    threshold: .5
})

window.addEventListener("scroll", minimalizeVideo);
window.addEventListener("scroll", scroll);
maximizeButton.addEventListener("click", buttonMaximize);
myName.addEventListener("click", gotoTop);
for (const aboutButton of aboutButtons)
    aboutButton.addEventListener("click", function () {
        scrollToSomewhere(aboutMeText);
    });
for (const projectsButton of projectsButtons)
    projectsButton.addEventListener("click", function () {
        scrollToSomewhere(projectsScroller);
    });
for (const contactButton of contactButtons)
    contactButton.addEventListener("click", function () {
        scrollToSomewhere(contactScroller);
    });
headerObserver.observe(scrollwatcher);
cardObserver.observe(cards[1]);

setTimeout(minimalizeVideo, 3500);
//depending on the zoom the header sometimes is activated in the begining, so to fix this it checks after .05 seconds. see checkheader for more
setTimeout(checkHeader, 50);

for (const skillFlexContainer of skillFlexContainers) {

    skillObserver = new IntersectionObserver((entries) => {
        showSkills(skillFlexContainer);
    }, {
        // threshold: 1
    })
    skillObserver.observe(skillFlexContainer);
}



//checks to see if the header is in the right phase
function checkHeader() {
    //toggles if needed
    if (myName.classList.contains("nameGoLeft") && (justScrolledFromOtherPage === "1" || justScrolledFromOtherPage === "2")) {
        toggleButtons();
    }
    //does reverse for last 2 buttons on prject page because they are below the activation threashhold
    if (!myName.classList.contains("nameGoLeft") && (justScrolledFromOtherPage === "3" || justScrolledFromOtherPage === "4")) {
        toggleButtons();
    }
}

function scroll() {
    if (totalHeight == null) {
        setTotalHeight();
    }

    let progressHeight = (window.scrollY / totalHeight) * 100;
    progressBar.style.height = progressHeight + "%";
}

function buttonMaximize() {
    canScroll = false;
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    videoHeight.style.minHeight = 100 + "vh";
    setTimeout(function () {
        canScroll = true;
    }, 800); /* time out scroll detection as auto scroll also counts*/
}

function toggleButtons() {
    for (const button of headerButtons) {
        button.classList.toggle("visible");
        button.classList.toggle("hidden");
    }
    myName.classList.toggle("nameGoLeft");
    headerBar.classList.toggle("barColord");
    headerButtons[0].classList.toggle("headerButton1");
    headerButtons[1].classList.toggle("headerButton2");
    headerButtons[2].classList.toggle("headerButton3");
}

function playCard() {
    if (cardsObserved < 2) {
        for (let i = 0; i < cards.length; i++) {
            // if i is divisible by 3, go right
            if (i % 3 == 0) {
                cards[i].classList.toggle("cardGoRight");
            }
            // if i is not divisible by 3, but (i + 1) is, go left
            else if ((i + 1) % 3 == 0) {
                cards[i].classList.toggle("cardGoLeft");
            }
        }
        cardsObserved++;
    }
}

function showSkills(whatSkill) {
    if (showSkillCounter > skillFlexContainers.length - 1 && showSkillCounter < skillFlexContainers.length + skillFlexContainers.length && whatSkill.style.width < 1) {
        const destination = (60 / 100) * parseInt(whatSkill.querySelector(":nth-child(2)").textContent);
        whatSkill.style.width = (60 / 100) * parseInt(whatSkill.querySelector(":nth-child(2)").textContent) + "vw";
        whatSkill.querySelector(":nth-child(2)").classList.toggle("visible");
        whatSkill.querySelector(":nth-child(1)").classList.toggle("visible");
        requestAnimationFrame(function () {
            updateSkills(whatSkill, destination);
        });
    }

    if (whatSkill.style.width < 1) {
        showSkillCounter++;
    }
}

//only bug that there is is when resizing the window while the animation is playing
function updateSkills(skill, destination, updating = { value: false }) {
    if (!updating.value) {
        if (updating.value !== undefined) {
            updating.value = true;
        }
        setTimeout(function (updating) {
            updating.value = undefined;
        }, 5000, updating);
    }

    //gets vwWidth
    const vwWidth = ((parseFloat(getComputedStyle(skill).getPropertyValue('width')) / window.innerWidth) * 100).toFixed(2);     //need to figure out what this does
    if (vwWidth / 60 * 100 > 75) {
        skill.querySelector(":nth-child(2)").innerHTML = "Expert";
    }
    else if (vwWidth / 60 * 100 > 50) {
        skill.querySelector(":nth-child(2)").innerHTML = "Advanced";
    }
    else if (vwWidth / 60 * 100 > 25) {
        skill.querySelector(":nth-child(2)").innerHTML = "Intermediate";
    }
    else if (vwWidth / 60 * 100 > 0) {
        skill.querySelector(":nth-child(2)").innerHTML = "Beginner";
    }
    //stops if the updating is undefined and if the value is in range with its destination
    console.log(updating.value);
    if (updating.value === undefined && !inRange(((vwWidth / 60) * 100), destination)) {
        console.log("Returned");
        if (vwWidth / 60 * 100 > 75) {
            skill.querySelector(":nth-child(2)").innerHTML = "Expert";
        }
        else if (vwWidth / 60 * 100 > 50) {
            skill.querySelector(":nth-child(2)").innerHTML = "Advanced";
        }
        else if (vwWidth / 60 * 100 > 25) {
            skill.querySelector(":nth-child(2)").innerHTML = "Intermediate";
        }
        else if (vwWidth / 60 * 100 > 0) {
            skill.querySelector(":nth-child(2)").innerHTML = "Beginner";
        }

        skill.style.transition = "none";
        return;
    }
    requestAnimationFrame(function () {
        updateSkills(skill, destination, updating);
    });
}

function inRange(value, destination) {
    return value - destination > -.2 && value - destination < .2;
}

function minimalizeVideo() {
    if (canScroll && window.scrollY < 300) {        //might have some problems with smaller screens

        videoHeight.style.minHeight = 70 + "vh";
        setTimeout(setTotalHeight, 1000);
    }
}

function setTotalHeight() {
    totalHeight = document.body.scrollHeight - window.innerHeight;
}

function gotoTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function scrollToSomewhere(whereTo) {
    whereTo.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
    });
}

window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("scrollToLocation") !== null) {
        const scrollToSection = localStorage.getItem("scrollToLocation");
        console.log(scrollToSection);
        //sets var to on what button it pressed to come here for 100ms so that the headerchecker works
        justScrolledFromOtherPage = scrollToSection;
        setTimeout(resetJustScrolledFromOtherPage, 100);
        localStorage.removeItem("scrollToLocation");
        switch (scrollToSection) {
            case "1":               //need to update de scroll to things every time i change the website size. it might be buggy
                gotoTop();
                break;
            case "2":
                window.scrollTo(0, 754);
                break;
            case "3":
                window.scrollTo(0, 1500);
                break;
            case "4":
                window.scrollTo(0, 9999);
                break;
        }
    }
});

//set the aforementioned var to false after 100ms
function resetJustScrolledFromOtherPage() {
    justScrolledFromOtherPage = "no";
}

