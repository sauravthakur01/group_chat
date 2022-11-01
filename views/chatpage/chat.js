const token = localStorage.getItem('userToken');
const chatContainer = document.querySelector('.chat-container-div'); 
const name = localStorage.getItem('name')


window.addEventListener('DOMContentLoaded', loadScreen)

async function loadScreen(e){
    e.preventDefault();
    // console.log(`${new Date().getHours()}:${new Date().getMinutes()}`)

    setInterval(async () => {
        try {
            const response =  await axios.get(`http://localhost:3000/user/getMessage`  , {headers:{"Authorization" : token}})
            showChatsOnScreen(response.data , response.data.username);
    
        } catch (err) {
            console.log(err);
        }
    },1000)
         
}

function showChatsOnScreen(data , name){
    
    chatContainer.innerHTML =""

    localStorage.setItem('name' , name)
    // console.log(data.data[0].createdAt.split('T')[1].slice(0,5))
    data.data.forEach(chat =>{
        showChats(chat , name)
    } )
}

function showChats(chat , name){
    let child = `<div class="msg-div">
    <div class="resize-sent">
      <div class="sent">
        <p class="sent-name">${name.split(' ')[0]}</p>
        <p class="sent-msg">${chat.message}</p>
        <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
      </div>
    </div>
  </div>`

  chatContainer.innerHTML += child

}

document.getElementById('chat-form').onsubmit = async function(e){
    e.preventDefault();
    
    const message = {
        message : e.target.message.value
    }
    console.log(message , token);

    try {
        const response =  await axios.post(`http://localhost:3000/user/postMessage` , message  , {headers:{"Authorization" : token}})
        console.log(response);
        e.target.message.value = ""
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