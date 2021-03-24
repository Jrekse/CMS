const sql = require('mysql');
const inquirer = require('inquirer');
const CMSTITLE = require('./nameplate.js');
const Employee = require("./employeeModels.js");
const table = require('console.table');


init()

const connection = sql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'password',
    database: 'cms_DB',
  });


function init(){
  console.log(CMSTITLE)
  inquirer.prompt(
    {
      type: 'list',
      name: 'startChoice',
      message: 'What would you like to do?',
      choices: ['View ALL Employees', 'View Departments', 'View Employees by Role',  'Add Employee', 'Update Employee Role', 'Exit']
    }
  ).then((answer)=>{
    switch(answer.startChoice){
      case 'View ALL Employees':
        allEmployees()
       break;
      case 'View Departments':
        viewDept()
        break;
      case 'View Employees by Role':
        viewEmpRole()
        break;
      case 'Add Employee':
        addEmp()
        break;
      case 'Update Employee Role':
        updateEmpRole()
        break;
      case 'Exit':
        end()
    }})
}

function allEmployees() {
  console.log('ALL EMPLOYEES:')
  connection.query(`
    SELECT Employee.id as ID,
    Employee.first_name as Fname,
    Employee.last_name as Lname,
    Role.name as Role,
    Role.salary as Salary,
    Department.name as Dept,
    FROM employee INNER JOIN role 
    ON (employee.role_id = role.id) 
    INNER JOIN department ON role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    })
}

function viewDept() {
  console.log('VIEW BY DEPARTMENT')
}

function viewEmpRole() {
  console.log('EMPLOYEE ROLES')
}

function addEmp() {
  console.log('ADD AN EMPLOYEE')
}

function updateEmpRole() {
  console.log('UPDATE ROLES')
}

function end(){
  console.log('\n\nThis app will close soon.\n\n')
}

// sql.connect((err) => {
//   if (err) throw err;
//   // run the start function after the connection is made to prompt the user
//   init();
// });


