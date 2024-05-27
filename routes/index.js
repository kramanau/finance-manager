const { Router } = require("express");
const router = Router();
const { isAuthorized } = require('./middleware');

router.use('/auth', require('./auth'));
router.use('/category', require('./categories'));

module.exports = router;