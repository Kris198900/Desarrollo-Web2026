const form = document.querySelector("form");
const lista = document.createElement("div");
lista.classList.add("container", "my-4");
document.body.appendChild(lista);

const contador = document.createElement("h4");
contador.classList.add("text-center", "text-primary");
document.body.prepend(contador);

let total = 0;

function actualizarContador() {
    contador.textContent = "Total de registros: " + total;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = document.querySelectorAll("input, textarea");

    // Validación de campos vacíos
    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("❌ Debes completar todos los campos");
            return;
        }
    }

    // Crear tarjeta
    const card = document.createElement("div");
    card.classList.add("alert", "alert-success", "mt-2");

    card.innerHTML = `
        <b>Nombre:</b> ${inputs[0].value} <br>
        <b>Correo:</b> ${inputs[1].value} <br>
        <b>Asunto:</b> ${inputs[2].value} <br>
        <b>Mensaje:</b> ${inputs[3].value}
    `;

    // Botón eliminar
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.classList.add("btn", "btn-danger", "btn-sm", "ms-2");

    btn.addEventListener("click", function () {
        lista.removeChild(card);
        total--;
        actualizarContador();
    });

    card.appendChild(btn);
    lista.appendChild(card);

    total++;
    actualizarContador();

    form.reset();
});