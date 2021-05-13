const express = require('express');
const app =express();
const path = require('path');
const port = process.env.PORT || 3000;
const hostname='localhost';
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/himanshu",{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    console.log('connected successfully');
}).catch((err)=>{
    console.log(err);
});
const leader=require('./models/leaders');
const promotion= require('./models/promotion');
const dishRouter = require('./routes/dishRouter');
const promoRouter=require('./routes/promoRouter');
const leaderRouter=require('./routes/leaderRouter');
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
