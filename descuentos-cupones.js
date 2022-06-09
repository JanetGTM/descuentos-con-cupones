bandera = 0;
inputPrice = document.querySelector("#inputPrice");
priceValue = inputPrice.value; 
cuponInput = document.querySelector("#couponDiscount");
cupon = cuponInput.value;
result = document.querySelector("#result");
savingResult = document.querySelector("#saving");
alerta = document.querySelector("#discountAlert");
alert2 = document.querySelector("#discountCouponAlert");

const cupones = [
    {
        nombre: "CUPONSIMPLE",
        descuento: 10
    }, 
    {
        nombre: "CUPONSILVER",
        descuento: 20
    },
    {
        nombre: "CUPONGOLDEN",
        descuento: 35
    },
    {
        nombre: "CUPONDIAMOND",
        descuento: 45
    }
];
//----------- Calcula el descuento del producto
function calcularPrecioConDescuento(precioOriginal, descuento){
    const porcentajePrecioConDescuento = 100 - descuento;
    const precioConDescuento = (precioOriginal * porcentajePrecioConDescuento)/100; 
    return precioConDescuento;
}
//---------- Función que calcula la cantidad ahorrada
function calcularAhorro(precioOriginal, descuento){
    const savingCalc = (precioOriginal * descuento)/100;  
    return savingCalc;
}
//--------- Calcula que la cantidad del precio no sea demasiado alta
function topePrecio(){
    cupon = cuponInput.value;
    cupon = cupon.toUpperCase();
    priceValue = inputPrice.value;
    if (inputPrice.value > 99999 || inputPrice.value < 1){
        inputPrice.value = "";
        savingResult.value = 0;
        result.innerText =  "$0";
        savingResult.innerText = "$" + savingResult.value;
        alerta.style.display = "block";
        alerta.innerText = "Introduce una cifra de máximo 5 dígitos";
        return inputPrice;
    }
    else{
        alerta.style.display = "none";
        if(bandera == 1){
            const cupon = "";
            const total = calcularPrecioConDescuento(priceValue, cupon);
            result.innerText =  "$" + total;
            savingResult.innerText = "$0";
            cuponInput.value = "";
            alert2.style.display = "none";
        }
        else{
            const total = calcularPrecioConDescuento(priceValue, cupon);
            result.innerText =  "$" + total;
        }
    }
}
function PriceDiscount(){
    bandera = 1;
    cupon = cuponInput.value;
    cupon = cupon.toUpperCase();
    priceValue = inputPrice.value
    const cuponValido = function(miCupon){
    return miCupon.nombre === cupon;   
    };
    const cuponDelUsuario = cupones.find(cuponValido);
    if(!cuponDelUsuario){
        descuentoDelCupon = 0;
        savingResult.innerText = "$0";
        const total = calcularPrecioConDescuento(priceValue, descuentoDelCupon);
        result.innerText =  "$" + total;
        alert2.style.display = "block";
        alert2.innerText = "✖  Cupón inválido, trata de nuevo.";
        alert2.style.background = "#663399";
    }
    else{
        const descuentoDelCupon = cuponDelUsuario.descuento;
        const total = calcularPrecioConDescuento(priceValue, descuentoDelCupon);
        const saving = calcularAhorro(priceValue, descuentoDelCupon);
        result.innerText =  "$" + total;
        savingResult.innerText = "$" + saving;
        alert2.style.display = "block";
        alert2.style.background = "green";
        alert2.innerText = "✔  Cupón válido por: " + descuentoDelCupon + "% de descuento";
    }
}
function limpiarInputCupon(){
    result.innerText =  "$" + inputPrice.value;
    savingResult.innerText = "$0";
    bandera = 1;
    alert2.style.display = "none";
}
const botonValidar = document.querySelector("#botonValidarCupon");
botonValidar.addEventListener("click", PriceDiscount);
cuponInput.addEventListener("keyup", limpiarInputCupon);
//----------  Calcula que el precio sea menor a cien mil
 inputPrice.addEventListener("input", topePrecio);