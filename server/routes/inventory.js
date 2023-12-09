const router = require('express').Router();
const { getItems, addItem } = require('../controllers/inventory');

router.get('/', getItems);
router.post('/', addItem);

module.exports = router;