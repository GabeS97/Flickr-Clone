'use strict';
const {
  Model,
  Validator
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() {
      const { id, username, email } = this;
      return { id, username, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassowrd.toString());
    }
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }
    static async clogin(credentials, password) {
      const { Op } = require('sequelize');
      const user = await User.findOne({
        where: {
          [Op.or]: {
            email: credentials,
            username: credentials
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };
    static async signup(username, email, password) {
      const hashedPaasword = bcrypt.hashSync(password);
      const user = await User.create({ username, email, hashedPaasword })

      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [5, 60],
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
