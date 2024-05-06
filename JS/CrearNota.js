var url = "http://localhost:5225/api/Notas";
var IdCategorias = sessionStorage.getItem("IdCategoria");

function Crear(){
    const Texto =document.getElementById("Texto").value
    const Titulo =document.getElementById("Titulo").value
    const IdCategorias = sessionStorage.getItem("IdCategoria");
    console.log(IdCategorias)
    
    //enviar informacion a la API
    Nota ={
        texto : Texto,
        titulo : Titulo,
        idcategorias: parseInt(IdCategorias),
        estado: "Activo",
        fecha : null
    }
   
        fetch("http://localhost:5225/api/Notas",{

            method : "POST",
            headers : {"Content-Type" : "application/json"
        },
        body : JSON.stringify(Nota)
        })
        .then(response => {return response.json()})
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error('Error al crear la nota:', error);
        });

}