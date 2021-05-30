var arrayDivs = new Array();
var arrayInputs = new Array();
var arrayPublicacion = new Array();
var nombreDelAutorOpinion;
var arrayComentarios = new Array();
$(document).ready(function () {
    var imagenPerfil = document.getElementById("imagenPerfil");
    var todasLasPublicaciones = new Array();
    var contadorArray = 0;
    var urlImagenPost = "";
    var descripcionPost = "";
    var nombrePost = "";
    var contador = 0;
    var variablePerfil = "HOLA";
    /** esta fecha es para haer la diferencia */
    var fecha = new Date();
    var contenidoOpinion = "";
    var contadorOpinion = 0;
    var fotPerfilComentario = "";
    var fechaComent;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            // creamos la referencia a la colección
            var usuariosRef = db.collection("Usuarios");

            // creamos la query
            var query = usuariosRef.where("usuarioId", "==", user.displayName)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        imagenPerfil.setAttribute("src", doc.data().imagen);
                        document.getElementById("firebaseNombre").innerHTML = doc.data().nombreUsuario;
                        document.getElementById("labelDescripcion").innerHTML = doc.data().descripcion;
                        nombreDelAutorOpinion = doc.data().usuarioId;
                        //creamos la referencia a la coleccion de publicaciones
                        var divCentro = document.getElementById("fotos");
                        var contentFotos = "";
                        var publicacionesRef = db.collection("Publicaciones");

                        var query2 = publicacionesRef.orderBy("fecha", "desc")
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    urlImagenPost = doc.data().foto;
                                    descripcionPost = doc.data().post;
                                    nombrePost = doc.data().usuarioNombre;
                                    var query3 = usuariosRef.where("usuarioId", "==", doc.data().usuarioNombre)
                                        .get()
                                        .then((querySnapshot) => {

                                            querySnapshot.forEach((doc) => {
                                                variablePerfil = doc.data().imagen;



                                            });
                                            var idPublicacion = doc.id;
                                            var fecha2 = doc.data().fecha.toDate();
                                            var diferenciaFecha = Math.abs(fecha - fecha2);
                                            var days = diferenciaFecha / (1000 * 3600 * 24);

                                            var idDiv = idPublicacion + contador + "0";
                                            var idTextFiled = idPublicacion + contador;
                                            var idBoton = "boton" + contador;
                                            arrayDivs.push(idDiv);
                                            arrayInputs.push(idTextFiled);
                                            arrayPublicacion.push(idPublicacion);

                                            contentFotos = contentFotos + '<div class="col-8 alinearDerecha box2"><img id="' + contador + '" style="width: 50px; height: 50px;" class="rounded-circle mt-3" src="' + variablePerfil + '"><div class=" nombre mr-4"><h4 class="text-light m-4">' + doc.data().usuarioNombre + '</h4></div></div>' +
                                                '<div class="col-12 alinearDerecha mb-2"><span class="text-light tituloPublicacion">' + doc.data().titulo + '</span></div>' +
                                                '<div class="col-12 nombre mt-1"><p class="text-light editarP">' + doc.data().post + '</p></div>' +
                                                '<img style="height:auto;" src="' + doc.data().foto + '"><br>' +
                                                '<div class="col-4 mt-2 alinearDerecha"><a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">' +
                                                '<path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>' +
                                                '</svg></div></a>' +
                                                '<div class="col-8 alinearIzquierda mt-2"><button type="button" class="btn btn-dark" style="margin-right:15px;">Favorito</button><button type="button" class="btn btn-danger">Comentarios</button></div>' +
                                                '<div class="col-12 alinearVertical "><span class="text-light mt-3">Hace ' + Math.round(days) + ' días</span></div>' +
                                                '<div class="col-12"><span class="text-light alinearDerecha">Opiniones</span></div>' +
                                                '<div class="col-12"><hr></div>' +
                                                '<div class="col-12 row" id="' + idDiv + '" style="padding-left:0px;"></div>' +
                                                '<div class="col-10"><input id="' + idTextFiled + '" class="c form-control" type="text"></div>' +
                                                '<div class="col-2"><button id="' + idBoton + '" class="btn btn-outline-warning" onclick="agregarComentario(this)">Publicar</button></div>';
                                            divCentro.innerHTML = contentFotos;

                                            /**prueba para ver si funciona lo de los comentarios */
                                            var opinionesRef = db.collection('Publicaciones').doc(idPublicacion).collection('opiniones');
                                            var query4 = opinionesRef.orderBy("fechaComentario", "asc")
                                                .get()
                                                .then((querySnapshot) => {


                                                    querySnapshot.forEach((doc) => {
                                                        /**query para establecer la foto de perfil */
                                                        var nomDelUsuarioP = doc.data().nombre;
                                                        
                                                        var query5 = usuariosRef.where("usuarioId", "==", doc.data().nombre)
                                                            .get()
                                                            .then((querySnapshot) => {


                                                                querySnapshot.forEach((doc1) => {
                                                                    fotPerfilComentario = doc1.data().imagen;

                                                                });
                                                                fechaComent = doc.data().fechaComentario.toDate();
                                                                contenidoOpinion = '<div class=" col-1 alinearDerecha2 box2 mt-2 mb-2" style="padding-right: 50px !important; "><img class="borderFotoOp" style="width:35px; height:35px;" src="' + fotPerfilComentario + '"></div>' +
                                                                    '<div class="col-11 mt-2 mb-2 row" style="padding-left: 0px !important;">' +
                                                                    '<div class="col-12 alinearDerecha"><span class="text-light" style="font-weight: bold;">' + doc.data().nombre + '</span><div><span class="text-light" style="font-size:10px; margin-left:7px;">' + fechaComent.toLocaleString() + '</span></div></div>' +
                                                                    '<div class="col-12 alinearDerecha saltoLinea text-light">' + doc.data().texto + '</div>' +
                                                                    '</div>';
                                                                document.getElementById(idDiv).insertAdjacentHTML("afterend", contenidoOpinion);
                                                                contadorOpinion++;
                                                                fotPerfilComentario = "";


                                                            })
                                                            .catch((error) => {
                                                                console.log("Error getting documents: ", error);
                                                            });

                                                    });






                                                })
                                                .catch((error) => {
                                                    console.log("Error getting documents: ", error);
                                                });

                                            contador++;

                                        })
                                        .catch((error) => {
                                            console.log("Error getting documents: ", error);
                                        });



                                    contadorArray++;

                                });
                                todasLasPublicaciones.push("ashke");

                            })
                            .catch((error) => {
                                console.log("Error getting documents: ", error);
                            });



                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });



        } else {

        }
    });
    añadirContactos();
});

