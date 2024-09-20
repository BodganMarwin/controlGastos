

let listaGastos = [];
let listaValor = [];
let listaDetalle = [];
let listafecha = [];
let lista = document.getElementById('listaDeGastos');

function clickBoton(){
    let gasto = document.getElementById('nombreGasto');
    let valor = document.getElementById('valorGasto');
    let detalle = document.getElementById('detalleGasto');
    if (gasto.value != "" ){
        gasto.style.border = "1px solid #ccc";
        if (detalle.value != ""){
            detalle.style.border = "1px solid #ccc";
            if (valor.value != ""){
                valor.style.border = "1px solid #ccc"
                if (Number(valor.value)>150){
                     alert(`El gasto ${gasto.value} es mayor a USD 150`);
                }
                listaGastos.push((gasto.value).toUpperCase());
                listaValor.push(Number(valor.value));
                listaDetalle.push((detalle.value).toUpperCase());
                const fecha  = new Date();
                const fechaActual = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit'});
                listafecha.push(fechaActual);
                actualizarListaGastos();  
            }
            else{
                valor.style.border = "3px solid red";
            }
        }
        else{
            detalle.style.border = "3px solid red";
        }
    }
    else{
        gasto.style.border = "3px solid red";
    }
}

function actualizarListaGastos(){
    let listali = '';
    let total = 0;
    listaGastos.forEach((element,posicion) => {
        listali += 
        `<li>
            ${element} - USD ${listaValor[posicion]} POR ${listaDetalle[posicion]} EL ${listafecha[posicion]}
            <button id="botonEditar${posicion}" onclick="editarGasto(${posicion});"> Editar</button>
            <button id="botonEliminar${posicion}" onclick="eliminarGasto(${posicion});"> Eliminar</button>
        </li>`;
        total += listaValor[posicion];
    });
    lista.innerHTML = listali;
    let htmltotal = document.getElementById('totalGastos');
    htmltotal.innerHTML = total;

    limpiar();
}
function eliminarGasto(posicion){
    listaGastos.splice(posicion,1);
    listaValor.splice(posicion,1);
    listaDetalle.splice(posicion,1);
    listafecha.splice(posicion,1);
    actualizarListaGastos();
}
function editarGasto(posicion){
    let gasto = document.getElementById('nombreGasto');
    let valor = document.getElementById('valorGasto');
    let detalle = document.getElementById('detalleGasto');
    gasto.value = listaGastos[posicion];
    valor.value = listaValor[posicion];
    detalle.value = listaDetalle[posicion];
    let boton = document.getElementById('botonFormulario');
    boton.innerHTML = "Editar";
    boton.setAttribute("onclick", `editarValoresGasto(${posicion})`);
    const botonCancelar = document.createElement('button');
    botonCancelar.innerHTML = 'Cancelar';
    botonCancelar.setAttribute('id','cancelarGasto');
    botonCancelar.setAttribute('onclick','cancelarGasto()');
    const campodiv = document.getElementById('divGasto');
    campodiv.appendChild(botonCancelar);
    
    const elementosALista = document.querySelectorAll('li');
    elementosALista.forEach(elemento => {
        console.log(elemento);
        elemento.style.display = 'none';
        //elemento.onclick = null;
    });
}
function editarValoresGasto(posicion){
    let gasto = document.getElementById('nombreGasto');
    let valor = document.getElementById('valorGasto');
    let detalle = document.getElementById('detalleGasto');

    if (gasto.value != "" ){
        gasto.style.border = "1px solid #ccc";
        if (detalle.value != ""){
            detalle.style.border = "1px solid #ccc";
            if (valor.value != ""){
                valor.style.border = "1px solid #ccc"
                if (Number(valor.value)>150){
                     alert(`El gasto ${gasto.value} es mayor a USD 150`);
                }
                listaGastos[posicion] = (gasto.value).toUpperCase();
                listaValor[posicion] = Number(valor.value);
                listaDetalle[posicion] = (detalle.value).toUpperCase();
                cancelarGasto();
            }
            else{
                valor.style.border = "3px solid red";
            }
        }
        else{
            detalle.style.border = "3px solid red";
        }
    }
    else{
        gasto.style.border = "3px solid red";
    }
}
function limpiar(){
    document.getElementById('nombreGasto').value = null;
    document.getElementById('valorGasto').value = null;
    document.getElementById('detalleGasto').value = null;
}
function cancelarGasto(){
    actualizarListaGastos();
    const botonCancelar = document.getElementById('cancelarGasto');
    const campodiv = document.getElementById('divGasto');
    campodiv.removeChild(botonCancelar);
    let boton = document.getElementById('botonFormulario');
    boton.innerHTML = "Agregar Gasto";
    boton.setAttribute("onclick", `clickBoton()`);
}