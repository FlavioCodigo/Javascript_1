class Pantalla {
    constructor(displayValorAnterior,displayValorActual){
        this.displayValorAnterior=displayValorAnterior;
        this.displayValorActual=displayValorActual;
        this.operacion=new Operaciones();
        this.tipoOperacion=undefined;
        this.valorActual="";
        this.valorAnterior="";
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-', 
        }
    }
    
    agregarNumero(numero) { 
        if(numero==="." && this.valorActual.includes(".")) return; //No aceptar punto más de una vez.
        this.valorActual = this.valorActual.toString() + numero.toString(); //toString para facilitar modificaciones.
       this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent=this.valorActual ;
        if (this.displayValorActual.textContent=="" && this.tipoOperacion==='igual'){
            this.displayValorActual.textContent="0"
        }
        this.displayValorAnterior.textContent=`${this.valorAnterior} ${this.signos[this.tipoOperacion] || '' }`;
    }

    borrar() {
        this.valorActual=this.valorActual.toString().slice(0,-1); 
        this.imprimirValores();
    }
    borrarTodo() {
        this.valorActual="";
        this.valorAnterior="";
        this.tipoOperacion=undefined;
        this.imprimirValores();
        
    }
    calcular() {
        const valorActual = parseFloat(this.valorActual);
        const valorAnterior = parseFloat(this.valorAnterior);

        if(isNaN(valorActual) || isNaN(valorAnterior)) return;
        this.valorActual = this.operacion[this.tipoOperacion](valorAnterior,valorActual)
    }
    computar(operador) {
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = operador;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

}