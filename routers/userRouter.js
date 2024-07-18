const express = require('express');
const { User } = require('../models/index');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAuth = require('./authorization');
const secret = process.env.JWT_SECRET;


const createHash = async (password, saltRound) => {
    let hashed = await bcrypt.hash(password, saltRound);
    console.log(hashed);
    return hashed;
};

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // 중복 사용자 검사
        const existingUser = await User.findOne({ where: { userId: username } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Username already taken. Please choose another one.'
            });
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const user = await User.create({
            userId: username,
            password: hashedPassword,
        });

        res.json({
            success: true,
            message: 'User created successfully.',
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

router.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;
    const options = {
        attributes: ['userId', 'password'],
        where: { userId: username },
    };
    const result = await User.findOne(options);
    if (result) {
        const compared = await bcrypt.compare(password, result.password);
     if (compared) {
        const token = jwt.sign({ userId: result.userId, role: 'admin' }, secret);
        res.json({ 
            success: true,
            token: token, 
            message: 'Login success' 
        }
    );
    } else {
        res.status(400).json({ success: false, token: '', message: 'password is wrong' });
    }
}
    else res.status(400).json({ success: false, token: '', message: 'Login failed' }); 
});

module.exports = router;