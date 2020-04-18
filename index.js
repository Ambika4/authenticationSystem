const express = require('express');
const app = express();
const port=8000;/** On port 80 all website hosts */
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store session cookie in the db
app.use(session({
    name:'authentication',
    //TODO change the secret before deployment in production mode
    secret:'dontknow',
    //when the session is not established at that
    // we don't want to store extra data so saveUninitialized: false
    saveUninitialized: false,
    //when identity is established,if there is no change in session cookie 
    //we don't want to resave the data or user information so,resave:false
    resave:false,
    cookie:{
       // Specifies the number (in milliseconds) to use when calculating the
        // Expires Set-Cookie attribute. This is done by taking the current server time 
        //and adding maxAge milliseconds to the value to calculate an Expires datetime.
        // By default, no maximum age is set
        maxAge:(1000 * 60 * 100)
    },
    store:new MongoStore(
        {
        mongooseConnection:db,
        autoRemoveInterval:'disabled'
       },
       //call back function in case connection is not established
       function(err)
       {
        console.log(err  ||'connect mogngodb setup ok');
       }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Error: ',err);
        /*interpolition
        console.log(`Error in running : ${err}`);
        */
    }
    console.log(`server is running on port${port}`);
});