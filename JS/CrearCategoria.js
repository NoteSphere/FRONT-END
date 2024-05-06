const url = "http://localhost:5225/api/categorias"
let btnCrear = document.getElementById("btnCrear");

function Crear(){
    const Nombre =document.getElementById("Nombre")

    //enviar informacion a la API
    Categoria ={
        Nombre : Nombre.value
    }
   
        fetch(url, {
            method : "POST",
            headers : {"Content-Type" : "application/json"
        },
        body : JSON.stringify(Categoria)
        })
        .then(response => {return response.json()})
        .then(data => {
            console.log(data) & location.reload();
        })
    }
    