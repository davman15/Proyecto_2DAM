$(document).ready(function () {
    console.log("hola");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
        } else {

        }
    });
    //taps
    $("#caja1").tabs();
    $("#selectImagen").change(function () { //Cuando el input cambie (se cargue un nuevo archivo) se va a ejecutar de nuevo el cambio de imagen y se verá reflejado.
        leerURL(this);

        

    });
    $('#botonPublicar').click(function () {
        var titulo=document.getElementById('tituloP').value;
        var descripcion= document.getElementById('descripcion').value;
        //recuperamos el archivo file
        var file = document.getElementById('selectImagen').files[0];
        //creamos la referencia en donde se va a almacenar nuestra foto
        var storageRef = storage.ref('Publicaciones/imagenPublicacion/' + file.name);


        var fecha = new Date();
        var fechaEsp = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

        var nombre = "prueba";
        //subimos la foto a firestore storage
        var uploadTask = storageRef.put(file)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            })
            .then(downloadURL => {
                //comprobamos el usuario que esta conectado para subir sus fotos
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log(user.displayName);
                        db.collection("Publicaciones").add({
                            titulo: titulo,
                            fecha: fecha,
                            foto: downloadURL,
                            post: descripcion,
                            usuarioNombre: user.displayName
                        });
                    } else {

                    }
                });

            });





    });
});
function leerURL(input) {
    if (input.files && input.files[0]) { //Revisamos que el input tenga contenido
        var reader = new FileReader(); //Leemos el contenido

        reader.onload = function (e) { //Al cargar el contenido lo pasamos como atributo de la imagen de arriba
            $('#imagen').attr('src', e.target.result);

            //Esto adapta la imagen al div 
            $('#cajaImagen').css({
                "height": "auto"
            });
        }

        reader.readAsDataURL(input.files[0]);
    }
}

