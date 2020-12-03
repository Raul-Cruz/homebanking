function loguear() {

    let _arregloPersona = JSON.parse(localStorage.getItem("personaKey"));

    let nombreUs = document.getElementById('nombreUs').value;
    let passwordUs = document.getElementById('passwordUs').value;

    let _arregloNuevo = _arregloPersona.filter(function (cliente) {
        return cliente.usuario === nombreUs && cliente.password == passwordUs
        
    });

    if (_arregloNuevo.length > 0) {
        localStorage.setItem("personaLogin", JSON.stringify(_arregloNuevo));
        window.location = "cliente.html";
        // arregloPersonas.push(_arregloNuevo);
        
    } else {
        alert("Usuario no Registrado o no se encuentra activo");
    }

    
}


function dibujarInfoCliente() {
    let _arregloPersona = JSON.parse(localStorage.getItem("personaLogin"));

        let h5=`
        <div class="d-flex row">
        <div class="col-lg-6 col-md-12 col-sm-12">
        <h5 class="text-center">
        <h6>Nombre: ${_arregloPersona[0].nombre+" "+_arregloPersona[0].apellido}</h6>
        <h6>DNI: ${_arregloPersona[0].dni}
        <h6>Edad: ${_arregloPersona[0].edad}
        <h6>Direccion: ${_arregloPersona[0].domicilio}
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12">
        <h6>Teléfono de contacto: ${_arregloPersona[0].telefono}
        <h6>CBU: ${_arregloPersona[0].cbu}
        <h6>Cuenta: ${_arregloPersona[0].cuenta}
        <h6>Monto: $${_arregloPersona[0].monto}

        </div>
        </div>

        `

        let cardbody = document.getElementById("cardbody");
        cardbody.innerHTML += h5;
    
}
dibujarInfoCliente()


function logoOut() {
    let arregloPersonas = [];
    // Esta funcion borra el objeto del arreglo
    if (localStorage.length > 0 && arregloPersonas.length == 0) {
        arregloPersonas = JSON.parse(localStorage.getItem("personaLogin"));
    }
    window.location = "index.html";
    Navigate();
    localStorage.removeItem(personaLogin);

}
function Navigate() {
    window.location.replace('index.html');
    return false;
}

