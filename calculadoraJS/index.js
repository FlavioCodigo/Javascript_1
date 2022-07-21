const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const btnNumero = document.querySelectorAll('.numero');
const btnOperador = document.querySelectorAll('.operador');

const pantalla = new Pantalla(displayValorAnterior,displayValorActual);

btnNumero.forEach( btn => {
    btn.addEventListener('click',()=>pantalla.agregarNumero(btn.innerHTML));
});

btnOperador.forEach( btn => {
    btn.addEventListener('click',()=>pantalla.computar(btn.value));
});
