const express = require('express');
const app = express();
const port=8000;/** On port 80 all website hosts */
const db=require('./config/mongoose');

const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views','./views');

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