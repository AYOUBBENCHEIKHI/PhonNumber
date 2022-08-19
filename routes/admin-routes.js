const express =require("express")
const passport = require('passport');
const router = express.Router();
const User =require('../modeles/User')
const { body, validationResult } = require('express-validator');
const moment = require('moment'); // require
const { query } = require('express');
moment().format(); 

isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.redirect('/users')
}

router.get('/',isAuthenticated,(req,res)=>{
    //res.render('telephone/index')
    User.find({},(err,users)=>{
        res.render('admin/users',{
            users : users,
            message: req.flash('info'),
        })
    })
})

module.exports = router;