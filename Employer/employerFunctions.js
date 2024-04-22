// API Calls ------------------------------------------------------------------------------------
function showHeaderUsername(username) {
    document.getElementById('headerUsername').innerHTML = username;
}
function deleteJob(jobID) {
    // APITODO: /deleteJob
    // Send a DELETE request to the API
    // fetch(`https://jsonplaceholder.typicode.com/posts/${jobID}`, {
    //     method: 'DELETE',
    // })
    return true;
}
function showEmployerInfo(employerUsername) {
    // APITODO: /getEmployerInfo

    // Fetch data from the API using username
    fetch(`https://jsonplaceholder.typicode.com/users/${employerUsername}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            employerInfo = data;
            // alert(employerInfo.username);
            document.getElementById('usernameDisplay').innerHTML = employerInfo.username;
            document.getElementById('companyNameDisplay').innerHTML = employerInfo.company.name;
            document.getElementById('firstNameDisplay').innerHTML = employerInfo.name.split(' ')[0];
            document.getElementById('lastNameDisplay').innerHTML = employerInfo.name.split(' ')[1];
            document.getElementById('emailDisplay').innerHTML = employerInfo.email;
            document.getElementById('phoneNumberDisplay').innerHTML = employerInfo.phoneNumber;
            document.getElementById('address1Display').innerHTML = employerInfo.address.street;
            document.getElementById('address2Display').innerHTML = employerInfo.address.suite;
            document.getElementById('cityDisplay').innerHTML = employerInfo.address.city;
            document.getElementById('stateDisplay').innerHTML = employerInfo.state;
            document.getElementById('zipCodeDisplay').innerHTML = employerInfo.address.zipcode;
        });
}
function showJobInfo(jobID) {
    // APITODO: /getJobInfo

    // Fetch data from the API using jobID
    fetch(`https://jsonplaceholder.typicode.com/users/${jobID}`)
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
    // APITODO: /getJobInfo

    // Fetch data from the API using jobID
    fetch(`https://jsonplaceholder.typicode.com/users/${jobID}`)
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
            document.getElementById('startDateInput').placeholder = jobInfo.address.geo.lng;
            document.getElementById('endDateInput').placeholder = jobInfo.address.geo.lat;
            document.getElementById('payPerHourInput').placeholder = jobInfo.address.zipcode;
            document.getElementById('startTimeInput').placeholder = jobInfo.address.geo.lng;
            document.getElementById('endTimeInput').placeholder = jobInfo.address.geo.lat;

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
    // APITODO: /getEmployerInfo

    // Fetch data from the API using username
    fetch(`https://jsonplaceholder.typicode.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            employerInfo = data;

            // Fill in the staff information
            document.getElementById('firstNameInput').placeholder = data.name.split(' ')[0];
            document.getElementById('lastNameInput').placeholder = data.name.split(' ')[1];
            document.getElementById('emailInput').placeholder = data.email;
            document.getElementById('phoneNumberInput').placeholder = data.phone;
            document.getElementById('address1Input').placeholder = data.address.street;
            document.getElementById('address2Input').placeholder = data.address.suite;
            document.getElementById('cityInput').placeholder = data.address.city;
            document.getElementById('stateInput').placeholder = data.address.state;
            document.getElementById('zipCodeInput').placeholder = data.address.zipcode;
            document.getElementById('companyNameInput').placeholder = data.companyName;
        });
}
function updatePassword(apiLink, username, newPassword) {
    // APITODO: /changePassword

    // fetch(apiLink, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         userInfo
    //     }),
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         alert(data)
    //     });
    // alert(`Password changed to ${newPassword}`);
    return true;
}
function postJob(apiLink, jobInfo) {
    // APITODO: /postJob

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
    jobInfo.jobID = jobID;
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

    // printDict(jobInfo);
    // jobInfo.qualifications.forEach(qualification => {
    //     printDict(qualification)
    // });

    // TODO: Implement API to post job
    return true;
}
function updateJob(apiLink, jobInfo) {
    // APITODO: /updateJob

    var jobID = document.getElementById('jobIDDisplay').innerHTML;
    jobInfo.jobID = jobID;
    var positionName = document.getElementById('positionNameDisplay').innerHTML;
    jobInfo.positionName = positionName;
    // supervisorFirstNameInput, supervisorLastNameInput, supervisorEmailInput, supervisorPhoneNumberInput, payPerHourInput, startDateInput, endDateInput, startTimeInput, endTimeInput
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
        jobInfo.supervisorPhoneNumber = supervisorPhoneNumberInputValue;
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

    // TODO: Implement API call to update user
    // fetch(apiLink, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         userInfo
    //     }),
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         alert(data)
    //     });
}
function updateUser(apiLink, userInfo) {
    // APITODO: /updateEmployer

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
        var companyNameInputValue = document.getElementById('companyNameInput').value;
        if (companyNameInputValue) {
            userInfo.companyName = companyNameInputValue;
        }
    } catch (error) {
        // alert("Error in fields for Employer")
    }

    // printDict(userInfo);

    // TODO: Implement API call to update user
    // fetch(apiLink, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         userInfo
    //     }),
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         alert(data)
    //     });
}
// Function to update the card body with the initial content
function updateJobsList() {
    var accountsList = document.getElementById('jobsList');
    var scrollableBox = document.querySelector('.scrollable-box');

    // APITODO: /getAllJobs

    // Fetch data from the API for the Scrollable Box
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            // Update the list with the data
            data.forEach(item => {
                var listItem = document.createElement('a');
                listItem.className = 'list-group-item list-group-item-action clickable-job-item';
                listItem.href = '#';
                listItem.textContent = `${item.id} - ${item.name}`;

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
                        clickedItem.id = item.id;
                        clickedItem.name = item.name;
                        // clickedItem.username = item.username;
                    }
                });

                // Add click event listener to each listItem to show account details
                listItem.addEventListener('click', function () {
                    // Call showAccountDetails with the clicked item's id and name
                    showJobDetails(item.username);
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


function showJobDetails(clickedItem) {
    // Extract the id from the clickedItem's textContent
    var username = clickedItem;

    // APITODO: /getJobInfo
    // TODO: Delete this
    const usernameToIdMapping = {
        "Bret": 1,
        "Antonette": 2,
        "Samantha": 3,
        "Karianne": 4,
        "Kamren": 5,
        "Leopoldo_Corkery": 6,
        "Elwyn.Skiles": 7,
        "Maxime_Nienow": 8,
        "Delphine": 9,
        "Moriah.Stanton": 10
    };
    // TODO: Delete this
    username = usernameToIdMapping[username];

    // Fetch data from the API
    fetch(`https://jsonplaceholder.typicode.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            // Extract the attributes from the data
            var attributes = data;
            var jobId = attributes.id;

            // Update the display with the details
            // document.getElementById('usernameDisplay').textContent = attributes.username || 'N/A';
            // jobIDDisplay, positionNameDisplay, supervisorNameDisplay, supervisorEmailDisplay, supervisorPhoneNumberDisplay, payPerHourDisplay, startDateDisplay, endDateDisplay, startDateDisplay, endDateDisplay
            document.getElementById('jobIDDisplay').textContent = attributes.id || 'N/A';
            document.getElementById('positionNameDisplay').textContent = attributes.name || 'N/A';
            document.getElementById('supervisorNameDisplay').textContent = attributes.username || 'N/A';
            document.getElementById('supervisorEmailDisplay').textContent = attributes.email || 'N/A';
            document.getElementById('supervisorPhoneNumberDisplay').textContent = attributes.phone || 'N/A';
            document.getElementById('payPerHourDisplay').textContent = attributes.website || 'N/A';
            document.getElementById('startDateDisplay').textContent = attributes.address.street || 'N/A';
            document.getElementById('endDateDisplay').textContent = attributes.address.suite || 'N/A';
            document.getElementById('startTimeDisplay').textContent = attributes.address.city || 'N/A';
            document.getElementById('endTimeDisplay').textContent = attributes.address.zipcode || 'N/A';

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
                editBt.href = editBt.href.replace(/jobId=[^&]+/, `jobId=${jobId}`);
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
    var phoneNumber = input.value.replace(/\D/g, '');

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
    // TODO: Implement API call to delete user
    alert(`User with ID ${employerId} has been deleted`);
}
function validateContactInfoAndDelete(employerUsername) {
    // APITODO: /getEmployerInfo

    // Fetch data from the API using username
    fetch(`https://jsonplaceholder.typicode.com/users/${employerUsername}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            employerInfo = data;

            var firstName = document.getElementById('firstNameInput').value;
            var lastName = document.getElementById('lastNameInput').value;
            var email = document.getElementById('emailInput').value;
            var phoneNumber = document.getElementById('phoneNumberInput').value;
            if (firstName === employerInfo.name.split(' ')[0] && lastName === employerInfo.name.split(' ')[1] && email === employerInfo.email && phoneNumber === employerInfo.phone) {
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
