const express = require('express');
const User = require('../modules/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register
router.post('/register', async (req, res) => {
    data = req.body;
    
    user = new User(data);

    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync( data.password, salt );
    user.password = cryptedPass;

    user.save()
    .then( (saved) => {
        res.status(200).send(saved)

    })
    .catch((err) =>{
        res.status(400).send(err)
    })

});

//login

router.post('/login', async (req, res) => {
    data = req.body;
    
    user = await User.findOne( { email: data.email } );

    if( !user ){
        res.status(200).send(' email or password invalid')
    }else{
        validPass = bcrypt.compareSync(data.password, user.password)
        if( !validPass ){
            res.status(401).send(' email or password invalid')
        }else{
            payload = {
                _id: user.id,
                email: user.email,
                name: user.name
            }
            token = jwt.sign( payload, '123456' )
            res.status(200).send({ token })
        }

    }


})

router.post('/create', async (req, res) => {
    try{
        data = req.body;
    
        usr = new User(data);
        savedUser = await usr.save();
        res.send(savedUser)

    }catch (error){
        res.send(error)
    }
})

router.get( '/getall', (req, res) => {
    User.find()
        .then(
            (users) => {
                res.send(users);
            }
        )
        .catch(
            (error) => {
                res.send(error)
            }
        )
});

router.get('/all', async (req, res) => {
    try{
       
        users = await User.find( {age: 19} );
        res.send(users);

    }catch (error){
        res.send(error)
    }
})

router.get('/getbyid/:id', (req, res) => {
    myid = req.params.id;
    User.findOne( {_id : myid })
        .then((user) => {
            res.send(user)
        }

        )
        .catch((err) =>{
            res.send(err)
        })

})

router.get('/getid/:id', async (req, res) => {

    
    try{
        myid = req.params.id;
        user= await User.findOne( {_id : myid })
       res.send(user)
    }catch (error){
        res.send(error)
    }

})

router.put( '/update/:id', (req, res) => {
    id = req.params.id;

    newData =req.body;

    User.findByIdAndUpdate({ _id :id }, newData)
    .then((updated) => {
        res.send(updated)
    }

    )
    .catch((err) =>{
        res.send(err)
    })

});

router.get('/upt/:id', async (req, res) => {

    
    try{
        myid = req.params.id;
        newData =req.body;
        updateduser= await User.findByIdAndUpdate( {_id : myid }, newData)
       res.send(updateduser)
    }catch (error){
        res.send(error)
    }

})

router.delete( '/delete/:id', (req, res) => {
    id = req.params.id;
    User.findOneAndDelete({ _id :id })
    .then((deleteduser) => {
        res.send(deleteduser)
    }

    )
    .catch((err) =>{
        res.send(err)
    })
});
router.get('/delid/:id', async (req, res) => {

    
    try{
        myid = req.params.id;
        deleteduser= await User.findByIdAndDelete( {_id : myid })
       res.send(deleteduser)
    }catch (error){
        res.send(error)
    }

})

module.exports = router;