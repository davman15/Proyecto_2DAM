console.log("correcto");
function redirigir() {
    location.replace("../html/perfil.html");
}
$(document).ready(function () {
    $("#boton").click(function () {
        $("#nombre").validate();
    })

})
function validarUser() {
    var usuarioExistente = false;
    var usuario = document.getElementById('usuario').value;

    db.collection("usuarios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().usuario);
            console.log(doc.data().usuario, " ", usuario);
            if (doc.data().usuario == usuario) {
                console.log("hoal");
                usuarioExistente = true;

            }
        });
        return usuarioExistente;
    });

}

function validar() {
    var validado = true;
    var email = document.getElementById('email');
    var nombre = document.getElementById('nombre');
    var apellidos = document.getElementById('apellidos');
    var usuario = document.getElementById('usuario');
    var password = document.getElementById('password');
    var password2 = document.getElementById('password2');
    var hombre = document.getElementById('hombre');
    var mujer = document.getElementById('mujer');

    if (nombre.value == "") {
        validado = false;
        document.getElementById('divNombre').style.display = 'block';
    } else {
        document.getElementById('divNombre').style.display = 'none';
        validado = true;
    }
    if (email.value == "") {
        validado = false;
        document.getElementById('divEmail').style.display = 'block';
    } else {
        document.getElementById('divEmail').style.display = 'none';
        validado = true;
    }
    if (apellidos.value == "") {
        validado = false;
        document.getElementById('divApellidos').style.display = 'block';
    } else {
        document.getElementById('divApellidos').style.display = 'none';
        validado = true;
    }
    if (usuario.value == "") {
        validado = false;
        document.getElementById('divUsuario').style.display = 'block';
    } else {
        document.getElementById('divUsuario').style.display = 'none';
        validado = true;
    }
    if (!hombre.selected && !mujer.selected) {
        validado = false;
        document.getElementById('divSexo').style.display = 'block';
    } else {
        document.getElementById('divSexo').style.display = 'none';
        validado = true;
    }
    if (password.value.length < 9) {
        validado = false;
        password.value = "";
        document.getElementById('divContrasena').style.display = 'block';
    } else {
        document.getElementById('divContrasena').style.display = 'none';
        validado = true;
    }
    if (!(password2.value == password.value)) {
        validado = false;
        password2.style.color = "red";
        password2.style.color = "red";
        document.getElementById('divContrasena2').style.display = 'block';
    } else {
        password2.style.color = "black";
        password2.style.color = "black";
        document.getElementById('divContrasena2').style.display = 'none';
        validado = true;
    }
    return validado;
}

function registrarse() {




    var email = document.getElementById('email').value;
    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var usuario = document.getElementById('usuario').value;
    var password = document.getElementById('password').value;

    if (validar() == true) {
        if (!(validarUser() == true)) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    // ...
                    db.collection("Usuarios").doc(usuario).set({
                        nombreUsuario: nombre,
                        apellidos: apellidos,
                        usuarioId: usuario,
                        correo: email,
                        contrasena: password,
                        imagen: 'https://firebasestorage.googleapis.com/v0/b/animezone-82466.appspot.com/o/ImagenPerfilPorDefecto%2Fsinperfil.png?alt=media&token=79062551-4c24-45d7-9243-21030e6755b9'
                    })
                        .then((docRef) => {
                            console.log("Document written with ID: ");
                            var user = firebase.auth().currentUser;

                            user.updateProfile({
                                displayName: usuario,
                                photoURL: "https://firebasestorage.googleapis.com/v0/b/animezone-82466.appspot.com/o/ImagenPerfilPorDefecto%2Fsinperfil.png?alt=media&token=79062551-4c24-45d7-9243-21030e6755b9"
                            }).then(function () {
                                // Update successful.
                            }).catch(function (error) {
                                // An error happened.
                            });
                            firebase.auth().onAuthStateChanged((usuario) => {
                                if (usuario) {
                                    // User is signed in, see docs for a list of available properties
                                    // https://firebase.google.com/docs/reference/js/firebase.User
                                    console.log("echo");
                                    var uid = usuario.uid;
                                    // ...
                                } else {
                                    // User is signed out
                                    // ...
                                }
                            });
                            setTimeout("redirigir()", 2000);
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);

                        });
                    //.....................


                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    //alert("Registro fallido intentalo de nuevo");
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Registro fallido, intentalo de nuevo',
                        width: 600
                    });
                    // ..
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Registro fallido, este usuario ya existe',
                width: 600
            });
        }

    }



}