const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { orderPizza, acceptPizzaByAdmin, deliverPizzaByCourier, getPizzas, getPizza, getPizzasByUser, getPizzasToAccept } = require("../controllers/pizzaControllers");

router.get("/", getPizzas); // для головної сторінки 
router.get("/user", getPizzasByUser); // особистий кабінет простого користувача
router.get("/admin", getPizzasToAccept); // особистий кабінет адміністратора
router.get("/:id", getPizza); // отримати інфу про піцу по id

router.post("/", orderPizza); // замовити піцу
router.patch("/accept/:id", acceptPizzaByAdmin); // прийняти піцу адміністратором
router.patch("/deliver/:id", deliverPizzaByCourier); // підтвердити доставку користувачем

module.exports = router;