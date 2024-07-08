const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                commentId: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                userId: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                comment: {
                    type: Sequelize.STRING(500),
                    allowNull: false
                },
                depth: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                likes: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                dislikes: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                parentCommentId: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                }
            },
            {
                sequelize,
                timestamps: true,
                paranoid: true,
                modelName: 'Comment',
                tableName: 'comment',
            }
        );
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
        db.Comment.belongsTo(db.Comment, { foreignKey: 'userId', targetKey: 'userId' });
    }
}

module.exports = Comment;