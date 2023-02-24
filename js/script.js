const listaUsuarios = JSON.parse(sessionStorage.getItem("usuarios")) || [];

class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

const contenedor = document.querySelector('#contenedor');

const opcion = document.querySelector('#opcion');

//POP-UP Inicio de sesion
Swal.fire({
    allowOutsideClick: false,
    title: 'Inicia sesion',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
    <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
    confirmButtonText: 'Ingresar',
    focusConfirm: false,
    preConfirm: () => {
        const login = Swal.getPopup().querySelector('#login').value
        const password = Swal.getPopup().querySelector('#password').value
        if (!login || !password) {
            Swal.showValidationMessage(`Por favor, ingresa un usuario y contraseña`)
        } else {
            login.value = listaUsuarios[0];
            if (login) {
                const persona = new Usuario(login);
                listaUsuarios.push(persona);
                sessionStorage.setItem('usuarios', JSON.stringify(listaUsuarios))
            }
        }
        return { login: login, password: password }
    }
}).then((result) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te has registrado correctamente.',
        showConfirmButton: false,
        timer: 1500
    })
})

opcion.addEventListener('change', () => {
    switch (opcion.value) {
        case "1":
            contenedor.innerHTML = `
                    <label>Ingrese el precio del producto</label>
                    <br>
                    <input id="precio">
                    <br>
                    <label>Ingrese el dinero invertido en el producto</label>
                    <br>
                    <input id="inversion">
                    <br>
                    <br>
                    <button id="calcular">Calcular</button>
            `
            let btn_calcular = document.querySelector('#calcular')
            btn_calcular.onclick = () => {
                let valorProducto = document.querySelector("#precio").value;
                let dineroInvertido = document.querySelector("#inversion").value;
                let ganancia = restar(valorProducto, dineroInvertido);
                let h3 = document.createElement("h3");
                h3.innerHTML = `El valor del producto ingresado es: ${valorProducto}, el dinero que invirtio es: ${dineroInvertido}, y su ganancia fue de: ${ganancia}`
                contenedor.append(h3);
            }
            break;
        case "2":
            contenedor.innerHTML = `
                    <label>Ingrese el costo del producto</label>
                    <br>
                    <input id="costo">
                    <br>
                    <label>Indique el porcentaje de descuento que quiere ofrecer</label>
                    <br>
                    <input id="porcentaje">
                    <br>
                    <br>
                    <button id="calcular">Calcular</button>
            `
            let boton_calcular = document.querySelector('#calcular')
            boton_calcular.onclick = () => {
                let valorDescontado = 0;
                let productoDescontado = 0;
                let valorProducto = document.querySelector("#costo").value;
                let porcentaje = document.querySelector("#porcentaje").value;
                valorDescontado = descuento(valorProducto, porcentaje);
                productoDescontado = restar(valorProducto, valorDescontado);
                let h3 = document.createElement("h3");
                h3.innerHTML = `Se desconto el ${porcentaje}% del total del producto quedando en: ${productoDescontado}`;
                contenedor.append(h3)
            }
            break;
        case "3":
            contenedor.innerHTML = "";
            let parrafo = document.createElement("p");
            parrafo.innerHTML = "Esta es la lista de Usuarios ingresados: ";
            contenedor.appendChild(parrafo);
            let listaPersonas = document.createElement("ol");
            for (let i = 0; i < listaUsuarios.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = JSON.stringify(listaUsuarios[i]);
                listaPersonas.appendChild(li);
            }
            contenedor.appendChild(listaPersonas);
            break;
        case "4":
            contenedor.innerHTML = `
                <label>Cuanto queres cobrar?</label>
                <br>
                <input id="cobro">
                <br>
                <label>Indique el modo de pago</label>
                <br>
                <select name="opcion" id="opcion">
                    <option value="default">Elija una opcion</option>
                    <option id="checkout" value="1">Checkout Tienda online</option>
                    <option id="link" value="2">Link de pago</option>
                    <option id="codigoQR" value="3">Codigo QR</option>
                </select>
                <br>
                <label>Cuando queres recibir el dinero?</label>
                <br>
                <select name="opcion" id="opcion">
                    <option value="default">Elija una opcion</option>
                    <option id="dia1" value="1">En el momento</option>
                    <option id="dia10" value="2">En 10 dias</option>
                    <option id="dia21" value="3">En 21 dias</option>
                </select>
                <br>
                <br>
                <button id="calcular">Calcular</button>
            `
            fetch('/PFJS-GARRIDO2/data.json')
                .then((res) => res.json())
                .then((data) => {

                    data.forEach((tasa) => {
                        let boton_calcular = document.querySelector('#calcular')
                        boton_calcular.onclick = () => {
                            let cobro = document.querySelector("#cobro");
                            let tasaLiberacion = tasa.porcentajeTasa;
                            let resultado = descuento(cobro, tasaLiberacion);
                            let descuentoTasa = restar(cobro, resultado);
                            let h3 = document.createElement("h3");
                            h3.innerHTML = `Recibiras un total de $${resultado}.
                            <br>
                            Tasa de liberacion: ${descuentoTasa}
                            ${tasaLiberacion} + IVA
                            `;
                            contenedor.append(h3);
                        }
                    })
                    
                })
            break;
    }
});

function restar(valor1, valor2) {
    let total = valor1 - valor2;
    return total;
}
function descuento(valor1, valor2) {
    let total = (valor1 * valor2) / 100;
    return total;
}

