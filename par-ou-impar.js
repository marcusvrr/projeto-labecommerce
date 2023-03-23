const parOuImpar = process.argv[2]
const numero = Number(process.argv[3])

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
function opcoes(escolha) {
    switch(escolha){
        case "par":
            return "impar"
        case "impar":
            return "par"
        default:
            break;
    }  
}  
let escolhaComputador = opcoes(parOuImpar);
let numeroComputador = Number(getRndInteger(0, 10));

console.log(parOuImpar, numero, escolhaComputador, numeroComputador);

const soma = (numero+numeroComputador)
const decisao = soma %2===0? "par":"impar"


const vitoria=()=>{
    if(parOuImpar===decisao){
        console.log(`Você escolheu ${parOuImpar} e o computador ${escolhaComputador}. O resultado foi ${decisao}, você GANHOU!!!`);

    }else if(parOuImpar!==decisao){
        console.log(`Você escolheu ${parOuImpar} e o computador ${escolhaComputador}. O resultado foi ${decisao}, você Perdeu!!!`);
    }else{
        console.log("Algo digitado não foi válido para partida");
    }
}
vitoria()

