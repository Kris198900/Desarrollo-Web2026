"use strict";

/* =========================================================
   DAVID SHOPNOVA
   JAVASCRIPT PERSONALIZADO
   PROYECTO INTEGRADOR - SEMANA 8
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURACIÓN GENERAL
    ====================================================== */

    const IMAGEN_PREDETERMINADA = "img/producto-default.jpg";
    const TAMANO_MAXIMO_IMAGEN = 2 * 1024 * 1024;

    let siguienteId = 4;
    let productoSeleccionadoId = null;

    const productos = [
        {
            id: 1,
            nombre: "Laptop NovaBook Pro",
            categoria: "Computación",
            precio: 749.99,
            estado: "Disponible",
            descripcion:
                "Laptop moderna y eficiente para estudiar, trabajar y realizar actividades digitales.",
            imagen: "img/laptop.jpg",
            fecha: "Producto inicial"
        },
        {
            id: 2,
            nombre: "Smartphone Galaxy Nova",
            categoria: "Telefonía",
            precio: 429.99,
            estado: "Disponible",
            descripcion:
                "Teléfono inteligente con pantalla amplia, cámara de alta resolución y batería duradera.",
            imagen: "img/smartphone.jpg",
            fecha: "Producto inicial"
        },
        {
            id: 3,
            nombre: "Audífonos Bluetooth Pro",
            categoria: "Accesorios",
            precio: 59.99,
            estado: "Agotado",
            descripcion:
                "Audífonos inalámbricos con sonido envolvente y diseño cómodo para uso diario.",
            imagen: "img/audifonos.jpg",
            fecha: "Producto inicial"
        }
    ];

    /*
     * Aquí se almacenan únicamente los productos registrados
     * durante el uso de la página.
     */
    const registros = [];


    /* =====================================================
       ELEMENTOS DEL CATÁLOGO
    ====================================================== */

    const contenedorProductos =
        document.getElementById("contenedorProductos");

    const alertaProductos =
        document.getElementById("alertaProductos");

    const spinnerProductos =
        document.getElementById("spinnerProductos");

    const btnActualizarProductos =
        document.getElementById("btnActualizarProductos");


    /* =====================================================
       ELEMENTOS DEL FORMULARIO DE PRODUCTOS
    ====================================================== */

    const formularioProducto =
        document.getElementById("formularioProducto");

    const nombreProducto =
        document.getElementById("nombreProducto");

    const categoriaProducto =
        document.getElementById("categoriaProducto");

    const precioProducto =
        document.getElementById("precioProducto");

    const estadoProducto =
        document.getElementById("estadoProducto");

    const descripcionProducto =
        document.getElementById("descripcionProducto");

    const imagenProducto =
        document.getElementById("imagenProducto");

    const errorNombre =
        document.getElementById("errorNombre");

    const errorCategoria =
        document.getElementById("errorCategoria");

    const errorPrecio =
        document.getElementById("errorPrecio");

    const errorEstado =
        document.getElementById("errorEstado");

    const errorDescripcion =
        document.getElementById("errorDescripcion");

    const errorImagen =
        document.getElementById("errorImagen");

    const mensajeEstado =
        document.getElementById("mensajeEstado");

    const spinnerRegistro =
        document.getElementById("spinnerRegistro");

    const btnGuardarProducto =
        document.getElementById("btnGuardarProducto");

    const btnLimpiarFormulario =
        document.getElementById("btnLimpiarFormulario");

    const contenedorVistaPrevia =
        document.getElementById("contenedorVistaPrevia");

    const vistaPreviaImagen =
        document.getElementById("vistaPreviaImagen");


    /* =====================================================
       ELEMENTOS DE REGISTROS DINÁMICOS
    ====================================================== */

    const listaRegistros =
        document.getElementById("listaRegistros");

    const mensajeSinRegistros =
        document.getElementById("mensajeSinRegistros");


    /* =====================================================
       ELEMENTOS DEL MODAL
    ====================================================== */

    const modalDetalleProducto =
        document.getElementById("modalDetalleProducto");

    const nombreModal =
        document.getElementById("nombreModal");

    const categoriaModal =
        document.getElementById("categoriaModal");

    const estadoModal =
        document.getElementById("estadoModal");

    const precioModal =
        document.getElementById("precioModal");

    const descripcionModal =
        document.getElementById("descripcionModal");

    const imagenModal =
        document.getElementById("imagenModal");

    const btnSeleccionarProducto =
        document.getElementById("btnSeleccionarProducto");


    /* =====================================================
       ELEMENTOS DEL FORMULARIO DE CONTACTO
    ====================================================== */

    const formularioContacto =
        document.getElementById("formularioContacto");

    const nombreContacto =
        document.getElementById("nombre");

    const correoContacto =
        document.getElementById("correo");

    const asuntoContacto =
        document.getElementById("asunto");

    const mensajeContacto =
        document.getElementById("mensaje");

    const alertaContacto =
        document.getElementById("alertaContacto");


    /* =====================================================
       FUNCIONES GENERALES
    ====================================================== */

    function esperar(milisegundos) {
        return new Promise(resolve => {
            setTimeout(resolve, milisegundos);
        });
    }


    function escaparHTML(texto) {
        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return String(texto).replace(/[&<>"']/g, caracter => {
            return caracteres[caracter];
        });
    }


    function formatearPrecio(precio) {
        return new Intl.NumberFormat("es-EC", {
            style: "currency",
            currency: "USD"
        }).format(precio);
    }


    function crearImagenPlaceholder(nombreProductoActual) {
        const nombreSeguro = escaparHTML(
            nombreProductoActual || "Producto"
        );

        const svg = `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="900"
                height="600"
                viewBox="0 0 900 600"
            >
                <defs>
                    <linearGradient
                        id="fondo"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                    >
                        <stop offset="0%" stop-color="#092b70"/>
                        <stop offset="100%" stop-color="#2878ff"/>
                    </linearGradient>
                </defs>

                <rect
                    width="900"
                    height="600"
                    fill="url(#fondo)"
                />

                <circle
                    cx="450"
                    cy="235"
                    r="90"
                    fill="rgba(255,255,255,0.18)"
                />

                <path
                    d="M390 220h120l-15 95h-90z"
                    fill="none"
                    stroke="#ffffff"
                    stroke-width="15"
                    stroke-linejoin="round"
                />

                <path
                    d="M420 220c0-45 60-45 60 0"
                    fill="none"
                    stroke="#ffffff"
                    stroke-width="15"
                    stroke-linecap="round"
                />

                <text
                    x="450"
                    y="410"
                    text-anchor="middle"
                    font-family="Arial, sans-serif"
                    font-size="38"
                    font-weight="bold"
                    fill="#ffffff"
                >
                    ${nombreSeguro}
                </text>

                <text
                    x="450"
                    y="460"
                    text-anchor="middle"
                    font-family="Arial, sans-serif"
                    font-size="25"
                    fill="rgba(255,255,255,0.80)"
                >
                    David ShopNova
                </text>
            </svg>
        `;

        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }


    function configurarImagen(
        elementoImagen,
        rutaImagen,
        nombreProductoActual
    ) {
        if (!elementoImagen) {
            return;
        }

        elementoImagen.alt =
            `Imagen de ${nombreProductoActual}`;

        elementoImagen.src =
            rutaImagen || crearImagenPlaceholder(nombreProductoActual);

        elementoImagen.addEventListener(
            "error",
            () => {
                elementoImagen.src =
                    crearImagenPlaceholder(nombreProductoActual);
            },
            { once: true }
        );
    }


    function mostrarAlerta(
        elemento,
        mensaje,
        tipo = "info",
        icono = "bi-info-circle-fill",
        ocultarAutomaticamente = false
    ) {
        if (!elemento) {
            return;
        }

        elemento.className = `alert alert-${tipo}`;
        elemento.innerHTML = `
            <i class="bi ${icono} me-2"></i>
            ${escaparHTML(mensaje)}
        `;

        elemento.classList.remove("d-none");

        if (ocultarAutomaticamente) {
            setTimeout(() => {
                elemento.classList.add("d-none");
            }, 3500);
        }
    }


    function obtenerClaseEstado(estado) {
        return estado === "Disponible"
            ? "estado-disponible"
            : "estado-agotado";
    }


    /* =====================================================
       CREAR TARJETA DE PRODUCTO
    ====================================================== */

    function crearTarjetaProducto(producto) {
        const columna = document.createElement("div");

        columna.className =
            "col-12 col-md-6 col-lg-4";

        columna.innerHTML = `
            <article class="card producto-card h-100">

                <img
                    class="card-img-top imagen-producto"
                    alt=""
                >

                <div class="card-body p-4">

                    <div
                        class="d-flex justify-content-between
                        align-items-center gap-2 mb-3"
                    >
                        <span class="badge text-bg-primary">
                            ${escaparHTML(producto.categoria)}
                        </span>

                        <span
                            class="badge-estado
                            ${obtenerClaseEstado(producto.estado)}"
                        >
                            ${escaparHTML(producto.estado)}
                        </span>
                    </div>

                    <h3 class="card-title h5">
                        ${escaparHTML(producto.nombre)}
                    </h3>

                    <p class="card-text flex-grow-1">
                        ${escaparHTML(producto.descripcion)}
                    </p>

                    <p class="precio-producto mb-3">
                        ${formatearPrecio(producto.precio)}
                    </p>

                    <button
                        type="button"
                        class="btn btn-outline-primary
                        btn-ver-detalle w-100"
                        data-id="${producto.id}"
                    >
                        <i class="bi bi-eye-fill me-2"></i>
                        Ver detalles
                    </button>

                </div>

            </article>
        `;

        const imagen =
            columna.querySelector(".imagen-producto");

        configurarImagen(
            imagen,
            producto.imagen,
            producto.nombre
        );

        const botonDetalle =
            columna.querySelector(".btn-ver-detalle");

        botonDetalle.addEventListener("click", () => {
            mostrarDetalleProducto(producto.id);
        });

        return columna;
    }


    /* =====================================================
       MOSTRAR PRODUCTOS DINÁMICAMENTE
    ====================================================== */

    function mostrarProductos() {
        if (!contenedorProductos) {
            return;
        }

        contenedorProductos.innerHTML = "";

        if (productos.length === 0) {
            mostrarAlerta(
                alertaProductos,
                "No existen productos disponibles en el catálogo.",
                "warning",
                "bi-exclamation-triangle-fill"
            );

            return;
        }

        productos.forEach(producto => {
            const tarjeta =
                crearTarjetaProducto(producto);

            contenedorProductos.appendChild(tarjeta);
        });
    }


    async function actualizarCatalogo() {
        if (
            !spinnerProductos ||
            !contenedorProductos ||
            !btnActualizarProductos
        ) {
            return;
        }

        btnActualizarProductos.disabled = true;
        contenedorProductos.classList.add("d-none");
        spinnerProductos.classList.remove("d-none");

        await esperar(900);

        mostrarProductos();

        spinnerProductos.classList.add("d-none");
        contenedorProductos.classList.remove("d-none");
        btnActualizarProductos.disabled = false;

        mostrarAlerta(
            alertaProductos,
            "El catálogo se actualizó correctamente.",
            "success",
            "bi-check-circle-fill",
            true
        );
    }


    if (btnActualizarProductos) {
        btnActualizarProductos.addEventListener(
            "click",
            actualizarCatalogo
        );
    }


    /* =====================================================
       VALIDACIÓN DEL FORMULARIO DE PRODUCTOS
    ====================================================== */

    function marcarCampo(
        campo,
        elementoError,
        valido,
        mensajeError = ""
    ) {
        if (!campo) {
            return valido;
        }

        if (valido) {
            campo.classList.add("is-valid");
            campo.classList.remove("is-invalid");

            if (elementoError) {
                elementoError.textContent = "";
            }
        } else {
            campo.classList.add("is-invalid");
            campo.classList.remove("is-valid");

            if (elementoError) {
                elementoError.textContent = mensajeError;
            }
        }

        return valido;
    }


    function validarNombreProducto() {
        const valor = nombreProducto.value.trim();
        const valido = valor.length >= 3;

        return marcarCampo(
            nombreProducto,
            errorNombre,
            valido,
            "El nombre debe tener al menos 3 caracteres."
        );
    }


    function validarCategoriaProducto() {
        const valor = categoriaProducto.value.trim();
        const valido = valor.length >= 3;

        return marcarCampo(
            categoriaProducto,
            errorCategoria,
            valido,
            "La categoría debe tener al menos 3 caracteres."
        );
    }


    function validarPrecioProducto() {
        const valor = Number(precioProducto.value);
        const valido =
            precioProducto.value.trim() !== "" &&
            Number.isFinite(valor) &&
            valor > 0;

        return marcarCampo(
            precioProducto,
            errorPrecio,
            valido,
            "Ingrese un precio mayor que cero."
        );
    }


    function validarEstadoProducto() {
        const valido =
            estadoProducto.value === "Disponible" ||
            estadoProducto.value === "Agotado";

        return marcarCampo(
            estadoProducto,
            errorEstado,
            valido,
            "Seleccione el estado del producto."
        );
    }


    function validarDescripcionProducto() {
        const valor = descripcionProducto.value.trim();
        const valido = valor.length >= 10;

        return marcarCampo(
            descripcionProducto,
            errorDescripcion,
            valido,
            "La descripción debe tener al menos 10 caracteres."
        );
    }


    function validarImagenProducto() {
        const archivo = imagenProducto.files[0];

        if (!archivo) {
            imagenProducto.classList.remove(
                "is-valid",
                "is-invalid"
            );

            errorImagen.textContent = "";
            return true;
        }

        const tiposPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!tiposPermitidos.includes(archivo.type)) {
            return marcarCampo(
                imagenProducto,
                errorImagen,
                false,
                "Seleccione una imagen JPG, JPEG, PNG o WEBP."
            );
        }

        if (archivo.size > TAMANO_MAXIMO_IMAGEN) {
            return marcarCampo(
                imagenProducto,
                errorImagen,
                false,
                "La imagen no debe superar los 2 MB."
            );
        }

        return marcarCampo(
            imagenProducto,
            errorImagen,
            true
        );
    }


    function validarFormularioProducto() {
        const validaciones = [
            validarNombreProducto(),
            validarCategoriaProducto(),
            validarPrecioProducto(),
            validarEstadoProducto(),
            validarDescripcionProducto(),
            validarImagenProducto()
        ];

        return validaciones.every(resultado => resultado);
    }


    /* =====================================================
       LECTURA Y VISTA PREVIA DE IMAGEN
    ====================================================== */

    function leerImagenArchivo(archivo) {
        return new Promise((resolve, reject) => {
            const lector = new FileReader();

            lector.addEventListener("load", () => {
                resolve(lector.result);
            });

            lector.addEventListener("error", () => {
                reject(
                    new Error("No fue posible leer la imagen.")
                );
            });

            lector.readAsDataURL(archivo);
        });
    }


    async function mostrarVistaPrevia() {
        const archivo = imagenProducto.files[0];

        if (!archivo) {
            ocultarVistaPrevia();
            return;
        }

        if (!validarImagenProducto()) {
            ocultarVistaPrevia();
            return;
        }

        try {
            const imagenBase64 =
                await leerImagenArchivo(archivo);

            vistaPreviaImagen.src = imagenBase64;
            vistaPreviaImagen.alt =
                "Vista previa de la imagen seleccionada";

            contenedorVistaPrevia.classList.remove("d-none");
        } catch (error) {
            ocultarVistaPrevia();

            marcarCampo(
                imagenProducto,
                errorImagen,
                false,
                "No fue posible procesar la imagen seleccionada."
            );
        }
    }


    function ocultarVistaPrevia() {
        if (vistaPreviaImagen) {
            vistaPreviaImagen.src = "";
        }

        if (contenedorVistaPrevia) {
            contenedorVistaPrevia.classList.add("d-none");
        }
    }


    if (imagenProducto) {
        imagenProducto.addEventListener(
            "change",
            mostrarVistaPrevia
        );
    }


    /* =====================================================
       EVENTOS DE VALIDACIÓN EN TIEMPO REAL
    ====================================================== */

    if (nombreProducto) {
        nombreProducto.addEventListener(
            "input",
            validarNombreProducto
        );

        nombreProducto.addEventListener(
            "blur",
            validarNombreProducto
        );
    }


    if (categoriaProducto) {
        categoriaProducto.addEventListener(
            "input",
            validarCategoriaProducto
        );

        categoriaProducto.addEventListener(
            "blur",
            validarCategoriaProducto
        );
    }


    if (precioProducto) {
        precioProducto.addEventListener(
            "input",
            validarPrecioProducto
        );

        precioProducto.addEventListener(
            "blur",
            validarPrecioProducto
        );
    }


    if (estadoProducto) {
        estadoProducto.addEventListener(
            "change",
            validarEstadoProducto
        );
    }


    if (descripcionProducto) {
        descripcionProducto.addEventListener(
            "input",
            validarDescripcionProducto
        );

        descripcionProducto.addEventListener(
            "blur",
            validarDescripcionProducto
        );
    }


    /* =====================================================
       LIMPIAR FORMULARIO DE PRODUCTOS
    ====================================================== */

    function limpiarValidacionesProducto() {
        const campos = [
            nombreProducto,
            categoriaProducto,
            precioProducto,
            estadoProducto,
            descripcionProducto,
            imagenProducto
        ];

        campos.forEach(campo => {
            if (campo) {
                campo.classList.remove(
                    "is-valid",
                    "is-invalid"
                );
            }
        });

        const errores = [
            errorNombre,
            errorCategoria,
            errorPrecio,
            errorEstado,
            errorDescripcion,
            errorImagen
        ];

        errores.forEach(error => {
            if (error) {
                error.textContent = "";
            }
        });

        ocultarVistaPrevia();
    }


    if (btnLimpiarFormulario) {
        btnLimpiarFormulario.addEventListener(
            "click",
            () => {
                setTimeout(() => {
                    limpiarValidacionesProducto();

                    mostrarAlerta(
                        mensajeEstado,
                        "El formulario está listo para un nuevo registro.",
                        "info",
                        "bi-info-circle-fill"
                    );
                }, 0);
            }
        );
    }


    /* =====================================================
       REGISTRO DE NUEVOS PRODUCTOS
    ====================================================== */

    if (formularioProducto) {
        formularioProducto.addEventListener(
            "submit",
            async evento => {
                evento.preventDefault();

                if (!validarFormularioProducto()) {
                    mostrarAlerta(
                        mensajeEstado,
                        "Revise los campos señalados antes de guardar.",
                        "danger",
                        "bi-x-circle-fill"
                    );

                    const primerCampoInvalido =
                        formularioProducto.querySelector(
                            ".is-invalid"
                        );

                    if (primerCampoInvalido) {
                        primerCampoInvalido.focus();
                    }

                    return;
                }

                spinnerRegistro.classList.remove("d-none");
                btnGuardarProducto.disabled = true;

                try {
                    const archivo =
                        imagenProducto.files[0];

                    let imagenFinal =
                        IMAGEN_PREDETERMINADA;

                    if (archivo) {
                        imagenFinal =
                            await leerImagenArchivo(archivo);
                    }

                    await esperar(900);

                    const nuevoProducto = {
                        id: siguienteId++,
                        nombre: nombreProducto.value.trim(),
                        categoria:
                            categoriaProducto.value.trim(),
                        precio:
                            Number(precioProducto.value),
                        estado:
                            estadoProducto.value,
                        descripcion:
                            descripcionProducto.value.trim(),
                        imagen:
                            imagenFinal,
                        fecha:
                            new Date().toLocaleString("es-EC")
                    };

                    productos.push(nuevoProducto);
                    registros.push(nuevoProducto);

                    mostrarProductos();
                    mostrarRegistros();

                    formularioProducto.reset();
                    limpiarValidacionesProducto();

                    mostrarAlerta(
                        mensajeEstado,
                        `${nuevoProducto.nombre} fue registrado correctamente. Total del catálogo: ${productos.length}.`,
                        "success",
                        "bi-check-circle-fill"
                    );
                } catch (error) {
                    mostrarAlerta(
                        mensajeEstado,
                        "Ocurrió un error al registrar el producto.",
                        "danger",
                        "bi-x-circle-fill"
                    );

                    console.error(error);
                } finally {
                    spinnerRegistro.classList.add("d-none");
                    btnGuardarProducto.disabled = false;
                }
            }
        );
    }


    /* =====================================================
       MOSTRAR PRODUCTOS REGISTRADOS
    ====================================================== */

    function mostrarRegistros() {
        if (!listaRegistros || !mensajeSinRegistros) {
            return;
        }

        listaRegistros.innerHTML = "";

        if (registros.length === 0) {
            mensajeSinRegistros.classList.remove("d-none");
            return;
        }

        mensajeSinRegistros.classList.add("d-none");

        registros.forEach(producto => {
            const columna = document.createElement("div");

            columna.className =
                "col-12 col-md-6 col-lg-4";

            columna.innerHTML = `
                <article class="card h-100">

                    <img
                        class="card-img-top imagen-producto"
                        alt=""
                    >

                    <div class="card-body p-4">

                        <div
                            class="d-flex justify-content-between
                            align-items-center gap-2 mb-3"
                        >
                            <span class="badge text-bg-primary">
                                ${escaparHTML(producto.categoria)}
                            </span>

                            <span
                                class="badge-estado
                                ${obtenerClaseEstado(producto.estado)}"
                            >
                                ${escaparHTML(producto.estado)}
                            </span>
                        </div>

                        <h3 class="card-title h5">
                            ${escaparHTML(producto.nombre)}
                        </h3>

                        <p class="card-text">
                            ${escaparHTML(producto.descripcion)}
                        </p>

                        <p class="precio-producto fw-bold text-primary">
                            ${formatearPrecio(producto.precio)}
                        </p>

                        <p class="small text-secondary">
                            <i class="bi bi-calendar-check me-1"></i>
                            ${escaparHTML(producto.fecha)}
                        </p>

                        <div class="d-grid gap-2">

                            <button
                                type="button"
                                class="btn btn-outline-primary
                                btn-detalle-registro"
                            >
                                <i class="bi bi-eye me-2"></i>
                                Ver detalles
                            </button>

                            <button
                                type="button"
                                class="btn btn-danger
                                btn-eliminar-registro"
                            >
                                <i class="bi bi-trash3-fill me-2"></i>
                                Eliminar registro
                            </button>

                        </div>

                    </div>

                </article>
            `;

            const imagen =
                columna.querySelector(".imagen-producto");

            configurarImagen(
                imagen,
                producto.imagen,
                producto.nombre
            );

            columna
                .querySelector(".btn-detalle-registro")
                .addEventListener("click", () => {
                    mostrarDetalleProducto(producto.id);
                });

            columna
                .querySelector(".btn-eliminar-registro")
                .addEventListener("click", () => {
                    eliminarRegistro(producto.id);
                });

            listaRegistros.appendChild(columna);
        });
    }


    /* =====================================================
       ELIMINAR PRODUCTOS REGISTRADOS
    ====================================================== */

    function eliminarRegistro(idProducto) {
        const producto =
            registros.find(item => item.id === idProducto);

        if (!producto) {
            return;
        }

        const confirmarEliminacion = window.confirm(
            `¿Desea eliminar el producto "${producto.nombre}"?`
        );

        if (!confirmarEliminacion) {
            return;
        }

        const indiceRegistro =
            registros.findIndex(
                item => item.id === idProducto
            );

        const indiceProducto =
            productos.findIndex(
                item => item.id === idProducto
            );

        if (indiceRegistro !== -1) {
            registros.splice(indiceRegistro, 1);
        }

        if (indiceProducto !== -1) {
            productos.splice(indiceProducto, 1);
        }

        mostrarProductos();
        mostrarRegistros();

        mostrarAlerta(
            mensajeEstado,
            `${producto.nombre} fue eliminado correctamente.`,
            "warning",
            "bi-trash3-fill"
        );
    }


    /* =====================================================
       MODAL DE DETALLES
    ====================================================== */

    function mostrarDetalleProducto(idProducto) {
        const producto =
            productos.find(item => item.id === idProducto);

        if (!producto) {
            mostrarAlerta(
                alertaProductos,
                "No se encontró la información del producto.",
                "danger",
                "bi-x-circle-fill",
                true
            );

            return;
        }

        productoSeleccionadoId = producto.id;

        nombreModal.textContent =
            producto.nombre;

        categoriaModal.textContent =
            producto.categoria;

        precioModal.textContent =
            formatearPrecio(producto.precio);

        descripcionModal.textContent =
            producto.descripcion;

        estadoModal.textContent =
            producto.estado;

        estadoModal.className =
            `badge-estado ${obtenerClaseEstado(producto.estado)}`;

        configurarImagen(
            imagenModal,
            producto.imagen,
            producto.nombre
        );

        if (
            typeof bootstrap !== "undefined" &&
            modalDetalleProducto
        ) {
            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalDetalleProducto
                );

            modal.show();
        }
    }


    if (btnSeleccionarProducto) {
        btnSeleccionarProducto.addEventListener(
            "click",
            () => {
                const producto =
                    productos.find(
                        item =>
                            item.id === productoSeleccionadoId
                    );

                if (!producto) {
                    return;
                }

                mostrarAlerta(
                    mensajeEstado,
                    `Seleccionaste el producto: ${producto.nombre}.`,
                    "success",
                    "bi-check-circle-fill"
                );

                if (
                    typeof bootstrap !== "undefined" &&
                    modalDetalleProducto
                ) {
                    const modal =
                        bootstrap.Modal.getInstance(
                            modalDetalleProducto
                        );

                    if (modal) {
                        modal.hide();
                    }
                }

                document
                    .getElementById("registro")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });
            }
        );
    }


    /* =====================================================
       VALIDACIÓN DEL FORMULARIO DE CONTACTO
    ====================================================== */

    function validarCampoContacto(campo) {
        const valor = campo.value.trim();
        let valido = false;

        if (campo === nombreContacto) {
            valido = valor.length >= 3;
        }

        if (campo === correoContacto) {
            const expresionCorreo =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            valido =
                expresionCorreo.test(valor);
        }

        if (campo === asuntoContacto) {
            valido = valor.length >= 3;
        }

        if (campo === mensajeContacto) {
            valido = valor.length >= 10;
        }

        if (valido) {
            campo.classList.add("is-valid");
            campo.classList.remove("is-invalid");
        } else {
            campo.classList.add("is-invalid");
            campo.classList.remove("is-valid");
        }

        return valido;
    }


    if (formularioContacto) {
        const camposContacto = [
            nombreContacto,
            correoContacto,
            asuntoContacto,
            mensajeContacto
        ];

        camposContacto.forEach(campo => {
            campo.addEventListener("input", () => {
                validarCampoContacto(campo);
            });

            campo.addEventListener("blur", () => {
                validarCampoContacto(campo);
            });
        });


        formularioContacto.addEventListener(
            "submit",
            evento => {
                evento.preventDefault();

                const formularioValido =
                    camposContacto
                        .map(validarCampoContacto)
                        .every(resultado => resultado);

                if (!formularioValido) {
                    mostrarAlerta(
                        alertaContacto,
                        "Complete correctamente todos los campos.",
                        "danger",
                        "bi-x-circle-fill"
                    );

                    return;
                }

                mostrarAlerta(
                    alertaContacto,
                    "El mensaje fue enviado correctamente.",
                    "success",
                    "bi-send-check-fill",
                    true
                );

                formularioContacto.reset();

                camposContacto.forEach(campo => {
                    campo.classList.remove(
                        "is-valid",
                        "is-invalid"
                    );
                });
            }
        );
    }


    /* =====================================================
       CARGA INICIAL
    ====================================================== */

    mostrarProductos();
    mostrarRegistros();

});