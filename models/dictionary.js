const Sequelize = require('sequelize');

class Dictionary extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                Dictionaryid: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                userId: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                word: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                meaning: {
                    type: Sequelize.STRING(500),
                    allowNull: true
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: true,
                modelName: 'Dictionary',
                tableName: 'dictionary',
            }
        );
    }

    static associate(db) {
        db.Dictionary.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
    }
}

module.exports = Dictionary;