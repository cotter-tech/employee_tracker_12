const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'coder5378!',
    database: 'employeeTracker_db'

});

connection.connect(err => {
    if (err) throw err
    console.log(`connected as id${connection.threadId}`)
    intro();

})

const choices = [
    "View All Employees",
    "View Employees info",
    "View All Employees By Department",
    "View All Employees By Manager",
    "Add Employee",
    "Remove Employee",
    "Update Employee Role",
    "View All Roles",
    "View Budget",
    "EXIT"
]

const intro = () => {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: choices

    }]).then(answer => {
        switch (answer.action) {
            case choices[0]:
                readAllEmployee();
                break;

            case choices[1]:
                readEmployeeInfo();
                break;

            case choices[2]:
                readAllEmployeeByDept();
                break;

            case choices[3]:
                readAllManager();
                break;

            case choices[4]:
                addEmployee();
                break;

            case choices[5]:
                removeEmployee();
                break;

            case choices[6]:
                updateEmployeeRole();
                break;

            case choices[7]:
                readAllRoles();
                break;

            case choices[8]:
                readBudget();
                break;

            case choices[9]:
                exit();
                break;
        }
    })
}

const readAllEmployee = () => {
    let query = 'SELECT employee.id, employee.first_name, employee.last_name,role.title,department.department,role.salary FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;'

    connection.query(query, (err, results) => {
        if (err) throw err
        console.table(results)
        intro();
    })
}

const readEmployeeInfo = () => {
    let queryInfo = 'SELECT * FROM employee;'

    connection.query(queryInfo, (err, results) => {
        if (err) throw err
        console.table(results)
        intro();
    })
}

const readAllEmployeeByDept = () => {
    inquirer.prompt([{
        name: 'department',
        type: 'list',
        choices: ['Engineering', 'Sales', 'Legal', 'Finance']
    }]).then(answer => {
        let queryByDept = 'SELECT employee.id, employee.first_name, employee.last_name, role.title,department.department FROM employee LEFT JOIN role ON role.id = employee.id LEFT JOIN department ON department.id = role.department_id WHERE ?;'

        connection.query(queryByDept, { department: answer.department }, (err, results) => {
            if (err) throw err
            console.table(results)
            intro();
        })

    })


}

const readAllManager = () => {
    let queryByManager = 'SELECT  FROM employee WHERE  manager_id IS null;'
    connection.query(queryByManager, (err, results) => {
        if (err) throw err
        console.table(results)
        intro();
    })
}

const addEmployee = () => {
    let rollArry = []
    connection.query('SELECT id , title FROM role', (err, results) => {
        if (err) throw err
        
            results.filter(element => {
            if (rollArry.includes(element.title)) {
                return false;
            }
            rollArry.push(element.title)
            return true

             })
        connection.query('SELECT manager_id,id,first_name,last_name FROM employee', (err, results) => {
        
            if (err) throw err
            let managerArry = []
            managerArry.push({
                name: "None",
                value: null
            })

            results.forEach(element => {
                if (element.manager_id === null) {
                    managerArry.push(`${element.first_name} ${element.last_name}`)
                }
            })
          
           
            console.log(managerArry)

            let managerIdArry =[]
            results.forEach(element=>{
                let managerId = element.manager_id
               
                if(managerIdArry.includes(managerId))
                    {return false}
                   managerIdArry.push(managerId)
                    return true
            
            })
            console.log(managerIdArry)
            inquirer.prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What employee's first name?"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What employee's last name?"
                },
                {
                    name: "title",
                    type: "list",
                    message: "What is employee\'s role",
                    choices: rollArry
                },
                {
                    name: "manager",
                    message: "Who is employee's manager?",
                    type: "list",
                    choices: managerArry
                },
                {
                    name: "managerId",
                    message: "What is your manager ID?",
                    type: "input"
                    // choices: managerIdArry
                 
                },
                {
                    name: "roleId",
                    message: "Who is employee's role ID?",
                    type: "input"
                }


            ]).then(answer => {
                connection.query("INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.roleId,
                        manager_id: answer.managerId

                    }, (err) => {
                        if (err) throw err
                        readEmployeeInfo();
                        intro();
                    })
            })
    
        })
        
    })

 }      
 
const removeEmployee = () =>{

    connection.query('SELECT * FROM employee',(err, results)=>{
        if(err) throw err                         
        let employeeArry = results.map(result=>{
          console.log(result.first_name +" "+result.last_name, result.id)
    
            return {name: result.first_name +" "+result.last_name,
             value: result.id}
    
         })
           console.log(employeeArry) 

        inquirer.prompt([{ 
        name: "id",
        type: "list",
        message: "Please choose employee name you would like to remove",
        choices: employeeArry
        }     
      ]).then(answer=>{
          console.log(answer)
          connection.query('DELETE FROM employee WHERE ?',
            { id:answer.id},
            (err, results) => {
                if (err) throw err
                console.table(results)
                readEmployeeInfo();
                intro();
            })

      })          
    
 })

}


const updateEmployeeRole = () => {

connection.query('SELECT * FROM employee',(err, results)=>{
            if(err) throw err                         
          let employeeArry = results.map(result=>{
            console.log(result.first_name +" "+result.last_name, result.id)

              return {name: result.first_name +" "+result.last_name,
               id: result.id}

           })
             console.log(employeeArry)              


inquirer.prompt([
    {
        name: "name",
        type: "list",
        message: "Please choose employee name you would like to update",
        choices: employeeArry

    },

    {
        name: "id",
        type: "input",
        message: "Please choose employee id",

    },
    {
        name: "title",
        type: "list",
        message: "Please choose new title for employee",
        choices: ['Sales Lead', 'Salesperson', 'Software Engineer',
            'Lead Engineer', 'Lawyer', 'Legal Lead','Legal Assistant']

    },
    {
        name: "salary",
        type: "input",
        message: "Please enter new salary"   

    },

    {
        name: "department_id",
        type: "list",
        message: "Please choose new department id",
        choices: [1, 2, 3]

    }

]).then(answer =>{
  
    connection.query('UPDATE role SET ? WHERE?', 
        [{  title: answer.title,
            salary: answer.salary,
             department_id: answer.department_id,
           },

            { id: answer.id }], (err) => {
                if (err) throw err
                readAllRoles()
                intro()
        })

     })

  })
      

}


const readAllRoles = () => {
    let queryByRoles = 'SELECT employee.id, employee.first_name, employee.last_name,role.title, department.department FROM role LEFT JOIN employee ON role.id = employee.role_id LEFT JOIN department ON department.id =role.department_id;'
    connection.query(queryByRoles, (err, results) => {
        if (err) throw err
        console.table(results)
        intro()
    })

}

const readBudget = () => {
    inquirer.prompt([{
        name: 'budget',
        type: 'list',
        choices: ['Engineering', 'Sales', 'Legal'],
        message: 'Please select department that you would like to see Budget'
    },

    {
        name: 'id',
        type: 'input',
        message: 'Please enter department id to view Budget'
    },
    ]).then(answer => {
        let queryByBudget = 'SELECT SUM(salary) FROM role WHERE ?;'
        connection.query(queryByBudget, { department_id: answer.id }, (err, result) => {
            if (err) throw err
            console.table(result)
            intro()

        })


    })


}


const exit = () => {
    connection.end();
    process.exit();
}