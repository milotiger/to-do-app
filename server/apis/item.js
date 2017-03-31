const router = require('express').Router();
const itemModel = require('mongoose').model(require('../models/collectionNames').Items);
const helper = require('../modules/helper');

router.get('/', (req, res)=> {
    itemModel.find({}, (err, result) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(result);
    })
});

router.get('/:id', (req, res)=> {
    let id = req.params.id;
    itemModel.findOne({_id: id})
        .populate({path: 'Category'})
        .exec((err, result)=>{
            if (err)
                return res.status(500).json(err);
            return res.status(200).json(result);
        });
});

router.put('/:id', (req, res)=> {
    let id = req.params.id;
    let body = req.body;
    body.ModifiedAt = Date.now();
    itemModel.findOneAndUpdate({_id : id}, body, (err, result)=>{
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
    if (!helper.CheckProperties(body, ['ItemName'])) {
        return res.status(400).json({message: 'information_missed'});
    }
    let NewItem = new itemModel(body);
    NewItem.save(function (err) {
        if (err && err.code == 11000)
            return res.status(400).json({message: 'name_existed'});
        if (err)
            return res.status(500).json(err);
        return res.status(200).json({message: 'added_done'});
    })
});

router.delete('/:id', (req, res)=>{
    let id = req.params.id;
    itemModel.findOneAndRemove({_id: id}, (err, result)=> {
        if (err)
            return done(err);
        if (result == null)
            return res.status(404).json({message: 'not_found'});
        return res.status(200).json({message: 'deleted_done'});
    })
});

module.exports = router;