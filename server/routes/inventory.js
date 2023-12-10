const router = require('express').Router();
const { getItems, addItem, editItem, deleteItem } = require('../controllers/inventory');

router.get('/', getItems);
router.post('/', addItem);
router.patch('/', editItem);
router.delete('/', deleteItem);

module.exports = router;