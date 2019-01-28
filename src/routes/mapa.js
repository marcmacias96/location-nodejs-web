const express = require('express')
const router = express.Router()
const Ubication = require('../models/ubication')
const {isAuthenticated} = require('../helpers/auth')

router.get('/mapa',isAuthenticated ,isAuthenticated, async (req,res) => {
    const ubications = await Ubication.find({user:res.locals.user.id}).sort({date: 'desc'})

    res.render('map/mapa',{ubications})
})

router.get('/mapa/new-ubication',isAuthenticated, (req,res) => {
    console.log(req.body.address);
    
    res.render('map/new-ubication')
    
    
})

router.get('/mapa/edit-ubication/:id',isAuthenticated, async (req,res) => {
    const ubication =await Ubication.findById(req.params.id)
    res.render('map/edit-ubication', {ubication})
})
router.put('/mapa/edit-ubication/:id',isAuthenticated, async (req,res) => {
   const { name, description } = req.body
   await Ubication.findByIdAndUpdate(req.params.id,{ name, description})
   req.flash('success_msg','Ubicacion Actualizada Satisfactoriamente')
   res.redirect('/mapa')
})

router.delete('/mapa/delete-ubication/:id',isAuthenticated, async (req,res) => {
    await Ubication.findByIdAndDelete(req.params.id)
    req.flash('success_msg','Ubicacion Eliminada Satisfactoriamente')
    res.redirect('/mapa')
})

router.post('/mapa/new-ubication',isAuthenticated, async (req,res) => {
    const { name, description, location,user } = req.body
    const errors = []
    if(!name){
        errors.push({text: 'Porfavor ingrese el nombre'})
    }
    if(!description){
        errors.push({text: 'Porfavor ingrese la descripcion'})
    }
    if(errors.length > 0){
        res.render('map/new-ubication',{
            errors,
            name,
            description
        })
    }else{
        const user = res.locals.user.id.toString()

        
        const newUbication = new Ubication({name,description,location,user})
        console.log('hola2',newUbication.user);
        
        await newUbication.save()  
        req.flash('success_msg','Ubicacion Agregada satisfactoriamente')
        res.redirect('/mapa')

    }
})

module.exports = router