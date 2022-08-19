const express =require("express")
const passport = require('passport');
const router = express.Router();
const User =require('../modeles/User')

isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
            return next()
    } 
    res.redirect('/users')
}
/*isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.redirect('/users')
 }*/

//login user view 
router.get('/',(req,res)=>{
    res.render('user/login',{
        error : req.flash('error')
    })
})
 
//login post request 
router.post('/login',   
    passport.authenticate('local.login',{
    successRedirect:'/telephones',
    failureRedirect : '/users',
    failureFlash : true
}))

//sign up form 
router.get('/signup',(req,res)=>{
    res.render('user/signup',{
        error : req.flash('error')
    })
})

//signup post request 
router.post('/signup',
    passport.authenticate('local.signup',{successRedirect:'/users',
    failureRedirect : '/users/signup',
    failureFlash : true
}))

//profile
router.get('/profile',isAuthenticated,(req,res)=>{
        res.render('user/profile',{
            success : req.flash('success')
        })
    
})

//logout user
router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/users');
    });
    
})

module.exports = router;