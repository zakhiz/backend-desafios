const form = document.getElementById('usersForm');

form.addEventListener('submit' , e =>{
    e.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key) => obj[key] = value);
    // fetch('/api/users',{
    //       method : 'POST',
    //       body: JSON.stringify(obj),
    //       headers : {
    //         "content-Type" : "application/json",
    //       }  
    // }).then(res => res.json()).then(json => console.log(json));
    
    fetch('/api/users',{
          method : 'POST',
          body: data
          
    }).then(res => res.json()).then(json => console.log(json));
})