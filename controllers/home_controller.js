
const User=require('../models/user');

//render the signin page
module.exports.home=function(req,res){
    return res.render('home',{
        title:"Authentication| homePage"
    })
}


//module.exports.actionName = function(req,res){}