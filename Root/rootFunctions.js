function createStaff() {
    var userInfo = {}
    // Get new values from the form
    var userIdInputValue = document.getElementById('usernameInput').value;
    if (userIdInputValue) {
        userInfo.userId = userIdInputValue;
    }
    var firstNameInputValue = document.getElementById('firstNameInput').value;
    if (firstNameInputValue) {
        userInfo.firstName = firstNameInputValue;
    }
    // else {firstNameInputValue = document.getElementById('firstNameInput').placeholder;}
    // lastName, email, phoneNumber
    var lastNameInputValue = document.getElementById('lastNameInput').value;
    if (lastNameInputValue) {
        userInfo.lastName = lastNameInputValue;
    }
    var emailInputValue = document.getElementById('emailInput').value;
    if (emailInputValue) {
        userInfo.email = emailInputValue;
    }
    var phoneNumberInputValue = document.getElementById('phoneNumberInput').value.replaceAll(/[^0-9]/g, '');
    if (phoneNumberInputValue) {
        userInfo.phoneNumber = phoneNumberInputValue.replaceAll(/[^0-9]/g, '');
    }

    alert(JSON.stringify(userInfo))
    // alert(`Creating Staff info to ${userInfo.userId}`);
    // DONE APITODO: /updateProfessional
    fetch('http://localhost:8080/createStaff', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        },
        body: JSON.stringify(userInfo)
    }).then(response => response.json())
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error:', error);
        });
}


function validateInputs() {
    // Implement your input validation logic here
    // Return true if all inputs are valid, false otherwise
    // Example validation logic:
    var inputs = document.querySelectorAll('.needs-validation');
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
            var form = document.querySelector('.needs-validation');
            form.classList.add('was-validated');
            return false;
        }
    }
    return true;
}
function formatPhoneNumber(input) {
    // Remove all non-numeric characters
    var phoneNumber = input.value.replaceAll(/[^0-9]/g, '');

    // Check if the input value is empty or not a number
    if (!phoneNumber || isNaN(phoneNumber)) {
        input.value = ''; // Clear the input field
        return;
    }

    // Format the phone number with hyphens
    var formattedPhoneNumber = '';
    for (var i = 0; i < phoneNumber.length; i++) {
        if (i === 0) {
            formattedPhoneNumber += '(';
        }
        if (i === 3) {
            formattedPhoneNumber += ') ';
        }
        if (i === 6) {
            formattedPhoneNumber += '-';
        }
        formattedPhoneNumber += phoneNumber[i];
    }

    // Update the input value with the formatted phone number
    input.value = formattedPhoneNumber;
}

function logout() {
    document.cookie = `username=; path=/`;
    document.cookie = `userType=; path=/`;
    window.location.href = '/SignUp/Login.html';
}
function checkUserLoggedIn(username) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'username') {
            // If username in URL is different from the one in the cookie, redirect to the login page
            if (value !== username) {
                alert(`User ${username} is not logged in.`)
                window.location.href = '/SignUp/Login.html';
            }
        }
    }
}