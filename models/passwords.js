module.exports = (sequelize, DataTypes) => {
    const Passwords = sequelize.define(
      'passwords',
      {
        site: {
          type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
          },
        password: {
            type: DataTypes.STRING
          }
      },
      {
        underscored: true,
        freezeTableName: true
      }
    );
    Passwords.associate = (models) => {
        Passwords.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
      return Passwords;
};