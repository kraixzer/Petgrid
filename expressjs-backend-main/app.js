const express = require('express')
const express_app = express()
const port = 3000

express_app.get('/', (request, response) => {
    response.send('Hello World!')
});

express_app.get('/custom-response/', (request, response) => {

    const name = request.query.name;
    const age = request.query.age;

    let is_name = false;
    let is_age = false;
    let message = '';

    if (name == "" && age == ""){
        message = "Please send Name and Age";
    } else {
        if (name == "") {
            message = "Please send Name";
        } else if (name.match(/\d+/g)){
            message = "Name should NOT contain any numbers"
        } else {
            is_name = true;
        }
    
        if (age == ""){
            message = "Please send age";
        } else if (isNaN(age)){
           message = "Age should ONLY contain numbers";
        } else {
            is_age = true;
        }
    }
    
    if(is_age && is_name){
        response.send(`Hello ${name}, your age is ${age}`);
    } else {
        response.send(message);
    }
});

express_app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})