const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.index); 

router.get('/create/', productsController.create); 
router.post('/', productsController.store); 

router.get('/detail/:id/', productsController.detail); 

module.exports = router;