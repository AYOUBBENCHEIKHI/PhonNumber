const express =require("express")
const app = express()
const db = require('./config/database')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportSetup =require('./config/passport-setup')
    //bring ejs templite
    app.set('view engine','ejs')
    //bring static 
    app.use(express.static('static'))
    app.use(express.static('node_modules'))
//bring body porser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//session and flash 
app.use(session({
    secret: 'lorem is ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000*15 }
}))
app.use(flash())
//bring passport 
app.use(passport.initialize())
app.use(passport.session())

//stor user object
app.get('*',(req,res,next)=>{
    res.locals.user = req.user || null
    next()
})
app.get('/',(req,res)=>{
        res.redirect('/users')
    })
    //bring telephones routes
    var telephones = require('./routes/telephones-routes');
    app.use('/telephones',telephones);
    //bring user routes
    var users = require('./routes/users-routes');
    app.use('/users',users);
    //bring user routes
    var admin = require('./routes/admin-routes');
    app.use('/admin',admin);

    app.listen(3001,()=>{
        console.log("it working in port 3001");
    })