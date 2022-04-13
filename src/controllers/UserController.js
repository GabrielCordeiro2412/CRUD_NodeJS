const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const {Buffer} = require('buffer');
const {uuid} = require('uuidv4');
const authConfig = require('../config/auth.json'); 

const router = express.Router();

const  {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } = process.env;
const s3Bucket = new AWS.S3({params: {Bucket: BUCKET_NAME }});


function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    } )   
}

router.post('/', async (req, res) => {
    const {name, email, password, img_url} = req.body;

    console.log(name, email, password);
    try {

        const buf = Buffer.from(img_url.replace(/^data:image\/\w+;base64,/, ""), 'base64');

        const imageName = uuid();

        const data = {
            Key: `${imageName}.jpeg`,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg',
            ACL: 'public-read'
        };

        AWS.config.update({
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            region: 'sa-east-1',
            Bucket: BUCKET_NAME
        });

        s3Bucket.putObject(data, function(err, data){
            if(err){
                console.log(err);
                console.log('Erro ao fazer o upload da imagem: ', data);

            }else{
                console.log('Sucesso ao fazer o upload!')
            }
        })

        const user = await User.create({
            name: name,
            email: email,
            password: password,
            img_url: `https://projeto-bucket.s3.sa-east-1.amazonaws.com/${imageName}.jpeg`, //Troque onde esta 'projeto-bucket' pelo nome do seu bucket
            img_name: `${imageName}.jpeg`
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

    return res.send({user, token: generateToken({id: user.id})})
})

router.delete('/remove', async (req, res) =>{
    const {id} = req.headers;
    const user = await User.findById(id);

    try{
        if(!user)
            return res.status(401).send({error: 'Usuário não encontrado'});

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });

        s3.deleteObject({
            Bucket: process.env.BUCKET_NAME,
            Key: user.img_name
        }, function(err, data){})

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
            message: 'Usuário Alterado com sucesso!'
        })
    } catch (error) {
        return res.status(400).send({error: 'Usuário não alterado!'})
    }

})

router.get('/all', async (req, res) =>{
    const user = await User.find()
    return res.send({user})
})


module.exports = app => app.use('/user', router);