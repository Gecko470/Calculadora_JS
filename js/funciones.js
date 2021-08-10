let divPantalla = document.getElementById("divPantalla");
let text = "0", numText = "", num = 0, total = 0, cont = 0, punto = 0;
let array = [0];
let operac = [0];
let borrar = false;
let idOper = "";
let numOper = 0;
let res = false;
let pNT = true;
let textTotal = "";
let numTextTotal = "";

//Declaro variables, text es el texto completo que saco en pantalla, numText, último número de la cadena, num es numText en 
//número, total, el resultado, cont, un contador de las veces que se presiona el igual. Utilizo dos array, uno para ir 
//guardando los números y otro para las operaciones. Variable borrar para inhabilitar el borrado de caracter a caracter y 
//res para controlar si el usuario quiere seguir operando con el resultado o no.
//Agrego los números al array cuando se pulsa una operación (+. -. etc) o el signo =
//Y agrego los valores (1-5) de la operación al array cuando se pulsan.
//Voy eliminando estos valores (o actualizando) cuando utilizo la función borr.

//La he probado bastante (bastante), y no he encontrado ningún bug. Espero que a tí también te funcione perfecta.
//Controlo que no pase nada cuando se presiona el igual cuando no hay una operación lógica. X=, 0=, etc.

//Esta función muestra el resultado en pantalla, controlo si es el primer igual o no, controlando si el usuario quiere seguir
//haciendo operaciones con el resultado mostrado en pantalla, o quiere introducir un número nuevo.
//La pantalla se "refresca" cuando llega abajo, lo controlo con las veces que se presiona el igual.
function resultado() {

    console.log(numText);
    if ((text != "0") && (numText != "") && ((array[0] != 0) || ((array[0] == 0) && (numText != ""))) && (pNT == true)) {

        num = parseFloat(numText);
        array.push(num);

    }


    if ((array.length >= 2) && (operac.length >= 1) && (operac.length < array.length)) {


        cont++;
        text += "=";
        divPantalla.innerHTML = text;


        total = array[0];

        for (i = 0; i < array.length; i++) {

            if (operac[i] == 1) {
                total += array[i + 1];
            }
            else if (operac[i] == 2) {
                total -= array[i + 1];
            }
            else if (operac[i] == 3) {
                total *= array[i + 1];
            }
            else if (operac[i] == 4) {
                total /= array[i + 1];
            }
            else if (operac[i] == 5) {
                total = total * (array[i + 1] / 100);
            }
        }

        if (cont <= 7) {
            text += "<br>" + total.toString();
        }
        else {
            text = total.toString();
            cont = 0;
        }
        divPantalla.innerHTML = text;

        numTextTotal = total.toString();
        textTotal = "<br>" + numTextTotal;

        array = [0];
        operac = [0];
        total = 0;
        num = 0;
        numText = "";
        borrar = false;
        res = true;
        pNT = true;
        punto = 0;

    }
}

//Esta función es genérica para todas las operaciones matemáticas, capturo el id de la celda pulsada para determinar la 
//operación a realizar
function op(id) {

    console.log(numText);
    console.log(isNaN(parseFloat(numText)));
    console.log(parseFloat(numText) * 2);

        if (id == "+") {
            numOper = 1;
        }
        else if (id == "-") {
            numOper = 2;
        }
        else if (id == "x") {
            numOper = 3;
        }
        else if (id == "/") {
            numOper = 4;
        }
        else if (id == "%") {
            numOper = 5;
        }


        if ((numText != "") || (numTextTotal != "")) {


            if (res == true) {
                numText = numTextTotal;
                text += textTotal + id;
                num = parseFloat(numText);
                numTextTotal = "";
                divPantalla.innerHTML = text;
            }
            else {
                num = parseFloat(numText);
                text += id;
                divPantalla.innerHTML = text;
            }

            if ((array[0] == 0) && (pNT == true)) {
                array[0] = num;
            }
            else if (pNT == true) {
                array.push(num);
            }
            if (operac[0] == 0) {
                operac[0] = numOper;
            }
            else {
                operac.push(numOper);
            }
            numText = "";
            num = 0;
        }

    borrar = true;
    res = false;
    pNT = true;
    punto = 0;
}

//Hago lo mismo que con la función de las operaciones matemáticas, capturo el id de la tecla pulsada y 
//voy escribiendo el número en pantalla.
function escribir(id) {

    numTextTotal = "";
    if (text == "0") {
        text = "";
    }
    else if (res == true) {
        text += "<br>";
    }

    if(id == "."){
        punto++;
    }

    if(punto <= 1){
        numText += id;
        text += id;
    }
    else if((punto > 1) && (id != ".")){
        numText += id;
        text += id;
    }
    divPantalla.innerHTML = text;
    borrar = true;
    res = false;

}

//Función de borrado completo de la pantalla, hago un "reset" de todo
function ac() {

    numText = "";
    numTextTotal = "";
    text = "0";
    num = 0;
    total = 0;
    array = [0];
    operac = [0];
    cont = 0;
    punto = 0;
    res = false;
    divPantalla.innerHTML = text;

}

//Función de borrado caracter a caracter, voy borrando la cadena text (todo el texto) y también la cadena textNum, controlando cuando 
//la cadena numText queda vacía y actualizando los datos de los arrays de números y de operaciones, y eliminado posiciones.
function borr() {

    if (borrar) {

        if (text != "0") {

            if (numText != "") {
                numText = numText.slice(0, numText.length - 1);
                text = text.slice(0, text.length - 1);
                if ((numText != "") && (array.length > operac.length)) {
                    array[array.length - 1] = parseFloat(numText);
                }
                else if ((numText == "") && (array.length > operac.length)) {
                    array.splice(array.length - 1, 1);
                }
            }
            else {
                text = text.slice(0, text.length - 1);
                operac.splice(operac.length - 1, 1);
                numText = array[array.length - 1].toString();
                pNT = false;
                punto = 0;
            }

            if (text == "") {
                text = "0";
            }

            divPantalla.innerHTML = text;

        }
    }
}
