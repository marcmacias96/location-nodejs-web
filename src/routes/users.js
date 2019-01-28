const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')


router.get('/user/signin',( req, res ) => {
    res.render('users/signin')
})

router.post('/user/signin',passport.authenticate('local', {
    successRedirect: '/mapa',
    failureRedirect: '/user/signin',
    failureFlash: true
}))

router.get('/user/signup',( req, res ) => {
    res.render('users/signup')
})

router.post('/user/signup', async ( req, res ) => {
    const errors = []
    const  { name, email, password, confirm_password} = req.body
    if(name.length <=0 || password.length <=0 )
    {
        errors.push({text: 'No se admiten campos vacios'})
    }
    if(password != confirm_password)
    {
        errors.push({text: 'Las contraseñas no coinsiden'})
    }
    if( password.length < 4)
    {
        errors.push({text: 'La contraseña debe ser mayor a 4 caracteres'})
    }
    if( errors.length > 0 )
    {
        res.render('users/signup', {errors,name,email})
    } else {
       const emailUser = await User.findOne({email : email})
       if(emailUser) {
        req.flash('error_msg','El email esta siendo usado por otro usuario')       
        res.redirect('signup')
       } else{
            const newUser= new User({name,email,password})
            newUser.password =  await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg','Usuario Registrado')
            res.redirect('signin')
       }
       
    }
})

router.get('/user/logout', (req,res) => {
    req.logOut()
    res.redirect('/')
})
module.exports = router