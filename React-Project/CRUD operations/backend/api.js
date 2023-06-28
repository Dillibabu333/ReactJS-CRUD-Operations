const client = require('./connection.js')
const express = require('express');
const app = express();
const port=3001;

app.listen(port, ()=>{
    console.log("Sever is now listening at port 3000");
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

client.connect();

const bodyParser = require("body-parser");
app.use(bodyParser.json());


//read all the employees
app.get('/employees', (req, res)=>{
    client.query(`Select * from employee`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

//read by id
app.get('/employees/:id', (req, res)=>{
    client.query(`Select * from employee where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

//create the employee
app.post('/employee', (req, res)=> {
    const emp = req.body;
    console.log(emp)
    let insertQuery = `insert into employee(id, name, company, salary) 
                       values(${emp.id}, '${emp.name}', '${emp.company}', '${emp.salary}')`

    client.query(insertQuery, (err, res)=>{
        if(!err){
            console.log('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


//Update an item
app.put('/employee/:id', (req, res)=> {
    let emp = req.body;
    let updateQuery = `update employee
                       set  id=${emp.eid},
                       name = '${emp.name}',
                       company = '${emp.company}',
                       salary =${emp.salary}
                       where id = ${emp.eid}`

    client.query(updateQuery, (err, res)=>{
        if(!err){
            console.log('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


// Delete an item
app.delete('/employees/:id', (req, res)=> {
    let insertQuery = `delete from employee where id=${req.params.id}`

    client.query(insertQuery, (err, res)=>{
        if(!err){
            console.log('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})