var resultadoBuscar = document.getElementById("inputAnimeBusqueda");
var divTop = document.getElementById("animesResultados");
//.insertAdjacentHTML("beforeend", sad);
var arrayArrays = new Array();
var arrayArrays2 = new Array();
function buscarAnime() {
    var contador = 0;
    if (!(resultadoBuscar.value.length < 3)) {
        divTop.innerHTML = "";
        
        var nombre = resultadoBuscar.value;
        $.get("https://api.jikan.moe/v3/search/anime", { q: nombre },
            function (responde) {
                console.log(responde);
                arrayArrays.length=0;;
                responde.results.forEach((element, index) => {
                    var nombreRest = element.title;
                    var url = element.url;
                    var descripcion = element.synopsis;
                    var fotoAnime = element.image_url;
                    var numeroEp = element.episodes;
                    var nota = element.score;
                    var contenidoDiv = '<div class="col-4">' +
                        '<img src="' + fotoAnime + '">' +
                        '</div>' +
                        '<div class="col-8 row">' +
                        '<div class="col-12">' +
                        '<h2>' + nombreRest + '</h2>' +
                        '</div>' +
                        '<div class="col-12">' +
                        '<p>' + descripcion + '</p>' +
                        '</div>' +
                        '<div class="col-12 row">' +
                        '<span><b>Número de episodios: </b>' + numeroEp + '</span>' +
                        '</div>' +
                        '<div class="col-6 row ">' +
                        '<div class="col-12 ajustarUrl">' +
                        '<a href="' + url + '" style="color:black;"><b>Más información...</b></a><br>' +
                        '</div>' +
                        '<div class="col-12">' +
                        '<button id="' + contador + '" class="btn btn-success" onclick="añadirAnimeTop(this)">Añadir al Top</button>' +
                        '</div>' +

                        '</div>' +
                        '<div class="col-6 ajustarScore">' +
                        '<span style="font-size:20px"><b>Score: </b></span>' + '<span style="font-size:40px"><b>' + nota + '</b></span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-12"><hr></div>';
                    divTop.insertAdjacentHTML("beforeend", contenidoDiv);
                    arrayArrays.push({
                        nombreRest: element.title,
                        url: element.url,
                        descripcion: element.synopsis,
                        fotoAnime: element.image_url,
                        numeroEp: element.episodes,
                        nota: element.score
                    });
                    contador++;
                });
                console.log(arrayArrays);
            });
    }
}

function añadirAnimeTop(boton) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var usuarioRef = db.collection('Usuarios').doc(user.displayName).collection('TopAnime');
            usuarioRef.doc(arrayArrays[boton.id].nombreRest).set({
                nombreAnime: arrayArrays[boton.id].nombreRest,
                imagenAnime: arrayArrays[boton.id].fotoAnime,
                enlaceAnimeList: arrayArrays[boton.id].url,
                episodios: arrayArrays[boton.id].numeroEp,
                nota: arrayArrays[boton.id].nota,
                descripcion: arrayArrays[boton.id].descripcion

            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
    });
}
$(document).ready(function () {
    var contador2 = 0;
    var miTop = document.getElementById("miTop");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var usuarioRef = db.collection('Usuarios').doc(user.displayName).collection('TopAnime');
            var query = usuarioRef.orderBy('nombreAnime', 'desc')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var contenidoMitop = '<div id="div'+contador2+'"><div class="col-12 centrar">' +
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
    var iddiv="div"+boton.id;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            db.collection("Usuarios").doc(user.displayName).collection('TopAnime').doc(arrayArrays2[boton.id].nombreRest).delete().then(() => {
                console.log("Document successfully deleted!");
                document.getElementById(iddiv).innerHTML="";
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    });
}