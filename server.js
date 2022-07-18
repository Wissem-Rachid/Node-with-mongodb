const express = require('express');

const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

require ('./config/connect');


const app = express();
app.use(express.json());



//http://127.0.0.1:3000/
//Middleware
app.use('/product', productRoute);
app.use('/user', userRoute);

app.use('/getimage', express.static('./uploads'))


app.listen(3000 , () =>{
    console.log('server work fine');
})