var express = require('express');
var router = express.Router();

const doc_controller = require('../controllers/docController');

router.get('/', doc_controller.doc_list);
router.post('/', doc_controller.doc_create);
router.get('/:id/', doc_controller.doc_detail);
router.put('/:id/', doc_controller.doc_update);
router.delete('/:id/', doc_controller.doc_delete);

module.exports = router;
