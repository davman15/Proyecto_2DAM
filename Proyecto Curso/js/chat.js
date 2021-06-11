$(document).ready(function () {
    var divLista = document.getElementById('ListaContactos');
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var usuarioRef = db.collection('Usuarios').doc(user.displayName).collection('Seguidos');
            var query = usuarioRef.orderBy("usuarioId", "desc")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var usuariosRef = db.collection('Usuarios');
                        var query2 = usuariosRef.where("usuarioId", "==", doc.data().usuarioId)
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    var contenidoMiLista =
                                        '<div class="col-2" style="display:flex; align-items:center;">' +
                                        '<img style="width:50px; height:50px;" src="' + doc.data().imagen + '">' +
                                        '</div>' +
                                        '<div class="col-10 row">' +
                                        '<div class="col-6 centrarBoton">' +
                                        '<h4>' + doc.data().nombreUsuario + '</h4>' +
                                        '</div>' +
                                        '<div class="col-6 centrarBoton">' +
                                        '<button id="' + doc.data().usuarioId + '" onclick="abrirChat(this)" class="btn btn-success">Abrir Chat</button>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-12">' +
                                        '<hr>' +
                                        '</div>';
                                    divLista.insertAdjacentHTML('beforeend', contenidoMiLista);

                                });
                            })
                            .catch((error) => {
                                console.log("Error getting documents: ", error);
                            });
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    });

});

function abrirChat(boton) {
    console.log(boton.id);

    var chatIndividual = document.getElementById("chatIndividual");
    chatIndividual.innerHTML = "";
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var usuarioRef = db.collection('Usuarios');
            var query = usuarioRef.where("usuarioId", "==", boton.id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        chatIndividual.style.display = "flex";
                        var contenido = '<div class="col-12 text-center" style="margin-left:0px; height:90%;"> ' +
                            '<div class="col-12 bg-danger row">' +
                            '<div class="col-3">' +
                            '<img style="width:50px; height:50px;" src="' + doc.data().imagen + '">' +
                            '</div>' +
                            '<div class="col-7 centrarBoton">' +
                            '<h4><b>' + doc.data().nombreUsuario + '</b></h4>' +
                            '</div>' +
                            '<div class="col-2">' +
                            '<div class="dropdown">' +
                            '<button class="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">' +
                            '<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>' +
                            '</svg>' +
                            '</button>' +
                            '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">' +
                            '<li role="presentation" class="text-center">' +
                            '<a role="menuitem" tabindex="-1" href="#">Ver Perfil</a>' +
                            '</li>' +
                            '<li role="presentation" class="text-center">' +
                            '<a role="menuitem" tabindex="-1" href="#">Vaciar Chat</a>' +
                            '</li>' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-12 row centrarBoton bg-success h-100">' +
                            '<div class="col-11 centrarBoton fondo row " style="height:80%;" >' +
                            '<div class="scrollDiv col-12 bg-danger pt-3 h-100"  id="divIzquerda-' + doc.data().usuarioId + '">' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-11 row">' +
                            '<div class="col-10">' +
                            '<input type="text" class="form-control" id="input1+' + doc.data().usuarioId + '">' +
                            '</div>' +
                            '<div class="col-2">' +
                            '<button id="btn2' + doc.data().usuarioId + '" class="btn btn-primary" onclick="añadirChat(this)">Enviar</button>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        chatIndividual.insertAdjacentHTML('beforeend', contenido);

                    });
                    var contador3 = 5;
                    var MensajesAjenos = "";
                    var MensajesPropios = "";
                    var MensajesRef = db.collection('chats');
                    var query3 = MensajesRef.orderBy("fechaChat", "desc")
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                var idsChats = doc.id + "";
                                var IdDivAjeno = "divIzquerda-" + boton.id;
                                if (idsChats.includes(user.displayName) == true && idsChats.includes(boton.id) == true) {
                                    MensajesRef = MensajesRef.doc(idsChats).collection('Mensajes');
                                    var query4 = MensajesRef.orderBy("fecha", "asc")
                                        .onSnapshot((querySnapshot) => {
                                            document.getElementById(IdDivAjeno).innerHTML = "";
                                            querySnapshot.forEach((doc) => {


                                                if (doc.data().from == boton.id) {
                                                    MensajesAjenos = '<div class="col-12 " style="margin-bottom:' + contador3 + '%;">' +
                                                        '<div class="col-6 chatBordes bg-info ">' +
                                                        '<span>' + doc.data().mensaje + '</span>' +
                                                        '</div>' +
                                                        '</div>';
                                                    document.getElementById(IdDivAjeno).insertAdjacentHTML("beforeend", MensajesAjenos);

                                                } else {
                                                    MensajesPropios = '<div class="col-12 justify-content-end" style="margin-bottom:' + contador3 + '%; display:flex;">' +
                                                        '<div class="col-6 chatBordesD bg-dark ">' +
                                                        '<span class="text-light">' + doc.data().mensaje + '</span>' +
                                                        '</div>' +
                                                        '</div>';
                                                    document.getElementById(IdDivAjeno).insertAdjacentHTML("beforeend", MensajesPropios);

                                                }
                                            });

                                            console.log(MensajesAjenos);
                                            console.log(MensajesPropios);
                                        });
                                } else {

                                }
                            });
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    });



}

