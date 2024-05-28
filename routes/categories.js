const { Router } = require("express");
const router = Router();
const categoriesDAO = require('../daos/category');
const transactionDAO = require('../daos/transaction');

router.post("/", async (req, res, next) => {
    if (!req.body.name){
        return res.sendStatus(400);
    } else {
        const name = req.body.name;
        const userId = req._id;
        const description = req.body.description ? req.body.description : null;
        try {
            const category = await categoriesDAO.createCategory({name, description, userId});
            return res.json(category);
        } catch (e){
            if (e.code === 11000){
                return res.sendStatus(409);
            } else {
                return res.sendStatus(500);
            }
        }
    }
});

router.get("/:id", async (req, res, next) => {
    const _id = req.params.id;
    try {
        const category = await categoriesDAO.getCategoryById(_id);
        return res.json(category);
    } catch (e){
        return res.sendStatus(500);
    }
})

router.get("/:id/total", async (req, res, next) => {
    const _id = req.params.id;
    try {
        const total = await transactionDAO.getTotalsByCategoryId(_id);
        return res.json(total);
    } catch (e){
        return res.sendStatus(500);
    }
})

router.get("/:id/transactions", async (req, res, next) => {
    const _id = req.params.id;
    console.log(req._id); // <---
    try {
        const transactions = await transactionDAO.getTransactionsByCategoryId(_id);
        return res.json(transactions);
    } catch (e){
        return res.sendStatus(500);
    }
})

router.put("/:id", async (req, res, next) => {
    const _id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const categoryItem = {};
    if (name){
        categoryItem.name = name;
    }
    if (description){
        categoryItem.description = description;
    }
    try {
        const category = await categoriesDAO.updateCategory(_id, categoryItem);
        return res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(500);
    }
})


module.exports = router;