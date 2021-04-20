
document.addEventListener("DOMContentLoaded", function(e) {
    try {    
        document.getElementById("registro_usuarios").addEventListener("submit", function (e){ guardarUsuario(e);});
    } catch {
    }
    try {
        document.getElementById("ingresar").addEventListener("submit", function (e){ validarUsuario(e);});
    } catch {     
    }
}); 

function guardarUsuario (e) {
    var idUsuario = document.getElementById("username").value;
    if(localStorage.getItem(idUsuario) !== undefined && localStorage.getItem(idUsuario)) {
        alert("¡El usuario " + idUsuario + ", ya ha sido registrado!");
        e.preventDefault();
    } else {
        var contrasena = document.getElementById("password").value;
        var contrasena2 = document.getElementById("repit_password").value;
        if (contrasena != contrasena2) {
            alert("¡Las contraseñas no coinciden!");
            e.preventDefault();
        } else {
            var nombre = document.getElementById("name").value;
            var apellidos = document.getElementById("lastname").value;
            if ((idUsuario.trim() == "")||(contrasena.trim() == "")||(nombre.trim() == "")||(apellidos.trim() == "")) {
                alert("¡Debe completar todos los espacios!")
            } else {
                var datos = [idUsuario, contrasena, nombre, apellidos];
                var perfil = idUsuario + ".config";
                localStorage.setItem(perfil,JSON.stringify({nombrecompleto:nombre+" "+apellidos, velocidadpromedio:"0",descripcion:""}));
                localStorage.setItem(idUsuario,JSON.stringify({usuario:idUsuario,contrasena:contrasena,nombre:nombre,apellidos:apellidos}));
                alert("¡El usuario " + idUsuario + ", se ha registrado exitosamente!");
            }
        }
    }
}

function validarUsuario(e) {
    var idUsuario_validar = document.getElementById("username").value;
    var contrasena_validar = document.getElementById("password").value;
    if ((idUsuario_validar.trim() == "")||(contrasena_validar.trim() == "")) {
        alert("¡Debe ingresar el usuario y la contraseña!");
        e.preventDefault();
    } else {
        if(localStorage.getItem(idUsuario_validar) !== undefined) {
            var infoUsuario = JSON.parse(localStorage.getItem(idUsuario_validar));
            if (contrasena_validar == infoUsuario.contrasena) {
                sessionStorage.setItem("username", idUsuario_validar);
                alert("¡Bienvenido (a): "+infoUsuario.nombre+"!");
            } else {
                alert("¡Contraseña o usuario incorrecto!");
                e.preventDefault();
            }
        } else {
            alert("¡El usuario no ha sido registrado, por favor, registrese para poder ingresar a TicoRides!");
            e.preventDefault();
        }
    }
}

function actualizarPerfil() {
    var usuarioBuscar = sessionStorage.getItem("username") + ".config";
    var oUsario = JSON.parse(localStorage.getItem(usuarioBuscar));
    localStorage.setItem(usuarioBuscar,JSON.stringify({nombrecompleto:document.getElementById("name").value, velocidadpromedio:document.getElementById("speed").value,descripcion:document.getElementById("about_me").value}));
    alert("¡Se ha actualizado tu configuración exitosamente!")
    location.reload();
}

function guardarRide() {
    var nombreRide = document.getElementById("ridename").value;
    var usuarioRide = sessionStorage.getItem("username");
    nombreRide = nombreRide + "_" + usuarioRide;
    if(localStorage.getItem(nombreRide) !== undefined && localStorage.getItem(nombreRide)) {
        alert("¡El ride "+document.getElementById("ridename").value+", ya ha sido registrado, por favor, utilice otro identificador para el viaje!");
    } else {
        if ((nombreRide.trim() == "")||(document.getElementById("start").value.trim() == "")||(document.getElementById("end").value.trim() == "")||(document.getElementById("description").value.trim() == "")) {
            alert("¡Debe ingresar todos los campos de información del ride!");
        } else {
            localStorage.setItem(nombreRide,JSON.stringify({usuario:usuarioRide, inicio:document.getElementById("start").value, fin:document.getElementById("end").value, descripcion:document.getElementById("description").value, horaSalida:document.getElementById("start_time").value, horaLlegada:document.getElementById("end_time").value, lunes:document.getElementById("cbLunes").checked, martes:document.getElementById("cbMartes").checked, miercoles:document.getElementById("cbMiercoles").checked, jueves:document.getElementById("cbJueves").checked, viernes:document.getElementById("cbViernes").checked, sabado:document.getElementById("cbSabado").checked, domingo:document.getElementById("cbDomingo").checked}));
            alert("¡El viaje "+document.getElementById("ridename").value+", ha sido registrado exitosamente");
            document.getElementById("agregar_ride").reset();
        }
    }
}

function cargarInfoRide() {
    var nombreRideEditar = document.getElementById("editar_rides").value;
    var ride = JSON.parse(localStorage.getItem(nombreRideEditar));
    document.getElementById("start_edit").value = ride.inicio;
    document.getElementById("end_edit").value = ride.fin;
    document.getElementById("description_edit").value=ride.descripcion;
    document.getElementById("start_time_edit").value = ride.horaSalida;
    document.getElementById("end_time_edit").value = ride.horaLlegada;
    document.getElementById("lunes_edit").checked = ride.lunes;
    document.getElementById("martes_edit").checked = ride.martes;
    document.getElementById("miercoles_edit").checked = ride.miercoles;
    document.getElementById("jueves_edit").checked = ride.jueves;
    document.getElementById("viernes_edit").checked = ride.viernes;
    document.getElementById("sabado_edit").checked = ride.sabado;
    document.getElementById("domingo_edit").checked = ride.domingo;
}

function editarRide() {
    if (confirm("¿Está seguro/a que desea editar el ride?")) {
        var usuarioRide = sessionStorage.getItem("username");
        var nombreRideEditar = document.getElementById("editar_rides").value;
        var ride = JSON.parse(localStorage.getItem(nombreRideEditar));
        if ((document.getElementById("start_edit").value.trim() == "")||(document.getElementById("end_edit").value.trim() == "")||(document.getElementById("description_edit").value.trim() == "")) {
            alert("¡Debe completar todos los campos!")
        } else {
            localStorage.setItem(nombreRideEditar,JSON.stringify({usuario:usuarioRide, inicio:document.getElementById("start_edit").value, fin:document.getElementById("end_edit").value, descripcion:document.getElementById("description_edit").value, horaSalida:document.getElementById("start_time_edit").value, horaLlegada:document.getElementById("end_time_edit").value, lunes:document.getElementById("lunes_edit").checked, martes:document.getElementById("martes_edit").checked, miercoles:document.getElementById("miercoles_edit").checked, jueves:document.getElementById("jueves_edit").checked, viernes:document.getElementById("viernes_edit").checked, sabado:document.getElementById("sabado_edit").checked, domingo:document.getElementById("domingo_edit").checked}));
            alert("¡El viaje "+ document.getElementById("editar_rides").value +", ha sido actualizado exitosamente");
            document.getElementById("form_editar").reset();
        }
    }
}

function eliminarRide() {
    if (confirm("¿Está seguro/a que desea eliminar el ride?")) {
        var nombreRideEditar = document.getElementById("eliminar_rides").value;
        localStorage.removeItem(nombreRideEditar);
        location.reload();
    }
}

function busqueda() {
    localStorage.setItem("inicio", document.getElementById("Origen_viajes").value);
    localStorage.setItem("fin", document.getElementById("Destino_viajes").value)
    window.location.href="rides.html";
}