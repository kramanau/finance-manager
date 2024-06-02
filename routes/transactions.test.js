const request = require("supertest");
const testUtils = require("../test-utils");
const server = require("../server");

const User = require("../models/user");
const Transaction = require("../models/transaction");

describe("/transaction", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);
    const transaction1 = {
        "amount": 600,
    }
    const transaction2 = {
        "amount": -100,
    }

    describe("before signup", () => {
        describe("POST /", () => {
            it("should send 401 without a token", async () => {
              const res = await request(server).post("/transaction").send(transaction1);
              expect(res.statusCode).toEqual(401);
            });
            it("should send 401 with a bad token", async () => {
              const res = await request(server)
                .post("/transaction")
                .set("Authorization", "Bearer BAD")
                .send(transaction1);
              expect(res.statusCode).toEqual(401);
            });
          });
          describe("GET /", () => {
            it("should send 401 without a token", async () => {
              const res = await request(server).get("/transaction").send(transaction1);
              expect(res.statusCode).toEqual(401);
            });
            it("should send 401 with a bad token", async () => {
              const res = await request(server)
                .get("/transaction")
                .set("Authorization", "Bearer BAD")
                .send();
              expect(res.statusCode).toEqual(401);
            });
          });
          describe("GET /:id", () => {
            it("should send 401 without a token", async () => {
              const res = await request(server).get("/transaction/123");
              expect(res.statusCode).toEqual(401);
            });
            it("should send 401 with a bad token", async () => {
              const res = await request(server)
                .get("/transaction/456")
                .set("Authorization", "Bearer BAD")
                .send();
              expect(res.statusCode).toEqual(401);
            });
          });
    });

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
        describe.each([transaction1, transaction2])("POST / transaction %#", (transaction) => {
            it("should send 200 to normal user", async () => {
                const res = await request(server)
                .post("/transaction")
                .set("Authorization", "Bearer " + token0)
                .send(transaction);
                expect(res.statusCode).toEqual(200);
                expect(await Transaction.countDocuments()).toEqual(1);
            });
            it("should send 200 to admin user and store transaction", async () => {
                const res = await request(server)
                .post("/transaction")
                .set("Authorization", "Bearer " + adminToken)
                .send(transaction);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(transaction);
                const savedItem = await Transaction.findOne({ _id: res.body._id }).lean();
                expect(savedItem).toMatchObject(transaction);
            });
        });
        describe.each([transaction1, transaction2])("PUT / transaction %#", (transaction) => {
            let originalItem;
            beforeEach(async () => {
                const res = await request(server)
                .post("/transaction")
                .set("Authorization", "Bearer " + adminToken)
                .send(transaction);
                originalItem = res.body;
            });
            it("should send 200 to normal user and update transaction", async () => {
                const res = await request(server)
                .put("/transaction/" + originalItem._id)
                .set("Authorization", "Bearer " + adminToken)
                .send({ ...transaction, amount: transaction.amount + 1 });
                expect(res.statusCode).toEqual(200);
                const newItem = await Transaction.findById(originalItem._id).lean();
                newItem._id = newItem._id.toString();
                expect(newItem).toMatchObject({
                ...originalItem,
                date: new Date(originalItem.date),
                amount: originalItem.amount + 1,
                });
            });
        });
        describe.each([transaction1, transaction2])("GET /:id transaction %#", (transaction) => {
            let originalItem;
            beforeEach(async () => {
                const res = await request(server)
                .post("/transaction")
                .set("Authorization", "Bearer " + adminToken)
                .send(transaction);
                originalItem = res.body;
            });
            it("should send 200 to normal user and return transaction", async () => {
                const res = await request(server)
                .get("/transaction/" + originalItem._id)
                .set("Authorization", "Bearer " + token0)
                .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(originalItem);
            });
        });
        describe("GET /", () => {
            let items;
            beforeEach(async () => {
                const res = await request(server)
                .post("/transaction")
                .set("Authorization", "Bearer " + token0)
                .send(transaction1);
                items = [JSON.parse(res.text)];
            });
            it("should send 200 to normal user and return all items", async () => {
                const res = await request(server)
                .get("/transaction/")
                .set("Authorization", "Bearer " + token0)
                .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(items);
            });
        });
        describe("DELETE /", () => {
            let item;
            beforeEach(async () => {
                const res = await request(server)
                .post("/transaction")
                .set("Authorization", "Bearer " + token0)
                .send(transaction1);
                item = JSON.parse(res.text);
            });
            it("should send 200 to normal user and delete the item", async () => {
                const res = await request(server)
                .delete("/transaction/" + item._id)
                .set("Authorization", "Bearer " + token0);
                expect(res.statusCode).toEqual(200);
                expect(await Transaction.countDocuments()).toBe(0);
            })
        })
    });
});