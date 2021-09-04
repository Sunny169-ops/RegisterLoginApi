const {Sequelize,DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Users = sequelize.define('register',{
    username:{
        type:DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique: true,
        allowNull:false,
        validate:{
            isEmail:true
        }

    },
    password:{
        type:DataTypes.STRING,
        unique: true,
        allowNull:false,

    }
},
    {
        timestamps:false,
        freezeTableName:true
    }
    );

module.exports= Users;