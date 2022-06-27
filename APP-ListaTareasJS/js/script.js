class ListaTareas{
    constructor(){
        this.tareas=JSON.parse(localStorage.getItem('tareas'));
        if(!this.tareas){
            this.tareas=[
                {tarea:"Practicar Javascript",completado:false},
                {tarea:"Practicar React",completado:false},
                {tarea:"Practicar Node",completado:false},
                {tarea:"Practicar Angular",completado:false},
            ];
        }

        this.cargarTareas();
        this.agregarEventListeners();
    }
    agregarEventListeners(){
        document.getElementById('recordatorio').addEventListener('keypress',(evento)=>{
            if(evento.key === "Enter"){
                this.agregarTarea(evento.target.value);
                evento.target.value='';
            }
        });
    }
    
    cargarTareas(){
        localStorage.setItem('tareas',JSON.stringify(this.tareas));
        let htmlTareas=this.tareas.reduce((html, tarea, indice) => html += this.generarHtmlTareas(tarea,indice),'');
        document.getElementById('lista-tareas').innerHTML=htmlTareas;
    }

    generarHtmlTareas(tarea,indice){
        return `
        <li class="list-group-item checkbox">
            <div class="container">
                <div class="row">
                    <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                        <label>
                            <input id="cambiarEstadoTarea" type="checkbox" onchange="listaTareas.cambiarEstadoTarea(${indice})" value="" class="caja-comprobacion" ${tarea.completado ? 'checked':''}>
                        </label>
                    </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 texto-tarea ${tarea.completado ? 'tarea-completada':''}">
                    ${tarea.tarea}
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 area-icono-eliminacion">
                    <a class="" href="/" onclick="listaTareas.eliminarTarea(event,${indice})">
                        <i id="eliminarTarea" data-id=${indice} class="fas fa-trash-alt"></i>
                    </a>
                </div>
            </div>
            </div>
        </li>`;
    }
    
    agregarTarea(tarea){
        let elementoPadre=document.getElementById('recordatorio').parentElement;
        if(tarea !== ''){
            elementoPadre.classList.remove('has-error');
            let nuevaTarea={
            tarea,
            completado:false
            };
            this.tareas.push(nuevaTarea);
            this.cargarTareas();
        }else{
            elementoPadre.classList.add('has-error');
        }
    }
    
    agregarTareaClick(){
        let recordatorio=document.getElementById('recordatorio');
        let tarea=recordatorio.value;
        if(tarea){
            this.agregarTarea(tarea);
        }
        recordatorio.value="";    
    }

    cambiarEstadoTarea(indice){
        this.tareas[indice].completado = !this.tareas[indice].completado;
        this.cargarTareas();
    }

    eliminarTarea(evento,indice){
        console.log(evento,indice);
        evento.preventDefault();
        this.tareas.splice(indice,1);
        this.cargarTareas();
    }
}
let listaTareas;
window.addEventListener('load',()=>{
    listaTareas=new ListaTareas();
    let tarea=recordatorio.value;
});