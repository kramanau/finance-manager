const request = require("supertest");
const testUtils = require("../test-utils");
const server = require("../server");

const Category = require("../models/category");
const User = require("../models/user");
const Transaction = require("../models/transaction");

describe("/category", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    const category1 = {
        name: "test"
    }

    const category2 = {
        name: "test2",
        description: "hello test2"
    }

    describe("after login", () => {
        const user0 = {
            email: "user0@mail.com",
            password: "123password",
        };
        const user1 = {
            email: "user1@mail.com",
            password: "456password",
        };
        let token0;
        let adminToken;
        beforeEach(async () => {
            await request(server).post("/auth/signup").send(user0);
            const res0 = await request(server).post("/auth/login").send(user0);
            token0 = res0.body.token;
            await request(server).post("/auth/signup").send(user1);
            await User.updateOne(
                { email: user1.email },
                { $push: { roles: "admin" } }
            );
            const res1 = await request(server).post("/auth/login").send(user1);
            adminToken = res1.body.token;
        });
        describe.each([category1])("POST / category %#", (category) => {
            it("should send 200 to normal user and not store category", async () => {
                const res = await request(server)
                .post("/category")
                .set("Authorization", "Bearer " + token0)
                .send(category);
                expect(res.statusCode).toEqual(200);
                const savedItem = await Category.findOne({ _id: res.body._id }).lean();
                expect(await Category.countDocuments()).toEqual(1)
                expect(savedItem).toMatchObject(category1);
            });
        });
        describe.each([category1])("PUT / transaction %#", (category) => {
            let originalItem;
            beforeEach(async () => {
                const res = await request(server)
                .post("/category")
                .set("Authorization", "Bearer " + adminToken)
                .send(category);
                originalItem = res.body;
            });
            it("should send 200 to admin user and update category", async () => {
                const res = await request(server)
                .put("/category/" + originalItem._id)
                .set("Authorization", "Bearer " + adminToken)
                .send({ name: "hello world" });
                expect(res.statusCode).toEqual(200);
                const newItem = await Category.findById(originalItem._id).lean();
                newItem._id = newItem._id.toString();
                expect(newItem).toMatchObject({
                name: "hello world",
                });
            });
        });
        describe.each([category1])("GET /:id transaction %#", (category) => {
            let originalItem;
            beforeEach(async () => {
                const res = await request(server)
                .post("/category")
                .set("Authorization", "Bearer " + adminToken)
                .send(category);
                originalItem = res.body;
            });
            it("should send 200 to admin user and return transaction", async () => {
                const res = await request(server)
                .get("/category/" + originalItem._id)
                .set("Authorization", "Bearer " + adminToken)
                .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(originalItem);
            });
        });
        describe("GET /", () => {
            let items;
            beforeEach(async () => {
                const res1 = await request(server)
                .post("/category")
                .set("Authorization", "Bearer " + token0)
                .send(category1);
                const res2 = await request(server)
                .post("/category")
                .set("Authorization", "Bearer " + token0)
                .send(category2);
                items = [JSON.parse(res1.text), JSON.parse(res2.text)];
            });
            it("should send 200 to normal user and return all category items", async () => {
                const res = await request(server)
                .get("/category/")
                .set("Authorization", "Bearer " + token0)
                .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(items);
            });
        });

        describe("GET /total", () => {
            let category;
            beforeEach(async () => {
                const res = await request(server)
                .post("/category")
                .set("Authorization", "Bearer " + token0)
                .send(category1)
                category = JSON.parse(res.text);
            });
            it("should return correct total", async () => {
                const res1 = await request(server)
                .post("/transaction")
                .set("Authorization", "Bearer " + token0)
                .send({
                    amount: 100,
                    "category": category._id
                })
                const res2 = await request(server)
                .post("/transaction")
                .set("Authorization", "Bearer " + token0)
                .send({
                    amount: -50,
                    category: category._id
                })
                const res3 = await request(server)
                .get("/category/" + category._id + "/total")
                .set("Authorization", "Bearer " + token0)
                expect(res3.body[0].total).toEqual(50);
            })
        })
    });
});