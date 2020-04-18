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
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');}
    return res.render('user_sign_up',{
        title:"Authentication| Signup"
    });
}

//render the signup page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial | Signin"
    });
}

module.exports.createSession = function(req, res){
   // req.flash('success','Logged in sucessfully');
    console.log(req.session.passport.user);
    return res.redirect('/users/profile/'+req.session.passport.user);
}

module.exports.profile = function(req, res){
    
   // console.log(req.params.id);
    User.findById(req.params.id,function(err,user){
        //console.log(user);
       // return res.redirect("back");
      return res.render('user_profile', {
          title: 'User Profile',
          profileUser:user
      });
    });
 
}

//destory current session
module.exports.destorySession=function(req,res){
    //logout function is due to passport js
    //req.flash('success','Logged out sucessfully');
    req.logout();
    return res.redirect('/');
}
