const productos = document.getElementById('tbproducts');
const formProduct = document.getElementById('formproduct');
const socket = io();


formProduct.addEventListener('submit',e=>{
    e.preventDefault();
    const product = {
       title : formProduct[0].value,
       price : formProduct[1].value,
       image : formProduct[2].value,
       description : formProduct[3].value,
       stock : formProduct[4].value
    }
    console.log(product);
    socket.emit('product',product);
    e.target.reset();
})


socket.on('products',data =>{
   productos.innerHTML = "";
   data.forEach(product  => {
      productos.innerHTML += `

        <tr class="text-center">
            <td class="align-middle">${product.title}</td>
            <td class="align-middle">${product.price}</td>
            <td class="align-middle">
                <img src="${product.image}" alt="${product.name}" width="100px">
            </td>
            <td>${product.description}</td>
            <td>${product.stock}</td>
        </tr>
      `
   }); 
})

const formChat = document.getElementById('form-chating');
const user = document.getElementById('user');
const showMessage = document.getElementById('messages');
const msg = document.getElementById('message');


formChat.addEventListener('submit',e=>{
   e.preventDefault();
   if(user.value == '') return alert('ingrese un email')
   const chat ={
      email :user.value,
      mensaje : msg.value,
      date : new Date().toLocaleString()
   }
   socket.emit('message',chat);
   e.target.reset(); 
});

socket.on('messages', data =>{
  showMessage.innerHTML = '';
  data.forEach(msg=>{
    showMessage.innerHTML += `
      <div>
          <p>${msg.Date}</p> 
          <p>${msg.email}</p> 
          <p>${msg.mensaje}</p> 
      </div>
    
    `
  })
})
