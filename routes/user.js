//import express
const express=require('express');

//import router
const router=express.Router();


//import user controller
const userController=require('../controllers/user_controller');

//route for sign-up page
router.get('/sign-up',userController.signUp);

//route for sign-in page
router.get('/sign-in',userController.signIn);

//sign out routes
router.get('/sign-out',userController.destorySession);
//export router
module.exports=router;
