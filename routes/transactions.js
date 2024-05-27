const { Router } = require("express");
const router = Router();
const transactionsDAO = require('../daos/transaction');

router.post("/", async (req, res, next) => {
    if (!req.body.amount || !req.body.type){
        return res.sendStatus(400);
    } else {
        const date = new Date();
        const amount = req.body.amount;
        const type = req.body.type;
        const userId = req._id;
        const category = req.body.category ? req.body.category : null;
        try {
            const transaction = await transactionsDAO.createTransaction({date, amount, type, userId, category});
            return res.json(transaction);
        } catch (e){
            if (e.code === 11000){
                return res.sendStatus(409);
            } else {
                return res.sendStatus(500);
            }
        }
    }
});


module.exports = router;