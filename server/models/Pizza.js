const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["М'ясні", "Вегетаріанські", "Гриль", "Гострі"],
        required: true,
    },
    dough: {
        type: String,
        enum: ["Тонке", "Традиційне"],
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    acceptedByAdmin: {
        type: Boolean,
        default: false,
    },
    deliveredByCourier: {
        type: Boolean,
        default: false,
    },
    isForMainPage: {
        type: Boolean,
        default: false,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

const Pizza = mongoose.model("pizza", pizzaSchema);

module.exports = { Pizza };