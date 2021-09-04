const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('test','sa','sunny',{
    'host':'localhost',
    'dialect':'mssql',
    'pool':{
        max:5,min:0,idle:10000
    }
});
sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch(err =>{
    console.log(`error ${err}`)
})

sequelize.sync({force:false}).then(result=>{
    console.log("sync done")
})

module.exports = sequelize;