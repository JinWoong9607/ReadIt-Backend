const express = require('express');
const { Comment, sequelize } = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.post('/comment', async (req, res) => {    
    const { 
        body, 
        userId,
        author,
        parentCommentId,
        score,
        time,
        depth,
        stickied,
        directURL,
        isCollapsed,
        isRootCollapsed,
         } = req.body;

        const transaction = await sequelize.transaction();
    try {
        const comment = await Comment.create({
            userId,
            author,
            parentCommentId,
            score,
            time,
            body,
            depth,
            stickied,
            directURL,
            isCollapsed,
            isRootCollapsed,
        }, { transaction });

        await transaction.commit();

        res.json({
            success: true,
            message: 'Comment created successfully.',
            comment
        });
    } catch (err) {
        await transaction.rollback();
        console.error("An error occurred:", err.message);
        console.error(err.stack);  
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
}); 

module.exports = router;