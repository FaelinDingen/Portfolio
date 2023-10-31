function sendMail() {
    var params = {
        name: document.getElementById("contactName").value,
        email: document.getElementById("contactEmail").value,
        message: document.getElementById("contactMessage").value,
    };
    if (!(params.name === "" || params.email === "" || params.message === "")) {

        const serviceID = "service_45w6otp";
        const templateID = "template_80s6zwg";

        emailjs.send(serviceID, templateID, params)
            .then(
                res => {
                    document.getElementById("contactName").value = "";
                    document.getElementById("contactEmail").value = "";
                    document.getElementById("contactMessage").value = "";
                    console.log(res);
                    alert("Your message sent successfully")
                }
            )
            .catch(err => console.log(err));
    }
}