// API Calls ------------------------------------------------------------------------------------
function showHeaderUsername(username) {
    document.getElementById('headerUsername').innerHTML = usernameToIdMapping[username];
}
function showStaffInfo(username) {
    // DONE APITODO: /getStaffInfo
    alert(`Getting staff info for ${username} from the API`)
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getStaffInfo/${username}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            staffInfo = data;

            // Fill in the staff information
            // document.getElementById('headerUsername').innerHTML = data.username;
            document.getElementById('usernameDisplay').innerHTML = data.username;
            document.getElementById('firstNameDisplay').innerHTML = data.name.split(' ')[0];
            document.getElementById('lastNameDisplay').innerHTML = data.name.split(' ')[1];
            document.getElementById('emailDisplay').innerHTML = data.email;
            document.getElementById('phoneNumberDisplay').innerHTML = data.phone;
        });
}
function showEmployerInfo(employerUsername) {
    // DONE APITODO: /getEmployerInfo
    alert(`Getting employer info for ${employerUsername} from the API to show`)
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getEmployerInfo/${employerUsername}`)
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
function showProfessionalInfo(professionalUsername) {
    // DONE APITODO: /getProfessionalInfo
    alert(`Getting professional info for ${professionalUsername} from the API to show`)
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getProfessionalInfo${professionalUsername}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            professionalInfo = data;
            document.getElementById('usernameDisplay').innerHTML = professionalInfo.username;
            document.getElementById('firstNameDisplay').innerHTML = professionalInfo.name.split(' ')[0];
            document.getElementById('lastNameDisplay').innerHTML = professionalInfo.name.split(' ')[1];
            document.getElementById('emailDisplay').innerHTML = professionalInfo.email;
            document.getElementById('phoneNumberDisplay').innerHTML = professionalInfo.phoneNumber;
            document.getElementById('address1Display').innerHTML = professionalInfo.address.street;
            document.getElementById('address2Display').innerHTML = professionalInfo.address.suite;
            document.getElementById('cityDisplay').innerHTML = professionalInfo.address.city;
            document.getElementById('stateDisplay').innerHTML = professionalInfo.state;
            document.getElementById('zipCodeDisplay').innerHTML = professionalInfo.address.zipcode;
            document.getElementById('startDateDegreeDisplay').innerHTML = professionalInfo.startDateDegree;
            document.getElementById('institutionDisplay').innerHTML = professionalInfo.company.name;
            document.getElementById('degreeTypeDisplay').innerHTML = professionalInfo.company.bs;
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
function showHeaderUsername(username) {
    document.getElementById('headerUsername').innerHTML = username;
}
function fillEditForm(username) {
    // DONE APITODO: /getStaffInfo
    alert(`Getting staff info for ${username} from the API to fill in the form`)
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getStaffInfo/${username}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            staffInfo = data;

            // Fill in the staff information
            document.getElementById('firstNameInput').placeholder = data.name.split(' ')[0];
            document.getElementById('lastNameInput').placeholder = data.name.split(' ')[1];
            document.getElementById('emailInput').placeholder = data.email;
            document.getElementById('phoneNumberInput').placeholder = data.phone;
        });
}
function fillEmployerEditForm(username) {
    // DONE APITODO: /getEmployerInfo
    alert(`Getting employer info for ${username} from the API to fill in the form`)
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getEmployerInfo/${username}`)
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
function fillProfessionalEditForm(username) {
    // DONE APITODO: /getProfessionalInfo
    alert(`Getting professional info for ${username} from the API to fill in the form`)
    // Fetch data from the API using username
    fetch(`http://localhost:8080/getProfessionalInfo/${username}`)
        .then(response => response.json())
        .then(data => {
            // Store the staff information
            professionalInfo = data;

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
            document.getElementById('institutionInput').placeholder = data.company.name;
            document.getElementById('degreeTypeInput').placeholder = data.company.bs;
            document.getElementById('startDateDegreeInput').placeholder = data.id;
        });
}
function getRequests(requestQueue) {
    alert(`Getting ${requestQueue} requests from the API`)
    if (requestQueue === 'createEmployer') {
        // DONE APITODO: /getCreateEmployerRequests
        return fetch('http://localhost:8080/getCreateEmployerRequests')
            .then(response => response.json());
    } else if (requestQueue === 'deleteEmployer') {
        // DONE APITODO: /getDeleteEmployerRequests
        return fetch('http://localhost:8080/getDeleteEmployerRequests')
            .then(response => response.json());
    } else if (requestQueue === 'createProfessional') {
        // DONE APITODO: /getCreateProfessionalRequests
        return fetch('http://localhost:8080/getCreateProfessionalRequests')
            .then(response => response.json());
    } else if (requestQueue === 'deleteProfessional') {
        // DONE APITODO: /getDeleteProfessionalRequests
        return fetch('http://localhost:8080/getDeleteProfessionalRequests')
            .then(response => response.json());
    }
}
function getEmployers() {
    // DONE APITODO: /getAllEmployers
    alert('Getting all employers from the API')
    return fetch('http://localhost:8080/getAllEmployers')
        .then(response => response.json());
}
function reviewRequest(requesterUsername, requestType, userType, decision) {
    // TODO: Implement API call to update request status AND send decision
    if (requestType === 'create') {
        if (userType === 'Employer') {
            if (decision === 'approve') {
                // DONE APITODO: /approveCreateEmployerRequest
                return fetch(`http://localhost:8080/approveCreateEmployerRequest/${requesterUsername}`, {
                    method: 'POST',
                })
                    .then(response => response.json());
            } else if (decision === 'deny') {
                // DONE APITODO: /denyCreateEmployerRequest
                return fetch(`http://localhost:8080/denyCreateEmployerRequest/${requesterUsername}`, {
                    method: 'POST',
                })
                    .then(response => response.json());
            }
        } else if (userType === 'Professional') {
            if (decision === 'approve') {
                // DONE APITODO: /approveCreateProfessionalRequest
                return fetch(`http://localhost:8080/approveCreateProfessionalRequest/${requesterUsername}`, {
                    method: 'POST',
                })
                    .then(response => response.json());
            } else if (decision === 'deny') {
                // DONE APITODO: /denyCreateProfessionalRequest
                return fetch(`http://localhost:8080/denyCreateProfessionalRequest/${requesterUsername}`, {
                    method: 'POST',
                })
            }
        }
    } else if (requestType === 'delete') {
        if (userType === 'Employer') {
            if (decision === 'approve') {
                // APITO: /approveDeleteEmployerRequest
            } else if (decision === 'deny') {
                // APITO: /denyDeleteEmployerRequest
            }
        } else if (userType === 'Professional') {
            if (decision === 'approve') {
                // APITO: /approveDeleteProfessionalRequest
            } else if (decision === 'deny') {
                // APITO: /denyDeleteProfessionalRequest
            }
        }
    }
}
function updatePassword(apiLink, username, newPassword) {
    // DONE APITODO: /changePassword
    var passwordInfo = { "username": username, "password": newPassword }

    alert(`Changing password to ${newPassword}`);
    fetch("http://localhost:8080/changePassword", {
        method: 'PUT',
        body: JSON.stringify({
            passwordInfo
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data)
        });
    return true;
}
function updateUser(apiLink, userInfo) {
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
        var institutionInputValue = document.getElementById('institutionInput').value;
        if (institutionInputValue) {
            userInfo.institution = institutionInputValue;
        }
        var startDateDegreeInputValue = document.getElementById('startDateDegreeInput').value;
        if (startDateDegreeInputValue) {
            userInfo.startDateDegree = startDateDegreeInputValue;
        }
        var degreeTypeInputValue = document.getElementById('degreeTypeInput').value;
        if (degreeTypeInputValue) {
            userInfo.degreeType = degreeTypeInputValue;
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
            userInfo.qualifications = qualifications;
        }
        alert(`Updating user info to ${userInfo.id}`);
        // DONE APITODO: /updateProfessional
        return fetch('http://localhost:8080/updateProfessional', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(userInfo)
        }).then(response => response.json())
            .then(data => {
                // Handle the response data here
                console.log(data);
            })
            .catch(error => {
                // Handle any errors that occur during the fetch
                console.error('Error:', error);
            });
    } catch (error) {
        // alert("Error in fields for Professional")
    }
    try {
        var companyNameInputValue = document.getElementById('companyNameInput').value;
        if (companyNameInputValue) {
            userInfo.companyName = companyNameInputValue;
        }
        alert(`Updating Employer with ID: ${userInfo.username}`)
        // DONE APITODO: /updateEmployer
        return fetch("http://localhost:8080/updateEmployer", {
            method: 'PUT',
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
    } catch (error) {
        // alert("Error in fields for Employer")
    }

    // printDict(userInfo);

    alert(`Updating Staff with ID: ${userInfo.username}`)
    // DONE APITODO: /updateStaff
    return fetch("http://localhost:8080/updateStaff", {
        method: 'PUT',
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
function updateEmployerAccountsList() {
    var accountsList = document.getElementById('employerAccountsList');
    var scrollableBox = document.querySelector('.scrollable-box');

    // DONE APITODO: /getAllEmployers
    // Fetch data from the API for the Scrollable Box
    fetch('http://localhost:8080/getAllEmployers')
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
                    showEmployerAccountDetails(item.username);
                });

                accountsList.appendChild(listItem);

                // Click the first item when the page loads
                if (accountsList.children.length === 1) {
                    listItem.click();
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data updateStaffAccountsList():', error);
        });
}
function showEmployerAccountDetails(clickedItem) {
    // Extract the id from the clickedItem's textContent
    var username = clickedItem;

    // DONE APITODO: /getEmployerInfo
    // Fetch data from the API
    fetch(`http://localhost:8080/getEmployerInfo/${username}`)
        .then(response => response.json())
        .then(data => {
            // Extract the attributes from the data
            var attributes = data;

            // Update the display with the details
            document.getElementById('usernameDisplay').textContent = attributes.username || 'N/A';
            document.getElementById('firstNameDisplay').textContent = attributes.name.split(' ')[0] || 'N/A';
            document.getElementById('lastNameDisplay').textContent = attributes.name.split(' ')[1] || 'N/A';
            document.getElementById('emailDisplay').textContent = attributes.email || 'N/A';
            document.getElementById('phoneNumberDisplay').textContent = attributes.phone || 'N/A';
            // companyNameDisplay, address1Display, address2Display, cityDisplay, stateDisplay, zipCodeDisplay
            document.getElementById('companyNameDisplay').textContent = attributes.company.name || 'N/A';
            document.getElementById('address1Display').textContent = attributes.address.street || 'N/A';
            document.getElementById('address2Display').textContent = attributes.address.suite || 'N/A';
            document.getElementById('cityDisplay').textContent = attributes.address.city || 'N/A';
            document.getElementById('stateDisplay').textContent = attributes.address.state || 'N/A';
            document.getElementById('zipCodeDisplay').textContent = attributes.address.zipcode || 'N/A';
            var editBt = document.getElementById('editBt');

            // Update the href attribute of the edit button
            // Check if employerUsername is already part of the href attribute
            if (editBt.href.includes('employerUsername')) {
                // If it is, update the value of username
                editBt.href = editBt.href.replace(/employerUsername=[^&]+/, `employerUsername=${username}`);
            } else {
                // If it's not, append both username and employerUsername
                editBt.href += `&employerUsername=${username}`;
            }
            // editBt.href += `&employerUsername=${username}`;
        })
        .catch(error => {
            alert('Error fetching data showAccountDetails():', error);
        });
}
// Function to update the card body with the initial content
function updateProfessionalAccountsList() {
    var accountsList = document.getElementById('professionalAccountsList');
    var scrollableBox = document.querySelector('.scrollable-box');

    // DONE APITODO: /getJobMatchingRequests
    // Fetch number of Job Matching requests from the API
    fetch('http://localhost:8080/getJobMatchingRequests')
        .then(response => response.json())
        .then(data => {
            // Update the card body with the number of requests
            document.getElementById("numRequestsBadge").innerHTML = data.length;
        });

    // DONE APITODO: /getAllProfessionals
    // Fetch data from the API for the Scrollable Box
    fetch('http://localhost:8080/getAllProfessionals')
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
                    var initiateJMBt = document.getElementById('initiateJMBt');
                    initiateJMBt.innerHTML = `Initiate Job Matching for ${item.username}`;
                    // Call showAccountDetails with the clicked item's id and name
                    showProfessionalAccountDetails(item.username);
                });

                accountsList.appendChild(listItem);

                // Click the first item when the page loads
                if (accountsList.children.length === 1) {
                    listItem.click();
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data updateStaffAccountsList():', error);
        });
}
function showProfessionalAccountDetails(clickedItem) {
    // Extract the id from the clickedItem's textContent
    var username = clickedItem;

    // DONE APITODO: /getProfessionalInfo
    // Fetch data from the API
    fetch(`http://localhost:8080/getProfessionalInfo/${username}`)
        .then(response => response.json())
        .then(data => {
            // Extract the attributes from the data
            var attributes = data;

            // Update the display with the details
            document.getElementById('usernameDisplay').textContent = attributes.username || 'N/A';
            document.getElementById('firstNameDisplay').textContent = attributes.name.split(' ')[0] || 'N/A';
            document.getElementById('lastNameDisplay').textContent = attributes.name.split(' ')[1] || 'N/A';
            document.getElementById('emailDisplay').textContent = attributes.email || 'N/A';
            document.getElementById('phoneNumberDisplay').textContent = attributes.phone || 'N/A';
            // companyNameDisplay, address1Display, address2Display, cityDisplay, stateDisplay, zipCodeDisplay
            document.getElementById('address1Display').textContent = attributes.address.street || 'N/A';
            document.getElementById('address2Display').textContent = attributes.address.suite || 'N/A';
            document.getElementById('cityDisplay').textContent = attributes.address.city || 'N/A';
            document.getElementById('stateDisplay').textContent = attributes.address.state || 'N/A';
            document.getElementById('zipCodeDisplay').textContent = attributes.address.zipcode || 'N/A';
            // institutionDisplay, degreeTypeDisplay, startDateDegreeDisplay
            document.getElementById('institutionDisplay').textContent = attributes.company.name || 'N/A';
            document.getElementById('degreeTypeDisplay').textContent = attributes.company.bs || 'N/A';
            document.getElementById('startDateDegreeDisplay').textContent = attributes.company.bs || 'N/A';
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

            var editBt = document.getElementById('editBt');

            // Update the href attribute of the edit button
            // Check if professionalUsername is already part of the href attribute
            if (editBt.href.includes('professionalUsername')) {
                // If it is, update the value of username
                editBt.href = editBt.href.replace(/professionalUsername=[^&]+/, `professionalUsername=${username}`);
            } else {
                // If it's not, append both username and professionalUsername
                editBt.href += `&professionalUsername=${username}`;
            }
            // editBt.href += `&professionalUsername=${username}`;
        })
        .catch(error => {
            alert('Error fetching data showAccountDetails():', error);
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

function checkLogin() {
    // Compare cookie's username with the username in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlUsername = urlParams.get('username');
    var cookieUsername = "";
    alert(`Checking if ${urlUsername} is logged in.`);
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'username') {
            // Return the value of the "username" cookie
            cookieUsername = value;
        }
    }
    if (cookieUsername !== urlUsername) {
        alert(`User ${urlUsername} is not logged in.`);
        window.location.href = '/SignUp/Login.html';
    }
}
function logout() {
    document.cookie = `username=; path=/`;
    document.cookie = `userType=; path=/`;
    window.location.href = '/SignUp/Login.html';
}
