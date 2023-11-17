const { Pizza } = require('../models/Pizza');
const { sendEmail } = require('../utils/sendEmail');

const orderPizza = async (req, res) => {
    try {

        const pizzas = req.body;

        for(const pizza of pizzas) {
            const { name, price, size, type, dough, ingredients, isForMainPage, } = pizza;
            const newPizza = await Pizza.create({
                name,
                price,
                size,
                type,
                dough,
                ingredients,
                isForMainPage,
                user: req.user._id,
            });
        }
        res.status(201).json({ message: 'Pizza ordered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const acceptPizzaByAdmin = async (req, res) => {
    try {
        const pizza = await Pizza.findByIdAndUpdate(req.params.id, { acceptedByAdmin: true });
        res.status(200).json({ message: 'Pizza accepted successfully', pizza });

        await sendEmail({
            email: pizza.user?.email,
            subject: "Pizza Accepted",
            message: "Your pizza has been accepted by admin",
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deliverPizzaByCourier = async (req, res) => {
    try {
        const pizza = await Pizza.findByIdAndUpdate(req.params.id, { deliveredByCourier: true });
        res.status(200).json({ message: 'Pizza delivered successfully', pizza });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find({ isForMainPage: true });
        res.status(200).json({ pizzas });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getPizza = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        res.status(200).json({ pizza });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getPizzasByUser = async (req, res) => {
    try {
        const pizzas = await Pizza.find({ user: req.user._id });
        res.status(200).json({ pizzas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

const getPizzasByAdmin = async (req, res) => {
    try {
        const pizzas = await Pizza.find({ acceptedByAdmin: false });
        res.status(200).json({ pizzas });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { orderPizza, acceptPizzaByAdmin, deliverPizzaByCourier, getPizzas, getPizza, getPizzasByUser, getPizzasByAdmin };

