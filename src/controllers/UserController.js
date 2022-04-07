const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/', async (req, res) => {
    const {name, email, password} = req.body;

    console.log(name, email, password);
    try {

        const user = await User.create({
            name: name,
            email: email,
            password: password
        })
        return res.send({user});
    } catch (error) {
        console.log(error);
    }
})

router.get('/signin', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({ error: 'Usuario invalido!' })

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Senha invalida!'})

    user.password = undefined;

    return res.send({user})
})

router.delete('/remove', async (req, res) =>{
    const {id} = req.headers;
    const user = await User.findById(id);

    try{
        if(!user)
            return res.status(401).send({error: 'Usuário não encontrado'});

        await User.findByIdAndDelete({_id: id});

        return res.json({message: 'Usuário deletado com sucesso'});
    }catch(error){
        console.log(error);
    }
})

router.put('/update', async (req, res) =>{
    const {id} = req.headers;
    const {name} = req.body;
    const user = await User.findById(id);

    try {
        if(!user)
            return res.status(400).send({error: 'Usuário não encontrado!'});
        
        await User.updateOne({_id: id},{
            name
        });

        return res.send({ 
            user, 
            message: 'Usuário Alterado com sucesso!'
        })
    } catch (error) {
        return res.status(400).send({error: 'Usuário não alterado!'})
    }

})

module.exports = app => app.use('/user', router);