const { Router } = require("express");
const router = Router();
const transactionsDAO = require('../daos/transaction');
// const transaction = require("../models/transaction");

router.post("/", async (req, res, next) => {
    if (!req.body.amount){
        return res.sendStatus(400);
    } else {
        const newTransaction = {
            date: new Date(),
            amount: req.body.amount,
            // type: req.body.type,
            userId: req._id,
            ...(req.body.category && { categoryId: req.body.category })
        }
        try {
            const transaction = await transactionsDAO.createTransaction(newTransaction);
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

router.get("/", async (req, res, next) => {
    const userId = req._id;
    try {
        const transactions = await transactionsDAO.getAllTransactions(userId);
        return res.json(transactions);
    } catch (e) {
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res, next) => {
    const _id = req.params.id;
    try {
        const transaction = await transactionsDAO.getTransactionById(_id);
        return res.json(transaction);
    } catch (e){
        return res.sendStatus(500);
    }
});

router.put("/:id", async (req, res, next) => {
    const _id = req.params.id;
    if(!req.body.amount && !req.body.categoryId){
        return res.sendStatus(400);
    }else {
        const updatedTransaction = {
            ...(req.body.amount && { amount: req.body.amount }),
            ...(req.body.type && { type: req.body.type}),
            ...(req.body.categoryId && { categoryId: req.body.categoryId})
        }
        try {
            await transactionsDAO.updateTransactionById(_id, updatedTransaction);
            return res.sendStatus(200);
        } catch (e){
            return res.sendStatus(500);
        }
    }
});

router.delete("/:id", async (req, res, next) => {
    const _id = req.params.id;
    try {
        await transactionsDAO.deleteTransactionById(_id);
        return res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(500);
    }
});

module.exports = router;