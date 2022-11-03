const Sequelize = require('sequelize');

const sequelize = require('../utils/database')

const Usergroup = sequelize.define('usergroup' , {
    id:{
        type:Sequelize.INTEGER,
        unique:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    }
})

module.exports = Usergroup;

// ,
//     isAdmin : {
//         type : Sequelize.BOOLEAN,
//         allowNull : false, 
//         default : false
//     }