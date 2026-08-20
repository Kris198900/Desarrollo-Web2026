from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def inicio():

    sistema = "David ShopNova"

    informacion = {
        "productos": 3,
        "clientes": 3,
        "proveedores": 2,
        "facturas": 2
    }

    return render_template(
        "index.html",
        sistema=sistema,
        informacion=informacion
    )



@app.route("/productos")
def productos():

    productos = [

        {
            "nombre": "Laptop Lenovo",
            "precio": 750,
            "stock": 5
        },

        {
            "nombre": "Mouse Inalámbrico",
            "precio": 20,
            "stock": 15
        },

        {
            "nombre": "Teclado Mecánico",
            "precio": 45,
            "stock": 0
        }

    ]


    return render_template(
        "productos.html",
        productos=productos
    )



@app.route("/clientes")
def clientes():

    clientes = [

        {
            "nombre": "Juan Pérez",
            "correo": "juan@gmail.com",
            "activo": True
        },

        {
            "nombre": "María López",
            "correo": "maria@gmail.com",
            "activo": True
        },

        {
            "nombre": "Carlos Ruiz",
            "correo": "carlos@gmail.com",
            "activo": False
        }

    ]


    return render_template(
        "clientes.html",
        clientes=clientes
    )



@app.route("/proveedores")
def proveedores():

    proveedores = [

        {
            "empresa": "Distribuidora Ecuador",
            "telefono": "0999999999"
        },

        {
            "empresa": "Tecnología Nacional",
            "telefono": "0988888888"
        }

    ]


    return render_template(
        "proveedores.html",
        proveedores=proveedores
    )



@app.route("/facturacion")
def facturacion():

    facturas = [

        {
            "numero": "001",
            "cliente": "Juan Pérez",
            "total": 120,
            "pagada": True
        },

        {
            "numero": "002",
            "cliente": "María López",
            "total": 80,
            "pagada": False
        }

    ]


    return render_template(
        "facturacion.html",
        facturas=facturas
    )



if __name__ == "__main__":
    app.run(debug=True)