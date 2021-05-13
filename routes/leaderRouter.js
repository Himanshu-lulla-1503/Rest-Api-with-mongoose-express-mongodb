const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const leader=require('../models/leaders');
Router.use(express.json());
Router.use(express.urlencoded({extended:false}));
Router.route('/')
.get((req,res,next)=>{
    leader.find().then((leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);

    }).catch((err)=>{
        console.log(err);
        res.statusCode=404;
        res.json({"error":"Could not fetch data"});

    });
})
.post((req,res,next)=>{
    leader.create(req.body).then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }).catch((err)=>{
        console.log(err);
        res.statusCode=403;
        res.json({error:"Multiple Entries Found pls check"});
    });

})
.put((req, res, next) => {
    res.statusCode = 403;
    res.json({'error':'PUT operation not supported on /leaders'});
})
.delete((req, res, next) => {
    leader.remove().then((result)=>{
        console.log(`deleted count of documents from collection is ${result.deletedCount}`);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({"Deleted Count of documents":result.deletedCount});
    }).catch((err)=>{
        console.log(err);
    });
    
});
Router.route('/:leaderId')
    .get(function (req, res, next) {
        leader.findById(req.params.leaderId).then((leader)=>{
            if(!leader){
                res.statusCode=404;
                res.setHeader('Content-Type', 'application/json');
                res.json({'error':`No leader exists of leader id ${req.params.leaderId}`});
                
            }
            else{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
            }
    
        }).catch((err)=>{
            console.log(err);
            res.statusCode=404;
            res.json({"error":"Could not fetch data"});
    
        });
    })
    .post((req,res,next)=>{
        res.statusCode = 403;
        res.json({'error':`Post operation not supported on leader no.${req.params.leaderId}`});
    })
    .put(function (req, res, next) {
        leader.findByIdAndUpdate(req.params.leaderId,{$set: req.body},{new:true}).then((updatedleader)=>{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(updatedleader);
        }).catch((err)=>{
            console.log(err);
            res.statusCode=404;
            res.json({"error":"Could not update leader"});
    
        });
    })

    .delete(function (req, res, next) {
        leader.findByIdAndDelete(req.params.leaderId).then((result)=>{
            console.log(result);
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json({"Deleted Count of documents":result});
        }).catch((err)=>{
            console.log(err);
        });
    });
module.exports = Router;