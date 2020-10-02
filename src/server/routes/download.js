const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const downloadController = require('../controllers/downloadFileController');

router.get('/download/:document', catchErrors(downloadController.download));

module.exports = router;
