/* CATEGORIAS */
function listarCategorias(){

    let tbody = document.getElementById("listarCategorias");
    let row = document.createElement("div");
    row.setAttribute("class","row");
    tbody.appendChild(row);

    
    fetch("http://localhost:5225/api/Categorias")
    .then(response =>{
        return response.json()
    }).then(data => {
        data.forEach(function(element){
            let card = document.createElement("div");
            card.classList.add("card","col-md-3", "me-5", "mb-5");
            row.appendChild(card);
            let template = `
                <div class="card-body d-flex flex-column">
                    <h3 class="text-center">${element.nombre}</h3>
                    <div class="text-center">
                        <img src="./../img/images.png" alt="" style="width: 80px; height: 80px;" class="mb-2">
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-primary me-3" onclick="verNotas('${element.id} ${element.nombre}')"><i class="bi bi-box-arrow-in-right"></i></button>
                        <button class="btn btn-danger" onclick="llamarEliminar('${element.id}')"><i class="bi bi-trash3-fill"></i></button>
                    </div>
                </div>`
                card.innerHTML = template;
            });
    });
}
listarCategorias();


/* NOTAS */
function verNotas(id){
    let informacionCategoria = id.split(" ");
    console.log(informacionCategoria);
    sessionStorage.setItem("IdCategoria", informacionCategoria[0]);
    sessionStorage.setItem("NombreCategoria", informacionCategoria[1]);
    sessionStorage.setItem("EstadoCategoria", "Activo");
    location.href = `./Notas.html`
}

/* ELIMINAR CATEGORIA */
let seguroEliminar = document.getElementById("seguroEliminar");
function llamarEliminar(id){
    seguroEliminar.style.display = "block";
    sessionStorage.setItem("IdEliminar", id);
}
function eliminarCerrar(){
    seguroEliminar.style.display = "none";
}


function eliminarCategoria(){
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
