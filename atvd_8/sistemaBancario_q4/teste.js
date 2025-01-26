"use strict";
exports.__esModule = true;
var Cliente_1 = require("./Cliente/Cliente");
var Banco_1 = require("./Banco/Banco");
var Conta_1 = require("./Conta/Conta");
var Poupanca_1 = require("./ContaPoupan\u00E7a/Poupanca");
var promptSync = require("prompt-sync");
var input = promptSync();
var banco = new Banco_1.Banco();
// perguntar()
testeAutomatico();
function exibirMenuDeOpcoes() {
    var opcao;
    do {
        exibirMenu();
        opcao = input("Opção: ");
        switch (opcao) {
            case "1":
                console.log("Você escolheu a função 'Inserir Conta'");
                inserirConta();
                break;
            case "2":
                console.log("Você escolheu a função 'Consultar Conta'");
                consultarConta();
                break;
            case "3":
                console.log("Você escolheu a função 'Sacar'");
                sacar();
                break;
            case "4":
                console.log("Você escolheu a função 'Depositar'");
                depositar();
                break;
            case "5":
                console.log("Você escolheu a função 'Excluir Conta'");
                excluirConta();
                break;
            case "6":
                console.log("Você escolheu a função 'Transferir'");
                transferir();
                break;
            case "7":
                console.log("Você escolheu a função 'Totalizações'");
                totalizacoes();
                break;
            case "8":
                console.log("Você escolheu a função 'Inserir Cliente'");
                inserirCliente();
                break;
            case "9":
                console.log("Você escolheu a função 'Consultar Cliente'");
                consultarCliente();
                break;
            case "10":
                console.log("Você escolheu a função 'Associar Conta'");
                associarContaCliente();
                break;
            case "11":
                console.log("Você escolheu a função 'Mudar Titularidade da Conta'");
                mudarTitularidadeConta();
                break;
            case "12":
                console.log("Você escolheu a função 'Excluir Cliente'");
                excluirCliente();
                break;
            case "13":
                console.log("Você escolheu a função 'Listar Contas Sem Cliente'");
                listarContasSemCliente();
                break;
            case "0":
                console.log("Aplicação encerrada.");
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
        }
        input("Operação finalizada. Pressione <enter> para continuar...");
    } while (opcao !== "0");
}
function inserirConta(ie_automatico) {
    var id_conta = createIdGenerator();
    if (ie_automatico) {
        banco.inserirConta(new Poupanca_1.Poupanca('111-1', 1000, 1, 5));
        banco.inserirConta(new Poupanca_1.Poupanca('222-2', 200, 2, 7));
        banco.inserirConta(new Conta_1.Conta('333-3', 300, 3));
        banco.inserirConta(new Conta_1.Conta('444-4', 400, 4));
        banco.inserirConta(new Conta_1.Conta('555-5', 500, 5)); //conta sem cliendte
        return;
    }
    var num_conta = input("Digite o número da conta: ");
    var saldo = isNumber(Number(input("Digite o saldo da conta: ")));
    var conta1 = new Conta_1.Conta(num_conta, saldo, id_conta());
    banco.inserirConta(conta1);
}
function consultarConta(ie_automatico) {
    if (ie_automatico) {
        console.log(banco.consultar("111-1"));
        return;
    }
    var conta_buscada = input("Digite a conta que deseja buscar: ");
    console.log(banco.consultar(conta_buscada));
}
function sacar(ie_automatico) {
    if (ie_automatico) {
        banco.sacar("1", "111-1", 50);
        return;
    }
    var cpf_cliente = input("Digite seu CPF: ");
    var num_conta = input("Digite o número da conta que deseja sacar: ");
    var saque = isNumber(Number(input("Digite o saque que deseja realizar: ")));
    banco.sacar(cpf_cliente, num_conta, saque);
}
function depositar(ie_automatico) {
    if (ie_automatico) {
        banco.depositar("1", "111-1", 100);
        return;
    }
    var cpf_cliente = input("Digite seu CPF: ");
    var num_conta = input("Digite o número da conta que deseja depositar: ");
    var deposito = isNumber(Number(input("Digite o valor do deposito que deseja realizar: ")));
    banco.depositar(cpf_cliente, num_conta, deposito);
}
function excluirConta(ie_automatico) {
    if (ie_automatico) {
        banco.removerContaVinculada('3', '333-3');
        return;
    }
    var cpf_apagar = input("Digite o CPF do dono da conta que deseja apagar: ");
    var num_conta = input("Digite o número da conta que deseja apagar: ");
    banco.removerContaVinculada(cpf_apagar, num_conta);
}
function transferir(ie_automatico) {
    if (ie_automatico) {
        banco.transferir("1", "111-1", "2", "222-2", 100);
        return;
    }
    var cpf_remetente = input("Digite o CPF vinculado a conta que irá mandar o dinheiro: ");
    var num_conta_remetente = input("Digite o número da conta que irá mandar o dinheiro: ");
    var cpf_destino = input("Digite o CPF vinculado a conta que irá receber o dinheiro: ");
    var num_conta_destino = input("Digite o número da conta que irá receber o dinheiro: ");
    var val_transferido = isNumber(Number(input("Digite o valor que deseja transferir: ")));
    banco.transferir(cpf_remetente, num_conta_remetente, cpf_destino, num_conta_destino, val_transferido);
}
function totalizacoes() {
    console.log("H\u00E1 ".concat(banco.totalDeContas(), " contas no banco"));
    console.log("No total foram depositados R$".concat(banco.data.totDepositado, " em todas contas do banco"));
    console.log("O saldo m\u00E9dio das contas do banco \u00E9 de R$".concat(banco.saldoMedioContas()));
}
function inserirCliente(ie_automatico) {
    var id_cliente = createIdGenerator();
    if (ie_automatico) {
        banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "pedro", '1'));
        banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "joao", '2'));
        banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "tevis", '3'));
        banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "maria", '4'));
        banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "cliente_apagado", '5'));
        return;
    }
    var nome_cli = input("Digite o nome do cliente: ");
    var cpf_cliente = input("Digite seu CPF: ");
    var cliente = new Cliente_1.Cliente(id_cliente(), nome_cli, cpf_cliente);
    banco.inserirCliente(cliente);
}
function consultarCliente(ie_automatico) {
    if (ie_automatico) {
        banco.consultaPorCpf('1');
        return;
    }
    var cpf_cliente = input("Digite o CPF do cliente que deseja buscar: ");
    banco.consultaPorCpf(cpf_cliente);
}
function associarContaCliente(ie_automatico) {
    if (ie_automatico) {
        banco.associarContaCliente('111-1', '1');
        banco.associarContaCliente('222-2', '2');
        banco.associarContaCliente('333-3', '3');
        banco.associarContaCliente('444-4', '4');
        return;
    }
    var conta = input("Digite o número da conta que deseja associar: ");
    var cpf_cliente = input("Digite o CPF do cliente que deseja associar: ");
    banco.associarContaCliente(conta, cpf_cliente);
}
function mudarTitularidadeConta(ie_automatico) {
    if (ie_automatico) {
        console.log("Mudando titularidade da conta '111-1' para Maria...");
        banco.mudarTitularidadeConta("111-1", "4");
        console.log("\nConsultando a conta após a mudança de titularidade...");
        console.log(banco.consultar("111-1"));
        return;
    }
    var numeroConta = input("Digite o número da conta que deseja mudar de titular: ");
    var novoCpfCliente = input("Digite o CPF do novo titular: ");
    banco.mudarTitularidadeConta(numeroConta, novoCpfCliente);
}
function excluirCliente(ie_automatico) {
    if (ie_automatico) {
        console.log("Excluindo o cliente 'Cliete_apagado'...");
        banco.excluirCliente("5");
        return;
    }
    var cpf_cliente = input("Digite o cpf do cliente que deseja excluir: ");
    banco.excluirCliente(cpf_cliente);
}
function listarContasSemCliente(ie_automatico) {
    var contasSemCliente = banco.listarContasSemCliente();
    console.log("\nContas sem cliente associado:");
    contasSemCliente.forEach(function (conta) {
        console.log("N\u00FAmero da Conta: ".concat(conta.getNumero(), ", Saldo: R$").concat(conta.getSaldo()));
    });
    var numeroConta = input("Digite o número da conta que deseja associar a um cliente: ");
    var cpfCliente = input("Digite o CPF do cliente: ");
    banco.associarContaSemCliente(numeroConta, cpfCliente);
}
function testeAutomatico() {
    console.log();
    inserirConta(true);
    console.log();
    banco.renderJuros('111-1');
    banco.renderJuros('333-3');
    // consultarConta(true)
    // inserirCliente(true)
    // console.log()
    // associarContaCliente(true)
    // console.log()
    // // console.log("CONSTAS NO BANCO: ")
    // // console.log(banco.contas)
    // // console.log()
    // // console.log("CLIENTES CADASTRADOS")
    // // console.log(banco.clientes)
    // // console.log("\n\n")
    // console.log("CONSULTANDO CONTA:")
    // console.log()
    // sacar(true)
    // console.log()
    // depositar(true)
    // console.log()
    // excluirConta(true)
    // console.log()
    // transferir(true)
    // console.log()
    // totalizacoes()
    // mudarTitularidadeConta(true)
    // excluirCliente(true)
    // listarContasSemCliente()
}
function perguntar() {
    var resposta;
    while (true) {
        resposta = input("Você deseja fazer testes automáticos? (sim/não) ");
        if (resposta.toLowerCase() === "sim" || resposta.toLowerCase() === "s" || resposta.toLowerCase() === "ss") {
            testeAutomatico();
            break;
        }
        else if (resposta.toLowerCase() === "não" || resposta.toLowerCase() === "nao" || resposta.toLowerCase() === "n") {
            exibirMenuDeOpcoes();
            break;
        }
        else {
            console.log("Resposta inválida! Por favor, responda com 'sim' ou 'não'.");
        }
    }
}
function exibirMenu() {
    console.log('\nBem-vindo! Selecione uma opção:');
    console.log('Contas:');
    console.log('1 - Inserir');
    console.log('2 - Consultar');
    console.log('3 - Sacar');
    console.log('4 - Depositar');
    console.log('5 - Excluir');
    console.log('6 - Transferir');
    console.log('7 - Totalizações');
    console.log('Clientes:');
    console.log('8 - Inserir Cliente');
    console.log('9 - Consultar Cliente');
    console.log('10 - Associar Conta');
    console.log('0 - Sair');
}
function isNumber(val) {
    while (isNaN(val)) {
        console.log("Valor inválido! Por favor, tente novamente.");
        val = Number(input("Digite o saldo da conta: "));
    }
    return val;
}
function createIdGenerator() {
    var id = 0;
    return function () {
        id += 1;
        return id;
    };
}
