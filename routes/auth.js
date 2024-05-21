const { Router } = require("express");
const router = Router();
const userDAO = require('../daos/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isAuthorized } = require('./middleware');

const JWTSECRET = 'supa secret';

router.post('/signup', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!password || (password && password == "")){
        res.sendStatus(400);
    }else {
        try {
            await userDAO.createUser(email, await bcrypt.hash(password, 5));
            res.sendStatus(200);
        } catch (e){
            next(e);
        }
    }
});

router.post('/login', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!password || (password && password == "")){
        res.sendStatus(400);
    } else {
        const user = await userDAO.getUser(email);
        if (user && await bcrypt.compare(password, user.password)){
            res.json({ token : jwt.sign({ _id : user._id , email, roles : user.roles }, JWTSECRET) });
        }else{
            res.sendStatus(401);
        }
    }
});

router.put('/password',isAuthorized, async (req, res, next) => {
    const newPassword = req.body.password;
    if (!newPassword || (newPassword && newPassword == '' )){
        res.sendStatus(400);
    } else {
        await userDAO.changePassword(req._id, await bcrypt.hash(newPassword, 1));
        res.sendStatus(200);
    }
});

router.use((err, req, res, next) => {
    res.sendStatus(409);
});

module.exports = router;
