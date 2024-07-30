const express = require('express');
const { Comment, sequelize } = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.post('/create', async (req, res) => {    
    const {
        commentId,
        body, 
        userId,
        author,
        parentCommentId,
        commentBody,
        score,
        time,
        depth,
        stickied,
        directURL,
        isCollapsed,
        isRootCollapsed,
         } = req.body;

        console.log('Preparing to create comment with:', req.body);
         
        console.log('Received input:', { commentId, body, userId, author, parentCommentId, commentBody, score, time, depth, stickied, directURL, isCollapsed, isRootCollapsed });

        const transaction = await sequelize.transaction();
    try {
        const comment = await Comment.create({
            commentId,
            userId,
            author,
            parentCommentId,
            commentBody,
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

router.get('/read/*', async (req, res) => {
    try {
        const directURL = req.params[0];

        const comments = await Comment.findAll({
            where: {
                directURL: directURL
            }
        });

        if (comments.length === 0) {
            return res.status(404).json({
                success: false,
                message: '댓글이 없습니다. 첫 댓글을 작성해보세요.'
            });
        }

        res.json(comments);
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
}
);

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('userId:', userId);

        const comments = await Comment.findAll({
            where: {
                userId: userId,
                depth: 0,
            }
        });

        if (comments.length === 0) {
            return res.status(404).json({
                success: false,
                message: '댓글이 없습니다. 첫 댓글을 작성해보세요.'
            });
        }

        res.json(comments);
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

router.get('/comment/:commentBody(*)', async (req, res) => {
    try {
        const commentBody = req.params.commentBody;
        console.log('commentBody:', commentBody);

        const comments = await Comment.findAll({
            where: {
                commentBody: commentBody
            }
        });

        if (comments.length === 0) {
            return res.status(404).json({
                success: false,
                message: '댓글이 없습니다. 첫 댓글을 작성해보세요.'
            });
        }

        res.json(comments);
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

module.exports = router;