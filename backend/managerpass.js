const bcrypt = require("bcrypt");

let password = "manager123";

bcrypt.hash(password, 10)
.then(hash=>{
    console.log(hash);
});