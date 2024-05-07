/* Id de la categoria en que ingreso */
let categoriaId = sessionStorage.getItem("IdCategoria");
/* Convertir esa categoria a un número */
let categoriaIdNumerico = parseInt(categoriaId);
let categoriaNombre = sessionStorage.getItem("NombreCategoria");

let estadoOculto = sessionStorage.getItem("EstadoOculto");


let divNombre = document.getElementById("mostrarNombreCategoria");
divNombre.innerHTML =  `<h3>${categoriaNombre}</h3>`;


function listarNotasOcultas(){
    
    let cbody = document.getElementById("listarNotasOcultas");
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    cbody.appendChild(row);
    
    fetch("http://localhost:5225/api/Notas")
    .then(response => {
        return response.json()
    }).then(data => {
        data.forEach(function(element){
            console.log(data);
            if(element.idCategorias == categoriaIdNumerico && element.estado == estadoOculto){
                let card = document.createElement("div");
                card.classList.add("card","col-md-3", "me-3");
                row.appendChild(card);
                let template = `
                <div class="card-body d-flex flex-column">
                    <h3 class="text-center">${element.titulo}</h3>
                    <p class="text-center">${element.fecha}</p>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-primary me-3" onclick="vistaNotaOculta('${element.id}')"><i class="bi bi-card-text"></i></button>
                        <button class="btn btn-success" onclick="cambiarEstadoNota('${element.id}')"><i class="bi bi-eye-fill"></i></button>
                    </div>
                </div>`
                card.innerHTML = template;
            }

        });
    });
}
listarNotasOcultas();


/* Volver al listado de las notas activas */
function volverNotasActivas(){
    sessionStorage.removeItem("EstadoOculto");
    location.href = "./Notas.html";
}


/* Ver la nota oculta */
function vistaNotaOculta(id){
    sessionStorage.setItem("IdvistaOculta", id);
    location.href = "./VerNotaOculta.html";
}


/* Cambiar estado de la nota de oculto a Activo */
function cambiarEstadoNota(id){
    console.log(id);

   /*  let icono = button.querySelector('i'); // Obtener el icono dentro del botón
    if (icono.classList.contains('bi-eye-fill')) {
        icono.classList.remove('bi-eye-fill'); // Quitar la clase del icono actual
        icono.classList.add('bi-eye-slash-fill'); // Agregar la clase del nuevo icono
    }  */
   /*  button.setAttribute('disabled', true); */

    activarEstado = {
        estado: "Activo",
    }
    fetch(`http://localhost:5225/api/Notas/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(activarEstado)
    })
    .then(response => {
        return response.json()
    }).then(data => {
        let estadoActivo = document.getElementById("estadoActivo");
        estadoActivo.style.display = "block";
        console.log(data);
    });
}


function cerrarEstado(){
    estadoActivo.style.display = "none";
}