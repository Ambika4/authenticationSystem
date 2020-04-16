const User=require('../models/user');

module.exports.create=function(req,res){
    console.log(req.body);
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }  
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
              if(err)
              {
                  console.log('error in creating user while signing up');
                  return ;
              }
            //   req.flash('success','Sign Up sucessfully!!');
              return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
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

//sign in and create a session
module.exports.createSession = function(req, res){
   // req.flash('success','Logged in sucessfully');
    return res.redirect('/');
}
