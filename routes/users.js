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

router.post('/create',userController.create);

router.post('/create-session',userController.createSession);

router.get('/profile/:id',userController.profile);

//export router
module.exports=router;
