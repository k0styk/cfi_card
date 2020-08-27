const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const summaryController = require('../controllers/summaryController');

const auth = require('../middlewares/auth');

router.get('/', auth, catchErrors(summaryController.getAllSummary));
router.post('/', auth, catchErrors(summaryController.createSummary));

module.exports = router;
