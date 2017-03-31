const router = require('express').Router();

router.use('/items', require('./item'));
router.use('/categories', require('./category'));

module.exports = router;