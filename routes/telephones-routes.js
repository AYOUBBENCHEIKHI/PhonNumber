
    const express = require('express');
    const router = express.Router();
    const Telephone =require('../modeles/Telephone')
    const { body, validationResult } = require('express-validator');
    const moment = require('moment'); // require
    const { query } = require('express');
    moment().format(); 
    //middelware to check if user looged in
    isAuthenticated = (req,res,next)=>{
        if(req.isAuthenticated()){
                return next()
        } 
        res.redirect('/users')
     }
    router.get('/',isAuthenticated,(req,res)=>{
        //res.render('telephone/index')
        Telephone.find({},(err,telephones)=>{
            res.render('telephone/index',{
                telephones : telephones,
                message: req.flash('info'),
            })
        })
    })

    //create new events 
    router.get('/addTelephone',isAuthenticated,(req,res)=>{
        res.render('telephone/addTelephone',{
            errors : req.flash('errors')
        })
    })
    //save 
    router.post('/addTelephone',
        body('first_name').isLength({ min: 2 }).withMessage('first name shold be more than 5 char'),
        body('last_name').isLength({ min: 2 }).withMessage('last name shold be more than 5 char'),
        body('telephone').isLength({ min: 10 }).withMessage('telephone shold be more than 5 char'),
        body('adress').isLength({ min: 5 }).withMessage('adress shold be more than 5 char'),
    (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors',errors.array())
            res.redirect('/telephones/addTelephone')

        }
        else{
            let newTelephone = new Telephone({
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                telephone : req.body.telephone,
                adress : req.body.adress,
                user_id: req.user.id
            })
            newTelephone.save((err)=>{
                if(!err){
                    req.flash('info','The telephone was created successfuly')
                    res.redirect('/telephones')
                }
                else{
                    console.log(err)
                }
            })
        }
        

    })
    //edit route 
    router.get('/edit/:id',isAuthenticated ,(req,res)=>{
        Telephone.findOne({_id: req.params.id},(err,telephone)=>{
            if(!err){
                res.render('telephone/editTelephone',{
                    telephone : telephone,
                    errors : req.flash('errors'),
                    message : req.flash('info')
                })
            }
            
        })
    })
    //update 
    router.post('/update',    
        body('first_name').isLength({ min: 2 }).withMessage('first name shold be more than 5 char'),
        body('last_name').isLength({ min: 2 }).withMessage('last name shold be more than 5 char'),
        body('telephone').isLength({ min: 10 }).withMessage('telephone shold be more than 5 char'),
        body('adress').isLength({ min: 5 }).withMessage('adress shold be more than 5 char'),
        isAuthenticated ,(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors',errors.array())
            res.redirect('/telephones/edit/' +req.body.id)
        }
        else{
            //create object 
            let newfeilds = {
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                telephone : req.body.telephone,
                adress : req.body.adress
            }
            let query = {_id :req.body.id}
            Telephone.updateOne(query,newfeilds,(err)=>{
                if(!err){
                    req.flash('info','The telephone was updated successfuly ')
                    res.redirect('/telephones')
                }
                else{
                    console.log(err)
                }
            })
        }
    })
//delet
//delete telephone 
router.delete('/delete/:id',isAuthenticated ,(req,res)=>{
    let query = {_id: req.params.id}
    Telephone.deleteOne(query,(err)=>{
        if(!err){
            res.status(200).json('deleted')
        }
        else{
            res.status(400).json('There was error ,phone was not deleted')
        }
    })
})

module.exports = router;