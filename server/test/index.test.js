const app = require("../index");
const request = require("supertest");

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU4YTVjNDIyMGE1NzczZThmNzFkNTgiLCJpYXQiOjE3MDAzMDk5MDEsImV4cCI6MTcwMDkxNDcwMX0.v8WSrDE88NUsOso207a32JAWgSistpGXUz8FE4yvF-Y";


describe("Auth Routes", () => {
    describe("POST /api/auth/register", () => {
        // it("should return 201 if user is registered successfully", async () => {
        //     const res = await request(app).post("/api/auth/register").send({
        //         first_name: "test",
        //         last_name: "test",
        //         email: "testing.email@expample.com",
        //         password: "dD123123."
        //     });
        //     expect(res.status).toBe(201);
        //     expect(res.body.message).toBe("User created successfully");
        // });

        it("should return 400 if user is registered with invalid data", async () => {
            const res = await request(app).post("/api/auth/register").send({
                first_name: "test",
                last_name: "test",
                email: "test",
                password: "dD123123."
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("\"Email\" must be a valid email");
        });

        it("should return 409 if user is already registered", async () => {
            const res = await request(app).post("/api/auth/register").send({
                first_name: "test",
                last_name: "test",
                email: "testing.email@expample.com",
                password: "dD123123."
            });
            expect(res.status).toBe(409);
            expect(res.body.message).toBe("User with given email already Exist!");
        });
    })

    describe("POST /api/auth/login", () => {
        it("should return 200 if user is logged in successfully", async () => {
            const res = await request(app).post("/api/auth/login").send({
                email: "testing.email@expample.com",
                password: "dD123123."
            });
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("logged in successfully");
        });
    })
});

describe("Pizza Routes", () => {
    describe("GET /api/pizza", () => {
        it("should return 200 if user is registered successfully", async () => {
            const res = await request(app).get("/api/pizza").set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(200);
        });
    })

    describe("POST /api/pizza", () => {
        it("should return 201 if pizza is ordered successfully", async () => {
            const res = await request(app).post("/api/pizza").set("Authorization", `Bearer ${token}`).send([
                {
                    name: "test",
                    price: 10,
                    size: "test",
                    type: "Гриль",
                    dough: "Тонке",
                    ingredients: ["test"],
                }
            ]);
            expect(res.status).toBe(201);
            expect(res.body.message).toBe("Pizza ordered successfully");
        });
    })

    describe("GET /api/pizza/user", () => {
        it("should return 200 if user is registered successfully", async () => {
            const res = await request(app).get("/api/pizza/user").set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(200);
        });

        it("should return 500 if user is not authenticated", async () => {
            const res = await request(app).get("/api/pizza/user");
            expect(res.status).toBe(500);
            expect(res.body.error).toBe("Access denied");
        });

        it("should return 500 if jwt is wrong", async () => {
            const res = await request(app).get("/api/pizza/user").set("Authorization", `Bearer 123`);
            expect(res.status).toBe(500);
            expect(res.body.error).toBe("jwt malformed");
        });
    })

    describe("GET /api/pizza/:id", () => {
        it("should return null because pizza doesn`t exist", async () => {
            const res = await request(app).get("/api/pizza/615c7b1f1e0c8c2d7c7d5a3b").set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(404);
            expect(res.body.pizza).toBe(null);
        });
        
        it("should return pizza info", async () => {
            const res = await request(app).get("/api/pizza/6559c136a0924607d26f3d0a").set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.pizza).not.toBe(null);
        });
    })

    describe("PATCH /api/pizza/accept/:id", () => {
        it("should return 200 if pizza is accepted successfully", async () => {
            const res = await request(app).patch("/api/pizza/accept/6559c136a0924607d26f3d0a").set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Pizza accepted successfully");
        })

        it("should return 400 if pizza doesn`t exist", async () => {
            const res = await request(app).patch("/api/pizza/accept/6559c136a0924607d26f3d0").set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Invalid Pizza Id");
        })
    })

    describe("PATCH /api/pizza/deliver/:id", () => {
        it("should return 200 if pizza is accepted successfully", async () => {
            const res = await request(app).patch("/api/pizza/deliver/6559c136a0924607d26f3d0a").set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Pizza delivered successfully");
        })

        it("should return 500 if pizza doesn`t exist", async () => {
            const res = await request(app).patch("/api/pizza/deliver/6559c136a0924607d26f3d0").set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(500);
            expect(res.body.message).toBe("Internal Server Error");
        })
    })
});