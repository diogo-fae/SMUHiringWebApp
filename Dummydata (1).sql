DROP DATABASE smu_hiring;
CREATE DATABASE smu_hiring;
USE smu_hiring;
SHOW TABLES;

-- DROP TABLE AccountDeleteRequest;
-- DROP TABLE Credentials;
-- DROP TABLE Payment;
-- DROP TABLE EmployerAccountRequest;
-- DROP TABLE JobMatching;
-- DROP TABLE ProfessionalQualification;
-- DROP TABLE ProfessionalQualificationRequest;
-- DROP TABLE ProfessionalAccountRequest;
-- DROP TABLE JobMatchingRequest;
-- DROP TABLE JobQualification;
-- DROP TABLE JobPosting;
-- DROP TABLE Professional;
-- DROP TABLE Employer;
-- DROP TABLE Credentials;
-- DROP TABLE Payment;
-- DROP TABLE User;


-- Create User table
CREATE TABLE User (
                      userId VARCHAR(255) PRIMARY KEY,
                      firstName VARCHAR(255) NOT NULL,
                      lastName VARCHAR(255) NOT NULL,
                      email VARCHAR(255) NOT NULL,
                      phoneNumber BIGINT NOT NULL,
                      status VARCHAR(255) NOT NULL,
                      userType ENUM('S', 'R', 'E', 'P') NOT NULL,
                      hasLoggedIn BOOLEAN DEFAULT TRUE,
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
                              CONSTRAINT zipCode_length_prof CHECK (zipCode <= 99999)
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
                          CONSTRAINT zipCode_length_emp CHECK (zipCode <= 99999)
);

CREATE TABLE JobMatchingRequest (
                                    userId VARCHAR(255) PRIMARY KEY,
                                    FOREIGN KEY (userId) REFERENCES Professional(userId)
);

