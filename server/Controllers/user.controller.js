const User = require('../Models/users.model')
const bcrypt = require('bcrypt');
const { generateToken } = require('../Utils/generateToken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: 'All Fields are Required' });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ success: false, message: 'User Already Exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res
            .status(201)
            .json({ success: true, message: 'Account Created Successfully' });
    } catch (error) {
        console.error('Errorr------', error);

        res
            .status(500)
            .json({ success: false, message: 'Failed to Register Account' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'User Does not Exist with this Email' });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect Password' });
        }

        generateToken(res, user, `Welcome Back ${user.name}`);
        console.log('User------------',user.name);
        
    } catch (error) {
        console.error('Errorr------', error);

        res
            .status(500)
            .json({ success: false, message: 'Login Failed' });
    }
};

module.exports = {
    register,
    login,
};

