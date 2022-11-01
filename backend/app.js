const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const sequelize = require('./utils/database')

require('dotenv').config()

const User = require('./models/user');
const Chat = require('./models/chats')

const userRouter = require('./routes/user');

const app = express();

app.use(express.json())
app.use(cors());
app.use(bodyParser.json({extended:false}))

Chat.belongsTo(User);
User.hasMany(Chat);

app.use('/user' , userRouter )

sequelize.sync()
.then(()=>{
    app.listen(3000 ,()=>{
        console.log('running dude')
    });
})
.catch(err=>{
    console.log(err)
})
