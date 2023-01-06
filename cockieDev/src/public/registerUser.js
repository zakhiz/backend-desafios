const form = document.getElementById('registerForm');


form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key] = value)
    const registerSucc = await fetch('api/sessions/register',{
        method : 'POST',
        body : JSON.stringify(obj),
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(result => result.json());
    if(registerSucc.status === "success"){
        alert('registrado correctamente')
    }else{
        alert('error al registrarte')
    }
    form.reset();
})