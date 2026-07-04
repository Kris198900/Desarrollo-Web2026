const form = document.getElementById("formulario");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");

// CONTADOR
let total = 0;

const contador = document.createElement("h4");
contador.classList.add("text-center", "text-primary", "my-3");
document.body.prepend(contador);

const lista = document.createElement("div");
lista.classList.add("container", "my-4");
document.body.appendChild(lista);

function actualizarContador() {
    contador.textContent = "Total de registros: " + total;
}

// VALIDACIÓN EN TIEMPO REAL
[nombre, correo, asunto, mensaje].forEach(input => {
    input.addEventListener("input", () => validar(input));
    input.addEventListener("blur", () => validar(input));
});

function validar(input) {
    const value = input.value.trim();
    let valido = true;

    if (value === "") valido = false;

    if (input === nombre && value.length < 3) valido = false;

    if (input === correo && !value.includes("@")) valido = false;

    if (input === asunto && value.length < 3) valido = false;

    if (input === mensaje && value.length < 10) valido = false;

    if (valido) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
}

// SUBMIT
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (
        nombre.value.trim().length < 3 ||
        !correo.value.includes("@") ||
        asunto.value.trim().length < 3 ||
        mensaje.value.trim().length < 10
    ) {
        alert("❌ Revisa los campos");
        return;
    }

    const card = document.createElement("div");
    card.classList.add("alert", "alert-success", "mt-2");

    card.innerHTML = `
        <b>Nombre:</b> ${nombre.value}<br>
        <b>Correo:</b> ${correo.value}<br>
        <b>Asunto:</b> ${asunto.value}<br>
        <b>Mensaje:</b> ${mensaje.value}
    `;

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.classList.add("btn", "btn-danger", "btn-sm", "ms-2");

    btn.addEventListener("click", () => {
        lista.removeChild(card);
        total--;
        actualizarContador();
    });

    card.appendChild(btn);
    lista.appendChild(card);

    total++;
    actualizarContador();

    form.reset();

    [nombre, correo, asunto, mensaje].forEach(i => {
        i.classList.remove("is-valid", "is-invalid");
    });

    alert("✅ Registro guardado correctamente");
});

actualizarContador();