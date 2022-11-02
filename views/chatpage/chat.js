const token = localStorage.getItem('userToken');
const chatContainer = document.querySelector('.chat-container-div'); 
const User = localStorage.getItem('name')

let lastId;
let chatArray = []

window.addEventListener('DOMContentLoaded', loadScreen)

async function loadScreen(e){
    e.preventDefault();

    document.getElementById('username').innerHTML = User

    const messages = JSON.parse(localStorage.getItem('msg'));
        // console.log(messages[messages.length-1].id);
        if(messages == undefined || messages.length == 0) {
            lastId = 0;
        }
        else {
            lastId = messages[messages.length-1].id;
        }
    // console.log(lastId)
    // setInterval(async () => {
        try {
            const response =  await axios.get(`http://localhost:3000/user/getMessage?msg=${lastId}`  , {headers:{"Authorization" : token}})
        
            var newArr = response.data.messagestosend
            
            saveToLocal(newArr , response.data.username);
            
        } catch (err) {
            console.log(err);
        }
    // },1000)
        
}

function saveToLocal(arr,name){

    let oldMessages = JSON.parse(localStorage.getItem('msg'));
    
    if(oldMessages == undefined || oldMessages.length == 0){
        chatArray = chatArray.concat(arr)
    }else{
        chatArray =[]
        chatArray = chatArray.concat(oldMessages,arr);
    }
    localStorage.setItem('msg' , JSON.stringify(chatArray))
    console.log((JSON.parse(localStorage.getItem('msg'))).length)
    showChatsOnScreen(name)
}

function showChatsOnScreen( name){
    
    chatContainer.innerHTML = ""

    localStorage.setItem('name' , name)

    chatArray.forEach(chat =>{

        let child = `<div class="msg-div">
    <div class="resize-sent">
      <div class="sent" id=${chat.id}>
        <p class="sent-name">${name.split(' ')[0]}</p>
        <p class="sent-msg">${chat.message}</p>
        <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
      </div>
    </div>
  </div>`

  chatContainer.innerHTML += child

    })
    document.getElementById(`${lastId}`).scrollIntoView()
}

// function showChats(chat , name){
//     let child = `<div class="msg-div">
//     <div class="resize-sent">
//       <div class="sent">
//         <p class="sent-name">${name.split(' ')[0]}</p>
//         <p class="sent-msg">${chat.message}</p>
//         <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
//       </div>
//     </div>
//   </div>`

//   chatContainer.innerHTML += child

// }

document.getElementById('chat-form').onsubmit = async function(e){
    e.preventDefault();
    
    const message = {
        message : e.target.message.value
    }
    // console.log(message , token);

    try {
        const response =  await axios.post(`http://localhost:3000/user/postMessage` , message  , {headers:{"Authorization" : token}})
        console.log(response.data.data);

        e.target.message.value = ""
        let name = localStorage.getItem('name')
        saveToLocal(response.data.data , name);
        // showOnScreen( message )
    } catch (err) {
        console.log(err);
    }

}

// function showOnScreen(chat){

//     const name = localStorage.getItem('name')
    
//     let child = `<div class="msg-div">
//     <div class="resize-sent">
//       <div class="sent">
//       <p class="sent-name">${name.split(' ')[0]}</p>
//         <p class="sent-msg">${chat.message}</p>
//         <p class="sent-time">${new Date().getHours()}:${new Date().getMinutes()}</p>
//       </div>
//     </div>
//   </div>`

//   chatContainer.innerHTML += child
// }

document.getElementById('logout').onclick = function(e){
    localStorage.removeItem('userToken')
    localStorage.removeItem('msg')
    localStorage.removeItem('username')
    window.location.href = '../login/login.html'
}