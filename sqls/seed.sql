INSERT INTO Department (name)
VALUES ("Accounting"), ("Sales"), ("IT"), ("HR"), ("Corporate");

INSERT INTO Role (name, salary, department_id);
VALUES ("Sales", 65000, 2), ("Junior Accountant", 65000, 1), ("Accountant", 80000, 1), ("IT Associate", 70000, 3), 
("IT Lead", 80000, 3), ("HR", 50000, 4), ("CEO", 100000, 5); 

INSERT INTO Employee (first_name, last_name, manager_id, role_id);
VALUES ("John", "Doe", 1, 1), ("James", "Dono", 1, 2), ("Jill", "Doe", 2, 1), ("Jim", "Bob", 2, 5), ("Jonny", "Sloan", 5, 4),