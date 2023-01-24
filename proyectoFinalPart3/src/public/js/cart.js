const add = document.querySelectorAll(".added");
for (let i = 0; i < add.length; i++) {
  add[i].addEventListener("click", async (e) => {
    const id = e.target.dataset;
    console.log(id);
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  });
}

const account = document.getElementById("btnPerfil");
const menu = document.getElementById('menu')
account.addEventListener("click", (e) => {
  account.classList.add("hidden");
  menu.innerHTML = `
     <div class="menu" >
        <a class="nav__container-button" id="cerrar">close</a>
        <a class="nav__container-button" href="/profile">Profile</a>
        <a class="nav__container-button" id = "logout">Logout</a>
     <div>
    `;
  const cerrar = document.getElementById("cerrar");
  cerrar.addEventListener("click", () => {
    account.classList.remove("hidden");
    menu.innerHTML = ""
  });
  const salir = document.getElementById("logout");
  salir.addEventListener("click", () => {
    setTimeout(() => {
      window.location = "/";
    }, 2000);
  });
});

