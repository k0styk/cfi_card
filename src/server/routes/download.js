const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const fileSummariesController = require('../controllers/fileSummariesController');

router.get('/download/:document', catchErrors(fileSummariesController.download));

module.exports = router;
