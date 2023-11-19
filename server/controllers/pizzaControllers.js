const mongoose = require('mongoose');

const { Pizza } = require('../models/Pizza');
const { User } = require('../models/User');
const { sendEmail } = require('../utils/sendEmail');

const orderPizza = async (req, res) => {
    try {
        const pizzas = req.body;
        const pizzaPromises = pizzas.map(pizza => {
            const { name, price, size, type, dough, ingredients, isForMainPage, } = pizza;
            return Pizza.create({
                name,
                price,
                size,
                type,
                dough,
                ingredients,
                isForMainPage,
                user: req.user._id,
            });
        });
        await Promise.all(pizzaPromises);
        res.status(201).json({ message: 'Pizza ordered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const acceptPizzaByAdmin = async (req, res) => {
    try {
        const isValidPizzaId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidPizzaId) {
            return res.status(400).json({ message: 'Invalid Pizza Id' });
        }
    
        const updatedPizza = await Pizza.findOneAndUpdate(
            { _id: req.params.id },
            { acceptedByAdmin: true },
            { new: true, populate: 'user' }
        );
        
        if (!updatedPizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
    
        if (updatedPizza.user) {
            await sendEmail({
                email: updatedPizza.user.email,
                subject: "Pizza Accepted",
                message: "Your pizza has been accepted by admin",
            });
        }

        res.status(200).json({ message: 'Pizza accepted successfully', updatedPizza });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deliverPizzaByCourier = async (req, res) => {
    try {
        const isValidPizzaId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidPizzaId) {
            return res.status(400).json({ message: 'Invalid Pizza Id' });
        }
     
        const updatedPizza = await Pizza.findOneAndUpdate(
            { _id: req.params.id },
            { deliveredByCourier: true },
            { new: true }
        );

        if (!updatedPizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }

        res.status(200).json({ message: 'Pizza delivered successfully', updatedPizza });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find({ isForMainPage: true });

        if (!pizzas.length) {
            return res.status(404).json({ message: 'No pizzas found' });
        }

        res.status(200).json({ pizzas });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getPizza = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        if (!pizza) return res.status(404).json({ pizza: null });
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

const getPizzasToAccept = async (req, res) => {
    try {
        const pizzas = await Pizza.find({ acceptedByAdmin: false });
        res.status(200).json({ pizzas });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { orderPizza, acceptPizzaByAdmin, deliverPizzaByCourier, getPizzas, getPizza, getPizzasByUser, getPizzasToAccept };

