
USE employeeTracker_db;


INSERT INTO department (department) VALUES ('Engineering');
INSERT INTO department (department) VALUES ('Sales');
INSERT INTO department (department) VALUES ('Legal');
INSERT INTO department (department) VALUES ('Finance');

INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 95000, 1);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 85000, 1);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lead Engineer', 145000, 1);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 75000, 2);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 65000, 2);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Sales Lead', 125000, 2);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lawyer', 105000, 3);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Leal Lead', 135000, 3);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Legal Assitant', 65000, 3);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 75000, 1);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 70000, 2);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Legal Assistant', 60000, 3);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Accountant', 75000, 4);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lead Accountant', 125000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Olivia', 'Park', 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Chris', 'Brown', 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('David', 'Allen', 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jake', 'Lau', 4, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Kevin', 'Tupic', 5, 6);
INSERT INTO employee (first_name, last_name, role_id , manager_id)
VALUES('Jason', 'Brown', 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Ashley', 'Judd', 7, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Robert', 'Rodrigez', 8, NULL);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES('John', 'Jake', 9, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Kim', 'Caroll', 10, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Tim', 'Alex', 11, 6);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES('Emma', 'Thompson', 12, 8);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES('Mike', 'Troy', 13, 14);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Peter', 'Maxwell', 14, NULL);


-- readAll employee
SELECT employee.id, employee.first_name, employee.last_name,
role.title,department.department,role.salary
FROM employee
LEFT JOIN role ON role.id = employee.role_id
LEFT JOIN department ON department.id = role.department_id;

-- readAllemloyee by Department
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department
FROM employee
LEFT JOIN role ON role.id = employee.id 
LEFT JOIN department ON department.id = role.department_id WHERE department.department = 'Engineering';

-- readAllmanager 
SELECT * FROM employee WHERE  manager_id IS null;

-- -- readAllroles Join
SELECT employee.id, employee.first_name, employee.last_name,
role.title, department.department
FROM role
LEFT JOIN employee ON role.id = employee.role_id
LEFT JOIN department ON department.id =role.department_id;


SELECT * FROM department; 
SELECT * FROM role;
SELECT * FROM employee; 


ALTER TABLE department RENAME COLUMN name TO department;

ALTER TABLE employee DROP COLUMN manager;

-- View the total utilized budget of a department -- 
-- ie the combined salaries of all employees in that department
SELECT SUM(salary) AS EngineeringBudget FROM role WHERE department_id=1;

-- TRUNCATE TABLE department; 
-- TRUNCATE TABLE role;
-- TRUNCATE TABLE employee; 

DROP TABLE employee;
SELECT e.*, CONCAT (m.first_name, ' ', m.last_name) AS manager FROM employee AS e
LEFT JOIN employee AS m ON e.manager_id = m.id;

-- ALTER TABLE role
-- ADD CONSTRAINT FK_PersonOrder
-- FOREIGN KEY (department_id) REFERENCES department(id);

