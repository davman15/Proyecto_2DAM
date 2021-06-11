$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var usuariosRef = db.collection('Usuarios');
            var query = usuariosRef.where('usuarioId', '==', user.displayName)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        
                        document.body.style.backgroundImage='url("'+doc.data().fondo+'")';
                    });
                });
        } else {

        }
    });
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
                                        '<div class="col-2 ms-auto" style="display:flex; align-items:center;">' +
                                        '<img style="width:60px; height:60px; " class="" src="' + doc.data().imagen + '">' +
                                        '</div>' +
                                        '<div class="col-10 row">' +
                                        '<div class="col-6 centrarBoton">' +
                                        '<h4>' + doc.data().usuarioId + '</h4>' +
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
function cerrarSesion() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

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
                            '<div class="col-12 color3 row p-2">' +
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
                            '<div class="col-12 row centrarBoton color2 h-100">' +
                            '<div class="col-11 centrarBoton fondo row " style="height:80%;" >' +
                            '<div class="scrollDiv col-12 pt-3 h-100"  id="divIzquerda-' + doc.data().usuarioId + '">' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-11 row">' +
                            '<div class="col-10">' +
                            '<input type="text" class="form-control" id="input1+' + doc.data().usuarioId + '">' +
                            '</div>' +
                            '<div class="col-2">' +
                            '<button id="btn2' + doc.data().usuarioId + '" class="btn btn-warning" onclick="añadirChat(this)">Enviar</button>' +
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
                                    console.log("mal bro");
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

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(boton.id);
            //nos quedamos con el nombre del usuario con el que vamos a hablar
            var idBot = boton.id;
            var nomUsuarioHablar = idBot.substring(4);
            var idSiVacio = user.displayName + '-' + nomUsuarioHablar;
            var usuarios = new Array();
            var idInput = "input1+" + nomUsuarioHablar;
            var inputChat = document.getElementById(idInput);
            var fecha = new Date();
            var chatRef = db.collection('chats');
            usuarios.length = 0;
            usuarios.push(user.displayName);
            usuarios.push(nomUsuarioHablar);
            var query = chatRef.orderBy('fechaChat', 'asc')
                .get()
                .then((querySnapshot) => {
                    //si esta vacio
                    if (querySnapshot.empty) {
                        console.log('vacio');
                        chatRef.doc(idSiVacio).set({
                            fechaChat: fecha,
                            id: idSiVacio,
                            nombre: nomUsuarioHablar,
                            usuarios: usuarios
                        })
                            .then(() => {
                                console.log("Document successfully written!1");
                                chatRef.doc(idSiVacio).collection('Mensajes').add({
                                    fecha: fecha,
                                    from: user.displayName,
                                    mensaje: inputChat.value
                                })
                                    .then((docRef) => {
                                        console.log("Document written with ID: ", docRef.id);
                                        var idPer = 'divIzquerda-' + nomUsuarioHablar;
                                        document.getElementById(idPer).scrollTop = document.getElementById(idPer).scrollHeight;
                                        inputChat.innerHTML = "";

                                        //añadimos el mensaje a los usuarios
                                        var usuariosRef = db.collection('Usuarios');

                                        usuariosRef.doc(user.displayName).collection('chats').doc(idSiVacio).set({
                                            fechaChat: fecha,
                                            id: idSiVacio,
                                            nombre: nomUsuarioHablar,
                                            usuarios: usuarios
                                        })
                                            .then(() => {
                                                idSiVacio = nomUsuarioHablar + '-' + user.displayName;
                                                usuarios.length = 0;
                                                usuarios.push(nomUsuarioHablar);
                                                usuarios.push(user.displayName);

                                                usuariosRef.doc(nomUsuarioHablar).collection('chats').doc(idSiVacio).set({
                                                    fechaChat: fecha,
                                                    id: idSiVacio,
                                                    nombre: user.displayName,
                                                    usuarios: usuarios
                                                })
                                                    .then(() => {
                                                        console.log("Document successfully written!");
                                                    });
                                            });
                                    });

                            });
                    } else {
                        var idschats2 = user.displayName + '-' + nomUsuarioHablar;
                        querySnapshot.forEach((doc) => {
                            var idschats = doc.id;
                            
                            if (idschats.includes(nomUsuarioHablar) == true && idschats.includes(user.displayName) == true) {
                                var idschats3=user.displayName+'-';
                                if(idschats.includes(user.displayName) == true){
                                    
                                }else{
                                    idschats2 = nomUsuarioHablar+ '-' +user.displayName;
                                }
                                chatRef.doc(idschats).set({
                                    fechaChat: fecha,
                                    id: idschats,
                                    nombre: nomUsuarioHablar,
                                    usuarios: usuarios
                                })
                                    .then(() => {
                                        console.log("Document successfully written! creado si ya existia ");
                                        chatRef.doc(idschats).collection("Mensajes").add({
                                            fecha: fecha,
                                            from: user.displayName,
                                            mensaje: inputChat.value
                                        })
                                            .then((docRef) => {
                                                console.log("Document written with ID: ", docRef.id);
                                                var idPer = 'divIzquerda-' + nomUsuarioHablar;
                                                document.getElementById(idPer).scrollTop = document.getElementById(idPer).scrollHeight;
                                                inputChat.innerHTML = "";

                                                //añadimos el mensaje a los usuarios
                                                var usuariosRef = db.collection('Usuarios');

                                                usuariosRef.doc(user.displayName).collection('chats').doc(idschats).set({
                                                    fechaChat: fecha,
                                                    id: idschats,
                                                    nombre: nomUsuarioHablar,
                                                    usuarios: usuarios
                                                })
                                                    .then(() => {
                                                        idschats = nomUsuarioHablar + '-' + user.displayName;
                                                        usuarios.length = 0;
                                                        usuarios.push(nomUsuarioHablar);
                                                        usuarios.push(user.displayName);

                                                        usuariosRef.doc(nomUsuarioHablar).collection('chats').doc(idschats).set({
                                                            fechaChat: fecha,
                                                            id: idschats,
                                                            nombre: user.displayName,
                                                            usuarios: usuarios
                                                        })
                                                            .then(() => {
                                                                console.log("Document successfully written!");
                                                            });
                                                    });
                                            });
                                    });
                            } else if(idschats.includes(nomUsuarioHablar) == false && idschats.includes(user.displayName) == false){
                                
                            }else if(idschats.includes(nomUsuarioHablar) == false && idschats.includes(user.displayName) == true){
                                
                            }else if(idschats.includes(nomUsuarioHablar) == true && idschats.includes(user.displayName) == true){
                                
                            }
                        });
                    }
                });
        }
    });

}