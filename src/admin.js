class Persona {
    constructor(nombre, apellido, dni, edad, domicilio, telefono, password, estado) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.edad = edad;
        this.domicilio = domicilio;
        this.telefono = telefono;
        this.password = password;
        this.estado = estado;

    }
}

class Cliente extends Persona {
    constructor(nombre, apellido, dni, edad, domicilio, telefono, password, estado, usuario, cbu, cuenta, monto, prestamos, observacion) {
        super(nombre, apellido, dni, edad, domicilio, telefono, password, estado)
        this.usuario = usuario;
        this.cbu = cbu;
        this.cuenta = cuenta;
        this.monto = monto;
        this.prestamos = prestamos;
        this.observacion = observacion;
    }
}


// este arreglo contendra todos los objetos usuarios
var arregloPersonas = [];

var existe = false;

//si el localstorage tiene datos y el arreglo de usuarios esta vacio, debo asignar al arreglo los valores que estan en el localstorage
if (localStorage.length > 0 && arregloPersonas.length == 0) {
    arregloPersonas = JSON.parse(localStorage.getItem("personaKey"));
}

leerDatos();

function agregarPersona() {
    //el objetivo de esta funcion es agregar un usuario nuevo
    //traigo los valores cargados en el formulario
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let edad = document.getElementById("edad").value;
    let domicilio = document.getElementById("domicilio").value;
    let telefono = document.getElementById("telefono").value;
    let password = document.getElementById("password").value;
    let estado = "pendiente";
    limpiarFormulario();

    let nuevaPersona = new Persona(nombre, apellido, dni, edad, domicilio, telefono, password, estado);
    //guardo el objeto en el arreglo.
    arregloPersonas.push(nuevaPersona);
    //guardar en localstorage
    localStorage.setItem("personaKey", JSON.stringify(arregloPersonas));
    //limpiar los datos ingresados en el formulario
    //leo los datos guardados
    leerDatos();
    //cierra la ventana modal
    //$(ventanaModal).modal('hide');

}
function agregarCliente() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let edad = document.getElementById("edad").value;
    let domicilio = document.getElementById("domicilio").value;
    let telefono = document.getElementById("telefono").value;
    let password = document.getElementById("password").value;
    let estado = "aprobado";
    let usuario = document.getElementById("usuario").value;
    let cbu = document.getElementById("cbu").value;
    let cuenta = document.getElementById("cuenta");
    let monto = document.getElementById("monto");
    let prestamos = document.getElementById("prestamos").value;

    let nuevoCliente = new Cliente(nombre, apellido, dni, edad, domicilio, telefono, password, estado, usuario, cbu, cuenta, monto, prestamos);

    arregloPersonas.push(nuevoCliente);
    localStorage.setItem("personaKey", JSON.stringify(arregloPersonas));
    limpiarFormulario();
    leerDatos();
}
function cambioDeEstado(){
    let _personas = localStorage.getItem("personaKey");
        let arregloPersonas = JSON.parse(_personas);
        arregloPersonas.estado=data-id.value;
}


function limpiarFormulario() {
    //esta funcion se encarga de borrar los valores que quedaron cargados en el formulario
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("dni").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("domicilio").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("password").value = "";
    arregloPersonas.estado = "";

    //pongo en falso la variable existe
    existe = false;
}

function leerDatos() {
    //esta funcion se encarga de leer los datos del localstorage 
    if (localStorage.length > 0) {
        // let _personas = JSON.parse(localStorage.getItem("personaKey"));
        //borrar todos las filas de la tabla
        let _personas = localStorage.getItem("personaKey");
        let arregloPersonas = JSON.parse(_personas);
        borrarFilas();
        
        dibujarTabla(arregloPersonas);
    }
}

