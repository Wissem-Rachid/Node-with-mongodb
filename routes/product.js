const express = require('express');
const Product = require('../modules/product');
const router = express.Router();

//middleware used for uploading files
const multer = require('multer');

filename = '';

const mystorage = multer.diskStorage({

    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        // image/png
        let fl = date+ '.' + file.mimetype.split('/')[1];
        redirect(null, fl);
        filename = fl;

    }
})

const upload =multer({storage: mystorage});

router.post('/createprod', upload.any('image'), async (req, res) => {
    try{
        data = req.body;
    
        prod = new Product(data);
        prod.image = filename;
        savedUser = await prod.save();
        filename= '';
        res.status(200).send(savedProd)


    }catch (error){
        res.status(400).send(error)
    }
})

router.get('/allprod', async (req, res) => {
    try{
       
        prod = await Product.find( {age: 19} );
        res.status(200).send(prod);

    }catch (error){
        res.status(400).send(error)
    }
})

router.put('/updateprod/:id', async (req, res) => {

    
    try{
        myid = req.params.id;
        newData =req.body;
        updatedProd= await Product.findByIdAndUpdate( {_id : myid }, newData)
       res.status(200).send(updatedProd)
    }catch (error){
        res.status(400).send(error)
    }

})

router.delete('/delelteprod/:id', async (req, res) => {

    
    try{
        myid = req.params.id;
        deletedProd= await Product.findByIdAndDelete( {_id : myid })
       res.status(200).send(deletedProd)
    }catch (error){
        res.status(400).send(error)
    }

})


module.exports = router;