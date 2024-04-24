// API Calls ------------------------------------------------------------------------------------
function showHeaderUsername(username) {
    document.getElementById('headerUsername').innerHTML = username;
    fetch(`http://localhost:8080/getEmployerInfo/${username}`)
        .then(response => response.json())
        .then(data => {
            company = data.company;
            document.getElementById('headerCompany').innerHTML = company;
            updateJobsList(company);
            // Get jobId from URL
            var urlParams = new URLSearchParams(window.location.search);
            var jobId = urlParams.get('jobId');
            showJobInfoAndEdit(jobId, company);
        });
}
function showHeaderUsernamePostJob(username) {
    document.getElementById('headerUsername').innerHTML = username;
    fetch(`http://localhost:8080/getEmployerInfo/${username}`)
        .then(response => response.json())
        .then(data => {
            company = data.company;
            document.getElementById('headerCompany').innerHTML = company;
        });
}
function deleteJob(jobID, company) {
    var jobInfo = { "jobId": jobID, "company": company };
    // DONE APITODO: /deleteJob
    alert(`Deleting job with ID: ${jobInfo.jobId} and ${jobInfo.company}`);
    fetch(`http://localhost:8080/deleteJob`, {
        method: 'POST',
        body: JSON.stringify(jobInfo),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return true;
    }).catch(error => {
        // Handle errors
        console.error('There was a problem deleting the job:', error);
        return false;
    });
    return true;
}
function showEmployerInfo(employerUsername) {
    // DONE APITODO: /getEmployerInfo
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getEmployerInfo/${employerUsername}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            employerInfo = data;
            // alert(employerInfo.username);
            document.getElementById('usernameDisplay').innerHTML = employerInfo.userId;
            document.getElementById('companyNameDisplay').innerHTML = employerInfo.company;
            document.getElementById('firstNameDisplay').innerHTML = employerInfo.firstName;
            document.getElementById('lastNameDisplay').innerHTML = employerInfo.lastName;
            document.getElementById('emailDisplay').innerHTML = employerInfo.email;
            document.getElementById('phoneNumberDisplay').innerHTML = employerInfo.phoneNumber;
            document.getElementById('address1Display').innerHTML = employerInfo.address1;
            document.getElementById('address2Display').innerHTML = employerInfo.address2;
            document.getElementById('cityDisplay').innerHTML = employerInfo.city;
            document.getElementById('stateDisplay').innerHTML = employerInfo.state;
            document.getElementById('zipCodeDisplay').innerHTML = employerInfo.zipCode;
        });
}
function showJobInfo(jobId) {
    // DONE APITODO: /getJobInfo
    var company = document.getElementById('headerCompany').innerHTML;

    // Fetch data from the API using jobID
    fetch(`http://localhost:8080/getJobInfo?jobId=${jobId}&company=${company}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            jobInfo = data;
            // alert(jobInfo.username);
            document.getElementById('jobIDDisplay').innerHTML = jobInfo.jobId;
            document.getElementById('positionNameDisplay').innerHTML = jobInfo.positionName;
            document.getElementById('supervisorNameDisplay').innerHTML = jobInfo.supervisorFirstName + ' ' + jobInfo.supervisorLastName;
            document.getElementById('supervisorEmailDisplay').innerHTML = jobInfo.supervisorEmail;
            document.getElementById('supervisorPhoneNumberDisplay').innerHTML = jobInfo.supervisorPhoneNumber;
            var startDateComponents = jobInfo.startDate.split('-');
            var startDateFormatted = startDateComponents[1] + '-' + startDateComponents[0];
            document.getElementById('startDateDisplay').innerHTML = startDateFormatted;
            var endDateComponents = jobInfo.endDate.split('-');
            var endDateFormatted = endDateComponents[1] + '-' + endDateComponents[0];
            document.getElementById('endDateDisplay').innerHTML = endDateFormatted;
            document.getElementById('payPerHourDisplay').innerHTML = jobInfo.payPerHour;
            document.getElementById('startTimeDisplay').innerHTML = jobInfo.startTime.slice(0, -3);;
            document.getElementById('endTimeDisplay').innerHTML = jobInfo.endTime.slice(0, -3);;
            var qualifications = jobInfo.jobQualificationsList;
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
        });
}
function showJobInfoAndEdit(jobId, company) {

    // DONE APITODO: /getJobInfo
    var company = document.getElementById('headerCompany').innerHTML;

    // Fetch data from the API using jobID
    fetch(`http://localhost:8080/getJobInfo?jobId=${jobId}&company=${company}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            jobInfo = data;
            // alert(jobInfo.username);
            document.getElementById('jobIDDisplay').innerHTML = jobInfo.jobId;
            document.getElementById('positionNameDisplay').innerHTML = jobInfo.positionName;
            document.getElementById('supervisorFirstNameInput').placeholder = jobInfo.supervisorFirstName;
            document.getElementById('supervisorLastNameInput').placeholder = jobInfo.supervisorLastName;
            document.getElementById('supervisorEmailInput').placeholder = jobInfo.supervisorEmail;
            document.getElementById('supervisorPhoneNumberInput').placeholder = formatPhoneNumber(jobInfo.supervisorPhoneNumber);
            var startDateComponents = jobInfo.startDate.split('-');
            var startDateFormatted = startDateComponents[1] + '-' + startDateComponents[0];
            document.getElementById('startDateInput').placeholder = startDateFormatted;
            var endDateComponents = jobInfo.endDate.split('-');
            var endDateFormatted = endDateComponents[1] + '-' + endDateComponents[0];
            document.getElementById('endDateInput').placeholder = endDateFormatted;
            document.getElementById('payPerHourInput').placeholder = jobInfo.payPerHour;
            alert()
            document.getElementById('startTimeInput').placeholder = jobInfo.startTime.slice(0, -3);
            document.getElementById('endTimeInput').placeholder = jobInfo.endTime.slice(0, -3);
            var qualifications = jobInfo.jobQualificationsList;
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
        });
}
function fillEmployerEditForm(username) {
    // DONE APITODO: /getEmployerInfo
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getEmployerInfo/${username}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            employerInfo = data;

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
            document.getElementById('companyNameInput').placeholder = data.company;
        });
}
function updatePassword(apiLink, username, newPassword) {
    // DONE APITODO: /changePassword
    var passwordInfo = { "userId": username, "pwd": newPassword }

    alert(passwordInfo.userId)
    alert(`Changing password to ${passwordInfo.pwd}`);
    fetch("http://localhost:8080/changePassword", {
        method: 'POST',
        body: JSON.stringify(passwordInfo),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((data) => {
            alert('Password changed successfully')
            alert(data)
        });
    return true;
}
function postJob(jobInfo) {
    // alert()
    var jobID = document.getElementById('jobIdInput').value;
    var positionName = document.getElementById('positionNameInput').value;
    // alert(positionName)
    var supervisorFirstName = document.getElementById('supervisorFirstNameInput').value;
    // alert(supervisorFirstName)
    var supervisorLastName = document.getElementById('supervisorLastNameInput').value;
    // alert(supervisorLastName)
    var supervisorEmail = document.getElementById('supervisorEmailInput').value;
    // alert(supervisorEmail)
    var supervisorPhoneNumber = document.getElementById('supervisorPhoneNumberInput').value.replaceAll(/[^0-9]/g, '');
    // alert(supervisorPhoneNumber)
    var startDate = document.getElementById('startDateInput').value;
    startDateComponents = startDate.split('-');
    startDate = startDateComponents[1] + '-' + startDateComponents[0] + '-01';
    // alert(startDate)
    var endDate = document.getElementById('endDateInput').value;
    endDateComponents = endDate.split('-');
    endDate = endDateComponents[1] + '-' + endDateComponents[0] + '-01';
    var payPerHour = document.getElementById('payPerHourInput').value;
    // alert(payPerHour)
    var startTime = document.getElementById('startTimeInput').value + ':00';
    // alert(startTime)
    var endTime = document.getElementById('endTimeInput').value + ':00';
    // alert(endTime)
    jobInfo.jobId = jobID;
    jobInfo.company = document.getElementById('headerCompany').innerHTML;
    jobInfo.positionName = positionName;
    jobInfo.supervisorFirstName = supervisorFirstName;
    jobInfo.supervisorLastName = supervisorLastName;
    jobInfo.supervisorEmail = supervisorEmail;
    jobInfo.supervisorPhoneNumber = supervisorPhoneNumber;
    jobInfo.startDate = startDate;
    jobInfo.endDate = endDate;
    jobInfo.payPerHour = payPerHour;
    jobInfo.startTime = startTime;
    jobInfo.endTime = endTime;
    var categoryTable = document.getElementById('categorytable');
    var qualifications = [];
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
        jobInfo.jobQualificationsList = qualifications;
    }
    // for (let k in jobInfo.jobQualificationsList) {
    //     alert(k); // Print each key
    //     for (let i = 0; i < jobInfo.jobQualificationsList[k].length; i++) {
    //         alert(jobInfo.jobQualificationsList[k][i]); // Print each item
    //     }
    // }

    // printDict(jobInfo);
    // jobInfo.jobQualificationsList.forEach(qualification => {
    //     printDict(qualification)
    // });
    alert(`Posting job with jobID: ${jobInfo.jobId} and companyName: ${jobInfo.company}`)
    // DONE APITODO: /postJob
    fetch('http://localhost:8080/postJob', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        },
        body: JSON.stringify(jobInfo)
    }).then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log(data);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error:', error);
        });
    return true;
}
function updateJob(jobInfo) {
    var jobID = document.getElementById('jobIDDisplay').innerHTML;
    jobInfo.jobId = jobID;
    jobInfo.company = document.getElementById('headerCompany').innerHTML;
    var positionName = document.getElementById('positionNameDisplay').innerHTML;
    jobInfo.positionName = positionName;
    var supervisorFirstNameInputValue = document.getElementById('supervisorFirstNameInput').value;
    if (supervisorFirstNameInputValue) {
        jobInfo.supervisorFirstName = supervisorFirstNameInputValue;
    }
    var supervisorLastNameInputValue = document.getElementById('supervisorLastNameInput').value;
    if (supervisorLastNameInputValue) {
        jobInfo.supervisorLastName = supervisorLastNameInputValue;
    }
    var supervisorEmailInputValue = document.getElementById('supervisorEmailInput').value;
    if (supervisorEmailInputValue) {
        jobInfo.supervisorEmail = supervisorEmailInputValue;
    }
    var supervisorPhoneNumberInputValue = document.getElementById('supervisorPhoneNumberInput').value;
    if (supervisorPhoneNumberInputValue) {
        jobInfo.supervisorPhoneNumber = supervisorPhoneNumberInputValue.replaceAll(/[^0-9]/g, '');
    }
    var payPerHourInputValue = document.getElementById('payPerHourInput').value;
    if (payPerHourInputValue) {
        jobInfo.payPerHour = payPerHourInputValue;
    }
    var startDateInputValue = document.getElementById('startDateInput').value;
    if (startDateInputValue) {
        var startDateComponents = startDateInputValue.split('-');
        var startDateFormatted = startDateComponents[1] + '-' + startDateComponents[0] + '-01';
        jobInfo.startDate = startDateFormatted;
    }
    var endDateInputValue = document.getElementById('endDateInput').value;
    if (endDateInputValue) {
        var endDateComponents = endDateInputValue.split('-');
        var endDateFormatted = endDateComponents[1] + '-' + endDateComponents[0] + '-01';
        jobInfo.endDate = endDateFormatted;
    }
    var startTimeInputValue = document.getElementById('startTimeInput').value;
    if (startTimeInputValue) {
        jobInfo.startTime = startTimeInputValue + ':00';
    }
    var endTimeInputValue = document.getElementById('endTimeInput').value;
    if (endTimeInputValue) {
        jobInfo.endTime = endTimeInputValue + ':00';
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
        jobInfo.jobQualificationsList = qualifications;
    }
    // for (let k in jobInfo.jobQualificationsList) {
    //     alert(k); // Print each key
    //     for (let i = 0; i < jobInfo.jobQualificationsList[k].length; i++) {
    //         alert(jobInfo.jobQualificationsList[k][i]); // Print each item
    //     }
    // }
    // TODO: Delete this line
    // jobInfo.qualifications.forEach(qualification => {
    //     printDict(qualification)
    // });
    // printDict(jobInfo);
    alert(`Updating job with ID: ${jobInfo.jobId}, companyName: ${jobInfo.company}`)
    // DONE APITODO: /updateJob
    fetch("http://localhost:8080/updateJob", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        },
        body: JSON.stringify(jobInfo)
    })
        .then((response) => response.json())
        .then((data) => {
            // alert(data)
        });
}
function updateUser(apiLink, userInfo) {
    userInfo.userId = document.getElementById('headerUsername').innerHTML;
    userInfo.company = document.getElementById('headerCompany').innerHTML;
    // Get new values from the form
    var firstNameInputValue = document.getElementById('firstNameInput').value;
    if (firstNameInputValue) {
        userInfo.firstName = firstNameInputValue;
    }
    // lastName, email, phoneNumber
    var lastNameInputValue = document.getElementById('lastNameInput').value;
    if (lastNameInputValue) {
        userInfo.lastName = lastNameInputValue;
    }
    var emailInputValue = document.getElementById('emailInput').value;
    if (emailInputValue) {
        userInfo.email = emailInputValue;
    }
    var phoneNumberInputValue = document.getElementById('phoneNumberInput').value;
    if (phoneNumberInputValue) {
        userInfo.phoneNumber = phoneNumberInputValue.replaceAll(/[^0-9]/g, '');
    }
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

    // printDict(userInfo);
    alert(`Updating Employer with ID: ${userInfo.userId}`)
    printDict(userInfo);
    // DONE APITODO: /updateEmployer
    fetch("http://localhost:8080/updateEmployer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        },
        body: JSON.stringify(userInfo)
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data)
        });
}
// Function to update the card body with the initial content
function updateJobsList(company) {
    var accountsList = document.getElementById('jobsList');
    var scrollableBox = document.querySelector('.scrollable-box');
    // var company = document.getElementById('headerCompany').innerHTML;
    // DONE APITODO: /getAllJobs
    // Fetch data from the API for the Scrollable Box
    fetch(`http://localhost:8080/getAllJobs/${company}`)
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
                    }
                });

                // Add click event listener to each listItem to show account details
                listItem.addEventListener('click', function () {
                    // Call showAccountDetails with the clicked item's id and name
                    showJobInfo(item.jobId);
                    // Update the href attribute of the edit button
                    // Check if jobId is already part of the href attribute
                    var editBt = document.getElementById('editBt');
                    if (editBt.href.includes('jobId')) {
                        // If it is, update the value of the jobId
                        editBt.href = editBt.href.replace(/jobId=[^&]+/, `jobId=${item.jobId}`);
                    } else {
                        // If it's not, append both username and jobId
                        editBt.href += `&jobId=${item.jobId}`;
                    }
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
// Functions related to updating links and redirecting ------------------------------------------


// Helper Functions -----------------------------------------------------------------------------
function validateInputs() {
    // Implement your input validation logic here
    // Return true if all inputs are valid, false otherwise
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
function deleteUser(apiLink, employerId) {
    // DONE APITODO: Implement API call to delete user
    alert(`User with ID ${employerId} has requested to be deleted`);
    fetch(`http://localhost:8080/requestProfessionalDelete/${employerId}`, {
        method: 'POST',
    }).then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log(data);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error:', error);
            return false;
        });
    return true;
}
function validateContactInfoAndDelete(employerUsername) {
    // DONE APITODO: /getEmployerInfo
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getEmployerInfo/${employerUsername}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            employerInfo = data;

            var firstName = document.getElementById('firstNameInput').value;
            var lastName = document.getElementById('lastNameInput').value;
            var email = document.getElementById('emailInput').value;
            var phoneNumber = document.getElementById('phoneNumberInput').value.replaceAll(/[^0-9]/g, '');
            if (firstName === employerInfo.firstName && lastName === employerInfo.lastName && email === employerInfo.email && phoneNumber === employerInfo.phoneNumber.toString()) {
                deleteUser(apiLink, employerUsername);
                var deleteModal = document.getElementById('deleteModal');
                $(deleteModal).modal('show');
                return true;
            }
            else {
                // alert("Contact Information does not match the employer's information. Please try again.")
                var form = document.querySelector('.needs-validation');
                form.classList.add('was-validated');
                document.getElementById('firstNameInput').pattern = employerInfo.firstName;
                document.getElementById('lastNameInput').pattern = employerInfo.lastName;
                document.getElementById('emailInput').pattern = employerInfo.email;
                document.getElementById('phoneNumberInput').pattern = formatPhoneNumber(employerInfo.phoneNumber);
                return false;
            }
        });
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