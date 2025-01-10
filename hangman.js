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



function textoResultadogg(){
    return ""
}
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


//creacion de botones de teclado
const divBotones = document.createElement("div");
document.body.appendChild(divBotones);
for (letra of teclado){
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.addEventListener("click", () => checkTecla(boton.textContent));
    divBotones.appendChild(boton);
}


function checkTecla(tecla){
    let encontrado=false;
    let texto2Array = textsecret.split('');

    for (let i = 0; i < texto.length; i++){
        if (texto[i]==tecla){
            textsecret = texto.slice(0, 3) + tecla + texto.slice(4);
            texto2Array[i]=tecla;
            encontrado=true;
        }
    }
    textsecret = texto2Array.join('');
    palabra.textContent=textsecret;
    letrasPorAdivinar=texto.split('_').length - 1;
    if (textsecret.includes("*")==false) {
        alert("You win. Try again");
        numErrores=0;
        textsecret="*".repeat(texto.length);
        palabra.textContent=textsecret;
        textoErrores.textContent=numErrores;
    }

    if (encontrado===false){
        numErrores+=1;
        textoErrores.textContent=numErrores;
        UpdateDibujo();
        if (numErrores==6){
            alert("You lose. Try again");
            numErrores=0;
            textsecret="*".repeat(texto.length);
            palabra.textContent=textsecret;
            textoErrores.textContent=numErrores;
        }
    }
    UpdateDibujo();

}


function iniciar(){
      canvas=document.getElementById('canvas');
      ctx=canvas.getContext('2d');
      canvas.width=drawWidtht;
      canvas.height=drawHeight;
      //cruzcentral(canvas,ctx);
      dibujarHorca();
      dibujarCabeza();
      dibujarTronco();
      dibujarBrazoI();
      dibujarBrazoD();
      dibujarPiernaI();
      dibujarPiernaD();
      //PintaTexto(canvas1,ctx1,"hola", canvas1.width/2, canvas1.height/2,`50px arial`,"#000000","center","middle");
}
//window.addEventListener("load", iniciar, false);



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
