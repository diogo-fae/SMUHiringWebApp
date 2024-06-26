// Dictionary with all user information necessary to request to create an account
// Will be populated dynamically according to the user's input
let userInfo = {};

// Function to update the card body with the initial content
function updateInitialCardBody() {
    var cardBody = document.getElementById('card-body');
    cardBody.innerHTML = getInitialCard();
}

function isUserIdValid() {
    var inputElement = document.getElementById('username');
    var inputFeedback = document.getElementById('username-feedback');
    var inputVal = inputElement.value;
    var pattern = "[a-zA-Z].{7,}";

    if (!inputVal.match(pattern)) {
        inputElement.setCustomValidity("Username must start with a letter and be at least 8 characters long");
        inputFeedback.innerHTML = "Username must start with a letter and be at least 8 characters long";
        return;
    }
    // Call API and check for unique username
    fetch(`http://localhost:8080/isUserIdUnique/${inputVal}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(isUnique => {
            // Handle the response data here
            if (!isUnique) {
                inputElement.setCustomValidity("Username already exists");
                inputFeedback.innerHTML = "Username already exists";
            } else {
                inputElement.setCustomValidity("");
            }
        });
}

// Function called by the buttons in the sign up card
// Updates the userInfo dictionary with information entered and 
// updates the card body with the next card content
// On the last card, it will send the userInfo to the server and redirect to the login page
function validateAndContinue(nextCard) {
    // Dictionary with all user information necessary to request to create an account
    // Will be populated dynamically according to the user's input
    // let userInfo = {};
    // Validate inputs here
    var inputsValid = validateInputs();
    var form = document.querySelector('.needs-validation');
    var cardBody = document.getElementById('card-body');


    if (inputsValid) {
        // If all inputs are valid, navigate to the link specified in the button's nextCard
        if (nextCard == "employerCard") {
            // Update userInfo dictionary with info provided
            userInfo.userId = document.getElementById('username').value;
            userInfo.firstName = document.getElementById('firstName').value;
            userInfo.lastName = document.getElementById('lastName').value;
            userInfo.email = document.getElementById('email').value;
            userInfo.phoneNumber = document.getElementById('phoneNumber').value.replaceAll(/[^0-9]/g, '').toString();

            // Update card body with new content for Employer
            cardBody.innerHTML = getEmployerCard1();
        }
        else if (nextCard == "professionalCard1") {
            // Update userInfo dictionary with info provided
            userInfo.userId = document.getElementById('username').value;
            userInfo.firstName = document.getElementById('firstName').value;
            userInfo.lastName = document.getElementById('lastName').value;
            userInfo.email = document.getElementById('email').value;
            userInfo.phoneNumber = document.getElementById('phoneNumber').value.replaceAll(/[^0-9]/g, '').toString();

            // Update card body with new content for Professional
            cardBody.innerHTML = getProfessionalCard1();
        }
        else if (nextCard == "professionalCard2") {
            // Update userInfo dictionary with info provided
            userInfo.address1 = document.getElementById('address').value;
            userInfo.address2 = document.getElementById('address2').value;
            userInfo.city = document.getElementById('city').value;
            userInfo.state = document.getElementById('state').value;
            userInfo.zipCode = document.getElementById('zipCode').value.toString();
            userInfo.degreeType = document.getElementById('degreeType').value;
            userInfo.graduationDate = document.getElementById('startDateDegree').value.toString();
            userInfo.university = document.getElementById('institution').value;

            // Update card body with new content for Professional
            cardBody.innerHTML = getProfessionalCard2();
        }
        else if (nextCard == "professionalDone") {
            // Update userInfo dictionary with info provided
            // Get the table element by its ID or any other selector
            // userInfo.qualifications = {};

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
                userInfo.professionalQualificationRequest = qualifications;
            }

            // // Check if at least 2 different categories are selected
            // if (unique_categories.length < 2) {
            //     alert("Please select at least 2 different categories");
            //     return;
            // }

            // Call endpoint to request Professional creation
            // alert(`Creating Professional account with the following information: ${userInfo.userId}`);
            // alert(userInfo)
            // alert(JSON.stringify(userInfo));
            // DONE APITODO: /registerProfessional
            fetch('http://localhost:8080/registerProfessional', {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(data => {
                    // Handle the response data here
                    console.log(data);
                })
                .catch(error => {
                    // Handle any errors that occur during the fetch
                    // alert('Error creating Professional:', error);
                });

            // Redirect to login page
            window.location.href = "Login.html";
        }
        else if (nextCard == "employerDone") {
            // Update userInfo dictionary with info provided
            userInfo.address1 = document.getElementById('address').value;
            userInfo.address2 = document.getElementById('address2').value;
            userInfo.city = document.getElementById('city').value;
            userInfo.state = document.getElementById('state').value;
            userInfo.zipCode = document.getElementById('zipCode').value.toString();
            userInfo.company = document.getElementById('companyName').value;
            // Print the dictionary for testing
            // TODO: Delete this
            // for (var key in userInfo) {
            //     // Check if the key is a property of the object itself (not inherited)
            //     if (userInfo.hasOwnProperty(key)) {
            //         // Get the value corresponding to the key
            //         var value = userInfo[key];
            //         // Alert the key and value
            //         alert("Key: " + key + ", Value: " + value);
            //     }
            // }

            // alert(JSON.stringify(userInfo));
            // Call endpoint to request Employer creation
            // DONE APITODO: /registerEmployer
            // alert(`Creating Employer account with the following information: ${userInfo.userId}`);
            fetch('http://localhost:8080/registerEmployer', {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(data => {
                    // Handle the response data here
                    // alert("Account created successfully!")
                })
                .catch(error => {
                    // Handle any errors that occur during the fetch
                    // alert('Error creating Employer:', error);
                });

            // Redirect to login page
            window.location.href = "Login.html";
        }
        return
        // window.location.href = href;
    } else {
        // If any input is not valid, handle the validation error (e.g., display an error message)
        form.classList.add('was-validated');
    }
}

function validateInputs() {
    // Implement your input validation logic here
    // Return true if all inputs are valid, false otherwise
    // Example validation logic:
    var inputs = document.querySelectorAll('.needs-validation input');
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
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








// HTML Cards
function getInitialCard() {
    var initialCard = `
    <!-- Card -->
            <div class="card col-md-11 px-0 py-0" id="input-card">
                <h5 class="card-header">Sign Up</h5>
                <div class="card-body">
                    <form class="needs-validation" novalidate>
                        <!-- Username -->
                        <div class="mb-5">
                            <label for="username" class="font-weight-bold">Username</label>
                            <input type="text" class="form-control" id="username" placeholder="" value=""
                                required pattern="[a-zA-Z].{7,}" oninput="isUserIdValid()">
                            <div id="input-live-help" class="extra-text">Username must start with an alphabet
                                and be at least 8 characters long.</div>
                            <div class="invalid-feedback" id="username-feedback">
                            </div>
                        </div>
                        <!-- Name -->
                        <div class="row">
                            <div class="col-md-6 mb-5">
                                <label for="firstName" class="font-weight-bold">First Name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="" value=""
                                    required>
                                <div class="invalid-feedback">
                                    Please enter the first name.
                                </div>
                            </div>
                            <div class="col-md-6 mb-5">
                                <label for="lastName" class="font-weight-bold">Last Name</label>
                                <input type="text" class="form-control" id="lastName" placeholder="" value=""
                                    required>
                                <div class="invalid-feedback">
                                    Please enter the last name.
                                </div>
                            </div>
                        </div>
                        <!-- Email -->
                        <div class="mb-5">
                            <label for="email" class="font-weight-bold">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="you@example.com"
                                value="" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}">
                            <div class="invalid-feedback">
                                Please enter a valid email.
                            </div>
                        </div>
                        <!-- Phone -->
                        <div class="mb-5">
                            <label for="phoneNumber" class="font-weight-bold">Phone Number</label>
                            <input type="text" class="form-control" id="phoneNumber"
                                placeholder="(123) 456-7890" value="" oninput="formatPhoneNumber(this)"
                                maxlength="14" pattern="^{10\d}$"
                                title="Please enter a valid phone number (e.g., (123) 456-7890)" required>
                            <div class="invalid-feedback">
                                Please enter a valid phone number.
                            </div>
                        </div>
                        <!-- Continue Buttons -->
                        <div class="row">
                            <div class="col-md-7">
                                <button newCard="professionalCard1" type="button"
                                    class="btn btn-success" id="continueBtnP"
                                    onclick="validateAndContinue(this.getAttribute('newCard'))">Sign Up
                                    Professional</button>
                            </div>
                            <div class="col">
                                <button newCard="employerCard" type="button" class="btn btn-success"
                                    id="continueBtnE"
                                    onclick="validateAndContinue(this.getAttribute('newCard'))">Sign Up
                                    Employer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            `;
    return initialCard;
}

function getEmployerCard1() {
    var employerCard = `
    <div class="card col-md-11 px-0 py-0">
                <h5 class="card-header">Sign Up Employer</h5>
                <div class="card-body">
                    <form class="needs-validation" novalidate>
                        <!-- Address -->
                        <div class="mb-5">
                            <label for="Address" class="font-weight-bold">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="1234 Main St"
                                value="" required>
                            <div class="invalid-feedback">
                                Please enter the address.
                            </div>
                        </div>
                        <!-- Address 2 -->
                        <div class="mb-5">
                            <label for="address2" class="font-weight-bold">Address 2<span
                                    class="text-muted">(Optional)</span></label>
                            <input type="text" class="form-control" id="address2"
                                placeholder="Apartment or suite">
                        </div>
                        <!-- Address 3 -->
                        <div class="row">
                            <div class="col-md-4 mb-5">
                                <label for="city" class="font-weight-bold">City</label>
                                <input type="text" class="form-control" id="city" placeholder="City" value=""
                                    required>
                                <div class="invalid-feedback">
                                    Please enter a valid city.
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <label for="state" class="font-weight-bold">State</label>
                                <select class="custom-select d-block w-100" id="state" required>
                                    <option value="">Choose...</option>
                                    <option>Alabama</option>
                                    <option>Alaska</option>
                                    <option>Arizona</option>
                                    <option>Arkansas</option>
                                    <option>California</option>
                                    <option>Colorado</option>
                                    <option>Connecticut</option>
                                    <option>Delaware</option>
                                    <option>Florida</option>
                                    <option>Georgia</option>
                                    <option>Hawaii</option>
                                    <option>Idaho</option>
                                    <option>Illinois</option>
                                    <option>Indiana</option>
                                    <option>Iowa</option>
                                    <option>Kansas</option>
                                    <option>Kentucky</option>
                                    <option>Louisiana</option>
                                    <option>Maine</option>
                                    <option>Maryland</option>
                                    <option>Massachusetts</option>
                                    <option>Michigan</option>
                                    <option>Minnesota</option>
                                    <option>Mississippi</option>
                                    <option>Missouri</option>
                                    <option>Montana</option>
                                    <option>Nebraska</option>
                                    <option>Nevada</option>
                                    <option>New Hampshire</option>
                                    <option>New Jersey</option>
                                    <option>New Mexico</option>
                                    <option>New York</option>
                                    <option>North Carolina</option>
                                    <option>North Dakota</option>
                                    <option>Ohio</option>
                                    <option>Oklahoma</option>
                                    <option>Oregon</option>
                                    <option>Pennsylvania</option>
                                    <option>Rhode Island</option>
                                    <option>South Carolina</option>
                                    <option>South Dakota</option>
                                    <option>Tennessee</option>
                                    <option>Texas</option>
                                    <option>Utah</option>
                                    <option>Vermont</option>
                                    <option>Virginia</option>
                                    <option>Washington</option>
                                    <option>West Virginia</option>
                                    <option>Wisconsin</option>
                                    <option>Wyoming</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please select a state.
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <label for="zipCode" class="font-weight-bold">Zip Code</label>
                                <input type="text" class="form-control" id="zipCode" placeholder="Zip Code"
                                    value="" required maxlength="5" onkeypress="return blockNegative(event)"
                                    pattern="^{5\d}$">
                                <div class="invalid-feedback">
                                    Please enter a valid zip code.
                                </div>
                            </div>
                        </div>
                        <!-- Company Name -->
                        <div class="mb-5">
                            <label for="companyName" class="font-weight-bold">Company Name</label>
                            <input type="text" class="form-control" id="companyName" placeholder="" value=""
                                required>
                            <div class="invalid-feedback">
                                Please enter the company name.
                            </div>
                        </div>
                        <!-- Continue Buttons -->
                        <div class="row">
                            <div class="col-md-7">
                                <button newCard="employerDone" type="button"
                                    class="btn btn-success" id="continueBtnP"
                                    onclick="validateAndContinue(this.getAttribute('newCard'))">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            `;
    return employerCard;
}

function getProfessionalCard1() {
    var professionalCard1 = `
    <div class="card col-md-11 px-0 py-0">
                <h5 class="card-header">Sign Up Professional - 1</h5>
                <div class="card-body">
                    <form class="needs-validation" novalidate>
                        <!-- Address -->
                        <div class="mb-5">
                            <label for="Address" class="font-weight-bold">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="1234 Main St"
                                value="" required>
                            <div class="invalid-feedback">
                                Please enter the address.
                            </div>
                        </div>
                        <!-- Address 2 -->
                        <div class="mb-5">
                            <label for="address2" class="font-weight-bold">Address 2<span
                                    class="text-muted">(Optional)</span></label>
                            <input type="text" class="form-control" id="address2"
                                placeholder="Apartment or suite">
                        </div>
                        <!-- Address 3 -->
                        <div class="row">
                            <div class="col-md-4 mb-5">
                                <label for="city" class="font-weight-bold">City</label>
                                <input type="text" class="form-control" id="city" placeholder="City" value=""
                                    required>
                                <div class="invalid-feedback">
                                    Please enter a valid city.
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <label for="state" class="font-weight-bold">State</label>
                                <select class="custom-select d-block w-100" id="state" required>
                                    <option value="">Choose...</option>
                                    <option>Alabama</option>
                                    <option>Alaska</option>
                                    <option>Arizona</option>
                                    <option>Arkansas</option>
                                    <option>California</option>
                                    <option>Colorado</option>
                                    <option>Connecticut</option>
                                    <option>Delaware</option>
                                    <option>Florida</option>
                                    <option>Georgia</option>
                                    <option>Hawaii</option>
                                    <option>Idaho</option>
                                    <option>Illinois</option>
                                    <option>Indiana</option>
                                    <option>Iowa</option>
                                    <option>Kansas</option>
                                    <option>Kentucky</option>
                                    <option>Louisiana</option>
                                    <option>Maine</option>
                                    <option>Maryland</option>
                                    <option>Massachusetts</option>
                                    <option>Michigan</option>
                                    <option>Minnesota</option>
                                    <option>Mississippi</option>
                                    <option>Missouri</option>
                                    <option>Montana</option>
                                    <option>Nebraska</option>
                                    <option>Nevada</option>
                                    <option>New Hampshire</option>
                                    <option>New Jersey</option>
                                    <option>New Mexico</option>
                                    <option>New York</option>
                                    <option>North Carolina</option>
                                    <option>North Dakota</option>
                                    <option>Ohio</option>
                                    <option>Oklahoma</option>
                                    <option>Oregon</option>
                                    <option>Pennsylvania</option>
                                    <option>Rhode Island</option>
                                    <option>South Carolina</option>
                                    <option>South Dakota</option>
                                    <option>Tennessee</option>
                                    <option>Texas</option>
                                    <option>Utah</option>
                                    <option>Vermont</option>
                                    <option>Virginia</option>
                                    <option>Washington</option>
                                    <option>West Virginia</option>
                                    <option>Wisconsin</option>
                                    <option>Wyoming</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please select a state.
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <label for="zipCode" class="font-weight-bold">Zip Code</label>
                                <input type="text" class="form-control" id="zipCode" placeholder="Zip Code"
                                    value="" required maxlength="5" onkeypress="return blockNegative(event)"
                                    pattern="^{5\d}$">
                                <div class="invalid-feedback">
                                    Please enter a valid zip code.
                                </div>
                            </div>
                        </div>
                        <!-- Degree -->
                        <div class="row">
                            <div class="col-md-6 mb-5">
                                <label for="degreeType" class="font-weight-bold">Highest Degree
                                    Completed</label>
                                <select class="custom-select d-block w-100" id="degreeType" required>
                                    <option value="">Choose...</option>
                                    <option>Under graduate</option>
                                    <option>Graduate</option>
                                    <option>PhD</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please select the highest degree completed.
                                </div>
                            </div>
                            <div class="col-md-6 mb-5">
                                <label for="degreeDate" class="font-weight-bold">Degree Completion</label>
                                <div class="input-group date" data-provide="datepicker" id="datepickerDegree"
                                    data-date-format="mm-yyyy">
                                    <input type="text" class="form-control" id="startDateDegree" value="" required
                                        style="background-color: white;" placeholder="MM-YYYY">
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Institution Name -->
                        <div class="mb-5">
                            <label for="institution" class="font-weight-bold">Institution Name</label>
                            <input type="text" class="form-control" id="institution" placeholder="" value=""
                                required>
                            <div class="invalid-feedback">
                                Please enter the institution name.
                            </div>
                        </div>
                        <!-- Continue Buttons -->
                        <div class="row">
                            <div class="col-md-7">
                                <button newCard="professionalCard2" type="button"
                                    class="btn btn-success" id="continueBtnP"
                                    onclick="validateAndContinue(this.getAttribute('newCard'))">Continue</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            `;
    return professionalCard1;
}

function getProfessionalCard2() {
    var professionalCard2 = `
    <div class="card col-md-11 px-0 py-0">
                <h5 class="card-header">Sign Up Professional - 2</h5>
                <div class="card-body">

                    <!-- Qualifications -->
                    <div class="mb-5">
                        <!-- Inputs -->
                        <div class="mb-3">
                            <label for="qualifications" class="font-weight-bold">Required
                                Qualifications</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="categoryname"
                                    placeholder="Category Name">
                            </div>
                            <div class="input-group" style="margin-top: 4%;">
                                <input type="text" class="form-control" id="categoryskills"
                                    placeholder="Skills">
                            </div>
                            <div id="input-live-help" class="extra-text">Enter one skill at a time.</div>
                            <div class="invalid-feedback" id="cat-table-invalid-feedback">Please enter at least
                                2 categories.</div>
                        </div>
                        <!-- Add and Remove Buttons -->
                        <div class="row">
                            <div class="col-md-9 mb-3">
                                <button id="add-btn" class="btn btn-outline-primary" onclick="add()"
                                    form="none">Add</button>
                            </div>
                            <div class="col mb-3">
                                <button id="delete-btn" class="btn btn-outline-danger" onclick="deleteLastRow()"
                                    form="none">Delete</button>
                            </div>
                        </div>

                        <!-- Table -->
                        <div class="table-wrapper-scroll-y my-custom-scrollbar" style="height: 350px;">
                            <table id="categorytable" class="table table-bordered">
                                <thead>
                                    <tr style="background-color: #62849b;color: white;">
                                        <th scope="col">Category</th>
                                        <th scope="col">Skills</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <!-- Continue Buttons -->
                    <div class="row">
                        <div class="col-md-7">
                            <button newCard="professionalDone" type="button"
                                class="btn btn-success" id="continueBtnP"
                                onclick="validateAndContinue(this.getAttribute('newCard'))">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
    `
    return professionalCard2;
}