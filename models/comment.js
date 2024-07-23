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
                id: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                parentCommentId: { 
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                author: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                score: {
                    type: Sequelize.INTEGER,  
                    allowNull: false,
                    defaultValue: 0 
                },
                time: {
                    type: Sequelize.DATE, 
                    allowNull: false,
                    defaultValue: Sequelize.NOW 
                },
                body: {
                    type: Sequelize.STRING(500),
                    allowNull: false
                },
                depth: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                stickied: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                directURL: {
                    type: Sequelize.STRING(500),
                    allowNull: false
                },
                isCollapsed: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                isRootCollapsed: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
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
        db.Comment.belongsTo(db.Comment, { as: 'ParentComment', foreignKey: 'parentCommentId', targetKey: 'commentId' });  // 관계 설정에 as 옵션 추가
    }
}

module.exports = Comment;