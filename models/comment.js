const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                commentId: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                    unique: true
                },
                userId: {
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
                    type: Sequelize.STRING(100), 
                    allowNull: false,
                    defaultValue: Sequelize.NOW 
                },
                body: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                commentBody: {
                    type: Sequelize.TEXT,
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
                indexes: [
                    {
                        fields: ['commentId']
                    },
                    {
                        fields: ['parentCommentId']
                    },
                ]
            }
        );
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
        db.Comment.belongsTo(db.Comment, { as: 'ParentComment', foreignKey: 'parentCommentId', targetKey: 'commentId' });
        db.Comment.hasMany(db.Comment, { as: 'ChildComments', foreignKey: 'parentCommentId' }); // 부모-자식 관계 추가
    }
}

module.exports = Comment;