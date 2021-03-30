//Selecciono todos los elementos de la clase que tengan animado
let animado= document.querySelectorAll(".animado");
//Selecciono todos los elementos de la clase que tengan animadoIzquierda
let animadoIzquierda=document.querySelectorAll(".animadoIzquierda");

function mostrarAnimacionIzquierdaDerecha(){
    let scrollTop=document.documentElement.scrollTop;
    //Recorro con el for los elementos y se va a repetir las veces que haya un elemento
    for(var i=0; i<animado.length;i++){
        let alturaAnimado=animado[i].offsetTop;
        if(alturaAnimado - 500<scrollTop){
            animado[i].style.opacity=1;
            animado[i].classList.add("mostrarArriba");
        }
    }
}

function mostrarAnimacionDerechaIzquierda(){
    let scrollTop=document.documentElement.scrollTop;
    //Recorro con el for los elementos y se va a repetir las veces que haya un elemento
    for(var i=0; i<animadoIzquierda.length;i++){
        let alturaAnimado=animadoIzquierda[i].offsetTop;
        if(alturaAnimado - 500<scrollTop){
            animadoIzquierda[i].style.opacity=1;
            animadoIzquierda[i].classList.add("mostrarIzquierda");
        }
    }
}
//Evento para mover añadir los elementos de Izquierda a Derecha
window.addEventListener('scroll',mostrarAnimacionIzquierdaDerecha);
//Evento para mover añadir los elementos de Derecha a Izquierda  
window.addEventListener('scroll',mostrarAnimacionDerechaIzquierda);