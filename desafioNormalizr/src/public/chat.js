const chat = document.getElementById('formChat');
const socket = io()
chat.addEventListener('submit', (e) => {
    e.preventDefault();
    let chatModelo = {
        author : {
            id : chat[0].value,
            nombre : chat[1].value,
            apellido : chat[2].value,
            edad : chat[3].value,
            alias : chat[4].value,
            avatar : chat[5].value
        },
        text : chat[6].value
    }
    socket.emit('message',chatModelo);
    chat.reset()
})