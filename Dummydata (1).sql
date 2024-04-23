SHOW TABLES;

SELECT * FROM JobPosting;

DROP TABLE AccountDeleteRequest;
DROP TABLE Credentials;
DROP TABLE Payment;
DROP TABLE EmployerAccountRequest;
DROP TABLE JobMatching;
DROP TABLE ProfessionalAccountRequest;
DROP TABLE ProfessionalQualification;
DROP TABLE ProfessionalQualificationRequest;
DROP TABLE JobMatchingRequest;
DROP TABLE JobQualification;
DROP TABLE JobPosting;
DROP TABLE Professional;
DROP TABLE Employer;
DROP TABLE User;


-- Create User table
CREATE TABLE User (
                      userId VARCHAR(255) PRIMARY KEY,
                      firstName VARCHAR(255) NOT NULL,
                      lastName VARCHAR(255) NOT NULL,
                      email VARCHAR(255) NOT NULL,
                      phoneNumber BIGINT NOT NULL,
                      status VARCHAR(255) NOT NULL,
                      userType ENUM('S', 'R', 'E', 'P') NOT NULL,
                      CONSTRAINT phone_number_length CHECK (phoneNumber BETWEEN 1000000000 AND 9999999999)
);

-- Create Credentials table
CREATE TABLE Credentials (
                             userId VARCHAR(255) PRIMARY KEY,
                             password VARCHAR(255) NOT NULL,
                             FOREIGN KEY (userId) REFERENCES User(userId)
);

-- Create Payment table
CREATE TABLE Payment (
                         userId VARCHAR(255),
                         paymentId VARCHAR(255) PRIMARY KEY,
                         paymentAmount DECIMAL NOT NULL,
                         dueDate DATE NOT NULL,
                         paymentDate DATE NOT NULL,
                         FOREIGN KEY (userId) REFERENCES User(userId)
);

-- Create Professional table
CREATE TABLE Professional (
                              userId VARCHAR(255) PRIMARY KEY,
                              address1 VARCHAR(255) NOT NULL,
                              address2 VARCHAR(255),
                              city VARCHAR(255) NOT NULL,
                              state VARCHAR(255) NOT NULL,
                              zipCode INT(5) NOT NULL,
                              university VARCHAR(255) NOT NULL,
                              graduationDate DATE NOT NULL,
                              degreeType VARCHAR(255) NOT NULL,
                              FOREIGN KEY (userId) REFERENCES User(userId),
                              CONSTRAINT zipCode_length_prof CHECK (zipCode BETWEEN 10000 AND 99999)
);
-- Create Employer table
CREATE TABLE Employer (
                          userId VARCHAR(255) PRIMARY KEY,
                          address1 VARCHAR(255) NOT NULL,
                          address2 VARCHAR(255),
                          city VARCHAR(255) NOT NULL,
                          state CHAR(255) NOT NULL,
                          zipCode INT(5) NOT NULL,
                          company VARCHAR(255) NOT NULL,
                          FOREIGN KEY (userId) REFERENCES User(userId),
                          CONSTRAINT zipCode_length_emp CHECK (zipCode BETWEEN 10000 AND 99999)
);

CREATE TABLE JobMatchingRequest (
                                    userId VARCHAR(255) PRIMARY KEY,
                                    FOREIGN KEY (userId) REFERENCES Professional(userId)
);

-- Create JobPosting table, must index company on Employer table first
CREATE INDEX idx_company ON Employer(company);
CREATE TABLE JobPosting (
                            jobId INT,
                            company VARCHAR(255),
                            positionName VARCHAR(255) NOT NULL,
                            supervisorFirstName VARCHAR(255) NOT NULL,
                            supervisorLastName VARCHAR(255) NOT NULL,
                            supervisorEmail VARCHAR(255) NOT NULL,
                            supervisorPhoneNumber BIGINT NOT NULL,
                            startDate DATE NOT NULL,
                            endDate DATE NOT NULL,
                            startTime TIME NOT NULL,
                            endTime TIME NOT NULL,
                            payPerHour DECIMAL NOT NULL,
                            PRIMARY KEY (jobId, company),
                            FOREIGN KEY (company) REFERENCES Employer(company)
);
-- Create JobQualification table
CREATE TABLE JobQualification (
                                  jobId INT,
                                  company VARCHAR(255),
                                  category VARCHAR(255),
                                  keyword VARCHAR(255),
                                  PRIMARY KEY (jobId, company, category, keyword),
                                  FOREIGN KEY (jobId, company) REFERENCES JobPosting(jobId, company) ON DELETE CASCADE
);

