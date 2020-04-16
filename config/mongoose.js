//require the libray
const mongoose =require('mongoose');

//connect to the database name codeial_development
mongoose.connect('mongodb://localhost/Authentication');


//acquire the connection(to check if it is successfully)
const db=mongoose.connection;

//when error
db.on('error',console.error.bind(console,"Error connecting to MOngodb"));

//up and running then print up and running 
db.once('open',function(){

    console.log('Connected to the database::MongoDB');
});

module.exports=db;