function dibujarTabla(_personas) {
    borrarFilas();
    //esta funcion se encarga de agregar los datos que recibe por parametro en la tabla
    //cargar datos en la tabla
    let tbody = document.getElementById("tbody");
    let tbodyCli = document.getElementById("tbodyCli");
    let tbodyRech = document.getElementById("tbodyRech");


    for (i in _personas) {
    
        if (_personas[i].estado == "pendiente" || _personas[i].estado == "rechazado") {
            
            let tr = document.createElement("tr");

            // creo las celdas necesarias
            let tdNombre = document.createElement("td");
            let tdApellido = document.createElement("td");
            let tdDni = document.createElement("td");
            let tdEdad = document.createElement("td");
            let tdDomicilio = document.createElement("td");
            let tdTelefono = document.createElement("td");
            let tdEstado = document.createElement("td");
            let tdPassword = document.createElement("td");
            let tdBotones = document.createElement("td");
            //crear los botones de eliminar y modificar
            let botonEliminar = document.createElement("button");
            botonEliminar.className = "btn btn-sm btn-outline-danger mr-2 p-0 border-0 "
            botonEliminar.innerText = "Eliminar"
            botonEliminar.id = _personas[i].dni;
            botonEliminar.addEventListener("click", eliminar);

            let botonModificar = document.createElement("button");
            botonModificar.className = "btn btn-sm btn-outline-info p-0 border-0 "
            botonModificar.innerText = "modificar"
            botonModificar.id = _personas[i].dni;
            botonModificar.addEventListener("click", aceptar);
            botonModificar.setAttribute("data-toggle", "modal");
            botonModificar.setAttribute("data-target", "#exampleModal");

            //agregar valores a las celdas

            tdNombre.innerText = _personas[i].nombre;
            tdApellido.innerText = _personas[i].apellido;
            tdDni.innerText = _personas[i].dni;
            tdEdad.innerText = _personas[i].edad;
            tdDomicilio.innerText = _personas[i].domicilio;
            tdTelefono.innerText = _personas[i].telefono;
            tdEstado.innerText = _personas[i].estado;
            tdPassword.innerText = _personas[i].password;
            // tdObservacion.innerText = _personas[i].observacion;

            tdBotones.appendChild(botonEliminar);
            tdBotones.appendChild(botonModificar);

            //agregar a la tabla la filla y las celdas dentro de esa fila

            tr.appendChild(tdNombre);
            tr.appendChild(tdApellido);
            tr.appendChild(tdDni);
            tr.appendChild(tdEdad);
            tr.appendChild(tdDomicilio);
            tr.appendChild(tdTelefono);
            tr.appendChild(tdEstado);
            tr.appendChild(tdPassword);
            tr.appendChild(tdBotones);

            if (_personas[i].estado == "pendiente") {

                tbody.appendChild(tr);
            } else if (_personas[i].estado == "rechazado") {
                tbodyRech.appendChild(tr);
            }
        }
        else if (_personas[i].estado == "aprobado") {

            //for (i in _personas) {

                let tr = document.createElement("tr");

                // creo las celdas necesarias
                let tdNombre = document.createElement("td");
                let tdApellido = document.createElement("td");
                let tdDni = document.createElement("td");
                let tdEdad = document.createElement("td");
                let tdDomicilio = document.createElement("td");
                let tdTelefono = document.createElement("td");
                let tdEstado = document.createElement("td");
                let tdPassword = document.createElement("td");
                let tdUsuario = document.createElement("td");
                let tdCbu = document.createElement("td");
                let tdCuenta = document.createElement("td");
                let tdMonto = document.createElement("td");
                let tdPrestamos = document.createElement("td");
                let tdObservacion = document.createElement("td");
                let tdBotones = document.createElement("td");

                //crear los botones de eliminar y modificar
                let botonEliminar = document.createElement("button");
                botonEliminar.className = "btn btn-sm btn-outline-danger mr-2 p-0 border-0"
                botonEliminar.innerText = "Eliminar"
                botonEliminar.id = _personas[i].dni;
                botonEliminar.addEventListener("click", eliminar);

                let botonModificar = document.createElement("button");
                botonModificar.className = "btn btn-sm btn-outline-info p-0 border-0"
                botonModificar.innerText = "modificar"
                botonModificar.id = _personas[i].dni;
                botonModificar.addEventListener("click", aceptar);
                botonModificar.setAttribute("data-toggle", "modal");
                botonModificar.setAttribute("data-target", "#exampleModal");

                //agregar valores a las celdas

                tdNombre.innerText = _personas[i].nombre;
                tdApellido.innerText = _personas[i].apellido;
                tdDni.innerText = _personas[i].dni;
                tdEdad.innerText = _personas[i].edad;
                tdDomicilio.innerText = _personas[i].domicilio;
                tdTelefono.innerText = _personas[i].telefono;
                tdEstado.innerText = _personas[i].estado;
                tdPassword.innerText = _personas[i].password;
                tdUsuario.innerText = _personas[i].usuario;
                tdCbu.innerText = _personas[i].cbu;
                tdCuenta.innerText = _personas[i].cuenta;
                tdMonto.innerText = _personas[i].monto;
                tdPrestamos.innerText = _personas[i].prestamos;
                tdObservacion.innerText = _personas[i].observacion;
                // tdObservacion.innerText = _personas[i].observacion;

                tdBotones.appendChild(botonEliminar);
                tdBotones.appendChild(botonModificar);

                //agregar a la tabla la filla y las celdas dentro de esa fila

                tr.appendChild(tdNombre);
                tr.appendChild(tdApellido);
                tr.appendChild(tdDni);
                tr.appendChild(tdEdad);
                tr.appendChild(tdDomicilio);
                tr.appendChild(tdTelefono);
                tr.appendChild(tdEstado);
                tr.appendChild(tdPassword);
                tr.appendChild(tdUsuario);
                tr.appendChild(tdCbu);
                tr.appendChild(tdCuenta);
                tr.appendChild(tdMonto);
                tr.appendChild(tdPrestamos);
                tr.appendChild(tdObservacion);
                tr.appendChild(tdBotones);

                tbodyCli.appendChild(tr);
            //}

        }
    }
}

