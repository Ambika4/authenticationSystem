//import express
const express=require('express');

//import router
const router=express.Router();


//import user controller
const homeController=require('../controllers/home_controller');

//route for sign-up page
router.get('/sign-up',homeController.signUp);

//route for sign-in page
router.get('/sign-in',homeController.signIn);


//export router
module.exports=router;
