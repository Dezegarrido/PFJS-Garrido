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
    allowOutsideClick : false,
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
            contenedor.innerHTML = "";
            let porcentaje = 0;
            let valorDescontado = 0;
            let productoDescontado = 0;
            let costoProducto = document.getElementById("costoProducto");
            valorProducto = prompt("Ingrese el valor de su producto");
            porcentaje = prompt("Indique el porcentaje de descuento que quiere ofrecer");
            valorDescontado = descuento(valorProducto, porcentaje);
            productoDescontado = restar(valorProducto, valorDescontado);
            costoProducto.innerHTML = "Se desconto el " + porcentaje + "%" + " del total del producto quedando en: " + productoDescontado;
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
    }
});

// do {
//     opcion = prompt("Elija una opcion: 1) Ganancia a partir del valor de su producto y el dinero invertido. 2) Valor de su producto indicando porcentaje de descuento. 3) Ingrese otro usuario. 4) Ver lista de usuarios. salir) Para terminar el proceso.");
//     switch (opcion) {
//         case "1":
//             let dineroInvertido = 0;
//             let ganancia = 0;
//             let gananciaPlata = document.getElementById("gananciaPlata");
//             valorProducto = prompt("Ingrese el precio del producto");
//             dineroInvertido = prompt("Ingrese el dinero invertido en el producto");
//             ganancia = restar(valorProducto, dineroInvertido);
//             gananciaPlata.innerHTML = "El valor del producto ingresado es: " + valorProducto + ", el dinero que invirtio es: " + dineroInvertido + " y su ganancia fue de: " + ganancia;
//             break;
//         case "2":
//             let porcentaje = 0;
//             let valorDescontado = 0;
//             let productoDescontado = 0;
//             let costoProducto = document.getElementById("costoProducto");
//             valorProducto = prompt("Ingrese el valor de su producto");
//             porcentaje = prompt("Indique el porcentaje de descuento que quiere ofrecer");
//             valorDescontado = descuento(valorProducto, porcentaje);
//             productoDescontado = restar(valorProducto, valorDescontado);
//             costoProducto.innerHTML = "Se desconto el " + porcentaje + "%" + " del total del producto quedando en: " + productoDescontado;
//             break;
//         case "3":
//             let persona2 = new Usuario(nombre = prompt("Ingrese su nombre"), edad = prompt("Ingrese su edad"), producto = prompt("Ingrese el producto a vender"), email = prompt("Ingrese su email"));
//             listaUsuarios.push(persona2);
//         case "4":
//             let parrafo = document.createElement("p");
//             parrafo.innerHTML = "Esta es la lista de Usuarios ingresados: ";
//             document.body.append(parrafo);
//             let listaPersonas = document.createElement("div");
//             document.body.append(listaPersonas);
//             for (let i = 0; i < listaUsuarios.length; i++) {
//                 let li = document.createElement("li");
//                 li.innerHTML = JSON.stringify(listaUsuarios[i]);
//                 listaPersonas.appendChild(li);
//             }
//         case "salir":
//             break;
//         default:
//             alert("Ingrese una opcion valida!");
//     }
// } while (opcion != "salir");

function restar(valor1, valor2) {
    let total = valor1 - valor2;
    return total;
}
function descuento(valor1, valor2) {
    let total = (valor1 * valor2) / 100;
    return total;
}

