const add = document.getElementById("added");

let added = "true"
add.addEventListener('click', async()=>{
    await fetch("/api/cart",{
      method : 'POST',
      body : JSON.stringify(added),
      headers : {
        'Content-Type' : 'application/json'
    }
    }).then(res => res.json())
})