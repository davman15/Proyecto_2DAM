var usuarioBusqueda = document.getElementById("usuarioBusqueda")
var divTop = document.getElementById("usuariosResultados");
//.insertAdjacentHTML("beforeend", sad);
var arrayArrays = new Array();
var arrayArrays2 = new Array();
function buscarUsuario() {
    var contador = 0;
    if ((usuarioBusqueda.value.length >= 1)) {
        divTop.innerHTML = "";

        db.collection("Usuarios").orderBy('usuarioId', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var nombre = usuarioBusqueda.value;
                var idMinuscula = doc.id.toLowerCase()
                if (doc.id.includes(nombre) || idMinuscula.includes(nombre.toLowerCase()) || doc.id.includes(nombre.toUpperCase())) {
                    var contenidoDiv = '<div class="col-2" style="display:flex; align-items:center;">' +
                        '<img style="width:50px; height:50px;" class="ms-4" src="' + doc.data().imagen + '">' +
                        '</div>' +
                        '<div class="col-10 row">' +
                        '<div class="col-6 centrarBoton">' +
                        '<h3>' + doc.data().usuarioId + '</h3>' +
                        '</div>' +
                        '<div class="col-6 centrarBoton">' +
                        '<button id="nombre+' + doc.data().usuarioId + '"  class="btn btn-success ms-auto" onclick="perfilAjeno(this)">Ver Perfil</button>' +
                        '<button id="' + doc.data().usuarioId + '" onclick="seguir(this)" class="btn btn-dark ms-auto">Seguir</button>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-12">' +
                        '<hr>' +
                        '</div>';
                    divTop.insertAdjacentHTML("beforeend", contenidoDiv);
                }
            });
        });
    }
}
function seguir(boton) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var usuariosRef = db.collection('Usuarios').doc(user.displayName).collection('Seguidos');

            var query = usuariosRef.where("usuarioId", "==", boton.id)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        usuariosRef.doc(boton.id).set({
                            usuarioId: boton.id
                        })
                            .then(() => {
                                console.log("añadido correctamente a seguidos");
                                usuariosRef = db.collection('Usuarios').doc(boton.id).collection('Seguidores');
                                usuariosRef.doc(user.displayName).set({
                                    usuarioId: user.displayName
                                })
                                    .then(() => {
                                        console.log("Añadidos correctamente a seguidores");
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Comenzar a seguir',
                                            text: 'Has comenzado a seguir '+boton.id,
                                            width: 600
                                        });
                                    });
                            });
                    } else {
                        querySnapshot.forEach((doc) => {
                            usuariosRef.doc(boton.id).delete().then(() => {

                                console.log("Document successfully deleted!");

                                usuariosRef = db.collection('Usuarios').doc(boton.id).collection('Seguidores');
                                usuariosRef.doc(user.displayName).delete().then(() => {
                                    console.log("Document successfully deleted!");
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Dejar de seguir',
                                        text: 'Has dejado de seguir a '+boton.id,
                                        width: 600
                                    });
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                });


                            }).catch((error) => {
                                console.error("Error removing document: ", error);
                            });
                        });
                    }

                });
            
        }
    });
}



$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var usuariosRef = db.collection('Usuarios');
            var query = usuariosRef.where('usuarioId', '==', user.displayName)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        document.body.style.backgroundImage = 'url("' + doc.data().fondo + '")';
                    });
                });
        } else {

        }
    });
    var contador2 = 0;
    var miTop = document.getElementById("miTop");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var usuarioRef = db.collection('Usuarios')
            var query = usuarioRef.orderBy('usuarioId', 'desc')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var contenidoMitop = '<div id="div' + contador2 + '"><div class="col-12 centrar">' +
                            '<img src="' + doc.data().imagenAnime + '">' +
                            '</div>' +
                            '<div class="col-12 row centrar" style="margin-left:0px;">' +
                            '<div class="col-12 centrar text-center">' +
                            '<h3 class="text-light">' + doc.data().nombreAnime + '</h3>' +
                            '</div>' +
                            '<div class="col-12 centrar">' +
                            '<p class="text-light">' + doc.data().descripcion + '</p>' +
                            '</div>' +
                            '<div class="col-6 row ">' +
                            '<div class="col-12 ajustarUrl">' +
                            '<a href="' + doc.data().enlaceAnimeList + '" style="color:white;"><b>Más información...</b></a><br>' +
                            '</div>' +
                            '<div class="col-12 mt-2">' +
                            '<button id="' + contador2 + '" class="btn btn-danger" onclick="eliminar(this)">Eliminar</button>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-6 ajustarScore mt-2">' +
                            '<span class="text-light" style="font-size:20px"><b>Score: </b></span>' + '<span class="text-light" style="font-size:40px"><b>' + doc.data().nota + '</b></span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-12"><hr></div></div>';

                        miTop.insertAdjacentHTML('beforeend', contenidoMitop);
                        arrayArrays2.push({
                            nombreRest: doc.data().nombreAnime
                        });
                        contador2++;
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

        }
    });
});

function eliminar(boton) {
    var iddiv = "div" + boton.id;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("Usuarios").doc(user.displayName).collection('TopAnime').doc(arrayArrays2[boton.id].nombreRest).delete().then(() => {
                console.log("Document successfully deleted!");
                document.getElementById(iddiv).innerHTML = "";
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    });
}
function cerrarSesion() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
function perfilAjeno(boton) {
    var nombre = boton.id;
    nombre = nombre.substring(7);
    console.log("hola");
    if (typeof (Storage) !== 'undefined') {
        console.log("localstorage disponible");
    } else {
        console.log("localstorage no disponible");
    }


    //guardar datos 
    localStorage.setItem("titulo", nombre);

    //recuperar elemento

    console.log(localStorage.getItem("titulo"));
    window.location.href = "perfilAjeno.html";
}