var nombre = document.getElementById('NombreUsuario');
var apellido = document.getElementById('Apellido');
var avatar = document.getElementById('avatar');
var descripcion = document.getElementById('descripcion');
var fondo="";
var imagenPerfil="";

$(document).ready(function () {

    console.log("hola");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var usuariosRef = db.collection('Usuarios');
            var query = usuariosRef.where('usuarioId', '==', user.displayName)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        nombre.value = doc.data().nombreUsuario;
                        apellido.value = doc.data().apellidos;
                        avatar.src = doc.data().imagen;
                        descripcion.value = doc.data().descripcion;
                        fondo=doc.data().fondo;
                        imagenPerfil=doc.data().imagen;
                        document.body.style.backgroundImage='url("'+doc.data().fondo+'")';
                    });
                });
        } else {

        }
    });
    //taps
    $("#caja1").tabs();


});

function cambiar(boton) {
    console.log(boton.id);
    if (boton.id == 1) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var usuariosRef = db.collection('Usuarios');
                var query = usuariosRef.where('usuarioId', '==', user.displayName)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            
                            document.body.style.backgroundImage='url("https://firebasestorage.googleapis.com/v0/b/animezone-82466.appspot.com/o/Fondos%2Fcalle.jpg?alt=media&token=83db268b-59d9-44ea-9723-6f45f2dc9df7")';
                        });
                    });
            } else {
    
            }
        });
    }
    if (boton.id == 2) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var usuariosRef = db.collection('Usuarios');
                var query = usuariosRef.where('usuarioId', '==', user.displayName)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            
                            document.body.style.backgroundImage='url("https://firebasestorage.googleapis.com/v0/b/animezone-82466.appspot.com/o/Fondos%2Fspace.jpg?alt=media&token=bcd701fe-b968-4e6d-8f32-fecc3a18d0e6")';
                        });
                    });
            } else {
    
            }
        });
        
    }
    if (boton.id == 3) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var usuariosRef = db.collection('Usuarios');
                var query = usuariosRef.where('usuarioId', '==', user.displayName)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            
                            document.body.style.backgroundImage='url("https://firebasestorage.googleapis.com/v0/b/animezone-82466.appspot.com/o/Fondos%2FbarrioAbandonado.jpg?alt=media&token=17499d24-13a9-49bb-8904-58e000f3fe70")';
                        });
                    });
            } else {
    
            }
        });
    }
    if (boton.id == 4) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var usuariosRef = db.collection('Usuarios');
                var query = usuariosRef.where('usuarioId', '==', user.displayName)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            
                            document.body.style.backgroundImage='url("https://firebasestorage.googleapis.com/v0/b/animezone-82466.appspot.com/o/Fondos%2Fbarrio.jpg?alt=media&token=efa2b41c-4c8e-46ca-800a-3046ff306a34")';
                        });
                    });
            } else {
    
            }
        });
    }
    if (boton.id == 5) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var usuariosRef = db.collection('Usuarios');
                var query = usuariosRef.where('usuarioId', '==', user.displayName)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            
                            document.body.style.backgroundImage='url("https://firebasestorage.googleapis.com/v0/b/animezone-82466.appspot.com/o/Fondos%2Fatardecer.jpg?alt=media&token=b4c37afa-9635-4e54-a085-a1c6ac7f8600")';
                        });
                    });
            } else {
    
            }
        });
    }
    if (boton.id == 6) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var usuariosRef = db.collection('Usuarios');
                var query = usuariosRef.where('usuarioId', '==', user.displayName)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            
                            document.body.style.backgroundImage='url("https://firebasestorage.googleapis.com/v0/b/animezone-82466.appspot.com/o/Fondos%2Ftemplo.jpg?alt=media&token=d4a7047b-1883-485d-a2dd-9adde4beb1cf")';
                        });
                    });
            } else {
    
            }
        });
    }


}

function guardarCambios() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var usuariosRef = db.collection('Usuarios');
            var query = usuariosRef.where('usuarioId', '==', user.displayName)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (nombre.value.length != 0 && nombre.value!=doc.data().nombreUsuario) {
                            db.collection("Usuarios").doc(user.displayName).update({
                                "nombreUsuario": nombre.value
                            })
                            .then(() => {
                                console.log("Document successfully updated!");
                            });
                        }
                        if (apellido.value.length != 0 && apellido.value!=doc.data().apellidos) {
                            db.collection("Usuarios").doc(user.displayName).update({
                                "apellidos": apellido.value
                            })
                            .then(() => {
                                console.log("Document successfully updated!");
                            });
                        }
                        if (descripcion.value.length != 0 && descripcion.value!=doc.data().descripcion) {
                            db.collection("Usuarios").doc(user.displayName).update({
                                "descripcion": descripcion.value
                            })
                            .then(() => {
                                console.log("Document successfully updated!");
                            });
                        }
                        if (fondo!=doc.data().fondo) {
                            db.collection("Usuarios").doc(user.displayName).update({
                                "fondo": fondo
                            })
                            .then(() => {
                                console.log("Document successfully updated!");
                            });
                        }
                        if (imagenPerfil!=doc.data().imagen) {
                            db.collection("Usuarios").doc(user.displayName).update({
                                "imagen": imagenPerfil
                            })
                            .then(() => {
                                console.log("Document successfully updated!");
                            });
                        }
                        
                    });
                });
        } else {

        }
    });

}
function cambiar(){
    var file = document.getElementById('file-upload').files[0];
    document.getElementById('info').innerHTML = file.name;
    var storageRef = storage.ref('Fondos/' + file.name);
    var uploadTask = storageRef.put(file)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                //comprobamos el usuario que esta conectado para subir sus fotos
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log(user.displayName);
                        avatar.src=downloadURL;
                        imagenPerfil=downloadURL;
                    } else {

                    }
                });

            });
}
