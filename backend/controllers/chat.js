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