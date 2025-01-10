let drawcolor="#000000";
let drawlineWidth=10;
let drawHeight=600;
let drawWidtht=500;
let drawfactor=50;
var texto="ADIVINANZA";
var textsecret="";
var letrasPorAdivinar=texto.length;
var numErrores=0;
const MaxErrores=6;
const teclado ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.addEventListener('keydown', (event) => {
    var keyValue = event.key;
    keyValue=keyValue.toUpperCase();
    checkTecla(keyValue);
  }, false);



//creacion de canvas
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx=canvas.getContext('2d');
canvas.width=drawWidtht;
canvas.height=drawHeight;
dibujarHorca();

//creacion de palabra secreta
const divPalabra = document.createElement("div");
document.body.appendChild(divPalabra);
textsecret="*".repeat(texto.length);
const palabra = document.createTextNode(textsecret);
divPalabra.appendChild(palabra);

//creacion de resultados
const divResultados = document.createElement("div");
document.body.appendChild(divResultados);
const letrero = document.createElement("p");
letrero.textContent="Hint: A device used to transmit sound over long distances.",
divResultados.appendChild(letrero);
const br = document.createElement("br");
divResultados.appendChild(br);
const textoResultado = document.createElement("p");
textoResultado.textContent="Incorrect Guesses : ";
const textoErrores = document.createElement("b");
textoErrores.textContent=numErrores;
const textoMaxErrores = document.createElement("b");
textoMaxErrores.textContent=" / "+MaxErrores;
divResultados.appendChild(textoResultado);
divResultados.appendChild(textoErrores);
divResultados.appendChild(textoMaxErrores);

//creacion de ventana modal
const ventanaModal = document.createElement("div");
ventanaModal.className="modal";
ventanaModal.id="ventanaModal"
document.body.appendChild(ventanaModal);
const divModal = document.createElement("div");
divModal.className="contenido-modal";
ventanaModal.appendChild(divModal);
const resumen = document.createElement("p");
resumen.textContent="";
divModal.appendChild(resumen);
const botonReset=document.createElement("button");
botonReset.textContent = "Try Again";
botonReset.addEventListener("click", () => resetgame());
divModal.appendChild(botonReset);

//creacion de botones de teclado
const divBotones = document.createElement("div");
document.body.appendChild(divBotones);
for (letra of teclado){
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.id=letra;
    boton.className="botonLetra"
    boton.addEventListener("click", () => checkTecla(boton.textContent));
    divBotones.appendChild(boton);
}


function resetgame(){
    numErrores=0;
    textsecret="*".repeat(texto.length);
    palabra.textContent=textsecret;
    textoErrores.textContent=numErrores;
    resumen.textContent="";
    for (letra of teclado){
        const botonLetra = document.getElementById(letra);
        botonLetra.disabled = false;
    }
    UpdateDibujo();
    ventanaModal.style.display = "none";
}

function checkTecla(tecla){
    let encontrado=false;
    let texto2Array = textsecret.split('');
    const botonLetra = document.getElementById(tecla);
    botonLetra.disabled = true;

    for (let i = 0; i < texto.length; i++){
        if (texto[i]==tecla){
            textsecret = texto.slice(0, 3) + tecla + texto.slice(4);
            texto2Array[i]=tecla;
            encontrado=true;
        }
    }
    textsecret = texto2Array.join('');
    palabra.textContent=textsecret;
    letrasPorAdivinar=texto.split('*').length - 1;
    if (textsecret.includes("*")==false) { 
        ventanaModal.style.display = "block";
        resumen.textContent="You win";
    }

    if (encontrado===false){
        numErrores+=1;
        textoErrores.textContent=numErrores;
        UpdateDibujo();
        if (numErrores==6){            
            ventanaModal.style.display = "block";
            resumen.textContent="You lose";
        }
    }
    UpdateDibujo();

}



function UpdateDibujo() {
    switch (numErrores) {
        case 0:
            dibujarHorca();
            break;
        case 1:
            dibujarCabeza();
            break;
        case 2:
            dibujarTronco();
            break;
        case 3:
            dibujarBrazoI();
            break;
        case 4:
            dibujarBrazoD();
            break;
        case 5:
            dibujarPiernaI();
            break;
        case 6:
            dibujarPiernaD();
            break;
    }
}

function dibujarHorca() {
    ctx.clearRect(0, 0, drawWidtht, drawHeight);
    ctx.beginPath();
    ctx.moveTo(drawfactor,drawHeight-drawfactor);
    ctx.lineTo(drawWidtht-drawfactor,drawHeight-drawfactor);
    ctx.moveTo(drawfactor*2,drawHeight-drawfactor);
    ctx.lineTo(drawfactor*2,drawfactor);
    ctx.lineTo(drawfactor*6,drawfactor);
    ctx.lineTo(drawfactor*6,drawfactor*2);
    ctx.moveTo(drawfactor*2,drawfactor*3);
    ctx.lineTo(drawfactor*4,drawfactor);
    ctx.lineWidth = drawlineWidth;
    ctx.strokeStyle = drawcolor;
    ctx.stroke();
}
function dibujarCabeza() {
    ctx.beginPath();
    ctx.arc(drawfactor*6, drawfactor*3, drawfactor, 0, 2 * Math.PI);
    ctx.lineWidth = drawlineWidth;
    ctx.strokeStyle = drawcolor;
    ctx.stroke();
}
function dibujarTronco() {
    ctx.beginPath();
    ctx.moveTo(drawfactor*6,drawfactor*4);
    ctx.lineTo(drawfactor*6,drawfactor*7);
    ctx.lineWidth = drawlineWidth;
    ctx.strokeStyle = drawcolor;
    ctx.stroke();
}
function dibujarBrazoI() {
    ctx.beginPath();
    ctx.moveTo(drawfactor*6,drawfactor*5);
    ctx.lineTo(drawfactor*4,drawfactor*5);
    ctx.lineWidth = drawlineWidth;
    ctx.strokeStyle = drawcolor;
    ctx.stroke();
}
function dibujarBrazoD() {
    ctx.beginPath();
    ctx.moveTo(drawfactor*6,drawfactor*5);
    ctx.lineTo(drawfactor*8,drawfactor*5);
    ctx.lineWidth = drawlineWidth;
    ctx.strokeStyle = drawcolor;
    ctx.stroke();
}
function dibujarPiernaI() {
    ctx.beginPath();
    ctx.moveTo(drawfactor*6,drawfactor*7);
    ctx.lineTo(drawfactor*5,drawfactor*9);
    ctx.lineWidth = drawlineWidth;
    ctx.strokeStyle = drawcolor;
    ctx.stroke();
}
function dibujarPiernaD() {
    ctx.beginPath();
    ctx.moveTo(drawfactor*6,drawfactor*7);
    ctx.lineTo(drawfactor*7,drawfactor*9);
    ctx.lineWidth = drawlineWidth;
    ctx.strokeStyle = drawcolor;
    ctx.stroke();
}
