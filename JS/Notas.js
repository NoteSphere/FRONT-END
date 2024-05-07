let categoriaId = sessionStorage.getItem("IdCategoria");
let categoriaIdNumerico = parseInt(categoriaId);
let categoriaEstado = sessionStorage.getItem("EstadoCategoria");
let categoriaNombre = sessionStorage.getItem("NombreCategoria");

function mostrarNotas(){
    
    let cbody = document.getElementById("listarNotas");
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    cbody.appendChild(row);
    
    fetch("http://localhost:5225/api/Notas")
    .then(response => {
        return response.json()
    }).then(data => {
        data.forEach(function(element){
            console.log(data);
            let divNombre = document.getElementById("mostrarNombreCategoria");
            divNombre.innerHTML =  `<h3>${categoriaNombre}</h3>`;
            
            if(element.idCategorias == categoriaIdNumerico && element.estado == categoriaEstado){
                let card = document.createElement("div");
                card.classList.add("card","col-md-3", "me-3");
                row.appendChild(card);
                let template = `
                <div class="card-body d-flex flex-column">
                    <h3 class="text-center">${element.titulo}</h3>
                    <p class="text-center">${element.fecha}</p>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-primary me-3" onclick="verNotas('${element.id}')"><i class="bi bi-card-text"></i></button>
                        <button class="btn btn-danger" onclick="llamarEliminarNota('${element.id}')"><i class="bi bi-trash3-fill"></i></button>
                    </div>
                </div>`
                card.innerHTML = template;
            }

        });
    });
}
mostrarNotas();

function volverCategorias(){
    sessionStorage.removeItem("IdCategoria");
    sessionStorage.removeItem("EstadoCategoria");
    sessionStorage.removeItem("NombreCategoria");
    location.href = "./Categorias.html";
}

function verNotasOcultas(){
    sessionStorage.setItem("EstadoOculto", "Oculto");
    location.href = "./NotasOcultas.html";
}


function verNotas(id){
    sessionStorage.setItem("IdNotaActiva", id);
    location.href = "./VerNotas.html";
}

/* ELIMINAR NOTA */
let seguroEliminar = document.getElementById("seguroEliminar");
function llamarEliminarNota(id){
    seguroEliminar.style.display = "block";
    sessionStorage.setItem("IdEliminar", id);
}
function eliminarCerrar(){
    seguroEliminar.style.display = "none";
}

function eliminarNota(){
    let categoriaEliminarId = sessionStorage.getItem("IdEliminar");
    fetch(`http://localhost:5225/api/Categorias/${categoriaEliminarId}`,{
        method: `DELETE`,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
        location.reload();
        return response.json()
    });
}