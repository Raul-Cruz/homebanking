function revisar(elemento) {
    if (elemento.value == "") {
        elemento.className = "form-control is-invalid"
        return false;
    } else {
        elemento.className = "form-control is-valid"
        return true
    }
}
function revisarNumero(elemento) {
    if (elemento.value != "") {
        if (isNaN(elemento.value)) {
            elemento.className = "form-control is-invalid"
            return false;
        } else {
            elemento.className = "form-control is-valid"
            return true;
        }
    }
}
function revisarLongitud(elemento, min) {
    if (elemento.value != "") {
        var data = elemento.value;
        if (data.length < min) {
            elemento.className = "form-control is-invalid"
            console.log("es menor");
            return false;
        } else {
            elemento.className = "form-control is-valid"
            console.log("es mayor");
            return true;
        }
    }
}

// function revisarEmail(elemento) {
//     var exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     if (elemento.value != "") {
//         var data = elemento.value;
//         if (!exp.test(data)) {
//             elemento.className = "form-control is-invalid"
//             return false;
//         } else {
//             elemento.className = "form-control is-valid"
//             return true;
//         }
//     }
// }
function validar() {
    console.log("validando campos...");
    if (revisar(document.getElementById("nombreUs")) && revisar(document.getElementById("password")) 
    && revisarNumero(document.getElementById("nombre")) && revisar(document.getElementById("apellido"))
    && revisar(document.getElementById("dni")) && revisar(document.getElementById("solicitud")) ) {
        datosCorrectos = true;
    } else {
        datosCorrectos = false;
    }
    if (!datosCorrectos) {
        alert("datos incorrectos")
    } else {
        alert("datos correctos")
    }
    return datosCorrectos;
}
//creo una variable global
var datosCorrectos = false;

// agregar un evento desde js

/////////var check = document.getElementById("check");

//ejemplo de funcion anonima
// check.addEventListener("change", function() {
//     if (check.checked) {
//         check.className = "form-check-input is-valid"
//     } else {
//         check.className = "form-check-input is-invalid"
//     }
// });

//////////check.addEventListener("change", verificarcheck);

// function verificarcheck() {
//     var elemento = document.getElementById("check");
//     if (elemento.checked) {
//         elemento.className = "form-check-input is-valid"
//         return true;
//     } else {
//         elemento.className = "form-check-input is-invalid"
//         return false;
//     }
// }