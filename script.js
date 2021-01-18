//Objeto canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Radio del reloj (altura del canvas)
var radius = canvas.height / 2;

//Traslada la posición(0,0) al centro del dibujo.
ctx.translate(radius, radius);

//Reduce el radio al 90% para que quede dibujado bien dentro del canvas.
radius = radius * 0.90

// DIBUJAR EL RELOJ
// drawClock();

//Para INICIAR EL RELOJ, llamar a la función drawClock en intervalos.
setInterval(drawClock,1000);

function drawClock() {
    drawFace(ctx,radius);
    drawNumbers(ctx,radius);
    drawTime(ctx,radius);
}

function drawFace(ctx, radius) {
    var grad;
    
    //Circulo blanco interior
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    //Crear un gradiente radial (95% y 105% del radio original del reloj)
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    
    //3 paradas de color, correspondientes con el borde interior, medio y exterior del arco.
    // ColorStop crea un efecto 3D
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    
    //Definir el degradado como el estilo de trazo del objeto de dibujo
    ctx.strokeStyle = grad;
    
    //Ancho de línea del objeto (10% del radio)
    ctx.lineWidth = radius*0.1;
    
    //Dibujar el circulo
    ctx.stroke();

    //Circulo en el centro del reloj.
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    
    //Font size (15% del radio)
    ctx.font = radius*0.15 + "px arial";
    
    //Alineación del texto en el centro y en el centro de la posición de impresión
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    
    //Calcular la posición de impresion de los números.
    // 85% del radio,rotado pi/6 por cada número.
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    
    //Date obtiene la hora actual
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    //Calcular el ángulo de las agujas del reloj según la hora.
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

//Dibujar la línea indicando longitud y ancho.
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}