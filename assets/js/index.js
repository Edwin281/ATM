var saldo = 0;
var tipo ="";
function iniciar(){
/* Cambiar texto */
    document.getElementById("mensaje").innerHTML = "Elige una opción";
 /* ocultar la clase card */
    document.getElementsByClassName("card")[0].style.display = "none";
/*ocultar la clase init  */
    document.getElementsByClassName("init")[0].style.display = "none";
/* mostrar la clase opciones*/
    document.getElementsByClassName("opciones")[0].style.display = "block";
    document.getElementsByClassName("opciones-der")[0].style.display = "flex";
}
function exit(){
    saldo = 0;
/* ocultar la clase opciones */
    document.getElementsByClassName("opciones")[0].style.display = "none";
/* ocultar teclado */
    document.getElementsByClassName("teclado")[0].style.display = "none";
 /* ocultar opciones regresar */
    document.getElementsByClassName("opciones-regresar")[0].style.display = "none";
    document.getElementsByClassName("cajero-main")[0].style.display = "none";
    document.getElementsByClassName("gracias")[0].style.display = "flex";

    /* timmer para ocultar una session */
    setTimeout(function(){
        document.getElementsByClassName("cajero-main")[0].style.display = "block";
        document.getElementsByClassName("gracias")[0].style.display = "none";
    }, 5000);


/* mostrar la clase init */
    document.getElementsByClassName("init")[0].style.display = "block";
    /* mostar la clases card */
    document.getElementsByClassName("card")[0].style.display = "block";
    /* cambiar mensaje */
    document.getElementById("mensaje").innerHTML = "Ingresa tu tarjeta";
    /* vaciar input */
    document.getElementById("cantidad").value = "";
    
}
function consultar_saldo(){
    /* ocultar opciones derecha */
    document.getElementsByClassName("opciones-der")[0].style.display = "none";
    /* mostrar opcion de regresar */
    document.getElementsByClassName("opciones-regresar")[0].style.display = "block";
    document.getElementById("mensaje").innerHTML = "Hola!, Tu saldo es de: $"+saldo;
}
function regresar(){
    /* mostrar opciones derecha */
    document.getElementsByClassName("opciones-der")[0].style.display = "flex";
    /* ocultar opcion de regresar */
    document.getElementsByClassName("opciones-regresar")[0].style.display = "none";
    /* cambiar mensaje */
    document.getElementById("mensaje").innerHTML = "Elige una opción";
    /* ocultar tecaldo */
    document.getElementsByClassName("teclado")[0].style.display = "none";
}
function retirar(){
    tipo = "retirar";
    /* ocultar opciones derecha */
    document.getElementsByClassName("opciones-der")[0].style.display = "none";
    /* mostrar opcion de regresar */
    document.getElementsByClassName("opciones-regresar")[0].style.display = "block";
    /* mostrar teclado */
    document.getElementsByClassName("teclado")[0].style.display = "block";
    /* cambiar mensaje */
    document.getElementById("mensaje").innerHTML = "Ingresa la cantidad a retirar";
}
function teclado(num){
    var cantidad = document.getElementById("cantidad").value;
    if(cantidad.length < 4){
        document.getElementById("cantidad").value = parseInt(cantidad + num);
    }
}
function borrar(){
    var cantidad = document.getElementById("cantidad").value;
    document.getElementById("cantidad").value = cantidad.substring(0, cantidad.length - 1);
}
function aceptar(){
    if(tipo =="retirar"){
        retiro();
    } else if(tipo == "depositar"){
        deposito();
    }
}
function retiro(){
    if(document.getElementById("cantidad").value != "" && document.getElementById("cantidad").value != 0){
        var cantidad = parseInt(document.getElementById("cantidad").value);
        if(cantidad <= saldo){
            /* validar que sean multiplos de 20,50,100,200,500,1000 */
            if(cantidad % 20 == 0 || cantidad % 50 == 0 || cantidad % 100 == 0 || cantidad % 200 == 0 || cantidad % 500 == 0 || cantidad % 1000 == 0){
                saldo = saldo - cantidad;
                document.getElementById("cantidad").value = "";
                Swal.fire({
                    icon: 'success',
                    title: 'Retiro exitoso',
                    text: 'Tu nuevo saldo es de: $'+saldo,
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        regresar();
                    }
                })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Solo puedes retirar en multiplos de 20,50,100,200,500,1000',
                })
                document.getElementById("cantidad").value = "";
            }
        }else{
            document.getElementById("mensaje").innerHTML = "Saldo insuficiente intente de nuevo";
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Saldo insuficiente!',
                confirmButtonText: 'Aceptar'
            })
            document.getElementById("cantidad").value = "";

        }
    }
}

function depositar(){
    tipo = "depositar";
    /* ocultar opciones derecha */
    document.getElementsByClassName("opciones-der")[0].style.display = "none";
    /* mostrar opcion de regresar */
    document.getElementsByClassName("opciones-regresar")[0].style.display = "block";
    /* mostrar teclado */
    document.getElementsByClassName("teclado")[0].style.display = "block";
    /* cambiar mensaje */
    document.getElementById("mensaje").innerHTML = "Ingresa la cantidad a depositar";
}
function deposito(){
    if(document.getElementById("cantidad").value != "" && document.getElementById("cantidad").value != "0" && document.getElementById("cantidad").value < "5000"){
    /* validar que  son ingresen multiplos de 20,50,100,200,500,1000*/
        var cantidad = parseInt(document.getElementById("cantidad").value);
        console.log(cantidad);
        if(cantidad % 20 == 0 || cantidad % 50 == 0 || cantidad % 100 == 0 || cantidad % 200 == 0 || cantidad % 500 == 0 || cantidad % 1000 == 0){ 
            saldo = saldo + cantidad;
            Swal.fire({
            icon: 'success',
            title: 'Deposito exitoso',
            text: 'Tu nuevo saldo es de: $'+saldo,
            confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById("cantidad").value = "";
                    regresar();
                }
            });

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Solo puedes ingresar multiplos de 20,50,100,200,500,1000!',
                confirmButtonText: 'Aceptar'
            })
            document.getElementById("cantidad").value = "";
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los depositos deben ser mayores a $0 y menores a $5000!',
            confirmButtonText: 'Aceptar'
        })
        document.getElementById("cantidad").value = "";
    }
}
