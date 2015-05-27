var express = require('express');
var router = express.Router();

var controller = require('./controllers/base_controller');

router.post('/my/quote/:id/recalculate', controller.recalculateQuote)

router.get('/my/quote/:id', controller.getQuote);
router.get('/', controller.index);


module.exports = router;