-- Create JobPosting table, must index company on Employer table first
CREATE INDEX idx_company ON Employer(company);
CREATE TABLE JobPosting (
                            jobId VARCHAR(255),
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
-- -- Create JobQualification table
CREATE TABLE JobQualification (
                                  jobId VARCHAR(192),
                                  company VARCHAR(192),
                                  category VARCHAR(192),
                                  keyword VARCHAR(192),
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

-- Create JobMatching table
CREATE TABLE JobMatching (
                             userId VARCHAR(255),
                             jobId VARCHAR(255),
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
                                            state VARCHAR(255) NOT NULL,
                                            zipCode INT(5) NOT NULL,
                                            university VARCHAR(255) NOT NULL,
                                            graduationDate DATE NOT NULL,
                                            degreeType VARCHAR(255) NOT NULL,
                                            CONSTRAINT zipCode_length_prof_request CHECK (zipCode <= 99999)
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
                                        state VARCHAR(255) NOT NULL,
                                        zipCode INT(5) NOT NULL,
                                        company VARCHAR(255) NOT NULL,
                                        CONSTRAINT zipCode_length_emp_request CHECK (zipCode <= 99999)
);
CREATE TABLE AccountDeleteRequest (
                                      userId VARCHAR(255) PRIMARY KEY,
                                      FOREIGN KEY (userId) REFERENCES User(userId)
);
SHOW TABLES;

CREATE TABLE ProfessionalQualificationRequest (
                                                  userId VARCHAR(255),
                                                  category VARCHAR(255),
                                                  keyword VARCHAR(255),
                                                  PRIMARY KEY (userId, category, keyword),
                                                  FOREIGN KEY (userId) REFERENCES ProfessionalAccountRequest(userId) ON DELETE CASCADE
);

INSERT INTO `User` (firstName, lastName, phoneNumber, userId, userType, email, status)
VALUES 
    ('root', 'root', 1234567890, 'root', 'R', 'drodrigues@smu.edu', 'active'),
    ('Lisbeth',	'Monroe', 7326190982, 'monroe0982', 'S', 'drodrigues@smu.edu', 'active'),
    ('Jacob',	'Weiner', 9736545785, 'weiner5785', 'S', 'drodrigues@smu.edu', 'active'),
    ('Rachel',	'Marcos', 2016920793, 'marcos0793', 'S', 'drodrigues@smu.edu', 'active'),
    ('Lei',	'Huang', 2016220909, 'huang0909', 'S', 'drodrigues@smu.edu', 'active'),
    ('Kim ',	'Dillon', 8626448118, 'dillon8118', 'S', 'drodrigues@smu.edu', 'active'),
    ('Brandon',	'Richman', 2015883785, 'richman3785', 'S', 'drodrigues@smu.edu', 'active'),
    ('Erica ',	'Cobb', 9734782778, 'cobb2778', 'S', 'drodrigues@smu.edu', 'active'),
    ('Shirley',	'Albert', 9736474684, 'albert4684', 'P', 'drodrigues@smu.edu', 'active'),
    ('Joanne', 'Adams', 2015473774, 'adams3774', 'P', 'drodrigues@smu.edu', 'active'),
    ('James', 'William', 9086110062, 'william0062', 'P', 'drodrigues@smu.edu', 'active'),
    ('Delores',  'Bensen', 2019001173, 'bensen1173', 'P', 'drodrigues@smu.edu', 'active'),
    ('Martha', 'Wilkinson', 8927727765, 'wilkinson7765', 'P', 'drodrigues@smu.edu', 'active'),
    ('Brian', 'Goldorf', 2017354773, 'goldorf4773', 'P', 'drodrigues@smu.edu', 'active'),
    ('Kimberly',  'Briggs', 8921452562, 'briggs2562', 'P', 'drodrigues@smu.edu', 'active'),
    ('Thomas', 'Cooper', 7328886373, 'cooper6373', 'P', 'drodrigues@smu.edu', 'active'),
    ('Clement',  'Sanderson', 9739273773, 'sanderson3773', 'P', 'drodrigues@smu.edu', 'active'),
    ('Rocky', 'White', 7321029785, 'white9785', 'P', 'drodrigues@smu.edu', 'active'),
    ('Sue', 'Hansen', 9082121990, 'hansen1990', 'P', 'drodrigues@smu.edu', 'active'),
    ('Daniel',  'Wang', 9089018987, 'wang8987', 'P', 'drodrigues@smu.edu', 'active'),
    ('Laura', 'Tangen', 2019176475, 'tangen6475', 'P', 'drodrigues@smu.edu', 'active'),
    ('Megan', 'Thomson', 9081642453, 'thomson2453', 'P', 'drodrigues@smu.edu', 'active'),
    ('Eric', 'Sanderson', 9734898855, 'sanderson8855', 'E', 'drodrigues@smu.edu', 'active'),
    ('Wayne', 'Armstrong', 7326190982, 'lake0982', 'E', 'drodrigues@smu.edu', 'active'),
    ('Amira', 'Sutherland', 2016920793, 'idea0793', 'E', 'drodrigues@smu.edu', 'active'),
    ('Luke', 'Anderson', 2015783775, 'luke3775', 'E', 'drodrigues@smu.edu', 'active'),
    ('Melinda', 'Richard', 7328522221, 'mill2221', 'E', 'drodrigues@smu.edu', 'active'),
    ('Andy', 'Klapper', 9731232525, 'code2525', 'E', 'drodrigues@smu.edu', 'active'),
    ('Brian', 'Mickey', 2011990181, 'elite0181', 'E', 'drodrigues@smu.edu', 'active'),
    ('Mark', 'Edison', 2018501649, 'mark1649', 'E', 'drodrigues@smu.edu', 'active');

INSERT INTO `Credentials` (userId, password)
VALUES
    ('root', '1234567.l'),
    ('monroe0982', '1234567.l'),
    ('weiner5785', '1234567.l'),
    ('marcos0793', '1234567.l'),
    ('huang0909', '1234567.l'),
    ('dillon8118', '1234567.l'),
    ('richman3785', '1234567.l'),
    ('cobb2778', '1234567.l'),
    ('albert4684', '1234567.l'),
    ('adams3774', '1234567.l'),
    ('william0062', '1234567.l'),
    ('bensen1173', '1234567.l'),
    ('wilkinson7765', '1234567.l'),
    ('goldorf4773', '1234567.l'),
    ('briggs2562', '1234567.l'),
    ('cooper6373', '1234567.l'),
    ('sanderson3773', '1234567.l'),
    ('white9785', '1234567.l'),
    ('hansen1990', '1234567.l'),
    ('wang8987', '1234567.l'),
    ('tangen6475', '1234567.l'),
    ('thomson2453', '1234567.l'),
    ('sanderson8855', '1234567.l'),
    ('lake0982', '1234567.l'),
    ('idea0793', '1234567.l'),
    ('luke3775', '1234567.l'),
    ('mill2221', '1234567.l'),
    ('code2525', '1234567.l'),
    ('elite0181', '1234567.l'),
    ('mark1649', '1234567.l');

INSERT INTO `Employer` (company, address1, city, state, zipCode, userId)
VALUES
-- Sanderson Company	718 Academy Road, Caldwell, NJ 07006, sanderson8855
-- Lake Waters Inc.	90 Peterson Street, River Edge, NJ 07661, Lake0982
-- Idea Implementers	450 Wakeesha St., Wayne, NJ 07047, idea0793
-- Luke Brothers	13975 Branford St., Newark, NJ 07013, luke3775
-- Millennium Inc.	1890 Claremont Ave., Bloomfield, NJ 07003, mill2221
-- Code Market	8 Henning Drive, Fairfield, NJ 07004, code2525
-- Elite Company	N1884 Clifton Ave., Rego Park, NJ 07657, elite0181
-- Mark and Martha Co.	2098 Academy Road, Caldwell, NJ 07007, mark1649
('Sanderson Company', '718 Academy Road', 'Caldwell', 'NJ', 07006, 'sanderson8855'),
('Lake Waters Inc.', '90 Peterson Street', 'River Edge', 'NJ', 07661, 'lake0982'),
('Idea Implementers', '450 Wakeesha St.', 'Wayne', 'NJ', 07047, 'idea0793'),
('Luke Brothers', '13975 Branford St.', 'Newark', 'NJ', 07013, 'luke3775'),
('Millennium Inc.', '1890 Claremont Ave.', 'Bloomfield', 'NJ', 07003, 'mill2221'),
('Code Market', '8 Henning Drive', 'Fairfield', 'NJ', 07004, 'code2525'),
('Elite Company', 'N1884 Clifton Ave.', 'Rego Park', 'NJ', 07657, 'elite0181'),
('Mark and Martha Co.', '2098 Academy Road', 'Caldwell', 'NJ', 07007, 'mark1649');

INSERT INTO `Professional` (address1, city, state, zipCode, degreeType, university, graduationDate, userId)
VALUES
    -- 2368 Union St., South Orange, NJ 07079	BS	Duke University	05	2021 albert4684
    -- 256 Royal King St., Verona, NJ 07004	BS	New York University	Dec 	2021 adams3774
    -- 14 Nassau St., Princeton, NJ 07002	MS	University of Idaho	Aug	2022 william0062
    -- 6 Washington Ave., Verona, NJ 07004	BS	University of Pennsylvania	Dec 	2021 bensen1173
    -- 210 Main St., Chester, NJ 07064	MS	State University of New York	Dec 	2022 wilkinson7765
    -- 88 Bloomfield Ave., Lambertville, NJ 07001	MS	University of New Hampshire	Aug 	2022 goldorf4773
    -- 266 Wakeesha St., Wayne, NJ 07047	BS	Rutgers University	Aug 	2022 briggs2562
    -- 82674 Clinton Ave., Newton, NJ 07003	BS	University of Idaho	Dec 	2021 cooper6373
    -- 46 James Madison Rd., Teaneck, NJ 07082	BS	New York University	Dec 	2022 sanderson3773
    -- 6451 Sprint Ave., Newton, NJ 07003	MS	University of Maryland	Dec 	2021 white9785
    -- 712 Royal King St., Verona, NJ 07004	BS	New York University	Dec 	2021 hansen1990
    -- 45 Market Place, Princeton, NJ 07002	MS	Rutgers University	Aug 	2022 wang8987
    -- 266 Wakeesha St., Wayne, NJ 07047	BS	Rutgers University	Aug	2022 tangen6475
    -- 234 Nassau St., Princeton, NJ 07002	BS	University of Idaho	Aug	2022 thomson2453
    ('2368 Union St.', 'South Orange', 'NJ', 07079, 'BS', 'Duke University', '2021-05-01', 'albert4684'),
    ('256 Royal King St.', 'Verona', 'NJ', 07004, 'BS', 'New York University', '2021-12-01', 'adams3774'),
    ('14 Nassau St.', 'Princeton', 'NJ', 07002, 'MS', 'University of Idaho', '2022-08-01', 'william0062'),
    ('6 Washington Ave.', 'Verona', 'NJ', 07004, 'BS', 'University of Pennsylvania', '2021-12-01', 'bensen1173'),
    ('210 Main St.', 'Chester', 'NJ', 07064, 'MS', 'State University of New York', '2022-12-01', 'wilkinson7765'),
    ('88 Bloomfield Ave.', 'Lambertville', 'NJ', 07001, 'MS', 'University of New Hampshire', '2022-08-01', 'goldorf4773'),
    ('266 Wakeesha St.', 'Wayne', 'NJ', 07047, 'BS', 'Rutgers University', '2022-08-01', 'briggs2562'),
    ('82674 Clinton Ave.', 'Newton', 'NJ', 07003, 'BS', 'University of Idaho', '2021-12-01', 'cooper6373'),
    ('46 James Madison Rd.', 'Teaneck', 'NJ', 07082, 'BS', 'New York University', '2022-12-01', 'sanderson3773'),
    ('6451 Sprint Ave.', 'Newton', 'NJ', 07003, 'MS', 'University of Maryland', '2021-12-01', 'white9785'),
    ('712 Royal King St.', 'Verona', 'NJ', 07004, 'BS', 'New York University', '2021-12-01', 'hansen1990'),
    ('45 Market Place', 'Princeton', 'NJ', 07002, 'MS', 'Rutgers University', '2022-08-01', 'wang8987'),
    ('266 Wakeesha St.', 'Wayne', 'NJ', 07047, 'BS', 'Rutgers University', '2022-08-01', 'tangen6475'),
    ('234 Nassau St.', 'Princeton', 'NJ', 07002, 'BS', 'University of Idaho', '2022-08-01', 'thomson2453');

INSERT INTO `ProfessionalQualification` (userId, category, keyword)
VALUES
-- albert4684	Programming Languages	Java, C++, Python, HTML, PHP
-- albert4684 Operating Systems	Linux, Mac OS, Windows
-- albert4684 Tools	JIRA, React, Visual Studio, Azure
    ('albert4684', 'Programming Languages', 'Java'),
    ('albert4684', 'Programming Languages', 'C++'),
    ('albert4684', 'Programming Languages', 'Python'),
    ('albert4684', 'Programming Languages', 'HTML'),
    ('albert4684', 'Programming Languages', 'PHP'),
    ('albert4684', 'Operating Systems', 'Linux'),
    ('albert4684', 'Operating Systems', 'Mac OS'),
    ('albert4684', 'Operating Systems', 'Windows'),
    ('albert4684', 'Tools', 'JIRA'),
    ('albert4684', 'Tools', 'React'),
    ('albert4684', 'Tools', 'Visual Studio'),
    ('albert4684', 'Tools', 'Azure'),
-- adams3774 Programming Languages	Java, JavaScript, HTML, Python
-- adams3774 Operating Systems	Windows, Linux
-- adams3774 Professional Experience	Senior Software Engineer
    ('adams3774', 'Programming Languages', 'Java'),
    ('adams3774', 'Programming Languages', 'JavaScript'),
    ('adams3774', 'Programming Languages', 'HTML'),
    ('adams3774', 'Programming Languages', 'Python'),
    ('adams3774', 'Operating Systems', 'Windows'),
    ('adams3774', 'Operating Systems', 'Linux'),
    ('adams3774', 'Professional Experience', 'Senior Software Engineer'),

-- william0062 Programming Languages	C, C++, Matlab, Ruby
-- william0062 Professional Experience	Senior Design Engineer, Design Specialist
-- william0062 Operating Systems	Linux, Windows, Mac OS
-- william0062 Tools	SmartDraw, AutoCAD, Fusion 360, CATIA
    ('william0062', 'Programming Languages', 'C'),
    ('william0062', 'Programming Languages', 'C++'),
    ('william0062', 'Programming Languages', 'Matlab'),
    ('william0062', 'Programming Languages', 'Ruby'),
    ('william0062', 'Professional Experience', 'Senior Design Engineer'),
    ('william0062', 'Professional Experience', 'Design Specialist'),
    ('william0062', 'Operating Systems', 'Linux'),
    ('william0062', 'Operating Systems', 'Windows'),
    ('william0062', 'Operating Systems', 'Mac OS'),
    ('william0062', 'Tools', 'SmartDraw'),
    ('william0062', 'Tools', 'AutoCAD'),
    ('william0062', 'Tools', 'Fusion 360'),
    ('william0062', 'Tools', 'CATIA'),

-- bensen1173 Programming Languages	Java, C++, PHP, Python, HTML, SQL, Ruby, Scala
-- bensen1173 Operating Systems	Mac OS, Windows
-- bensen1173 Software Tools	Eclipse, JIRA, React, Visual Studio, Azure, NodeJS
    ('bensen1173', 'Programming Languages', 'Java'),
    ('bensen1173', 'Programming Languages', 'C++'),
    ('bensen1173', 'Programming Languages', 'PHP'),
    ('bensen1173', 'Programming Languages', 'Python'),
    ('bensen1173', 'Programming Languages', 'HTML'),
    ('bensen1173', 'Programming Languages', 'SQL'),
    ('bensen1173', 'Programming Languages', 'Ruby'),
    ('bensen1173', 'Programming Languages', 'Scala'),
    ('bensen1173', 'Operating Systems', 'Mac OS'),
    ('bensen1173', 'Operating Systems', 'Windows'),
    ('bensen1173', 'Software Tools', 'Eclipse'),
    ('bensen1173', 'Software Tools', 'JIRA'),
    ('bensen1173', 'Software Tools', 'React'),
    ('bensen1173', 'Software Tools', 'Visual Studio'),
    ('bensen1173', 'Software Tools', 'Azure'),
    ('bensen1173', 'Software Tools', 'NodeJS'),

-- wilkinson7765 Operating Systems	Windows 
-- wilkinson7765 Languages	Python, JavaScript, HTML, CSS, PHP
-- wilkinson7765 Technology	Visual Paradigm, SmartDraw, React, Angular
    ('wilkinson7765', 'Operating Systems', 'Windows'),
    ('wilkinson7765', 'Languages', 'Python'),
    ('wilkinson7765', 'Languages', 'JavaScript'),
    ('wilkinson7765', 'Languages', 'HTML'),
    ('wilkinson7765', 'Languages', 'CSS'),
    ('wilkinson7765', 'Languages', 'PHP'),
    ('wilkinson7765', 'Technology', 'Visual Paradigm'),
    ('wilkinson7765', 'Technology', 'SmartDraw'),
    ('wilkinson7765', 'Technology', 'React'),
    ('wilkinson7765', 'Technology', 'Angular'),

-- goldorf4773 Professional Experience	Software intern, Database programmer
-- goldorf4773 Programming Languages	Java, JavaScript, HTML 
-- goldorf4773 Operating Systems	Windows, Mac OS
    ('goldorf4773', 'Professional Experience', 'Software intern'),
    ('goldorf4773', 'Professional Experience', 'Database programmer'),
    ('goldorf4773', 'Programming Languages', 'Java'),
    ('goldorf4773', 'Programming Languages', 'JavaScript'),
    ('goldorf4773', 'Programming Languages', 'HTML'),
    ('goldorf4773', 'Operating Systems', 'Windows'),
    ('goldorf4773', 'Operating Systems', 'Mac OS'),

-- briggs2562 Programming Languages	Java, JavaScript, Swift, C, Matlab
-- briggs2562 Operating Systems	Mac OS 
-- briggs2562 Tools	Xcode, NodeJS, Open GL, IntelliJ, Reaper, Postman
-- briggs2562 Professional Experience	Software Intern 
    ('briggs2562', 'Programming Languages', 'Java'),
    ('briggs2562', 'Programming Languages', 'JavaScript'),
    ('briggs2562', 'Programming Languages', 'Swift'),
    ('briggs2562', 'Programming Languages', 'C'),
    ('briggs2562', 'Programming Languages', 'Matlab'),
    ('briggs2562', 'Operating Systems', 'Mac OS'),
    ('briggs2562', 'Tools', 'Xcode'),
    ('briggs2562', 'Tools', 'NodeJS'),
    ('briggs2562', 'Tools', 'Open GL'),
    ('briggs2562', 'Tools', 'IntelliJ'),
    ('briggs2562', 'Tools', 'Reaper'),
    ('briggs2562', 'Tools', 'Postman'),
    ('briggs2562', 'Professional Experience', 'Software Intern'),

-- cooper6373 Programming Languages	Java, C++
-- cooper6373 Operating Systems	Windows
-- cooper6373 Technology	Eclipse, IntelliJ, Visual Studio
    ('cooper6373', 'Programming Languages', 'Java'),
    ('cooper6373', 'Programming Languages', 'C++'),
    ('cooper6373', 'Operating Systems', 'Windows'),
    ('cooper6373', 'Technology', 'Eclipse'),
    ('cooper6373', 'Technology', 'IntelliJ'),
    ('cooper6373', 'Technology', 'Visual Studio'),

-- sanderson3773 Programming Languages	Java, Scala, Ruby, PHP, JavaScript, HTML, CSS
-- sanderson3773 Tools	Eclipse, React, Angular, IntelliJ
-- sanderson3773 Database	SQL server, MySQL, Postgress
    ('sanderson3773', 'Programming Languages', 'Java'),
    ('sanderson3773', 'Programming Languages', 'Scala'),
    ('sanderson3773', 'Programming Languages', 'Ruby'),
    ('sanderson3773', 'Programming Languages', 'PHP'),
    ('sanderson3773', 'Programming Languages', 'JavaScript'),
    ('sanderson3773', 'Programming Languages', 'HTML'),
    ('sanderson3773', 'Programming Languages', 'CSS'),
    ('sanderson3773', 'Tools', 'Eclipse'),
    ('sanderson3773', 'Tools', 'React'),
    ('sanderson3773', 'Tools', 'Angular'),
    ('sanderson3773', 'Tools', 'IntelliJ'),
    ('sanderson3773', 'Database', 'SQL server'),
    ('sanderson3773', 'Database', 'MySQL'),
    ('sanderson3773', 'Database', 'Postgress'),

-- white9785 Operating Systems	Windows, Linux
-- white9785 Languages	Python, PHP, JavaScript, HTML, CSS, Go
-- white9785 Database	MySQL
-- white9785 Technology	Visual Studio, Eclipse, IntelliJ, JIRA
    ('white9785', 'Operating Systems', 'Windows'),
    ('white9785', 'Operating Systems', 'Linux'),
    ('white9785', 'Languages', 'Python'),
    ('white9785', 'Languages', 'PHP'),
    ('white9785', 'Languages', 'JavaScript'),
    ('white9785', 'Languages', 'HTML'),
    ('white9785', 'Languages', 'CSS'),
    ('white9785', 'Languages', 'Go'),
    ('white9785', 'Database', 'MySQL'),
    ('white9785', 'Technology', 'Visual Studio'),
    ('white9785', 'Technology', 'Eclipse'),
    ('white9785', 'Technology', 'IntelliJ'),
    ('white9785', 'Technology', 'JIRA'),

-- hansen1990 Programming Languages	Java, JavaScript, HTML, CSS, Python, Scala
-- hansen1990 Operating Systems	Windows, Linux
-- hansen1990 Technology	Eclipse, React, Angular, IntelliJ, JIRA
    ('hansen1990', 'Programming Languages', 'Java'),
    ('hansen1990', 'Programming Languages', 'JavaScript'),
    ('hansen1990', 'Programming Languages', 'HTML'),
    ('hansen1990', 'Programming Languages', 'CSS'),
    ('hansen1990', 'Programming Languages', 'Python'),
    ('hansen1990', 'Programming Languages', 'Scala'),
    ('hansen1990', 'Operating Systems', 'Windows'),
    ('hansen1990', 'Operating Systems', 'Linux'),
    ('hansen1990', 'Technology', 'Eclipse'),
    ('hansen1990', 'Technology', 'React'),
    ('hansen1990', 'Technology', 'Angular'),
    ('hansen1990', 'Technology', 'IntelliJ'),
    ('hansen1990', 'Technology', 'JIRA'),

-- wang8987 Languages	C, C++, Matlab, Ruby
-- wang8987 Professional Experience	Design Engineer
-- wang8987 Tools	Azure, AutoCAD, CATIA, Fusion 360, Rational
    ('wang8987', 'Languages', 'C'),
    ('wang8987', 'Languages', 'C++'),
    ('wang8987', 'Languages', 'Matlab'),
    ('wang8987', 'Languages', 'Ruby'),
    ('wang8987', 'Professional Experience', 'Design Engineer'),
    ('wang8987', 'Tools', 'Azure'),
    ('wang8987', 'Tools', 'AutoCAD'),
    ('wang8987', 'Tools', 'CATIA'),
    ('wang8987', 'Tools', 'Fusion 360'),
    ('wang8987', 'Tools', 'Rational'),

-- tangen6475 Programming Languages	Java, C++, JavaScript, HTML, CSS
-- tangen6475 Tools	IntelliJ, Visual Studio, Angular
    ('tangen6475', 'Programming Languages', 'Java'),
    ('tangen6475', 'Programming Languages', 'C++'),
    ('tangen6475', 'Programming Languages', 'JavaScript'),
    ('tangen6475', 'Programming Languages', 'HTML'),
    ('tangen6475', 'Programming Languages', 'CSS'),
    ('tangen6475', 'Tools', 'IntelliJ'),
    ('tangen6475', 'Tools', 'Visual Studio'),
    ('tangen6475', 'Tools', 'Angular'),

-- thomson2453 Databases	Access, SQL Server, SQL Lite, MySQL, Postgress
-- thomson2453 Professional Experience	Database Designer, Database Administrator
-- thomson2453 Tools	IntelliJ, JIRA
    ('thomson2453', 'Databases', 'Access'),
    ('thomson2453', 'Databases', 'SQL Server'),
    ('thomson2453', 'Databases', 'SQL Lite'),
    ('thomson2453', 'Databases', 'MySQL'),
    ('thomson2453', 'Databases', 'Postgress'),
    ('thomson2453', 'Professional Experience', 'Database Designer'),
    ('thomson2453', 'Professional Experience', 'Database Administrator'),
    ('thomson2453', 'Tools', 'IntelliJ'),
    ('thomson2453', 'Tools', 'JIRA');


INSERT INTO `JobPosting` (company, positionName, jobId, supervisorFirstName, supervisorLastName, supervisorPhoneNumber, startDate, endDate, startTime, endTime, payPerHour, supervisorEmail)
VALUES
-- Sanderson Company	sanderson8855	Software Engineer	SC-SE-01-2024	Magna	Stanley	973-102-2015	5/1/24	12/21/24	9:00	17:00	$50.00 
-- 		Database Administrator	SC-DB-01-2024	Ajit	Keshav	973-666-2889	5/10/24	5/30/24	9:00	12:00	$20.00 
-- 		Software Engineer	SC-SE-02-2024	Lauren	Klein	973-788-6446	5/1/24	8/31/24	10:00	12:00	$20.00 
('Sanderson Company', 'Software Engineer', 'SC-SE-01-2024', 'Magna', 'Stanley', '9731022015', '2024-05-01', '2024-12-21', '09:00', '17:00', '50.00', 'drodrigues@smu.edu'),
('Sanderson Company', 'Database Administrator', 'SC-DB-01-2024', 'Ajit', 'Keshav', '9736662889', '2024-05-10', '2024-05-30', '09:00', '12:00', '20.00', 'drodrigues@smu.edu'),
('Sanderson Company', 'Software Engineer', 'SC-SE-02-2024', 'Lauren', 'Klein', '9737886446', '2024-05-01', '2024-08-31', '10:00', '12:00', '20.00', 'drodrigues@smu.edu'),
-- Lake Waters Inc.	lake0982	Software intern	LW-SI-01-2024	Amira	Sultan	732-835-3667	4/30/24	6/30/24	10:00	14:00	$15.00 
('Lake Waters Inc.', 'Software intern', 'LW-SI-01-2024', 'Amira', 'Sultan', '7328353667', '2024-04-30', '2024-06-30', '10:00', '14:00', '15.00', 'drodrigues@smu.edu'),
-- Idea Implementers	idea0793	Project Manager	IM-PM-01-2024	Luke	Adams	201-255-2903	4/30/24	5/31/25	9:00	16:00	$75.00 
-- 		Software Intern	IM-SI-01-2024	Jackson	Adams	201-255-2998	4/30/24	8/31/24	9:00	17:00	$15.00 
-- 		Software Intern	IM-SI-02-2024	Jackson	Adams	201-255-2998	4/30/24	8/31/24	9:00	17:00	$20.00 
('Idea Implementers', 'Project Manager', 'IM-PM-01-2024', 'Luke', 'Adams', '2012552903', '2024-04-30', '2025-05-31', '09:00', '16:00', '75.00', 'drodrigues@smu.edu'),
('Idea Implementers', 'Software Intern', 'IM-SI-01-2024', 'Jackson', 'Adams', '2012552998', '2024-04-30', '2024-08-31', '09:00', '17:00', '15.00', 'drodrigues@smu.edu'),
('Idea Implementers', 'Software Intern', 'IM-SI-02-2024', 'Jackson', 'Adams', '2012552998', '2024-04-30', '2024-08-31', '09:00', '17:00', '20.00', 'drodrigues@smu.edu'),
-- Luke Brothers	luke3775	Business Analyst	LB-BA-01-2024	Ashley 	Walker	201-777-2424	5/1/24	5/31/25	8:00	16:00	$55.00 
('Luke Brothers', 'Business Analyst', 'LB-BA-01-2024', 'Ashley', 'Walker', '2017772424', '2024-05-01', '2025-05-31', '08:00', '16:00', '55.00', 'drodrigues@smu.edu'),
-- Code Market	code2525	Python Programmer-I	CM-PP-01-2024	Sarah 	Olsen	973-096-1289	5/1/24	4/30/25	9:00	17:00	$54.00 
-- 		Python Programmer-II	CM-PP-02-2024	Sarah 	Olsen	973-096-1289	5/1/24	4/30/25	9:00	17:00	$75.00 
-- 		Scrum Master	CM-SM-01-2024	Maria	Luther	973-537-4263	5/1/24	4/30/25	9:00	16:00	$100.00 
('Code Market', 'Python Programmer-I', 'CM-PP-01-2024', 'Sarah', 'Olsen', '9730961289', '2024-05-01', '2025-04-30', '09:00', '17:00', '54.00', 'drodrigues@smu.edu'),
('Code Market', 'Python Programmer-II', 'CM-PP-02-2024', 'Sarah', 'Olsen', '9730961289', '2024-05-01', '2025-04-30', '09:00', '17:00', '75.00', 'drodrigues@smu.edu'),
('Code Market', 'Scrum Master', 'CM-SM-01-2024', 'Maria', 'Luther', '9735374263', '2024-05-01', '2025-04-30', '09:00', '16:00', '100.00', 'drodrigues@smu.edu'),
-- Mark and Martha Co.	mark1649	Senior Software Engineer	MM-SSE-01-2024	Mark	Edison	201-850-1649	5/1/24	4/30/25	9:00	16:00	$120.00 
-- 		Junior Software Engineer	MM-JSE-01-2024	Martha	Edison	201-850-0851	5/1/24	4/30/25	9:00	16:00	$80.00 
-- 		Software Intern	MM_SI-01-2024	Elisa	Edison	201-850-1118	5/1/24	4/30/24	9:00	16:00	$32.00 
('Mark and Martha Co.', 'Senior Software Engineer', 'MM-SSE-01-2024', 'Mark', 'Edison', '2018501649', '2024-05-01', '2025-04-30', '09:00', '16:00', '120.00', 'drodrigues@smu.edu'),
('Mark and Martha Co.', 'Junior Software Engineer', 'MM-JSE-01-2024', 'Martha', 'Edison', '2018500851', '2024-05-01', '2025-04-30', '09:00', '16:00', '80.00', 'drodrigues@smu.edu'),
('Mark and Martha Co.', 'Software Intern', 'MM_SI-01-2024', 'Elisa', 'Edison', '2018501118', '2024-05-01', '2024-04-30', '09:00', '16:00', '32.00', 'drodrigues@smu.edu');

INSERT INTO `JobQualification` (company, jobId, category, keyword)
VALUES
-- Sanderson Company	Software Engineer	SC-SE-01-2024	Programming Languages	Java, JavaScript, HTML, Python
-- 			Operating Systems	Windows, Mac OS
-- 			Professional Experience	Software Engineer
-- 	Database Administrator	SC-DB-01-2024	Databases	SQL Server, MySQL
-- 			Languages	Java, SQL, JavaScript
-- 	Software Engineer	SC-SE-02-2024	Programming Languages	Java, Python
-- 			Operating Systems	Windows 
('Sanderson Company', 'SC-SE-01-2024', 'Programming Languages', 'Java'),
('Sanderson Company', 'SC-SE-01-2024', 'Programming Languages', 'JavaScript'),
('Sanderson Company', 'SC-SE-01-2024', 'Programming Languages', 'HTML'),
('Sanderson Company', 'SC-SE-01-2024', 'Programming Languages', 'Python'),
('Sanderson Company', 'SC-SE-01-2024', 'Operating Systems', 'Windows'),
('Sanderson Company', 'SC-SE-01-2024', 'Operating Systems', 'Mac OS'),
('Sanderson Company', 'SC-SE-01-2024', 'Professional Experience', 'Software Engineer'),
('Sanderson Company', 'SC-DB-01-2024', 'Databases', 'SQL Server'),
('Sanderson Company', 'SC-DB-01-2024', 'Databases', 'MySQL'),
('Sanderson Company', 'SC-DB-01-2024', 'Languages', 'Java'),
('Sanderson Company', 'SC-DB-01-2024', 'Languages', 'SQL'),
('Sanderson Company', 'SC-DB-01-2024', 'Languages', 'JavaScript'),
('Sanderson Company', 'SC-SE-02-2024', 'Programming Languages', 'Java'),
('Sanderson Company', 'SC-SE-02-2024', 'Programming Languages', 'Python'),
('Sanderson Company', 'SC-SE-02-2024', 'Operating Systems', 'Windows'),

-- Lake Waters Inc.	Software Intern	LW-SI-01-2024	Languages	C, C++, Matlab
-- 			Operating Systems	Windows
-- 			Tools	AutoCAD, Fusion 360, OpenGL
('Lake Waters Inc.', 'LW-SI-01-2024', 'Languages', 'C'),
('Lake Waters Inc.', 'LW-SI-01-2024', 'Languages', 'C++'),
('Lake Waters Inc.', 'LW-SI-01-2024', 'Languages', 'Matlab'),
('Lake Waters Inc.', 'LW-SI-01-2024', 'Operating Systems', 'Windows'),
('Lake Waters Inc.', 'LW-SI-01-2024', 'Tools', 'AutoCAD'),
('Lake Waters Inc.', 'LW-SI-01-2024', 'Tools', 'Fusion 360'),
('Lake Waters Inc.', 'LW-SI-01-2024', 'Tools', 'OpenGL'),

-- Idea Implementers	Project Manager	IM-PM-01-2024	Operating Systems	Windows, Mac OS, Linux
-- 			Tools	Azure, React, JIRA, Visual Studio
-- 			Professional Experience	Software Engineer
-- 	Software Intern	IM-SI-01-2024	Programming Languages	Java, Python
-- 			Operating Systems	Windows
-- 			Tools	Eclipse
-- 	Software Intern	IM-SI-02-2024	Programming Languages	Python, Java
-- 			Operating Systems	Mac OS, Linux
-- 			Tools	Eclipse, IntelliJ
('Idea Implementers', 'IM-PM-01-2024', 'Operating Systems', 'Windows'),
('Idea Implementers', 'IM-PM-01-2024', 'Operating Systems', 'Mac OS'),
('Idea Implementers', 'IM-PM-01-2024', 'Operating Systems', 'Linux'),
('Idea Implementers', 'IM-PM-01-2024', 'Tools', 'Azure'),
('Idea Implementers', 'IM-PM-01-2024', 'Tools', 'React'),
('Idea Implementers', 'IM-PM-01-2024', 'Tools', 'JIRA'),
('Idea Implementers', 'IM-PM-01-2024', 'Tools', 'Visual Studio'),
('Idea Implementers', 'IM-PM-01-2024', 'Professional Experience', 'Software Engineer'),
('Idea Implementers', 'IM-SI-01-2024', 'Programming Languages', 'Java'),
('Idea Implementers', 'IM-SI-01-2024', 'Programming Languages', 'Python'),
('Idea Implementers', 'IM-SI-01-2024', 'Operating Systems', 'Windows'),
('Idea Implementers', 'IM-SI-01-2024', 'Tools', 'Eclipse'),
('Idea Implementers', 'IM-SI-02-2024', 'Programming Languages', 'Python'),
('Idea Implementers', 'IM-SI-02-2024', 'Programming Languages', 'Java'),
('Idea Implementers', 'IM-SI-02-2024', 'Operating Systems', 'Mac OS'),
('Idea Implementers', 'IM-SI-02-2024', 'Operating Systems', 'Linux'),
('Idea Implementers', 'IM-SI-02-2024', 'Tools', 'Eclipse'),
('Idea Implementers', 'IM-SI-02-2024', 'Tools', 'IntelliJ'),

-- Luke Brothers	Business Analyst	LB-BU-01-2024	Operating Systems	Windows, Mac OS, Linux
-- 			Tools	SmartDraw, Rational, Azure, JIRA, Cypress
('Luke Brothers', 'LB-BA-01-2024', 'Operating Systems', 'Windows'),
('Luke Brothers', 'LB-BA-01-2024', 'Operating Systems', 'Mac OS'),
('Luke Brothers', 'LB-BA-01-2024', 'Operating Systems', 'Linux'),
('Luke Brothers', 'LB-BA-01-2024', 'Tools', 'SmartDraw'),
('Luke Brothers', 'LB-BA-01-2024', 'Tools', 'Rational'),
('Luke Brothers', 'LB-BA-01-2024', 'Tools', 'Azure'),
('Luke Brothers', 'LB-BA-01-2024', 'Tools', 'JIRA'),
('Luke Brothers', 'LB-BA-01-2024', 'Tools', 'Cypress'),

-- Code Market	Python Programmer-I	CM-PP-01-2024	Programming Languages	Python 
-- 			Tools	IntelliJ, Visual Studio
-- 			Packages Familiar with	Scikit, Java-FX
-- 	Python Programmer-II	CM-PP-02-2024	Programming Languages	Python
-- 			Tools	IntelliJ, Visual Studio, Eclipse
-- 			Operating Systems	Windows, Mac OS, Linux
-- 	Scrum Master	CM-SM-01-2024	Operating Systems	Windows, Mac OS, Linux
-- 			Professional Experience	Software Engineer
-- 			Tools	JIRA, Azure, Visual Studio, Postman, NodeJS
('Code Market', 'CM-PP-01-2024', 'Programming Languages', 'Python'),
('Code Market', 'CM-PP-01-2024', 'Tools', 'IntelliJ'),
('Code Market', 'CM-PP-01-2024', 'Tools', 'Visual Studio'),
('Code Market', 'CM-PP-01-2024', 'Packages Familiar with', 'Scikit'),
('Code Market', 'CM-PP-01-2024', 'Packages Familiar with', 'Java-FX'),
('Code Market', 'CM-PP-02-2024', 'Programming Languages', 'Python'),
('Code Market', 'CM-PP-02-2024', 'Tools', 'IntelliJ'),
('Code Market', 'CM-PP-02-2024', 'Tools', 'Visual Studio'),
('Code Market', 'CM-PP-02-2024', 'Tools', 'Eclipse'),
('Code Market', 'CM-PP-02-2024', 'Operating Systems', 'Windows'),
('Code Market', 'CM-PP-02-2024', 'Operating Systems', 'Mac OS'),
('Code Market', 'CM-PP-02-2024', 'Operating Systems', 'Linux'),
('Code Market', 'CM-SM-01-2024', 'Operating Systems', 'Windows'),
('Code Market', 'CM-SM-01-2024', 'Operating Systems', 'Mac OS'),
('Code Market', 'CM-SM-01-2024', 'Operating Systems', 'Linux'),
('Code Market', 'CM-SM-01-2024', 'Professional Experience', 'Software Engineer'),
('Code Market', 'CM-SM-01-2024', 'Tools', 'JIRA'),
('Code Market', 'CM-SM-01-2024', 'Tools', 'Azure'),
('Code Market', 'CM-SM-01-2024', 'Tools', 'Visual Studio'),
('Code Market', 'CM-SM-01-2024', 'Tools', 'Postman'),
('Code Market', 'CM-SM-01-2024', 'Tools', 'NodeJS'),

-- Mark and Martha Co.	Senior Software Engineer	MM_SSE-01-2024	Programming Languages	Java, C++, Scala, JavaScript, Python
-- 			Operating Systems	Linux, Mac OS, Windows
-- 			Professional Experience	Software Engineer
-- 			Tools	Azure, JIRA, SmartDraw, Visual Studio, Eclipse, IntelliJ, NodeJS, Angular
-- 	Junior Software Engineer	MM-JSE-01-2024	Languages	Java, C++, JavaScript
-- 			Operating Systems	Linux, Mac OS 
-- 			Professional Experience	Software Engineer
-- 			Tools	Eclipse, IntelliJ, Visual Studio, NodeJS
-- 	Software Intern	MM-SI-01-2024	Programming Languages	Python, JavaScript
-- 			Operating Systems	Windows
-- 			Tools	Eclipse, IntelliJ, Angular
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Programming Languages', 'Java'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Programming Languages', 'C++'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Programming Languages', 'Scala'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Programming Languages', 'JavaScript'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Programming Languages', 'Python'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Operating Systems', 'Linux'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Operating Systems', 'Mac OS'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Operating Systems', 'Windows'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Professional Experience', 'Software Engineer'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Tools', 'Azure'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Tools', 'JIRA'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Tools', 'SmartDraw'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Tools', 'Visual Studio'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Tools', 'Eclipse'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Tools', 'IntelliJ'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Tools', 'NodeJS'),
('Mark and Martha Co.', 'MM-SSE-01-2024', 'Tools', 'Angular'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Languages', 'Java'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Languages', 'C++'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Languages', 'JavaScript'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Operating Systems', 'Linux'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Operating Systems', 'Mac OS'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Professional Experience', 'Software Engineer'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Tools', 'Eclipse'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Tools', 'IntelliJ'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Tools', 'Visual Studio'),
('Mark and Martha Co.', 'MM-JSE-01-2024', 'Tools', 'NodeJS'),
('Mark and Martha Co.', 'MM_SI-01-2024', 'Programming Languages', 'Python'),
('Mark and Martha Co.', 'MM_SI-01-2024', 'Programming Languages', 'JavaScript'),
('Mark and Martha Co.', 'MM_SI-01-2024', 'Operating Systems', 'Windows'),
('Mark and Martha Co.', 'MM_SI-01-2024', 'Tools', 'Eclipse'),
('Mark and Martha Co.', 'MM_SI-01-2024', 'Tools', 'IntelliJ'),
('Mark and Martha Co.', 'MM_SI-01-2024', 'Tools', 'Angular');

INSERT INTO Payment (userId, paymentId, paymentAmount, dueDate, paymentDate) 
VALUES 
    ('sanderson8855', 'PAYMENT001', 1575.00, '2024-04-30', '2024-04-26'),
    ('Lake0982', 'PAYMENT002', 2905.00, '2024-05-15', '2024-04-30'),
    ('idea0793', 'PAYMENT003', 750.00, '2024-04-30', '2024-05-26'),
    ('luke3775', 'PAYMENT004', 1200.00, '2024-04-30', '2024-04-27'),
    ('mill2221', 'PAYMENT005', 5325.00, '2024-05-31', '2024-04-28'),
    ('code2525', 'PAYMENT006', 3500.00, '2024-05-01', '2024-04-29'),
    ('elite0181', 'PAYMENT007', 4500.00, '2024-04-30', '2024-04-30'),
    ('mark1649', 'PAYMENT008', 3750.00, '2024-05-01', '2024-05-01'),
    ('albert4684', 'PAYMENT009', 60.00, '2024-04-30', '2024-05-02'),
    ('adams3774', 'PAYMENT010', 60.00, '2024-04-30', '2024-05-03'),
    ('william0062', 'PAYMENT011', 120.00, '2024-04-28', '2024-05-04'),
    ('bensen1173', 'PAYMENT012', 60.00, '2024-04-30', '2024-05-05'),
    ('wilkinson7765', 'PAYMENT013', 120.00, '2024-04-28', '2024-05-06'),
    ('goldorf4773', 'PAYMENT014', 120.00, '2024-04-28', '2024-05-07'),
    ('briggs2562', 'PAYMENT015', 60.00, '2024-04-30', '2024-05-08'),
    ('cooper6373', 'PAYMENT016', 60.00, '2024-04-30', '2024-05-09'),
    ('sanderson3773', 'PAYMENT017', 60.00, '2024-04-30', '2024-05-10'),
    ('white9785', 'PAYMENT018', 120.00, '2024-04-28', '2024-05-11'),
    ('hansen1990', 'PAYMENT019', 60.00, '2024-04-30', '2024-05-12'),
    ('wang8987', 'PAYMENT020', 120.00, '2024-04-28', '2024-05-13'),
    ('tangen6475', 'PAYMENT021', 60.00, '2024-04-30', '2024-05-14'),
    ('thomson2453', 'PAYMENT022', 60.00, '2024-04-30', '2024-05-15');