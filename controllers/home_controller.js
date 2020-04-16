
const User=require('../models/user');

//render the signin page
module.exports.home=function(req,res){
    return res.render('home',{
        title:"Authentication| homePage"
    })
}
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Authentication| Signup"
    });
}

//render the signup page
module.exports.signIn=function(req,res){

    return res.render('user_sign_in',{
        title:"Authentication | Signin"
    });
}

//module.exports.actionName = function(req,res){}