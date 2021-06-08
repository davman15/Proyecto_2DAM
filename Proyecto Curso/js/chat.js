$(document).ready(function () {
    var divLista=document.getElementById('ListaContactos');
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var usuarioRef = db.collection('Usuarios').doc(user.displayName).collection('Seguidos');
            var query=usuarioRef.orderBy("usuarioId","desc")
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        var usuariosRef=db.collection('Usuarios');
                        var query2=usuariosRef.where("usuarioId","==",doc.data().usuarioId)
                            .get()
                            .then((querySnapshot)=>{
                                querySnapshot.forEach((doc)=>{
                                    var contenidoMiLista=
                                    '<div class="col-2" style="display:flex; align-items:center;">'+
                                        '<img style="width:50px; height:50px;" src="'+doc.data().imagen+'">'+
                                    '</div>'+
                                    '<div class="col-10 row">'+
                                        '<div class="col-6 centrarBoton">'+
                                            '<h4>'+doc.data().nombreUsuario+'</h4>'+
                                        '</div>'+
                                        '<div class="col-6 centrarBoton">'+
                                            '<button id="'+doc.data().usuarioId+'" onclick="abrirChat(this)" class="btn btn-success">Abrir Chat</button>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-12">'+
                                        '<hr>'+
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

    var chatIndividual=document.getElementById("chatIndividual");
    chatIndividual.innerHTML="";
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var usuarioRef = db.collection('Usuarios');
            var query=usuarioRef.where("usuarioId","==",boton.id)
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                       chatIndividual.style.display="flex";
                       var contenido='<div class="col-12 text-center" style="margin-left:0px; height:90%;"> '+
                                        '<div class="col-12 bg-danger row">'+
                                            '<div class="col-3">'+
                                                '<img style="width:50px; height:50px;" src="'+doc.data().imagen+'">'+
                                            '</div>'+
                                            '<div class="col-7 centrarBoton">'+
                                                '<h4><b>'+doc.data().nombreUsuario+'</b></h4>'+
                                            '</div>'+
                                            '<div class="col-2">'+
                                                '<div class="dropdown">'+
                                                    '<button class="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">'+
                                                            '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">'+
                                                                '<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>'+
                                                            '</svg>'+
                                                    '</button>'+
                                                    '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">'+
                                                        '<li role="presentation" class="text-center">'+
                                                            '<a role="menuitem" tabindex="-1" href="#">Ver Perfil</a>'+
                                                        '</li>'+
                                                        '<li role="presentation" class="text-center">'+
                                                            '<a role="menuitem" tabindex="-1" href="#">Vaciar Chat</a>'+
                                                        '</li>'+
                                                    '</ul>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="col-12 row centrarBoton bg-success h-100">'+
                                            '<div class="col-11 centrarBoton fondo " style="height:80%;" >'+
                                                '<div style="width:20%; height:20%;">'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="col-11 row">'+
                                                '<div class="col-10">'+
                                                    '<input type="text" class="form-control" id="input1+'+doc.data().usuarioId+'">'+
                                                '</div>'+
                                                '<div class="col-2">'+
                                                    '<button id="btn2'+doc.data().usuarioId+'" class="btn btn-primary" onclick="añadirChat(this)">Enviar</button>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                        chatIndividual.insertAdjacentHTML('beforeend',contenido);
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    });
    
    
    
}

function añadirChat(boton) {
    idBot=boton.id+"";
    var nombrePersonaAjena=idBot.substring(4);
    //console.log(nombrePersonaAjena);
    var idInput="input1+"+nombrePersonaAjena;
    var inputChat=document.getElementById(idInput);
    if(!(inputChat.value.length==0)){
        inputChat.innerHTML="";
        console.log("conseguido");
    }
}