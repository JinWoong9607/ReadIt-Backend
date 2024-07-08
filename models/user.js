const Sequelize = require('sequelize');
const { sequelize } = require('.');

class User extends Sequelize.Model {
    static init(sequelize) {
    return super.init(
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING(200),
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