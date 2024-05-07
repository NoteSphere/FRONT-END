let idNotaOculta = sessionStorage.getItem("IdvistaOculta");

function mostrarNotaOculta(){
    fetch(`http://localhost:5225/api/Notas/${idNotaOculta}`)
    .then(response => {
        return response.json()
    }).then(data => {
        console.log(data.remember_token);
        let cardOculta = document.getElementById("mostrarCartaOculta");

        cardOculta.innerHTML = `
        <div>
            <h1 class="text-center " id="ocultoTitulo">${data.titulo}</h1>
        </div>
        <div class="card mt-4" id="cartasOcultas">
            <div class="card-body">
            <blockquote class="blockquote mb-0">
            <p>${data.texto}</p>
            <footer class="blockquote-footer mt-3">${data.fecha}</footer>
            </blockquote>
            </div>
        </div>`;
        
    })
}
mostrarNotaOculta();

function volverNotasOcultas(){
    location.href = "./NotasOcultas.html";
    sessionStorage.removeItem("IdvistaOculta");
}