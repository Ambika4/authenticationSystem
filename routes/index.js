const express= require('express');/*It will fetch old instance of express if we are adding it for second time*/
/*express is required only once*/
const router=express.Router();

const homeController=require('../controllers/home_controller');
console.log('router loaded');

router.get('/',homeController.home);
//routes for users
router.use('/users',require('./users'));


//for any further routes access from here
//router.use('/routername',require('./routerfile));


module.exports=router;