function añadirChat(boton) {
    idBot = boton.id + "";
    var nombrePersonaAjena = idBot.substring(4);
    var usuarios = new Array();
    //console.log(nombrePersonaAjena);
    var idInput = "input1+" + nombrePersonaAjena;
    var inputChat = document.getElementById(idInput);
    var chatRef = db.collection('chats');
    if (!(inputChat.value.length == 0)) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var idChat = user.displayName + "-" + nombrePersonaAjena;
                var idChat2 = nombrePersonaAjena + '-' + user.displayName;
                var fecha = new Date();
                usuarios.length = 0;
                usuarios.push(user.displayName);
                usuarios.push(nombrePersonaAjena);
                var query6 = chatRef.where("").orderBy('fechaChat', 'asc')
                    .get()
                    .then((querySnapshot) => {
                        if (querySnapshot.empty) {
                            console.log('Vacio');
                            var chatsRef = db.collection('Usuarios').doc(user.displayName).collection('chats').doc(idChat).set({
                                fechaChat: fecha,
                                id: idChat,
                                nombre: nombrePersonaAjena,
                                usuarios: usuarios
                            })
                                .then(() => {
                                    console.log("1");
                                    var chat = db.collection('chats').doc(idChat).set({
                                        fechaChat: fecha,
                                        id: idChat,
                                        nombre: nombrePersonaAjena,
                                        usuarios: usuarios
                                    })
                                        .then(() => {
                                            console.log("2");
                                            console.log("Document successfully written!");
                                            chatRef.doc(idChat).collection("Mensajes").add({
                                                fecha: fecha,
                                                from: user.displayName,
                                                mensaje: inputChat.value
                                            })
                                                .then((docRef) => {
                                                    console.log("Document written with ID: ", docRef.id);
                                                    var idPer = 'divIzquerda-' + nombrePersonaAjena;
                                                    document.getElementById(idPer).scrollTop = document.getElementById(idPer).scrollHeight;
                                                    inputChat.innerHTML = "";
                                                })
                                                .catch((error) => {
                                                    console.error("Error adding document: ", error);
                                                });
                                        })
                                        .catch((error) => {
                                            console.error("Error adding document: ", error);
                                        });

                                    

                                    var usuariosRef = db.collection('Usuarios');
                                    var query = usuariosRef.where("usuarioId", "==", nombrePersonaAjena)
                                        .get()
                                        .then((querySnapshot) => {
                                            usuarios.length = 0;
                                            console.log("3");
                                            usuarios.push(nombrePersonaAjena);
                                            usuarios.push(user.displayName);
                                            querySnapshot.forEach((doc) => {
                                                usuariosRef.doc(nombrePersonaAjena).collection('chats').doc(idChat2).set({
                                                    fechaChat: fecha,
                                                    id: idChat2,
                                                    nombre: user.displayName,
                                                    usuarios: usuarios
                                                })
                                                    .then(() => {
                                                        console.log("4");
                                                        console.log("Document successfully written!");
                                                    })
                                                    .catch((error) => {
                                                        console.error("Error writing document: ", error);
                                                    });

                                            });
                                        })
                                        .catch((error) => {
                                            console.log("Error getting documents: ", error);
                                        });
                                    console.log("Document successfully written!");
                                })
                                .catch((error) => {
                                    console.error("Error writing document: ", error);
                                });

                        } else {
                            querySnapshot.forEach((doc) => {
                                console.log("sxdsadsads")
                                var idschats = doc.id + "";
                                if (idschats.includes(nombrePersonaAjena) == true && idschats.includes(user.displayName) == true) {
                                    chatRef.doc(idschats).set({
                                        fechaChat: fecha,
                                        id: idschats,
                                        nombre: nombrePersonaAjena,
                                        usuarios: usuarios
                                    })
                                        .then(() => {
                                            console.log("333")
                                            console.log("Document successfully written!");
                                            chatRef.doc(idschats).collection("Mensajes").add({
                                                fecha: fecha,
                                                from: user.displayName,
                                                mensaje: inputChat.value
                                            })
                                                .then((docRef) => {
                                                     console.log("4444")
                                                    console.log("Document written with ID: ", docRef.id);
                                                    var idPer = 'divIzquerda-' + nombrePersonaAjena;
                                                    document.getElementById(idPer).scrollTop = document.getElementById(idPer).scrollHeight;
                                                    inputChat.innerHTML = "";
                                                })
                                                .catch((error) => {
                                                    console.error("Error adding document: ", error);
                                                });
                                        })
                                        .catch((error) => {
                                            console.error("Error writing document: ", error);
                                        });
                                }else{
                                    chatRef.doc(idschats).set({
                                        fechaChat: fecha,
                                        id: idschats,
                                        nombre: nombrePersonaAjena,
                                        usuarios: usuarios
                                    })
                                    .then(() => {
                                        console.log("else de si existe el chat")
                                        console.log("Document successfully written!");
                                        chatRef.doc(idschats).collection("Mensajes").add({
                                            fecha: fecha,
                                            from: user.displayName,
                                            mensaje: inputChat.value
                                        })
                                        .then((docRef) => {
                                            console.log("4444")
                                           console.log("Document written with ID: ", docRef.id);
                                           var idPer = 'divIzquerda-' + nombrePersonaAjena;
                                           document.getElementById(idPer).scrollTop = document.getElementById(idPer).scrollHeight;
                                           inputChat.innerHTML = "";
                                       })
                                       .catch((error) => {
                                           console.error("Error adding document: ", error);
                                       });
                                    })
                                    .catch((error) => {
                                        console.error("Error writing document: ", error);
                                    });
                                }
                            });
                            var usuariosRef = db.collection('Usuarios');
                                    var query = usuariosRef.where("usuarioId", "==", nombrePersonaAjena)
                                        .get()
                                        .then((querySnapshot) => {
                                            usuarios.length = 0;

                                            usuarios.push(nombrePersonaAjena);
                                            usuarios.push(user.displayName);
                                            querySnapshot.forEach((doc) => {
                                                usuariosRef.doc(nombrePersonaAjena).collection('chats').doc(idChat2).set({
                                                    fechaChat: fecha,
                                                    id: idChat2,
                                                    nombre: user.displayName,
                                                    usuarios: usuarios
                                                })
                                                    .then(() => {
                                                        console.log("Document successfully written!");
                                                    })
                                                    .catch((error) => {
                                                        console.error("Error writing document: ", error);
                                                    });

                                            });
                                        })
                                        .catch((error) => {
                                            console.log("Error getting documents: ", error);
                                        });
                        }
                    });

            } else {

            }
        });

        console.log("conseguido");
    }
}