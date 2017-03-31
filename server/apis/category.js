let router = require('express').Router();
const categoryModel = require('mongoose').model(require('../models/collectionNames').Categories);
const itemModel = require('mongoose').model(require('../models/collectionNames').Items);
const helper = require('../modules/helper');
const async = require('async');

module.export = router;

router.get('/', (req, res)=> {
    categoryModel.find({}, (err, result) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(result);
    })
});

router.get('/:id', (req, res)=> {
    let id = req.params.id;
    async.parallel(
        {
            Category: function (done) {
                categoryModel.findOne({_id: id}, (err, result)=> {
                    if (err)
                        return done(err);
                    if (result == null)
                        return res.status(404).json({message: 'not_found'});
                    done(null, result);
                })
            },
            Items: function (done) {
                itemModel.find({Category: id}, (err, result)=> {
                    if (err)
                        return done(err);
                    done(null, result);
                })
            }
        },
        function (err, results) {
            return res.status(200).json(results);
        }
    )
});

router.put('/:id', (req, res)=> {
    let id = req.params.id;
    let body = req.body;
    categoryModel.findOneAndUpdate({_id : id}, body, (err, result)=>{
        if (err && err.code == 11000)
            return res.status(400).json({message: 'name_existed'});
        if (err)
            return res.status(500).json(err);
        if (result == null)
            return res.status(404).json({message: 'not_found'});
        return res.status(200).json({message: 'updated_done'});
    })
});

router.post('/', (req, res)=>{
    let body = req.body;
    if (!helper.CheckProperties(body, ['CategoryName'])) {
        return res.status(400).json({message: 'information_missed'});
    }
    let NewCategory = new categoryModel(body);
    NewCategory.save(function (err) {
        if (err && err.code == 11000)
            return res.status(400).json({message: 'name_existed'});
        if (err)
            return res.status(500).json(err);
        return res.status(200).json({message: 'added_done'});
    })
});

router.delete('/:id', (req, res)=>{
    let id = req.params.id;
    categoryModel.findOneAndRemove({_id: id}, (err, result)=> {
        if (err)
            return done(err);
        if (result == null)
            return res.status(404).json({message: 'not_found'});
        return res.status(200).json({message: 'deleted_done'});
    })
});

module.exports = router;