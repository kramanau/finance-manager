const { Router } = require("express");
const router = Router();
const { isAuthorized } = require('./middleware');

router.get('/', (req, res, next) => {
    res.render("hello");
})
router.use('/auth', require('./auth'));
router.use('/category', isAuthorized, require('./categories'));
router.use('/transaction', isAuthorized, require('./transactions'));

module.exports = router;