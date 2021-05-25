console.log("hola");
function redirigir() {
    location.replace("../html/perfil.html");
}

function iniciarSesion() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;



    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            
            setTimeout("redirigir()", 2000);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });





}