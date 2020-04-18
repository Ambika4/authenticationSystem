const passport=require('passport');

//Strategy property we want to use
const LocalStrategy = require('passport-local').Strategy;

//import user
const User=require('../models/user');
//authentication using passport
//tell passport to use local startegy
passport.use(new LocalStrategy({
   usernameField:'email' ,
   //this allow us to keep req as first argument of function
   passReqToCallback: true
},
//done is inbuilt function to passport it is callback function
//It will call based on data passed
function(req,email,password,done){
//we need to find user ans establish the identity

   User.findOne({email:email},function(err,user){
       //Error
       if(err)
       {
          // req.flash('error in finding user',err);
           //report error to passport
           return done(err);
       }
       //if user is not found or password is incorrect
       if(!user || user.password!=password)
       {
        //req.flash('error','error,Invalid username or password');
           return done(null,false);
       }

       return done(null,user);
   });
}

));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            //req.flash('error','Error in finding user -->Passport');
           //report error to passport
           //done function is call back function
           return done(err);
        }
        return done(null,user);
    });

});

//check if user is aunthenticated
//use as middleware
passport.checkAuthentication=function(req,res,next){
    //if the user is sign in pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current siged in user from the session cookie and we are 
        //just sending this to the locals for the views
        res.locals.user=req.user
    }
    next();
}
module.exports=passport;