// get the client
const db = require('../../models/main')

function sanatize(string){
    var format = /[$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/
    if(format.test(string)){
        return true;
    }
    else{
        return false;
    }
}
 
module.exports = async (req, res) => {
    let newUser = new db()

    newUser.userName = req.body.username, {unsafe: true};
    newUser.password = req.body.password, {unsafe: true};
    newUser.email = req.body.email, {unsafe: true};
    newUser.companyName = req.body.companyName, {unsafe: true};
    newUser.adminLevel = 0
    console.log(newUser)
    if(sanatize(newUser.userName) || sanatize(newUser.password) || sanatize(newUser.email) ){
        console.log('Injection Detected')
        return;
    }
    newUser.save((err) => {
        if (err) return err
    })
}