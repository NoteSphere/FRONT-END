let categoriaId = sessionStorage.getItem("IdCategoria");

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
    
            if(element.idCategorias == categoriaId){
                let card = document.createElement("div");
                card.classList.add("card","col-md-3", "me-3");
                row.appendChild(card);
                let template = `
                <div class="card-body d-flex flex-column">
                    <h3 class="text-center">${element.titulo}</h3>
                    <p class="text-center">${element.fecha}</p>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-primary me-3" onclick="verNotas('${element.id}')"><i class="bi bi-eye-fill"></i></button>
                        <button class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
                    </div>
                </div>`
                card.innerHTML = template;
            }else{
                let template = `<div class="d-flex justify-content-center align-items-center mt-5">
                <h1  class="mt-5" style="color: hsl(0, 0%, 66%);">No hay notas Creadas en esta categoria</h1>
                </div>`
                cbody.innerHTML = template;
            }

        });
    });
}
mostrarNotas();

function volverCategorias(){
    sessionStorage.removeItem("IdCategoria");
    location.href = "./Categorias.html";
}

