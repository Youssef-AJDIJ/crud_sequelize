'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre es obligatorio"
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Este email ya está registrado"
      },
      validate: {
        isEmail: {
          msg: "Formato de email inválido"
        },
        notEmpty: {
          msg: "El email es obligatorio"
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La contraseña es obligatoria"
        },
        isStrongPassword(value) {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

          if (!regex.test(value)) {
            throw new Error(
              "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo"
            );
          }
        }
      }
    }

  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};