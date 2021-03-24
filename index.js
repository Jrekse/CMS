const sql = require('mysql');
const inquirer = require('inquirer');
const CMSTITLE = require('./nameplate.js');
const Employee = require("./employeeModels.js");


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
  connection.query(`
  SELECT Department.id AS ID, 
  Department.name AS Dept FROM Department`, 
  (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
});
}

function viewEmpRole() {
  console.log('EMPLOYEE ROLES')
  connection.query(
    `SELECT 
    Role.id AS RID,
    Role.name AS Name, 
    Role.salary AS Salary, 
    department_id AS DID, 
    department_name AS Department 
    FROM Role INNER JOIN Department 
    ON (Role.department_id = Department.id)`,
    (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

const addEmp = async () => {
  console.log('ADD AN EMPLOYEE')
  let manager = await managerQ();
  let role = await roleQ();
  inquirer.prompt([
            {
                name: 'first_Name',
                type: 'input',
                message: "What is the employee's first name?"
            },
            {
                name: 'last_Name',
                type: 'input',
                message: "What is the employee's last name?"
            },
            {
                name: 'role',
                type: 'list',
                message: "What is the employee's role?",
                choices: roleQ()
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Who is their manager?',
                choices: managerQ()
            }
        ]).then((answer) => {
            let roleArray = answer.role.split(" ");
            let managerArray = answer.manager.split(" ");
            connection.query(

                'INSERT INTO Employee SET ?',
                {
                    first_name: answer.first_Name,
                    last_name: answer.last_Name,
                    manager_id: managerArray[1],
                    role_id: roleArray[2],
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`\nEmployee added.\n`);
                    init();
                }
            )

        })

}

const updateEmpRole = async() => {
  console.log('UPDATE ROLES')
  let employeeQu = await employeeQ();
  let roleQu = await roleQ();
  inquire.prompt([
    {
      name: 'employeeUpdate',
      type: 'rawlist',
      choices: employeeQu,
      message: 'Which employee you would you like to update?',
    },
    {
      name: 'roleAdd',
      type: 'rawlist',
      choices: roleQu,
      message: 'Please select a new role for the employee.',
    }
  ]).then((answer) => {
      nameArr = answer.employeeUpdate.split(" ")
      roleArr = answer.roleAdd.split(" ")
      console.log('Updating employee role...\n');
      connection.query('UPDATE Employee SET ? WHERE ?',
        [
          {
            role_id: roleArr[2]
          },
          {
            id: nameArr[1]
          }
        ],
      (err, res) => {
        if (err) {
          console.log('Employee not in database!')
          init();
        };
        console.log(`Employee role updated!\n`);
        init();
      }
    )
  })
}

const roleQ = () => {
  return new Promise((resolve, reject) => {
      connection.query('SELECT CONCAT("Role ID: ", id, " - ", title) AS fullRole FROM Role', (err, res) => {
          if (err) reject(err);
          let roleArray = [];
          res.forEach(Role => {
              roleArray.push(Role.fullRole);
          })
          resolve(roleArray);
      });
  })
};

const employeeQ = () => {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT CONCAT("ID: ", Employee.id, " - ", first_name, " ", last_name, " - ", Role.name) 
      AS fullName FROM role RIGHT JOIN Employee ON Role.id = Employee.role_id`,
          (err, res) => {
              if (err) reject(err);
              let employeeArray = [];
              res.forEach(Employee => {
                  employeeArray.push(Employee.fullName);
              })
              resolve(employeeArray)
          });
  })

};

const managerQ = () => {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT CONCAT("Emp_ID: ", id, " - ", first_name, " ", last_name) AS Managers FROM Employee WHERE role_id BETWEEN 1 AND 2`, (err, res) => {
          if (err) reject(err);

          let managerArray = ["No_Manager"];
          res.forEach(manager => {
              managerArray.push(manager.Managers);
          })
          resolve(managerArray);
      })
  })
}



function end(){
  console.log('\n\nThis app will close soon.\n\n')
}

// sql.createConnection((err) => {
//   if (err) throw err;
//   // run the start function after the connection is made to prompt the user
//   init();
// });


