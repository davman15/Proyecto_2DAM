function redirigir() {
    location.replace("../html/perfil.html");
}

function iniciarSesion() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    if(email==""){
        Swal.fire({
            icon: 'error',
            title: 'Introduzca su correo',
            text: 'Dejó el campo Correo vacío'
          });
    } 
    else if(password==""){
        Swal.fire({
            icon: 'error',
            title: 'Introduzca sus credenciales',
            text: 'Dejó el campo Contraseña vacío'
          });
    }
    else{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            
            setTimeout("redirigir()", 1000);
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Introduzca sus credenciales correctamente',
                text: 'Los credenciales introducidos no existen'
              });
        });
    }
}