class EncontrarEmogi{
    constructor(){
        this.panelIzquierdo = document.getElementById('panel-izquierdo');
        this.panelDerecho = document.getElementById('panel-derecho');
        this.body = document.getElementsByTagName('body')[0];
        this.imgEmogi = 'images/emoji-sonriente.png';
        this.cantidadEmogi = 5;
        this.cantidadAciertos = 0;
        
        this.generarEmogis();
        this.panelIzquierdo.onclick = this.terminarJuego.bind(this);
    }

    generarEmogis(){
        for( let i=1; i < this.cantidadEmogi; i++){
             let Emogi = document.createElement('img');
             Emogi.src = this.imgEmogi;
             let x = Math.floor(Math.random()*350);
             let y = Math.floor(Math.random()*340);
             
             Emogi.style.left = `${x}px`;
             Emogi.style.top = `${y}px`;

             this.panelIzquierdo.appendChild(Emogi)
            }

        this.configurarPaneles();

    } 
    configurarPaneles() {
        let clonacionEmogis = this.panelIzquierdo.cloneNode(true);
        clonacionEmogis.removeChild(clonacionEmogis.lastChild);

        this.panelDerecho.appendChild(clonacionEmogis);

        this.panelIzquierdo.lastChild.onclick = this.pasarSiguienteNivel.bind(this);
           
    }

    pasarSiguienteNivel(evento) {
        
        this.cantidadAciertos+=1;

        evento.stopPropagation();

        while(this.panelIzquierdo.hasChildNodes()){
            this.panelIzquierdo.removeChild(this.panelIzquierdo.lastChild);
        }
        while(this.panelDerecho.hasChildNodes()){
            this.panelDerecho.removeChild(this.panelDerecho.lastChild);
        }

        this.cantidadEmogi += 1;

        this.generarEmogis();
    }

    terminarJuego(){
        this.panelDerecho.innerHTML = `
            <div id="game-over-msg">
                <h2>Juego Terminado</h2>
                <h3>Cantidad de aciertos: ${this.cantidadAciertos}</h3>
            </div>`;
        this.panelDerecho.style.textAlign='center';
    }
}
window.addEventListener('load', () => {
    new EncontrarEmogi();
});