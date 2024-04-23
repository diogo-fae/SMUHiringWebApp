// API Calls ------------------------------------------------------------------------------------
function showHeaderUsername(username) {
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
function showJobInfo(jobID) {
    // DONE APITODO: /getJobInfo
    alert(`Getting job info for job with ID: ${jobID}`)
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
            document.getElementById('startDateDisplay').innerHTML = jobInfo.startDate;
            document.getElementById('endDateDisplay').innerHTML = jobInfo.endDate;
            document.getElementById('payPerHourDisplay').innerHTML = jobInfo.payRate;
            document.getElementById('startTimeDisplay').innerHTML = jobInfo.startTime;
            document.getElementById('endTimeDisplay').innerHTML = jobInfo.endTime;
        });
}
function showJobInfoAndEdit(jobID) {
    // DONE APITODO: /getJobInfo
    alert(`Getting job info for job with ID: ${jobID} for updating`)
    // Fetch data from the API using jobID
    fetch(`http://localhost:8080/getJobInfo/${jobID}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            jobInfo = data;
            // alert(jobInfo.username);
            document.getElementById('jobIDDisplay').innerHTML = jobInfo.id;
            document.getElementById('positionNameDisplay').innerHTML = jobInfo.name;
            document.getElementById('supervisorFirstNameInput').placeholder = jobInfo.name.split(' ')[0];
            document.getElementById('supervisorLastNameInput').placeholder = jobInfo.name.split(' ')[1];
            document.getElementById('supervisorEmailInput').placeholder = jobInfo.email;
            document.getElementById('supervisorPhoneNumberInput').placeholder = jobInfo.phone;
            document.getElementById('startDateInput').placeholder = jobInfo.geo.lng;
            document.getElementById('endDateInput').placeholder = jobInfo.geo.lat;
            document.getElementById('payPerHourInput').placeholder = jobInfo.zipCode;
            document.getElementById('startTimeInput').placeholder = jobInfo.geo.lng;
            document.getElementById('endTimeInput').placeholder = jobInfo.geo.lat;

            // Sample list of Skills bc the sample API does not have a list
            const skills = [
                { category: 'Languages', skill: 'Python' },
                { category: 'Languages', skill: 'C++' },
                { category: 'Languages', skill: 'C#' },
                { category: 'Languages', skill: 'Java' },
                { category: 'Languages', skill: 'Ruby' },
                { category: 'Languages', skill: 'PHP' },
                { category: 'Previous Employment', skill: 'Software Engineer' }
            ];
            // Fill in the professional qualifications in the categorytable
            const categoryTable = document.getElementById('categorytable');
            skills.forEach(skill => {
                const row = categoryTable.insertRow(-1);
                const categoryCell = row.insertCell(0);
                const skillCell = row.insertCell(1);
                categoryCell.innerHTML = skill.category;
                skillCell.innerHTML = skill.skill;
            });
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
function postJob(apiLink, jobInfo) {
    var jobID = document.getElementById('jobIDInput').value;
    var positionName = document.getElementById('positionNameInput').value;
    var supervisorFirstName = document.getElementById('supervisorFirstNameInput').value;
    var supervisorLastName = document.getElementById('supervisorLastNameInput').value;
    var supervisorEmail = document.getElementById('supervisorEmailInput').value;
    var supervisorPhoneNumber = document.getElementById('supervisorPhoneNumberInput').value;
    var startDate = document.getElementById('startDateInput').value;
    var endDate = document.getElementById('endDateInput').value;
    var payPerHour = document.getElementById('payPerHourInput').value;
    var startTime = document.getElementById('startTimeInput').value;
    var endTime = document.getElementById('endTimeInput').value;
    jobInfo.jobId = jobID;
    jobInfo.company = document.getElementById('headerCompany').innerHTML;
    jobInfo.positionName = positionName;
    // TODO: Uncomment the following lines when the API is updated
    // jobInfo.supervisorFirstName = supervisorFirstName;
    // jobInfo.supervisorLastName = supervisorLastName;
    jobInfo.supervisorName = `${supervisorFirstName} ${supervisorLastName}`;
    jobInfo.supervisorEmail = supervisorEmail;
    // jobInfo.supervisorPhoneNumber = supervisorPhoneNumber;
    jobInfo.startDate = startDate;
    jobInfo.endDate = endDate;
    jobInfo.payPerHour = payPerHour;
    jobInfo.startTime = startTime;
    jobInfo.endTime = endTime;
    var categoryTable = document.getElementById('categorytable');
    var qualifications = [];
    // Iterate over the rows of the table starting from the second row (index 1)
    for (var i = 1; i < categoryTable.rows.length; i++) {
        var row = categoryTable.rows[i];
        var rowData = {};

        // Get the cells of the current row
        var cells = row.cells;

        // Get the value of the first and second column of the current row
        var key = cells[0].textContent.trim(); // Assuming the first column contains text
        var value = cells[1].textContent.trim(); // Assuming the second column contains text

        // Add the key-value pair to the rowData dictionary
        rowData[key] = value;

        // Add the rowData dictionary to the rowsList
        qualifications.push(rowData);
    }
    jobInfo.jobQualificationsList = qualifications;

    printDict(jobInfo);
    jobInfo.jobQualificationsList.forEach(qualification => {
        printDict(qualification)
    });
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
function updateJob(apiLink, jobInfo) {
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
        jobInfo.supervisorPhoneNumber = supervisorPhoneNumberInputValue.replaceAll(/^\D+/g, '');;
    }
    var payPerHourInputValue = document.getElementById('payPerHourInput').value;
    if (payPerHourInputValue) {
        jobInfo.payPerHour = payPerHourInputValue;
    }
    var startDateInputValue = document.getElementById('startDateInput').value;
    if (startDateInputValue) {
        jobInfo.startDate = startDateInputValue;
    }
    var endDateInputValue = document.getElementById('endDateInput').value;
    if (endDateInputValue) {
        jobInfo.endDate = endDateInputValue;
    }
    var startTimeInputValue = document.getElementById('startTimeInput').value;
    if (startTimeInputValue) {
        jobInfo.startTime = startTimeInputValue;
    }
    var endTimeInputValue = document.getElementById('endTimeInput').value;
    if (endTimeInputValue) {
        jobInfo.endTime = endTimeInputValue;
    }
    var categoryTable = document.getElementById('categorytable');
    if (categoryTable.rows.length > 0) {
        var qualifications = [];
        // Iterate over the rows of the table starting from the second row (index 1)
        for (var i = 1; i < categoryTable.rows.length; i++) {
            var row = categoryTable.rows[i];
            var rowData = {};

            // Get the cells of the current row
            var cells = row.cells;

            // Get the value of the first and second column of the current row
            var key = cells[0].textContent.trim(); // Assuming the first column contains text
            var value = cells[1].textContent.trim(); // Assuming the second column contains text

            // Add the key-value pair to the rowData dictionary
            rowData[key] = value;

            // Add the rowData dictionary to the rowsList
            qualifications.push(rowData);
        }
        jobInfo.qualifications = qualifications;
    }
    // TODO: Delete this line
    // jobInfo.qualifications.forEach(qualification => {
    //     printDict(qualification)
    // });
    // printDict(jobInfo);
    alert(`Updating job with ID: ${jobInfo.jobId}, companyName: ${jobInfo.company}, positionName: ${jobInfo.positionName}`)
    // DONE APITODO: /updateJob
    fetch("http://localhost:8080/updateJob", {
        method: 'POST',
        body: JSON.stringify({
            jobInfo
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data)
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
        userInfo.phoneNumber = phoneNumberInputValue;
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
        body: JSON.stringify({
            userInfo
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data)
        });
}
// Function to update the card body with the initial content
function updateJobsList() {
    var accountsList = document.getElementById('jobsList');
    var scrollableBox = document.querySelector('.scrollable-box');
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
                        // clickedItem.username = item.username;
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
    // Extract the id from the clickedItem's textContent
    alert(`Getting job details for ${jobID}, ${company}`)
    // Fetch data from the API
    // DONE APITODO: /getJobInfo
    fetch(`http://localhost:8080/getJobInfo/${jobID}`)
        .then(response => response.json())
        .then(data => {
            // Extract the attributes from the data
            var attributes = data;
            var jobId = attributes.id;

            // Update the display with the details
            // document.getElementById('usernameDisplay').textContent = attributes.username;
            // jobIDDisplay, positionNameDisplay, supervisorNameDisplay, supervisorEmailDisplay, supervisorPhoneNumberDisplay, payPerHourDisplay, startDateDisplay, endDateDisplay, startDateDisplay, endDateDisplay
            document.getElementById('jobIDDisplay').textContent = attributes.jobId;
            document.getElementById('positionNameDisplay').textContent = attributes.positionName;
            // TODO: Supervisor name has first and last name
            document.getElementById('supervisorNameDisplay').textContent = attributes.supervisorName;
            document.getElementById('supervisorEmailDisplay').textContent = attributes.supervisorEmail;
            document.getElementById('supervisorPhoneNumberDisplay').textContent = attributes.supervisorEmail;
            document.getElementById('payPerHourDisplay').textContent = attributes.payPerHour;
            document.getElementById('startDateDisplay').textContent = attributes.startDate;
            document.getElementById('endDateDisplay').textContent = attributes.endDate;
            document.getElementById('startTimeDisplay').textContent = attributes.startTime;
            document.getElementById('endTimeDisplay').textContent = attributes.endTime;

            // Sample list of Skills bc the sample API does not have a list
            const skills = [
                { category: 'Languages', skill: 'Python' },
                { category: 'Languages', skill: 'C++' },
                { category: 'Languages', skill: 'C#' },
                { category: 'Languages', skill: 'Java' },
                { category: 'Languages', skill: 'Ruby' },
                { category: 'Languages', skill: 'PHP' },
                { category: 'Previous Employment', skill: 'Software Engineer' }
            ];
            // Fill in the professional qualifications in the categorytable
            const categoryTable = document.getElementById('categorytable');
            skills.forEach(skill => {
                const row = categoryTable.insertRow(-1);
                const categoryCell = row.insertCell(0);
                const skillCell = row.insertCell(1);
                categoryCell.innerHTML = skill.category;
                skillCell.innerHTML = skill.skill;
            });

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
            // editBt.href += `&employerUsername=${username}`;
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
    alert(`User with ID ${employerId} has been requested to be deleted`);
    fetch(`http://localhost:8080/requestEmployerDelete/${employerId}`, {
        method: 'DELETE'
    }).then(response => {
        return true;
    }).catch(error => {
        // Handle errors
        console.error('There was a problem deleting the user:', error);
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
            var phoneNumber = document.getElementById('phoneNumberInput').value;
            if (firstName === employerInfo.firstName && lastName === employerInfo.lastName && email === employerInfo.email && phoneNumber === employerInfo.phoneNumber) {
                // Chelsey Dietrich Lucio_Hettinger@annie.ca 2549541289
                // TODO: Implement API to create Delete Request
                // alert("Contact Information Updated Successfully!")
                deleteUser(apiLink, employerUsername);
                showModalAndRedirect(deleteModal, '/Employer/viewAccount.html?username=' + employerUsername);
                return true;
            }
            else {
                // alert("Contact Information does not match the employer's information. Please try again.")
                var form = document.querySelector('.needs-validation');
                form.classList.add('was-validated');
                document.getElementById('firstNameInput').pattern = employerInfo.name.split(' ')[0];
                document.getElementById('lastNameInput').pattern = employerInfo.name.split(' ')[1];
                document.getElementById('emailInput').pattern = employerInfo.email;
                document.getElementById('phoneNumberInput').pattern = employerInfo.phone;
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
