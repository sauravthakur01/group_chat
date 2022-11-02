const User = require('../models/user');
const Chat = require('../models/chats');

exports.postMessage = async(req,res,next)=>{
    const {message} = req.body;
    try {
        if(!message){
            return res.status(400).json({message:'nothing entered'})
        }
        const data = await req.user.createChat({message})
        res.status(201).json({data ,  message:'sucessfully added chat message'})
    } catch (err) {
        res.status(500).json({message:'unable to add expwnse'})
    }
}

exports.getMessage = async(req,res,next)=>{
    let msgId = req.query.msg ; 

    // console.log(msgId)
    try {
        const data = await req.user.getChats();
        console.log(data.length)
        let index = data.findIndex(chat => chat.id == msgId)
        // console.log(index);
        let messagestosend = data.slice(index+1)
        console.log(messagestosend)
        let username =  req.user.name ;
        console.log(username.split(' ')[0])
        res.status(200).json({messagestosend, username})
    } catch (error) {
        res.status(500).json({message:'unable to get chats'})
    }
    
    
} 