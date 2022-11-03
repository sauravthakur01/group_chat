const token = localStorage.getItem('userToken');
const chatContainer = document.querySelector('.chat-container-div'); 
const userParent = document.getElementById('group');

const User = localStorage.getItem('name')
const groupId = localStorage.getItem('groupId');
const groupName = localStorage.getItem('groupName');

let lastId;
let chatArray = []

window.addEventListener('DOMContentLoaded', loadScreen)


async function loadScreen(e){
    e.preventDefault();

    document.getElementById('username').innerHTML = groupName
    // console.log(groupId)
    getMessage(groupId)
    getUsers(groupId);
        
}

async function getMessage(groupId){
    const messages = JSON.parse(localStorage.getItem(`msg${groupId}`));
        // console.log(messages[messages.length-1].id);
        
        if(messages == undefined || messages.length == 0) {
            lastId = 0;
        }
        else {
            lastId = messages[messages.length-1].id;
        }

    console.log(lastId)
    // setInterval(async () => {
        try {
            console.log(groupId)
            const response =  await axios.get(`http://localhost:3000/message/getMessage/${groupId}?msg=${lastId}`  , {headers:{"Authorization" : token}})
            // console.log(response.data.arr)
            var newArr = response.data.arr
            saveToLocal(newArr);
            
        } catch (err) {
            console.log(err);
        }
    // },1000)
}

function saveToLocal(arr){

    let oldMessages = JSON.parse(localStorage.getItem(`msg${groupId}`));
    
    if(oldMessages == undefined || oldMessages.length == 0){
        chatArray = chatArray.concat(arr)
    }else{
        chatArray =[]
        chatArray = chatArray.concat(oldMessages,arr);
    }
    localStorage.setItem(`msg${groupId}` , JSON.stringify(chatArray))

    // console.log((JSON.parse(localStorage.getItem(`msg${groupId}`))).length)

    showChatsOnScreen()
}

function showChatsOnScreen(){
    
    chatContainer.innerHTML = ""
    
    chatArray.forEach(chat =>{

        if(User == chat.name){
            let child = `<div class="msg-div">
            <div class="resize-sent">
              <div class="sent" id=${chat.id}>
                <p class="sent-name">${chat.name}</p>
                <p class="sent-msg">${chat.message}</p>
                <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
              </div>
            </div>
          </div>`
        
          chatContainer.innerHTML += child
        }
        else{
            let child = `<div class="msg-div">
            <div class="resize-received">
              <div class="received" id=${chat.id}>
                <p class="received-name">${chat.name}</p>
                <p class="received-msg">${chat.message}</p>
               
              </div>
            </div>
          </div>`
        
          chatContainer.innerHTML += child

            
        }
    })

    document.getElementById(`${lastId}`).scrollIntoView()
    console.log(lastId)
}

document.getElementById('chat-form').onsubmit = async function(e){
    e.preventDefault();
    
    const message = {
        message : e.target.message.value
    }
    try {
        const response =  await axios.post(`http://localhost:3000/message/postMessage/${groupId}` , message  , {headers:{"Authorization" : token}})
        // console.log(response.data.arr);

        e.target.message.value = ""
        saveToLocal(response.data.arr);
        
    } catch (err) {
        console.log(err);
    }
}

async function getUsers(groupId){
    try {
        console.log('sdfsdfsdfsdfsdfsdf')
        let response = await await axios.get(`http://localhost:3000/group/fetch-users/${groupId}`  , {headers:{"Authorization" : token}})
        console.log(response.data);

        response.data.forEach( data => addGroupUsersToScreen(data))
    } catch (err) {
        
    }
}

function addGroupUsersToScreen(data){
    let child = `<div style="width:100%;color:white" class="group-style">
    <button class="user-btn">${data.name}</button>
    <button class="add-user" >+</button>
    <button class="remove-user">-</button>
    <button class="delete-group">r</button>
  </div>`

  userParent.innerHTML += child
}

document.getElementById('logout').onclick = function(e){
    localStorage.removeItem('userToken')
    localStorage.removeItem(`msg${groupId}`)
    localStorage.removeItem('username')
    window.location.href = '../login/login.html'
}

