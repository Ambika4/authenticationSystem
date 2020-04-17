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

//sign in and create session for the user
module.exports.createSession=function(req,res){
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing in');return;}
         //handle the user found
         //console.log(user);
         if(user){
            //handle password which doesn't match
            if(user.password!=req.body.password){
               return res.redirect('back');}
            //handle session creation
            // res.cookie('user_id',user.id);
           // console.log(user.password);
           console.log(user.id);
            return res.redirect('/users/profile/<%= user.id %>');
         }
         else{
            //handle user not found
            return res.redirect('back');
         }
    });
       
}

module.exports.profile = function(req, res){
    console.log(req.params.id);
    User.findById(req.params.id,function(err,user){
        console.log(user);
       // return res.redirect("back");
      return res.render('user_profile', {
          title: 'User Profile',
          profileUser:user
      });
    });
 
}
