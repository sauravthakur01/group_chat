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
    try {
        const data = await req.user.getChats();
        let username =  req.user.name ;
        console.log(username.split(' ')[0])
        res.status(200).json({data, username})
    } catch (error) {
        res.status(500).json({message:'unable to get chats'})
    }
    
    
} 