-- Create ProfessionalQualification table
CREATE TABLE ProfessionalQualification (
                                           userId VARCHAR(255),
                                           category VARCHAR(255),
                                           keyword VARCHAR(255),
                                           PRIMARY KEY (userId, category, keyword),
                                           FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE ProfessionalQualificationRequest (
                                                  userId VARCHAR(255),
                                                  category VARCHAR(255),
                                                  keyword VARCHAR(255),
                                                  PRIMARY KEY (userId, category, keyword),
                                                  FOREIGN KEY (userId) REFERENCES User(userId)
);

-- Create JobMatching table
CREATE TABLE JobMatching (
                             userId VARCHAR(255),
                             jobId INT,
                             company VARCHAR(255),
                             PRIMARY KEY (userId, jobId, company),
                             FOREIGN KEY (userId) REFERENCES Professional(userId),
                             FOREIGN KEY (jobId, company) REFERENCES JobPosting(jobId, company) ON DELETE CASCADE
);

-- Create ProfessionalRequest table
CREATE TABLE ProfessionalAccountRequest (
                                            userId VARCHAR(255) PRIMARY KEY,
                                            firstName VARCHAR(255) NOT NULL,
                                            lastName VARCHAR(255) NOT NULL,
                                            email VARCHAR(255) NOT NULL,
                                            phoneNumber BIGINT NOT NULL,
                                            userType ENUM('S', 'R', 'E', 'P') NOT NULL,
                                            address1 VARCHAR(255) NOT NULL,
                                            address2 VARCHAR(255),
                                            city VARCHAR(255) NOT NULL,
                                            state VARCHAR(2) NOT NULL,
                                            zipCode INT(5) NOT NULL,
                                            university VARCHAR(255) NOT NULL,
                                            graduationDate DATE NOT NULL,
                                            degreeType VARCHAR(255) NOT NULL,
                                            CONSTRAINT zipCode_length_prof_request CHECK (zipCode BETWEEN 10000 AND 99999)
);
-- Create EmployerRequest table
CREATE TABLE EmployerAccountRequest (
                                        userId VARCHAR(255) PRIMARY KEY,
                                        firstName VARCHAR(255) NOT NULL,
                                        lastName VARCHAR(255) NOT NULL,
                                        email VARCHAR(255) NOT NULL,
                                        phoneNumber BIGINT NOT NULL,
                                        userType ENUM('S', 'R', 'E', 'P') NOT NULL,
                                        address1 VARCHAR(255) NOT NULL,
                                        address2 VARCHAR(255),
                                        city VARCHAR(255) NOT NULL,
                                        state VARCHAR(2) NOT NULL,
                                        zipCode INT(5) NOT NULL,
                                        company VARCHAR(255) NOT NULL,
                                        CONSTRAINT zipCode_length_emp_request CHECK (zipCode BETWEEN 10000 AND 99999)
);
CREATE TABLE AccountDeleteRequest (
                                      userId VARCHAR(255) PRIMARY KEY,
                                      FOREIGN KEY (userId) REFERENCES User(userId)
);
SHOW TABLES;


-- Populating Database
INSERT INTO `User` (userId, firstName, lastName, email, phoneNumber, status, userType)
VALUES
    ('prof1', 'John', 'Doe', 'john.doe@example.com', 1234567890, 'active', 'P'),
    ('prof2', 'Jane', 'Smith', 'jane.smith@example.com', 9876543210, 'active', 'P'),
    ('prof3', 'Michael', 'Johnson', 'michael.johnson@example.com', 5555555555, 'inactive', 'P'),
    ('prof9', 'Zoe', 'Green', 'zoe.green@gamil.com', '7778889999', 'active', 'P'),
    ('emp1', 'Alice', 'Brown', 'alice.brown@gmail.com', 1112223333, 'active', 'E'),
    ('emp2', 'Bob', 'White', 'bob.white@gmail.com', 4445556666, 'active', 'E'),
    ('emp3', 'Charlie', 'Green', 'charlie.green@gamil.com', 7778889999, 'active', 'E'),
    ('emp9', 'Zoe', 'Green', 'zoe.green@gamil.com', 7778889999, 'active', 'E'),
    ('staff1', 'David', 'Lee', 'david.lee@gmail.com', 1231231234, 'active', 'S'),
    ('staff2', 'Eva', 'Wang', 'eva.wang@gmail.com', 4564564567, 'active', 'S'),
    ('staff3', 'Frank', 'Chen', 'frank.chen@gmail.cim', 7897897890, 'inactive', 'S');
INSERT INTO `Credentials` (userId, password)
VALUES
    ('prof1', 'password1'),
    ('prof2', 'password2'),
    ('prof3', 'password3'),
    ('emp1', 'password1'),
    ('emp2', 'password2'),
    ('emp3', 'password3'),
    ('emp9', 'password9'),
    ('staff1', 'password1'),
    ('staff2', 'password2'),
    ('staff3', 'password3');

INSERT INTO `Payment` (userId, paymentId, paymentAmount, dueDate, paymentDate)
VALUES
    ('prof1', 'pay_prof1_demo', 500.00, '2022-01-15', '2022-01-14'),
    ('prof2', 'pay_prof2_demo', 350.00, '2022-02-15', '2022-02-14'),
    ('emp1', 'pay_emp1_demo', 600.00, '2022-03-15', '2022-03-14');

INSERT INTO `Professional` (userId, address1, address2, city, state, zipCode, university, graduationDate, degreeType)
VALUES
    ('prof1', '123 Main St', 'Apt 4B', 'New York', 'NY', 10001, 'ABC University', '2021-05-15', 'Bachelor'),
    ('prof2', '456 Elm St', 'Suite 200', 'Los Angeles', 'CA', 90001, 'XYZ College', '2020-12-31', 'Master'),
    ('prof3', '789 Oak St', '', 'Chicago', 'IL', 60007, 'MNO Institute', '2022-06-30', 'Bachelor'),
    ('prof9', '987 Palm St', '', 'Miami', 'FL', 91820, 'UW', '2026-06-30', 'Bachelor');
INSERT INTO `Employer` (userId, address1, address2, city, state, zipCode, company)
VALUES
    ('emp1', '123 Main St', 'Suite 100', 'New York', 'NY', 10001, 'ABC Company'),
    ('emp2', '456 Elm St', 'Floor 2', 'Los Angeles', 'CA', 90001, 'XYZ Corporation'),
    ('emp3', '789 Oak St', '', 'Chicago', 'IL', 60007, 'Acme Industries'),
    ('emp9', '987 Palm St', '', 'Miami', 'FL', 91820, 'Acme Coporation');

INSERT INTO `EmployerAccountRequest` (userId, firstName, lastName, email, phoneNumber, userType, address1, address2, city, state, zipCode, company)
VALUES
    ('empX', 'Josh', 'Brown', 'josh.brown@gmail.com', 1112223333, 'E', '123 Main St', 'Suite 100', 'New York', 'NY', 10001, 'ABC Company');
INSERT INTO `ProfessionalAccountRequest` (userId, firstName, lastName, email, phoneNumber, userType, address1, address2, city, state, zipCode, university, graduationDate, degreeType)
VALUES
    ('profX', 'Levy', 'Johnson', 'levy.j@gmail.com', 1234567890, 'P', '123 Main St', 'Apt 4B', 'New York', 'NY', 10001, 'ABC University', '2021-05-15', 'Bachelor');


INSERT INTO `JobPosting` (jobId, company, positionName, supervisorFirstName, supervisorLastName, supervisorEmail, supervisorPhoneNumber, startDate, endDate, startTime, endTime, payPerHour)
VALUES
    (1, 'ABC Company', 'Software Engineer', 'John', 'Doe', 'john.doe@example.com', 4696744444, '2022-01-01', '2022-01-31', '09:00:00', '17:00:00', 50.00),
    (1, 'XYZ Corporation', 'Marketing Specialist', 'Jane', 'Smith', 'jane.smith@example.com', 4696744444, '2022-02-01', '2022-10-28', '08:30:00', '16:30:00', 90.00),
    (2, 'XYZ Corporation', 'Marketing Intern', 'Jane', 'Smith', 'jane.smith@example.com', 4696744444, '2022-03-05', '2022-10-28', '08:30:00', '16:30:00', 45.00),
    (1, 'Acme Industries', 'Project Manager', 'Michael', 'Johnson', 'michael.johnson@example.com', 4696744444, '2022-03-01', '2022-03-31', '09:30:00', '17:30:00', 60.00);
INSERT INTO `JobQualification` (jobId, company, category, keyword)
VALUES
    (1, 'ABC Company', 'Software Development', 'Java'),
    (1, 'ABC Company', 'Software Development', 'Python'),
    (1, 'XYZ Corporation', 'Marketing', 'Digital Marketing'),
    (2, 'XYZ Corporation', 'Marketing', 'Digital Marketing'),
    (1, 'Acme Industries', 'Project Management', 'Agile Methodology');

INSERT INTO `ProfessionalQualification` (userId, category, keyword)
VALUES
    ('prof1', 'Software Development', 'Java'),
    ('prof1', 'Software Development', 'Python'),
    ('prof2', 'Marketing', 'Digital Marketing'),
    ('prof3', 'Project Management', 'Agile Methodology');

INSERT INTO `JobMatching` (userId, jobId, company)
VALUES
    ('prof1', 1, 'ABC Company'),
    ('prof2', 2, 'XYZ Corporation'),
    ('prof3', 1, 'Acme Industries');

INSERT INTO `AccountDeleteRequest` (userId)
VALUES
    ('emp2'),
    ('emp3');




