class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName = () =>{
        return this.nombre + this.apellido;
    }
    addMascota = (mascotas) => {
        return this.mascotas.push(mascotas);
    }
    getMascotasNames = () =>{
        return this.mascotas
    }
    countMascotas = () =>{
        return this.mascotas;
    }
    addBook = (titulo,autor)=>{
        return this.libros.push({titulo,autor});
    }
    getBookNames = () =>{
        return this.libros;
    }
}
const usuario1 = new Usuario("carlos", "kratos");

const fullName = usuario1.getFullName()
console.log(`El nombre completo del usuario es ${fullName}`);
const Qmascotas = usuario1.countMascotas()
console.log(Qmascotas.length)
usuario1.addMascota("perrito");
console.log(Qmascotas.length)
const namesMascotas = usuario1.getMascotasNames
console.log(namesMascotas()) 
usuario1.addBook("harry Potter", "Rowling")
const namesBook = usuario1.getBookNames
console.log(namesBook())