const bcrypt = require("bcryptjs");

const { User } = require("../models/User");
const { registerSchema, loginSchema } = require("../utils/schemeValidators");
const { sendEmail } = require("../utils/sendEmail");


const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).json({ message: "User with given email already Exist!" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();

        await sendEmail({
            email: req.body.email,
            subject: "Registration Successful",
            message: "You have successfully registered to our website",
        });
        
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).json({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).json({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();
        res.status(200).json({ token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { register, login };