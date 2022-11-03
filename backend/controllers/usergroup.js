const User = require('../models/user');
const Chat = require('../models/chats');
const Group = require('../models/group');
const { response } = require('express');

exports.fetchUsers = async(req,res,next)=>{
    try {
        let groupId = req.params.groupId ;
        console.log('...........................' , groupId)
        const group = await  Group.findByPk(groupId)
        if(!group){
            return res.status(404).json({message:"no group found"})
        }
        let users = await group.getUsers()
        let data = users.filter(user => user.id != req.user.id)
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}