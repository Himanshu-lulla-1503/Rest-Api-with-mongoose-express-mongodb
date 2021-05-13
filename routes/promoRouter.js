const express = require('express');
const Router = express.Router();
const promotion=require('../models/promotion');
Router.use(express.json());
Router.use(express.urlencoded({extended:false}));
Router.route('/')
.get((req,res,next)=>{
    promotion.find().then((promotions)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);

    }).catch((err)=>{
        console.log(err);
        res.statusCode=404;
        res.json({"error":"Could not fetch data"});

    });

})
.post((req,res,next)=>{
    promotion.create(req.body).then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }).catch((err)=>{
        console.log(err);
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({error:"Invalid Data"});
    });

})
.put((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type','application/json')
    res.json({'error':'PUT operation not supported on /promotions'});
})
.delete((req, res, next) => {
    promotion.remove().then((result)=>{
        console.log(`deleted count of documents from collection is ${result.deletedCount}`);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({"Deleted Count of documents":result.deletedCount});
    }).catch((err)=>{
        console.log(err);
        res.json({'error':err});
    });
});
Router.route('/:promoId')
    .get((req, res, next)=>{
        promotion.findById(req.params.promoId).then((promotion)=>{
            if(!promotion){
                res.statusCode=404;
                res.setHeader('Content-Type', 'application/json');
                res.json({'error':`No promotion exists of promotion id ${req.params.promoId}`});
                
            }
            else{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
            }
    
        }).catch((err)=>{
            console.log(err);
            res.statusCode=404;
            res.json({"error":"Could not fetch data"});
    
        });
    })
    .post((req,res,next)=>{
        res.statusCode = 403;
        res.json({'error':`Post operation not supported on promotion no.${req.params.promoId}`});
    })
    .put(function (req, res, next) {
        promotion.findByIdAndUpdate(req.params.promoId,{$set: req.body},{new:true}).then((updatedpromotion)=>{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(updatedpromotion);
        }).catch((err)=>{
            console.log(err);
            res.statusCode=404;
            res.json({"error":"Could not update leader"});
    
        });
    })
    .delete(function (req, res, next) {
        promotion.findByIdAndDelete(req.params.promoId).then((result)=>{
            console.log(result);
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json({"Deleted Count of documents":result});
        }).catch((err)=>{
            console.log(err);
        });
    });

module.exports = Router;