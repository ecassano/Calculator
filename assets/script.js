var outVisor = document.getElementById("outVisor").value;
var n1 = 0;
var n2 = 0;
var sinal = "";
var sinalAtivo = false;
var sinalBloqueado = false;
var operadores = document.querySelectorAll(".operador");
var lastIndex = 0;

operadores.forEach((item, index) => {
    operadores[index].addEventListener("click", () => {
        operadores[index].classList.add("active");
        if (lastIndex != index) {
            operadores[lastIndex].classList.remove("active");
        }

        lastIndex = index;
    })
})

function preencherVisor(p) {
    if (!sinalAtivo && sinalBloqueado) {
        n1 = 0;
        sinal = "";
        n2 = 0;
        outVisor = "0";
    }

    if (!sinalAtivo) {
        if ((outVisor.replace(".", "")).length < 9) {
            if (outVisor == "0" && p != ".") {
                outVisor = p;
            } else {
                if (outVisor.indexOf(".") == -1 || p != ".") {
                    outVisor += p;
                }
            }
            document.getElementById("outVisor").value = outVisor;
        }
    } else {
        if (p == ".") {
            outVisor = "0" + p;
        } else {
            outVisor = p;
        }
    }
    document.getElementById("outVisor").value = outVisor;
    sinalAtivo = false;
    sinalBloqueado = false;
    operadores[lastIndex].classList.remove("active");
}

function calcularResultado(p) {
    if (p == "%" || p == "x²" || p == "²√x") {
        switch (p) {
            case "%": {
                outVisor = (Number(outVisor) / 100).toString();
                break;
            }
            case "x²": {
                outVisor = (Number(outVisor) ** 2).toString();
                break;
            }
            case "²√x": {
                outVisor = (Math.sqrt(Number(outVisor))).toString();
                break;
            }
        }
        document.getElementById("outVisor").value = outVisor;
        operadores[lastIndex].classList.remove("active");
    } else {
        if (!sinalBloqueado) {
            if (sinal == "") {
                n1 = Number(outVisor);
            } else {
                exibirResultado();
            }
        }
        switch (p) {
            case "+": {
                sinal = "+";
                break;
            }
            case "-": {
                sinal = "-";
                break;
            }
            case "*": {
                sinal = "*";
                break;
            }
            case "/": {
                sinal = "/";
                break;
            }
        }
        sinalAtivo = true;
        sinalBloqueado = true;
    }
}

function exibirResultado() {
    n2 = Number(outVisor);
    switch (sinal) {
        case "+": {
            n1 += n2;
            break;
        }
        case "-": {
            n1 -= n2;
            break;
        }
        case "*": {
            n1 *= n2;
            break;
        }
        case "/": {
            n1 /= n2;
            break;
        }
    }
    operadores[lastIndex].classList.remove("active");
    document.getElementById("outVisor").value = n1.toString();
}

function bloquearSinal() {
    sinalBloqueado = true;
    sinalAtivo = false;
}

function apagarCaractere() {
    if (outVisor.length > 1) {
        outVisor = outVisor.substr(0, outVisor.length - 1);
        document.getElementById("outVisor").value = outVisor;
    } else {
        document.getElementById("outVisor").value = 0;
    }
}

function limparVisor() {
    outVisor = "0";
    document.getElementById("outVisor").value = outVisor;
    operadores[lastIndex].classList.remove("active");
}

function limparTudo() {
    outVisor = "0";
    n1 = 0;
    n2 = 0;
    sinal = "";
    document.getElementById("outVisor").value = outVisor;
    operadores[lastIndex].classList.remove("active");
} 