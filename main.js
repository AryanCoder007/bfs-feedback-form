const form = document.querySelector("form");
const fullname = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const review = document.getElementById("review");
const message = document.getElementById("message");


function sendEmail(){
    const bodyMessage = `Full Name: ${fullname.value}<br> Phone Number: ${phone.value}<br> Email Address: ${email.value}<br> Review: ${review.value}<br> Comment: ${message.value}<br>`;
    const subMessage = `Review by ${fullname.value}`

    Email.send({
        SecureToken: "fcdc16ea-e01b-4783-ac86-71f71637507e",
        To : 'bfswebemail@gmail.com',
        From : "bfswebemail@gmail.com",
        Subject : subMessage,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Success!",
                text: "Your feedback has been submitted!",
                icon: "success"
              });
        }
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-text.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value != "") {
            errorTxtEmail.innerHTML = "Enter a valid Email Address";
        }
        else {
            errorTxtEmail.innerHTML = "Email Adress can't be blank";
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullname.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !review.classList.contains("error") && !message.classList.contains("error")){
        sendEmail();

        form.reset();
        return false;
    }


});