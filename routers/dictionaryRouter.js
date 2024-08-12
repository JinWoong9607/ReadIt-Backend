const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Dictionary, sequelize } = require('../models');
const secret = process.env.JWT_SECRET;

router.post('/log', async (req, res) => {
    const { userId, word, meaning } = req.body;
    console.log('Received input:', { userId, word, meaning });

    const transaction = await sequelize.transaction();

    try {
        const dictionary = await Dictionary.create({
            userId,
            word,
            meaning,
        }, { transaction });

        await transaction.commit();

        res.json({
            success: true,
            message: 'Log created successfully.',
            dictionary
        });
    } catch (error) {
        await transaction.rollback();
        console.error("An error occurred:", error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

module.exports = router;