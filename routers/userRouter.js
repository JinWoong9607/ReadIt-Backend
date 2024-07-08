const express = require('express');
const { User } = require('../models/index');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const createHash = async (password, saltRound) => {
    let hashed = await bcrypt.hash(password, saltRound);
    console.log(hashed);
    return hashed;
};

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const saltRound = 10;
    const hashed = await createHash(password, saltRound);
    const user = await User.create({
        username,
        password: hashed,
    });
    try {
        const result = await User.create(user);
        res.json({ success: true, member: result , message: 'User created' });
    } catch (err) {
        res.status(400).json({ success: false, member: [], message: 'User creation failed' });
    }
});

router.post('/sign-in', async (req, res) => {
    const { userId, password } = req.body;
    const options = {
        attributes: ['userId', 'password'],
        where: { userId: userId },
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