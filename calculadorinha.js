const process = require('process');

function validarNumero(input) {
    const numero = parseFloat(input);
    return !isNaN(numero) ? numero : null;
}

function validarOperacao(input) {
    const operacoesValidas = ['1', '2', '3', '4', '5'];
    return operacoesValidas.includes(input) ? input : null;
}

function obterEntrada(pergunta, callback) {
    process.stdout.write(pergunta);
    process.stdin.once('data', (data) => callback(data.toString().trim()));
}

function calcular(numero1, numero2, operacao) {
    switch (operacao) {
        case '1':
            return numero1 + numero2;
        case '2':
            return numero1 - numero2;
        case '3':
            return numero1 * numero2;
        case '4':
            return numero2 !== 0 ? numero1 / numero2 : "Erro: Houve uma tentativa de divisão por zero";
        case '5':
            return (numero1 * numero2) / 100;
        default:
            return "A operação realizada é inválida.";
    }
}

obterEntrada("Insira o primeiro número: ", (entrada1) => {
    const numero1 = validarNumero(entrada1);
    if (numero1 === null) return console.log("Entrada inválida. Por favor, reinicie e insira um número válido.");

    obterEntrada("Insira o segundo número: ", (entrada2) => {
        const numero2 = validarNumero(entrada2);
        if (numero2 === null) return console.log("Esta entrada foi inválida. Por favor, reinicie inserindo números válidos.");

        obterEntrada("Selecione a operação:\n1 - Adição (+)\n2 - Subtração (-)\n3 - Multiplicação (*)\n4 - Divisão (/)\n5 - Porcentagem (%)\n", (entradaOperacao) => {
            const operacao = validarOperacao(entradaOperacao);
            if (operacao === null) return console.log("Esta opção é inválida. Por favor, reinicie e selecione uma operação válida.");

            const resultado = calcular(numero1, numero2, operacao);
            console.log(`O resultado da sua operação é: ${resultado}. Obrigado por utilizar a calculadorinha! :D`);
            process.stdin.pause();
        });
    });
});
