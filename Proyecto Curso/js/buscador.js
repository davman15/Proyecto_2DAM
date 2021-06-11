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
                   var idMinuscula= doc.id.toLowerCase()
                if (doc.id.includes(nombre) || idMinuscula.includes(nombre.toLowerCase()) || doc.id.includes(nombre.toUpperCase())) {
                    var contenidoDiv = '<div class="col-2" style="display:flex; align-items:center;">' +
                    '<img style="width:50px; height:50px;" class="ms-4" src="' + doc.data().imagen + '">' +
                    '</div>' +
                    '<div class="col-10 row">' +
                    '<div class="col-6 centrarBoton">' +
                    '<h4>' + doc.data().usuarioId + '</h4>' +
                    '</div>' +
                    '<div class="col-6 centrarBoton">' +
                    '<button id="' + doc.data().usuarioId + '" onclick="abrirChat(this)" class="btn btn-success ms-auto">Ver Perfil</button>' +
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

$(document).ready(function () {
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