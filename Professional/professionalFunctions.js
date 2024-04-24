// API Calls ------------------------------------------------------------------------------------
function showHeaderUsername(username) {
    document.getElementById('headerUsername').innerHTML = username;
}
function showProfessionalInfo(professionalUsername) {
    // DONE APITODO: /getProfessionalInfo
    // alert(`Getting Professional Info for ${professionalUsername}`)
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getProfessionalInfo/${professionalUsername}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            professionalInfo = data;
            document.getElementById('usernameDisplay').innerHTML = professionalInfo.userId;
            document.getElementById('firstNameDisplay').innerHTML = professionalInfo.firstName;
            document.getElementById('lastNameDisplay').innerHTML = professionalInfo.lastName;
            document.getElementById('emailDisplay').innerHTML = professionalInfo.email;
            document.getElementById('phoneNumberDisplay').innerHTML = professionalInfo.phoneNumber;
            document.getElementById('address1Display').innerHTML = professionalInfo.address1;
            document.getElementById('address2Display').innerHTML = professionalInfo.address2 || 'N/A';
            document.getElementById('cityDisplay').innerHTML = professionalInfo.city;
            document.getElementById('stateDisplay').innerHTML = professionalInfo.state;
            document.getElementById('zipCodeDisplay').innerHTML = professionalInfo.zipCode;
            var graduationDateComponents = professionalInfo.graduationDate.split('-');
            var graduationDateFormatted = graduationDateComponents[1] + '-' + graduationDateComponents[0];
            document.getElementById('startDateDegreeDisplay').innerHTML = graduationDateFormatted;
            document.getElementById('institutionDisplay').innerHTML = professionalInfo.university;
            document.getElementById('degreeTypeDisplay').innerHTML = professionalInfo.degreeType;
            var qualifications = professionalInfo.professionalQualificationsList;
            // Fill in the professional qualifications in the categorytable
            const categoryTable = document.getElementById('categorytable');
            for (let category in qualifications) {
                qualifications[category].forEach(skill => {
                    const row = categoryTable.insertRow(-1);
                    const categoryCell = row.insertCell(0);
                    const skillCell = row.insertCell(1);
                    categoryCell.innerHTML = category;
                    skillCell.innerHTML = skill;
                });
            }
        });
}
function showJobInfo(jobID) {
    // DONE APITODO: /getJobInfo
    // alert(`Getting job info for job with ID: ${jobID}`)
    // Fetch data from the API using jobID
    fetch(`http://localhost:8080/getJobInfo/${jobID}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            jobInfo = data;
            // alert(jobInfo.username);
            document.getElementById('jobIDDisplay').innerHTML = jobInfo.jobID;
            document.getElementById('positionNameDisplay').innerHTML = jobInfo.positionName;
            document.getElementById('supervisorFirstNameDisplay').innerHTML = jobInfo.supervisorFirstName;
            document.getElementById('supervisorLastNameDisplay').innerHTML = jobInfo.supervisorLastName;
            document.getElementById('supervisorEmailDisplay').innerHTML = jobInfo.supervisorEmail;
            document.getElementById('supervisorPhoneNumberDisplay').innerHTML = jobInfo.supervisorPhoneNumber;
            var startDateComponents = jobInfo.startDate.split('-');
            var startDateFormatted = startDateComponents[1] + '-' + startDateComponents[0];
            var endDateComponents = jobInfo.endDate.split('-');
            var endDateFormatted = endDateComponents[1] + '-' + endDateComponents[0];
            document.getElementById('startDateDisplay').innerHTML = startDateFormatted;
            document.getElementById('endDateDisplay').innerHTML = endDateFormatted;
            document.getElementById('payPerHourDisplay').innerHTML = jobInfo.payRate;
            document.getElementById('startTimeDisplay').innerHTML = jobInfo.startTime.slice(0, -3);
            document.getElementById('endTimeDisplay').innerHTML = jobInfo.endTime.slice(0, -3);
            var qualifications = jobInfo.professionalQualificationsList;
            // Fill in the professional qualifications in the categorytable
            const categoryTable = document.getElementById('categorytable');
            for (let category in qualifications) {
                qualifications[category].forEach(skill => {
                    const row = categoryTable.insertRow(-1);
                    const categoryCell = row.insertCell(0);
                    const skillCell = row.insertCell(1);
                    categoryCell.innerHTML = category;
                    skillCell.innerHTML = skill;
                });
            }
        });
}
function fillProfessionalEditForm(username) {
    // DONE APITODO: /getProfessionalInfo
    // alert(`Getting professional info for ${username} for updating`)
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getProfessionalInfo/${username}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            professionalInfo = data;

            // Fill in the staff information
            document.getElementById('firstNameInput').placeholder = data.firstName;
            document.getElementById('lastNameInput').placeholder = data.lastName;
            document.getElementById('emailInput').placeholder = data.email;
            document.getElementById('phoneNumberInput').placeholder = data.phoneNumber;
            document.getElementById('address1Input').placeholder = data.address1;
            document.getElementById('address2Input').placeholder = data.address2;
            document.getElementById('cityInput').placeholder = data.city;
            document.getElementById('stateInput').placeholder = data.state;
            document.getElementById('zipCodeInput').placeholder = data.zipCode;
            document.getElementById('institutionInput').placeholder = data.university;
            document.getElementById('degreeTypeInput').placeholder = data.degreeType;
            var graduationDateComponents = data.graduationDate.split('-');
            var graduationDateFormatted = graduationDateComponents[1] + '-' + graduationDateComponents[0];
            document.getElementById('startDateDegreeInput').placeholder = graduationDateFormatted;
            var qualifications = data.professionalQualificationsList;
            // Fill in the professional qualifications in the categorytable
            const categoryTable = document.getElementById('categorytable');
            for (let category in qualifications) {
                qualifications[category].forEach(skill => {
                    const row = categoryTable.insertRow(-1);
                    const categoryCell = row.insertCell(0);
                    const skillCell = row.insertCell(1);
                    categoryCell.innerHTML = category;
                    skillCell.innerHTML = skill;
                });
            }
        });
}
function updatePassword(apiLink, username, newPassword) {
    // DONE APITODO: /changePassword
    var passwordInfo = { "userId": username, "pwd": newPassword }

    // alert(passwordInfo.userId)
    // alert(`Changing password to ${passwordInfo.pwd}`);
    fetch("http://localhost:8080/changePassword", {
        method: 'POST',
        body: JSON.stringify(passwordInfo),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // alert('Password changed successfully')
            // alert(data)
        });
    return true;
}
function updateUser(apiLink, userInfo) {
    // Get new values from the form
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
    try {
        var address1InputValue = document.getElementById('address1Input').value;
        if (address1InputValue) {
            userInfo.address1 = address1InputValue;
        }
        var address2InputValue = document.getElementById('address2Input').value;
        if (address2InputValue) {
            userInfo.address2 = address2InputValue;
        }
        var cityInputValue = document.getElementById('cityInput').value;
        if (cityInputValue) {
            userInfo.city = cityInputValue;
        }
        var stateInputValue = document.getElementById('stateInput').value;
        if (stateInputValue) {
            userInfo.state = stateInputValue;
        }
        var zipCodeInputValue = document.getElementById('zipCodeInput').value;
        if (zipCodeInputValue) {
            userInfo.zipCode = zipCodeInputValue;
        }
    } catch (error) {
        // alert("Error in fields for Employer/Professional") 
    }
    try {
        var institutionInputValue = document.getElementById('institutionInput').value;
        if (institutionInputValue) {
            userInfo.university = institutionInputValue;
        }
        var startDateDegreeInputValue = document.getElementById('startDateDegreeInput').value;
        if (startDateDegreeInputValue) {
            var startDateComponents = startDateDegreeInputValue.split('-');
            var startDateFormatted = startDateComponents[1] + '-' + startDateComponents[0] + '-01';
            userInfo.graduationDate = startDateFormatted;
        }
        var degreeTypeInputValue = document.getElementById('degreeTypeInput').value;
        if (degreeTypeInputValue) {
            userInfo.degreeType = degreeTypeInputValue;
        }
        var categoryTable = document.getElementById('categorytable');
        if (categoryTable.rows.length > 0) {
            var qualifications = {};
            // Iterate over the rows of the table starting from the second row (index 1)
            for (var i = 1; i < categoryTable.rows.length; i++) {
                var row = categoryTable.rows[i];
                var rowData = {};

                // Get the cells of the current row
                var cells = row.cells;

                // Get the value of the first and second column of the current row
                var key = cells[0].textContent.trim(); // Assuming the first column contains text
                var value = cells[1].textContent.trim(); // Assuming the second column contains text

                // Add the rowData dictionary to the rowsList
                if (!(key in qualifications)) {
                    qualifications[key] = [];
                }
                qualifications[key].push(value);
            }
            userInfo.professionalQualificationsList = qualifications;
        }
        // TODO: Delete this line
    } catch (error) {
        // alert("Error in fields for Professional")
    }
    // for (let k in userInfo.qualifications) {
    //     alert(k); // Print each key
    //     for (let i = 0; i < userInfo.qualifications[k].length; i++) {
    //         alert(userInfo.qualifications[k][i]); // Print each item
    //     }
    // }
    // alert(JSON.stringify(userInfo))
    // alert(`Updating user info to ${userInfo.userId}`);
    // printDict(userInfo);
    // DONE APITODO: /updateProfessional
    fetch('http://localhost:8080/updateProfessional', {
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
// Function to update the card body with the initial content
function updateJobsList() {
    var accountsList = document.getElementById('jobsList');
    var scrollableBox = document.querySelector('.scrollable-box');

    // alert("Getting all Jobs List")
    // DONE APITODO: /getAllJobs
    // Fetch data from the API for the Scrollable Box
    fetch('http://localhost:8080/getAllJobs')
        .then(response => response.json())
        .then(data => {
            // Update the list with the data
            data.forEach(item => {
                var listItem = document.createElement('a');
                listItem.className = 'list-group-item list-group-item-action clickable-job-item';
                listItem.href = '#';
                listItem.textContent = `${item.jobId} - ${item.positionName}`;

                // Add click event listener to the scrollable box
                scrollableBox.addEventListener('click', function (event) {
                    var clickedItem = event.target;
                    if (clickedItem.tagName === 'A') {
                        // Reset background color of all items
                        var listItems = accountsList.querySelectorAll('.list-group-item');
                        listItems.forEach(item => {
                            item.style.backgroundColor = '';
                        });
                        // Change background color of clicked item
                        clickedItem.style.backgroundColor = 'lightblue';
                        // Add id and name to the item's attributes
                        clickedItem.jobId = item.jobId;
                        clickedItem.company = item.company;
                        // clickedItem.username = item.userId;
                    }
                });

                // Add click event listener to each listItem to show account details
                listItem.addEventListener('click', function () {
                    // Call showAccountDetails with the clicked item's id and name
                    showJobDetails(item.jobId, item.company);
                });

                accountsList.appendChild(listItem);

                // Click the first item when the page loads
                if (accountsList.children.length === 1) {
                    listItem.click();
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data updateJobsList():', error);
        });
}


function showJobDetails(jobId, company) {
    // alert(`Getting job details for ${jobId} ${company}`)
    // Fetch data from the API
    // DONE APITODO: /getJobInfo
    fetch(`http://localhost:8080/getJobInfo?jobId=${jobId}&company=${company}`, {
    })
        .then((response) => response.json())
        .then(data => {
            // Extract the attributes from the data
            var attributes = data;
            var jobId = attributes.id;

            // Update the display with the details
            // document.getElementById('usernameDisplay').textContent = attributes.userId;
            // jobIDDisplay, positionNameDisplay, supervisorNameDisplay, supervisorEmailDisplay, supervisorPhoneNumberDisplay, payPerHourDisplay, startDateDisplay, endDateDisplay, startDateDisplay, endDateDisplay
            document.getElementById('jobIDDisplay').textContent = attributes.jobId;
            document.getElementById('positionNameDisplay').textContent = attributes.positionName;
            // TODO: Supervisor name has first and last name
            document.getElementById('supervisorNameDisplay').textContent = attributes.supervisorFirstName + ' ' + attributes.supervisorLastName
            document.getElementById('supervisorEmailDisplay').textContent = attributes.supervisorEmail;
            document.getElementById('supervisorPhoneNumberDisplay').textContent = attributes.supervisorEmail;
            document.getElementById('payPerHourDisplay').textContent = attributes.payPerHour;
            var startDateComponents = attributes.startDate.split('-');
            var startDateFormatted = startDateComponents[1] + '-' + startDateComponents[0];
            var endDateComponents = attributes.endDate.split('-');
            var endDateFormatted = endDateComponents[1] + '-' + endDateComponents[0];
            document.getElementById('startDateDisplay').textContent = startDateFormatted;
            document.getElementById('endDateDisplay').textContent = endDateFormatted;
            document.getElementById('startTimeDisplay').textContent = attributes.startTime.slice(0, -3);
            document.getElementById('endTimeDisplay').textContent = attributes.endTime.slice(0, -3);

            var qualifications = attributes.jobQualificationsList;
            // Fill in the professional qualifications in the categorytable
            const categoryTable = document.getElementById('categorytable');
            // Remove existing rows
            for (let i = categoryTable.rows.length - 1; i > 0; i--) {
                // Remove each row
                categoryTable.deleteRow(i);
            }
            for (let category in qualifications) {
                qualifications[category].forEach(skill => {
                    const row = categoryTable.insertRow(-1);
                    const categoryCell = row.insertCell(0);
                    const skillCell = row.insertCell(1);
                    categoryCell.innerHTML = category;
                    skillCell.innerHTML = skill;
                });
            }


            // Update the href attribute of the edit button
            // Check if jobId is already part of the href attribute
            var editBt = document.getElementById('editBt');
            if (editBt.href.includes('jobId')) {
                // If it is, update the value of username
                editBt.href = editBt.href.replaceAll(/jobId=[^&]+/, `jobId=${jobId}`);
            } else {
                // If it's not, append both username and jobId
                editBt.href += `&jobId=${jobId}`;
            }
            // editBt.href += `&professionalUsername=${username}`;
        })
        .catch(error => {
            // alert('Error fetching data showJobDetails():', error);
        });
}
// API Calls ------------------------------------------------------------------------------------

