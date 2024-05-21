const { Router } = require("express");
const router = Router();
const { isAuthorized } = require('./middleware');

router.use('/auth', require('./auth'));

module.exports = router;