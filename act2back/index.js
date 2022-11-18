const Manager = require('./controller');
const manager = new Manager();


//hard user

let user ={
    first_name : " Stephen ",
    last_name: "Stranger",
    username : "Doctor Strange",
    age : 30,
    email: "doc@strange.com",
};

//call funtion createuser
// manager.createUser(user)
//   .then(res => console.log(res));

//call funtion read all users

// manager.readUser().then(res => console.log(res));

//create funtion read for id

// manager.getById(3)
// .then(res => console.log(res));

//delete user 

// manager.deleteById(2)
// .then(res => console.log(res))
manager.deleteAll()
.then(res => console.log(res));