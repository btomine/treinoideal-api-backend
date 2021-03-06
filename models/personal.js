'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Personal = sequelize.define('tb_personal', {
    cd_personal: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nm_personal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nome Não pode ser nulo"
          }
        }
    },
    nm_email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email Não pode ser nulo"
          },
          isEmail: {
            msg: 'Tem que ser um Email valido'
          }
        }
    },
    nm_senha : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Senha Não pode ser nul"
          },
        }
    },
    dt_nascimento : {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('dt_nascimento')).format("DD/MM/YYYY");
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Data Não pode ser nula"
          }
        }
    },
    cd_cref : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Senha Não pode ser nul"
          }
        }
    }
  }, {});
  Personal.associate = function(models) {
    // associations can be defined here
    Personal.hasMany(models.tb_personal_aluno, {
      foreignKey: 'cd_personal',
      onDelete: 'CASCADE'
    });
  };
  return Personal;
};