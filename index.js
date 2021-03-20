const sql = require('mysql');
const inquirer = require('inquirer');
const CMSTITLE = require('./nameplate.js');
const Employee = require("./employeeModels.js");


init();
console.log(CMSTITLE)

const connect = sql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'password',
    database: 'cms_DB',
  });


function init(){
  const {choice} = inquirer.prompt([
    {
      type: 'list',
      name: 'start-choice',
      message: 'What would you like to do?',
      choices: ['View ALL Employees', 'View Departments', 'View Employees by Role',  'Add Employee', 'Update Employee Role']
    }
  ])
  switch(choice){
    case 'View ALL Employees':
      return allEmployees()
      break;
    case 'View Departments':
      return //
      break;
    case 'View Employees by Role':
      return //
      break;
    case 'Add Employee':
      return //
      break;
    case 'Update Employee Role':
      return //
      break;
    default: 
      return end();
  }
}

function end(){

}

sql.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});