function borrarFilas() {
    let tbody = document.getElementById("tbody");
    let tbodyCli = document.getElementById("tbodyCli");
    let tbodyRech = document.getElementById("tbodyRech");
    if (tbody.children.length > 0 ) {
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }else if (tbodyCli.children.length > 0){
        while(tbodyCli.firstChild){
            tbodyCli.removeChild(tbodyCli.firstChild)
        }
    }else if(tbodyRech.children.length > 0){
        while(tbodyRech.firstChild){
                tbodyRech.removeChild(tbodyRech.firstChild)
        }
    }
}

function eliminar() {
    // Esta funcion borra el objeto del arreglo
    let dni = this.id;
    if (localStorage.length > 0 && arregloPersonas.length == 0) {
        arregloPersonas = JSON.parse(localStorage.getItem("personaKey"));
    }
    //buscar el objeto que quiero eliminar
    let objetoEncontrado = arregloPersonas.filter(function (persona) {
        return persona.dni != dni;
    });
    arregloPersonas = objetoEncontrado;
    localStorage.setItem("personaKey", JSON.stringify(arregloPersonas));
    leerDatos();
    //borrar el objeto con id

}
function aceptar() {
    // borrarFilas();
    limpiarFormulario();
    borrarFilas();
    let arregloPersonas = JSON.parse(localStorage.getItem("personaKey"));
    let dni = this.id;
    let objetoEncontrado = arregloPersonas.filter(function (persona) {
        return persona.dni == dni;
    });
    document.getElementById("dni").value = objetoEncontrado[0].dni;
    nombre = document.getElementById("nombre").value = objetoEncontrado[0].nombre;
    apellido = document.getElementById("apellido").value = objetoEncontrado[0].apellido;
    edad = document.getElementById("edad").value = objetoEncontrado[0].edad;
    domicilio = document.getElementById("domicilio").value = objetoEncontrado[0].domicilio;
    telefono = document.getElementById("telefono").value = objetoEncontrado[0].telefono;
    estado = objetoEncontrado[0].estado;
    password = document.getElementById("password").value = objetoEncontrado[0].password;
    usuario = document.getElementById("usuario").value = objetoEncontrado[0].usuario;
    cbu = document.getElementById("cbu").value = objetoEncontrado[0].cbu;
    cuenta = document.getElementById("cuenta").value = objetoEncontrado[0].cuenta;
    monto = document.getElementById("monto").value = objetoEncontrado[0].monto;
    prestamos = document.getElementById("prestamos").value = objetoEncontrado[0].prestamos;
    observacion = document.getElementById("observacion").value = objetoEncontrado[0].observacion;
    // let ventanaModal = document.getElementById("exampleModal");
    existe = true;
    // $(ventanaModal).modal('show');

}

function guardarDatos() {
    if (existe == false) {
        //agregar un usuario nuevo
        agregarPersona();
    } else {
        //modificar un usuario existente
        guardarPersonaModificado();
    }
}

function guardarPersonaModificado() {
    borrarFilas();
    //esta funcion se encarga de guardar los cambios realizados en el objeto modificado
    let arregloPersonas = JSON.parse(localStorage.getItem("personaKey"));

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let edad = document.getElementById("edad").value;
    let domicilio = document.getElementById("domicilio").value;
    let telefono = document.getElementById("telefono").value;
    let estado = document.getElementById("estado").value;
    let password = document.getElementById("password").value;
    let usuario = document.getElementById("usuario").value;
    let cbu = document.getElementById("cbu").value;
    let cuenta = document.getElementById("cuenta").value;
    let monto = document.getElementById("monto").value;
    let prestamos = document.getElementById("prestamos").value;
    let observacion = document.getElementById("observacion").value;


    // let observacion = document.getElementById('observacion').value;
    //let ventanaModal = document.getElementById("modalUsuario");
    
    
    limpiarFormulario();
    //buscar el objeto que quiero modificar
    for (i in arregloPersonas) {
        if (arregloPersonas[i].dni == dni) {
            arregloPersonas[i].nombre = nombre;
            arregloPersonas[i].apellido = apellido;
            arregloPersonas[i].edad = edad;
            arregloPersonas[i].domicilio = domicilio;
            arregloPersonas[i].telefono = telefono;
            arregloPersonas[i].estado = estado;
            arregloPersonas[i].password = password;
            arregloPersonas[i].usuario = usuario;
            arregloPersonas[i].cbu = cbu;
            arregloPersonas[i].cuenta = cuenta;
            arregloPersonas[i].monto = monto;
            arregloPersonas[i].prestamos = prestamos;
            arregloPersonas[i].observacion = observacion;
            // arregloPersonas[i].observacion = observacion;
        }
    }
    //guardar en localstorage
    localStorage.setItem("personaKey", JSON.stringify(arregloPersonas));
    existe = false;
    

    leerDatos();
    // $(ventanaModal).modal('hide');
}