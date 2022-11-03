const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const sequelize = require('./utils/database')

require('dotenv').config()

const User = require('./models/user');
const Chat = require('./models/chats');
const Group = require('./models/group');
const UserGroup = require('./models/usergroup');

const userRouter = require('./routes/user');
const groupRouter = require('./routes/group');
const messageRouter = require('./routes/message');

const app = express();

app.use(express.json())
app.use(cors());
app.use(bodyParser.json({extended:false}))

Chat.belongsTo(User);
User.hasMany(Chat);
Group.hasMany(Chat);
Chat.belongsTo(Group);
User.belongsToMany(Group , {through: UserGroup} )
Group.belongsToMany(User , {through: UserGroup} )


app.use('/user' , userRouter )
app.use('/group' , groupRouter)
app.use('/message' , messageRouter)

sequelize.sync()
.then(()=>{
    app.listen(3000 ,()=>{
        console.log('running dude')
    });
})
.catch(err=>{
    console.log(err)
})
