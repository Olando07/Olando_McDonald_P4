function validate(e) {
    // hides all error messages on the page
    hideErrors();    

    if (formHasErrors()) {
        // prevents the form from submitting
        e.preventDefault();

        return false;
    }

}

function resetForm() {
    //confirms that the user wants to reset the form
    if (confirm("Do you want to clear the survey?")) {
        // hides all error messages
        hideErrors();

        // clears the form
        let fields = ["name", "number", "email", "feedback"]

        for (let i = 0; i < fields.length; i++)
        {
            let field = document.getElementById(fields[i]).value = "";
        }
        
        document.getElementById("name").focus();
    }
    e.preventDefault();

}

function formHasErrors() {
    // checks if the form has any errors
    let errorFlag = false;

    let requiredFields = ["name", "number", "email"];
    
    for (let i = 0; i < requiredFields.length; i++)
    {
        let field = document.getElementById(requiredFields[i]);

        if (field.value.trim() == "" || field.value == null)
        {
            document.getElementById(requiredFields[i] + "_error").style.display = "block";
            if (!errorFlag)
            {
                field.focus();
                field.select();
            }
            errorFlag = true;
        }
    }

    let phoneRegex = new RegExp(/^\(\d{3}\)\s\d{3}-\d{4}/);
    let phone = document.getElementById("number").value;
    if (!phoneRegex.test(phone)) {
        document.getElementById("invalidPhone_error").style.display = "block";
        if (!errorFlag) {
            document.getElementById("number").focus();
            document.getElementById("phone").select();
        }
        errorFlag = true;
    }

    let emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    let email = document.getElementById("email").value;
    if (!emailRegex.test(email)) {
        document.getElementById("invalidEmail_error").style.display = "block";
        if (!errorFlag) {
            document.getElementById("email").focus();
            document.getElementById("email").select();
        }
        errorFlag = true;
    }

    return errorFlag;
}

function hideErrors() {
    // hides the error messages when the page loads
    let error_messages = document.getElementsByClassName("error");

    for (let i = 0; i < error_messages.length; i++) {
        error_messages[i].style.display = "none";
    }
}

function load() {
    hideErrors();     
    let form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", validate);
    form.addEventListener("reset", resetForm);
    document.getElementById("name").focus();
}

document.addEventListener("DOMContentLoaded", load);