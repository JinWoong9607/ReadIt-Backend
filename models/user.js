const Sequelize = require('sequelize');
const { sequelize } = require('.');

class User extends Sequelize.Model {
    static init(sequelize) {
    return super.init(
        {
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            password: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'User',
            tableName: 'user',
        }
    );
    }

    static associate(db) {
        db.User.hasMany(db.Dictionary, { foreignKey: 'userId', sourceKey: 'userId' });
        db.User.hasMany(db.Comment, { foreignKey: 'userId', sourceKey: 'userId' });
    }
}

module.exports = User;