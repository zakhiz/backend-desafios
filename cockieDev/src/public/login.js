const form = document.getElementById('loginForm');
const login = document.getElementById('welcome')
form.addEventListener('submit',async (e) =>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key] = value)
    fetch('api/sessions/login',{
        method : 'POST',
        body : JSON.stringify(obj),
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(res=>res.json());

    const user = await fetch('api/sessions/user').then(res => res.json());
    login.innerHTML += `
     <h2>Welcome ${user.name}</h2>
     <button id="logout">logout</button>
    ` 
    const adios = document.getElementById('logout');

    adios.addEventListener('click',async()=>{
        login.innerHTML = '';
        const user = await fetch('api/sessions/user').then(res => res.json());
        login.innerHTML += `
        <h2>bye ${user.name}</h2>
        `
        setTimeout(() => {
            window.location = '/'   
        }, 2000);   
    })
})

