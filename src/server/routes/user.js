const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');

// router.get('/login', require('express').static(require('path').join(__dirname, '../../dist')));
router.post('/login', catchErrors(userController.login));
router.post('/register', catchErrors(userController.register));

module.exports = router;
