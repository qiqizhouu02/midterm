const app = {

    apiUrl: 'https://sheetdb.io/api/v1/yvzor0apt6uax',

    initialize: () => {
        app.attachListeners();
    },

    attachListeners: () => {
        $('.submit').click(e => {
            app.checkForm();

        })

    },
    checkForm: () => {
        let firstName = document.getElementById("fname")
        let Message = document.getElementById("Message")
        let eMail = document.getElementById("eMail")
        if (firstName.value !== '' && Message.value !== '' && app.validateEmail(eMail) == true) {
            app.addSomeone();

        } else {
            firstName.classList.add("invalid")
            if (firstName.value == '') {
                firstName.classList.add("invalid")
            }
            if (Message.value == '') {
                Message.classList.add("invalid")
            }
            if (app.validateEmail(eMail) == false) {
                eMail.classList.add("invalid")
            }
        }
    },
    validateEmail: (eMail) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(eMail.value);
    },

    addSomeone: () => {
        const data = {
            firstName: $('.firstName').val(),
            eMail: $('.eMail').val(),
            Message: $('.Message').val(),
        };

        const requestBody = { data: [data] };

        fetch(app.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                // after successful submit
                response.json();
                app.clearForm();

            })
    },

    clearForm: () => {
        let firstName = document.getElementById("fname")
        firstName.value = "";
        let Message = document.getElementById("Message")
        Message.value = "";
        let eMail = document.getElementById("eMail")
        eMail.value = "";
        let subMit = document.getElementById("Submit")
        subMit.style.display = "none";
        let results = document.getElementById("results");
        results.innerHTML = 'Thanks for submitting!';
        console.log("help ")
    }

}