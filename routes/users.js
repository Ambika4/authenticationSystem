//import express
const express=require('express');

//import router
const router=express.Router();

//import passport
const passport=require('passport');

//import user controller
const userController=require('../controllers/user_controller');

//route for sign-up page
router.get('/sign-up',userController.signUp);

//route for sign-in page
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

//sign out routes
router.get('/sign-out',userController.destorySession);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);


router.get('/profile/:id',passport.checkAuthentication,userController.profile);
//export router
module.exports=router;
