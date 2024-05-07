let idNotaActiva = sessionStorage.getItem("IdNotaActiva");

function mostrarNotaActiva(){
    fetch(`http://localhost:5225/api/Notas/${idNotaActiva}`)
    .then(response => {
        return response.json()
    }).then(data => {
        console.log(data.remember_token);
        let cardActiva = document.getElementById("mostrarCartaActiva");

        cardActiva.innerHTML = `
        <div>
            <h1 class="text-center " id="ocultoTitulo">${data.titulo}</h1>
        </div>
        <div class="card mt-4" id="cartaActiva">
            <div class="card-body">
            <blockquote class="blockquote mb-0">
            <p>${data.texto}</p>
            <footer class="blockquote-footer mt-3">${data.fecha}</footer>
            </blockquote>
            </div>
        </div>`;
        
    })
}
mostrarNotaActiva();

function volverNotas(){
    location.href = "./Notas.html";
    sessionStorage.removeItem("IdNotaActiva");
}