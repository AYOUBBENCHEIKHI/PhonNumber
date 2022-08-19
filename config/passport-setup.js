const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../modeles/User')

//
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})
//save user object the session

passport.use('local.signup',new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},(req,username,password,done)=>{
    if(req.body.password != req.body.confirm_password){
        return done(null,false,req.flash('error','Password do not match'))
    }
    else{
    User.findOne({email : username},(err,user)=>{
            if(err){
                return done(err)
            }
            if(user){
            return done(null,false,req.flash('error','Email already used'))
            }
            if(!user){
                //create user 
                let newUser = new User()
                newUser.first_name  = req.body.first_name
                newUser.last_name = req.body.last_name
                newUser.email = req.body.email
                newUser.password = newUser.hashPassword(req.body.password)
                newUser.role = "0"
                newUser.save((err,user)=>{
                    if(!err){
                        return done(null,user,req.flash('success','User Add successfuly ...'))
                    }
                    else{
                        console.log(err)
                    }

                })
            }
    }) 
    }
}))

//login strateger 
passport.use('local.login',new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},(req,username,password,done)=>{
    //finsd user 
    User.findOne({email : username},(err,user)=>{
        if(err){
            return done(null,false,req.flash('error','Password do not match'))
        }
        if(!user){
            return done(null,false,req.flash('error','user was not found'))
        }
        if(user){
            if(user.comparePasswords(password,user.password)){
                return done(null,user,req.flash('success','welcome back'))
            }
            else{
                return done(null,false,req.flash('error','Password do not match'))
            }
        }
    })
}))