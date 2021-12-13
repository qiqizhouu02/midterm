const app = {

    apiUrl: 'https://sheetdb.io/api/v1/yvzor0apt6uax',

    initialize: () => {
        app.attachListeners();
    },

    attachListeners: () => {
        $('.submit').click(e => {
            app.postEntry();
        })
    },

    postEntry: () => {
        fetch(app.apiUrl)
        let firstName = document.getElementById("fname")
        let Message = document.getElementById("Message")
        let eMail = document.getElementById("eMail")
        if (firstName.value !== '' && Message.value !== '' && ValidateEmail(eMail) == true) {
            document.getElementById("Submit").style.display = "none";
            setTimeout(function() { alert("Thanks for your submission!"); }, 1000);

        } else {
            firstName.classList.add("invalid")
            if (firstName.value == '') {
                firstName.classList.add("invalid")
            }
            if (Message.value == '') {
                Message.classList.add("invalid")
            }
            if (ValidateEmail(eMail) == false) {
                eMail.classList.add("invalid")
            }
        }

    }
}

function ValidateEmail(eMail) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(eMail.value);
}