// Formatting -----------------------------------------------------------------------------------
function setPasswordPattern() {
    // Makes sure that the retyped password is exactly like the password first typed
    var password = document.getElementById('passwordInput');
    var passwordRetyped = document.getElementById('passwordRetypedInput');

    // Set the pattern attribute of passwordRetyped dynamically
    passwordRetyped.pattern = password.value;
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
// Adds rows to the table
function add() {
    var category = document.getElementById("categoryname").value.trim();
    var skills = document.getElementById("categoryskills").value.trim();

    // Check if both categoryname and categoryskills are not empty
    if (category !== "" && skills !== "") {
        var table = document.getElementById("categorytable");

        // Add a new row at the bottom of the table
        var row = table.insertRow(-1);

        var col1 = row.insertCell(0);
        var col2 = row.insertCell(1);
        col1.innerHTML = category;
        col2.innerHTML = skills;

        // Reset the category field and skills fields to be blank
        document.getElementById("categoryname").value = "";
        document.getElementById("categoryskills").value = "";

        // Update the count to the new row count
        count = table.rows.length;
    }

    if (table.rows.length < 3) {
        document.getElementById('cat-table-invalid-feedback').style.display = 'block';
    }
    else {
        document.getElementById('cat-table-invalid-feedback').style.display = 'none';
    }
}

// Deletes the last row in the table
function deleteLastRow() {
    var table = document.getElementById("categorytable");
    var rowCount = table.rows.length;

    // Check if there is at least one row to delete
    if (rowCount > 1) {
        table.deleteRow(rowCount - 1);
        count--; // Decrement the count to maintain accurate row count
    }

    if (table.rows.length < 3) {
        document.getElementById('cat-table-invalid-feedback').style.display = 'block';
    }
    else {
        document.getElementById('cat-table-invalid-feedback').style.display = 'none';
    }
}
// Formatting -----------------------------------------------------------------------------------


// Functions related to updating links and redirecting ------------------------------------------
function addUsernameToLinks() {
    // Get the username_var from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const usernameVar = urlParams.get('username');

    // Find all div elements with the class "page-redirect"
    const pageRedirectDivs = document.querySelectorAll('.page-redirect');

    // Loop through each div and update its href attribute
    pageRedirectDivs.forEach(div => {
        // const link = div.querySelector('a'); // Find the anchor tag inside the div
        // alert(link)
        if (div) {
            // Append the username_var to the href attribute of the anchor tag
            div.href += `?username=${usernameVar}`;
        }
    });
}
function showModalAndRedirect(modal, link) {
    // Show the modal
    $(modal).modal('show');

    // Redirect to the link after the modal is closed
    $(modal).on('hidden.bs.modal', function () {
        window.location.href = link;
    });
}
function addJobMatchingRequestFunctionality() {
    // Get the professional username from the header
    var professionalUsername = document.getElementById('headerUsername').innerHTML;
    // alert(`Requesting job matching for: ${professionalUsername}`)
    // DONE APITODO: /requestJobMatching
    fetch(`http://localhost:8080/requestJobMatching/${professionalUsername}`, {
        method: 'POST',
    }).then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log(data);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error:', error);
        });
    // Request Job Matching
    var jobMatchingButton = document.getElementById('requestJMBt');
    var modal = document.getElementById('jobMatchingModal');
    jobMatchingButton.addEventListener('click', function () {
        $(modal).modal('show');
    });
}
function addDeleteRequestFunctionality() {
    var professionalUsername = document.getElementById('headerUsername').innerHTML;
    // DONE APITODO: /requestProfessionalDelete
    // alert(`User with ID ${professionalUsername} has been requested to be deleted`);
    fetch(`http://localhost:8080/requestProfessionalDelete/${professionalUsername}`, {
        method: 'POST',
    }).then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log(data);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error:', error);
        });
    // Request Job Matching
    var jobMatchingButton = document.getElementById('requestDeleteBt');
    var modal = document.getElementById('deleteModal');
    jobMatchingButton.addEventListener('click', function () {
        $(modal).modal('show');
    });
}
// Functions related to updating links and redirecting ------------------------------------------


// Helper Functions -----------------------------------------------------------------------------
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
function validatePasswordInputs() {
    if (!validateInputs()) {
        return false;
    }
    // Implement your password validation logic here
    // Return true if the passwords match, false otherwise
    // Example validation logic:
    var password = document.getElementById('passwordInput').value;
    var passwordRetyped = document.getElementById('passwordRetypedInput').value;
    if (password !== passwordRetyped) {
        var form = document.querySelector('.needs-validation');
        form.classList.add('was-validated');
        return false;
    }
    return true;
}
function printDict(dict) {
    for (var key in dict) {
        // Check if the key is a property of the object itself (not inherited)
        if (dict.hasOwnProperty(key)) {
            // Get the value corresponding to the key
            var value = dict[key];
            // Alert the key and value
            alert("Key: " + key + ", Value: " + value);
        }
    }
}
// Helper Functions -----------------------------------------------------------------------------
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