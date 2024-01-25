const headerButtons = document.getElementsByClassName("headerItem");
let totalHeight = document.body.scrollHeight - window.innerHeight;
let progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", scroll);

for (const button of headerButtons) {
    button.addEventListener("click", function (e) {        //remove later
        gotoPage(button);
    });
}
setTimeout(applyBGHight, 50);

function applyBGHight() {
    document.getElementById("backgroundImage").style.height = (document.body.scrollHeight) + "px";
}


function gotoPage(button) {
    switch (button.id) {
        case "myName":
            localStorage.setItem("scrollToLocation", 1);  //nothing for now
            break;
        case "aboutButton":
            localStorage.setItem("scrollToLocation", 2);
            break;
        case "projectsButton":
            localStorage.setItem("scrollToLocation", 3);
            break;
        case "contactButton":
            localStorage.setItem("scrollToLocation", 4);
            break;
    }
    window.location.href = "../index.html";
}

function scroll() {
    let progressHeight = (window.scrollY / totalHeight) * 100;
    progressBar.style.height = progressHeight + "%";
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}