function añadirContactos() {
    var fotoTomodachi="";
    var contenidoTomodachi="";
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var ComentRef = db.collection("Usuarios").doc(user.displayName).collection("Seguidores");
            var query6= ComentRef.orderBy("usuarioId","desc")
            .get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc) => {
                    var usuariosRef=db.collection("Usuarios");
                    var query7=usuariosRef.where("usuarioId","==",doc.data().usuarioId)
                    .get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach((doc)=>{
                            fotoTomodachi= doc.data().imagen;
                        });
                        contenidoTomodachi=contenidoTomodachi+'<div class="col-12">'+doc.data().usuarioId+'</div>'+
                        '<div class="col-12"><img style="width:50px; height:50px;" src="'+fotoTomodachi+'"></img>';
                        document.getElementById("tomodachi").innerHTML=contenidoTomodachi;
                        console.log(doc.data().usuarioId);
                    })
                    .catch((error)=>{
                        console.log("Error getting document: ", error);
                    });
                });
            })
            .catch((error)=>{
                console.log("Error getting document: ", error);
            });
        } else {

        }
    });
}

function agregarComentario(boton) {
    var idbot = boton.id + "";
    var numeroId = idbot.substring(5);
    var fechaComentario = new Date();

    var opinionesRef = db.collection('Publicaciones').doc(arrayPublicacion[numeroId]).collection('opiniones');
    var varlorTexto = document.getElementById(arrayInputs[numeroId]).value;
    opinionesRef.add({
        texto: varlorTexto,
        nombre: nombreDelAutorOpinion,
        fechaComentario: fechaComentario
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var textComent = '<div class=" col-1 alinearDerecha2 box2 mt-2 mb-2 " style="padding-right: 50px !important;"><img class="borderFotoOp" style="width:35px; height:35px;" src="' + user.photoURL + '"></div>' +
                '<div class="col-11 mt-2 mb-2 row" style="padding-left: 0px !important;">' +
                '<div class="col-12 alinearDerecha"><span class="text-light" style="font-weight: bold;">' + user.displayName + '</span><div><span class="text-light" style="font-size:10px; margin-left:7px;">' + fechaComentario.toLocaleString() + '</span></div></div>' +
                '<div class="col-12 alinearDerecha saltoLinea text-light">' + varlorTexto + '</div>' +
                '</div>';
            document.getElementById(arrayDivs[numeroId]).insertAdjacentHTML("afterbegin", textComent);
        } else {

        }
    });

    document.getElementById(arrayInputs[numeroId]).value = "";
}
