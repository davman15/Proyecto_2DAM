var arrayArrays = new Array();
var arrayArrays2 = new Array();
var contador = 0;
var usuarioLlamado = "brian"

//var nombre = resultadoBuscar.value;
$(document).ready(function () {
    var contador2 = 0;
    var miTop = document.getElementById("miTop");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user.displayName) {
            db.collection("Usuarios").doc(usuarioLlamado).collection("TopAnime").orderBy('nombreAnime', 'desc')
                .get().then((querySnapshot) => {
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
                            '</div>' +
                            '<div class="col-6 ajustarScore mt-2">' +
                            '<span class="text-light" style="font-size:20px"><b>Score: </b></span>' + '<span class="text-light" style="font-size:40px"><b>' + doc.data().nota + '</b></span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-12"><hr></div></div>';
                        miTop.insertAdjacentHTML('beforeend', contenidoMitop);
                        contador2++;
                    });

                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    });
});
