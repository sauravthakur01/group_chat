const token = localStorage.getItem('userToken');

document.getElementById('chat-form').onsubmit = async function(e){
    e.preventDefault();
    
    const message = {
        message : e.target.message.value
    }
    console.log(message , token);

    try {
        const response = await await axios.post(`http://localhost:3000/user/message` , message  , {headers:{"Authorization" : token}})
        console.log(response);
        e.target.message.value = ""
    } catch (err) {
        console.log(err);
    }

}