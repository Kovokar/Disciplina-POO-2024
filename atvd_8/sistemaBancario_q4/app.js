"use strict";
exports.__esModule = true;
var Cliente_1 = require("./Cliente/Cliente");
var Banco_1 = require("./Banco/Banco");
var Conta_1 = require("./Conta/Conta");
var Poupanca_1 = require("./ContaPoupan\u00E7a/Poupanca");
var promptSync = require("prompt-sync");
var AplicacaoError_1 = require("./AplicacaoError");
var App = /** @class */ (function () {
    function App() {
        this.banco = new Banco_1.Banco();
        this.input = promptSync();
        this.iniciar();
    }
    App.prototype.iniciar = function () {
        var resposta = this.input("Você deseja fazer testes automáticos? (sim/não) ");
        if (resposta.toLowerCase() === "sim" || resposta.toLowerCase() === "s") {
            this.testeAutomatico();
        }
        else if (resposta.toLowerCase() === "não" || resposta.toLowerCase() === "nao" || resposta.toLowerCase() === "n") {
            this.exibirMenuDeOpcoes();
        }
        else {
            console.log("Resposta inválida! Por favor, responda com 'sim' ou 'não'.");
            this.iniciar();
        }
    };
    App.prototype.exibirMenuDeOpcoes = function () {
        var opcao;
        do {
            this.exibirMenu();
            opcao = this.input("Opção: ");
            try {
                switch (opcao) {
                    case "1":
                        console.log("Você escolheu a função 'Inserir Conta'");
                        this.inserirConta();
                        break;
                    case "2":
                        console.log("Você escolheu a função 'Consultar Conta'");
                        this.consultarConta();
                        break;
                    case "3":
                        console.log("Você escolheu a função 'Sacar'");
                        this.sacar();
                        break;
                    case "4":
                        console.log("Você escolheu a função 'Depositar'");
                        this.depositar();
                        break;
                    case "5":
                        console.log("Você escolheu a função 'Excluir Conta'");
                        this.excluirConta();
                        break;
                    case "6":
                        console.log("Você escolheu a função 'Transferir'");
                        this.transferir();
                        break;
                    case "7":
                        console.log("Você escolheu a função 'Totalizações'");
                        this.totalizacoes();
                        break;
                    case "8":
                        console.log("Você escolheu a função 'Inserir Cliente'");
                        this.inserirCliente();
                        break;
                    case "9":
                        console.log("Você escolheu a função 'Consultar Cliente'");
                        this.consultarCliente();
                        break;
                    case "10":
                        console.log("Você escolheu a função 'Associar Conta'");
                        this.associarContaCliente();
                        break;
                    case "11":
                        console.log("Você escolheu a função 'Mudar Titularidade da Conta'");
                        this.mudarTitularidadeConta();
                        break;
                    case "12":
                        console.log("Você escolheu a função 'Excluir Cliente'");
                        this.excluirCliente();
                        break;
                    case "13":
                        console.log("Você escolheu a função 'Listar Contas Sem Cliente'");
                        this.listarContasSemCliente();
                        break;
                    case "14":
                        console.log("Você escolheu a função 'Render Juros'");
                        this.renderJuros();
                        break;
                    case "0":
                        console.log("Aplicação encerrada.");
                        break;
                    default:
                        console.log("Opção inválida! Tente novamente.");
                }
            }
            catch (error) {
                if (error instanceof AplicacaoError_1.ContaInexistenteError) {
                    console.error("Erro de Conta: ".concat(error.message));
                }
                else if (error instanceof AplicacaoError_1.ClienteNaoEncontradoError) {
                    console.error("Erro de Cliente: ".concat(error.message));
                }
                else if (error instanceof AplicacaoError_1.SaldoInsuficienteError) {
                    console.error("Erro Financeiro: ".concat(error.message));
                }
                else {
                    console.error("Erro inesperado: ".concat(error.message));
                }
            }
            this.input("Operação finalizada. Pressione <enter> para continuar...");
        } while (opcao !== "0");
    };
    App.prototype.inserirConta = function (ie_automatico) {
        var id_conta = this.createIdGenerator();
        if (ie_automatico) {
            this.banco.inserirConta(new Conta_1.Conta('111-1', 1000, 1));
            this.banco.inserirConta(new Conta_1.Conta('222-2', 200, 2));
            this.banco.inserirConta(new Conta_1.Conta('333-3', 300, 3));
            this.banco.inserirConta(new Poupanca_1.Poupanca('111-1', 1000, 1, 5));
            this.banco.inserirConta(new Poupanca_1.Poupanca('222-2', 200, 2, 7)); //conta sem cliendte
            return;
        }
        try {
            var num_conta = this.validarNumeroConta(this.input("Digite o número da conta (formato XXX-X): "));
            var saldo = this.validarNumero(this.input("Digite o saldo da conta: "), 'saldo');
            var conta1 = new Conta_1.Conta(num_conta, saldo, id_conta());
            this.banco.inserirConta(conta1);
        }
        catch (error) {
            console.error("Erro ao inserir conta: ".concat(error.message));
        }
    };
    App.prototype.consultarConta = function (ie_automatico) {
        if (ie_automatico) {
            console.log(this.banco.consultar("111-1"));
            return;
        }
        var conta_buscada = this.input("Digite a conta que deseja buscar: ");
        console.log(this.banco.consultar(conta_buscada));
    };
    App.prototype.sacar = function (ie_automatico) {
        if (ie_automatico) {
            this.banco.sacar("1", "111-1", 50);
            return;
        }
        var cpf_cliente = this.input("Digite seu CPF: ");
        var num_conta = this.input("Digite o número da conta que deseja sacar: ");
        var saque = this.isNumber(Number(this.input("Digite o saque que deseja realizar: ")));
        this.banco.sacar(cpf_cliente, num_conta, saque);
    };
    App.prototype.depositar = function (ie_automatico) {
        if (ie_automatico) {
            this.banco.depositar("1", "111-1", 100);
            return;
        }
        var cpf_cliente = this.input("Digite seu CPF: ");
        var num_conta = this.input("Digite o número da conta que deseja depositar: ");
        var deposito = this.isNumber(Number(this.input("Digite o valor do deposito que deseja realizar: ")));
        this.banco.depositar(cpf_cliente, num_conta, deposito);
    };
    App.prototype.excluirConta = function (ie_automatico) {
        if (ie_automatico) {
            this.banco.removerContaVinculada('3', '333-3');
            return;
        }
        var cpf_apagar = this.input("Digite o CPF do dono da conta que deseja apagar: ");
        var num_conta = this.input("Digite o número da conta que deseja apagar: ");
        this.banco.removerContaVinculada(cpf_apagar, num_conta);
    };
    App.prototype.transferir = function (ie_automatico) {
        if (ie_automatico) {
            this.banco.transferir("1", "111-1", "2", "222-2", 100);
            return;
        }
        var cpf_remetente = this.input("Digite o CPF vinculado a conta que irá mandar o dinheiro: ");
        var num_conta_remetente = this.input("Digite o número da conta que irá mandar o dinheiro: ");
        var cpf_destino = this.input("Digite o CPF vinculado a conta que irá receber o dinheiro: ");
        var num_conta_destino = this.input("Digite o número da conta que irá receber o dinheiro: ");
        var val_transferido = this.validaValor(Number(this.input("Digite o valor que deseja transferir: ")));
        this.banco.transferir(cpf_remetente, num_conta_remetente, cpf_destino, num_conta_destino, val_transferido);
    };
    App.prototype.totalizacoes = function () {
        console.log("H\u00E1 ".concat(this.banco.totalDeContas(), " contas no banco"));
        console.log("No total foram depositados R$".concat(this.banco.data.totDepositado, " em todas contas do banco"));
        console.log("O saldo m\u00E9dio das contas do banco \u00E9 de R$".concat(this.banco.saldoMedioContas()));
    };
    App.prototype.inserirCliente = function (ie_automatico) {
        var id_cliente = this.createIdGenerator();
        if (ie_automatico) {
            this.banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "pedro", '1', new Date()));
            this.banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "joao", '2', new Date()));
            this.banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "tevis", '3', new Date()));
            this.banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "maria", '4', new Date()));
            this.banco.inserirCliente(new Cliente_1.Cliente(id_cliente(), "cliente_apagado", '5', new Date()));
            return;
        }
        try {
            var nome_cli = this.validarEntradaTexto(this.input("Digite o nome do cliente: "), 'nome');
            var cpf_cliente = this.validarEntradaTexto(this.input("Digite seu CPF: "), 'CPF');
            var data_nascimento = this.validarDataNascimento(this.input("Digite sua data de nascimento (AAAA-MM-DD): "));
            var cliente = new Cliente_1.Cliente(id_cliente(), nome_cli, cpf_cliente, data_nascimento);
            this.banco.inserirCliente(cliente);
        }
        catch (error) {
            console.error("Erro ao inserir cliente: ".concat(error.message));
        }
    };
    App.prototype.consultarCliente = function (ie_automatico) {
        if (ie_automatico) {
            this.banco.consultaPorCpf('1');
            return;
        }
        var cpf_cliente = this.input("Digite o CPF do cliente que deseja buscar: ");
        this.banco.consultaPorCpf(cpf_cliente);
    };
    App.prototype.associarContaCliente = function (ie_automatico) {
        if (ie_automatico) {
            this.banco.associarContaCliente('111-1', '1');
            this.banco.associarContaCliente('222-2', '2');
            this.banco.associarContaCliente('333-3', '3');
            this.banco.associarContaCliente('444-4', '4');
            return;
        }
        var conta = this.input("Digite o número da conta que deseja associar: ");
        var cpf_cliente = this.input("Digite o CPF do cliente que deseja associar: ");
        this.banco.associarContaCliente(conta, cpf_cliente);
    };
    App.prototype.mudarTitularidadeConta = function (ie_automatico) {
        if (ie_automatico) {
            console.log("Mudando titularidade da conta '111-1' para Maria...");
            this.banco.mudarTitularidadeConta("111-1", "4");
            console.log("\nConsultando a conta após a mudança de titularidade...");
            console.log(this.banco.consultar("111-1"));
            return;
        }
        var numeroConta = this.input("Digite o número da conta que deseja mudar de titular: ");
        var novoCpfCliente = this.input("Digite o CPF do novo titular: ");
        this.banco.mudarTitularidadeConta(numeroConta, novoCpfCliente);
    };
    App.prototype.excluirCliente = function (ie_automatico) {
        if (ie_automatico) {
            console.log("Excluindo o cliente 'Cliete_apagado'...");
            this.banco.excluirCliente("5");
            return;
        }
        var cpf_cliente = this.input("Digite o cpf do cliente que deseja excluir: ");
        this.banco.excluirCliente(cpf_cliente);
    };
    App.prototype.listarContasSemCliente = function (ie_automatico) {
        var contasSemCliente = this.banco.listarContasSemCliente();
        console.log("\nContas sem cliente associado:");
        contasSemCliente.forEach(function (conta) {
            console.log("N\u00FAmero da Conta: ".concat(conta.getNumero(), ", Saldo: R$").concat(conta.getSaldo()));
        });
        var numeroConta = this.input("Digite o número da conta que deseja associar a um cliente: ");
        var cpfCliente = this.input("Digite o CPF do cliente: ");
        this.banco.associarContaSemCliente(numeroConta, cpfCliente);
    };
    App.prototype.renderJuros = function (ie_automatico) {
        if (ie_automatico) {
            this.banco.renderJuros('111-1');
            this.banco.renderJuros('333-3');
            return;
        }
        var num_conta = this.input("Digite o número da conta que deseja depositar: ");
        this.banco.renderJuros(num_conta);
    };
    App.prototype.testeAutomatico = function () {
        console.log("===== INÍCIO DOS TESTES AUTOMÁTICOS =====");
        try {
            // Teste 1: Criação de Clientes
            console.log("\n--- Teste 1: Criação de Clientes ---");
            var cliente1 = new Cliente_1.Cliente(1, "João Silva", "12345678901", new Date(1990, 5, 15));
            var cliente2 = new Cliente_1.Cliente(2, "Maria Souza", "98765432109", new Date(1985, 2, 20));
            this.banco.inserirCliente(cliente1);
            this.banco.inserirCliente(cliente2);
            console.log("Clientes criados com sucesso!");
            // Teste 2: Criação de Contas
            console.log("\n--- Teste 2: Criação de Contas ---");
            var conta1 = new Conta_1.Conta('111-1', 1000, 1);
            var conta2 = new Conta_1.Conta('222-2', 500, 2);
            var contaPoupanca = new Poupanca_1.Poupanca('333-3', 2000, 3, 5);
            this.banco.inserirConta(conta1);
            this.banco.inserirConta(conta2);
            this.banco.inserirConta(contaPoupanca);
            console.log("Contas criadas com sucesso!");
            // Teste 3: Associação de Contas a Clientes
            console.log("\n--- Teste 3: Associação de Contas a Clientes ---");
            this.banco.associarContaCliente('111-1', '12345678901');
            this.banco.associarContaCliente('222-2', '98765432109');
            this.banco.associarContaCliente('333-3', '12345678901');
            console.log("Contas associadas com sucesso!");
            // Teste 4: Operações Bancárias
            console.log("\n--- Teste 4: Operações Bancárias ---");
            // Saque
            console.log("Realizando saque...");
            this.banco.sacar('12345678901', '111-1', 200);
            // Depósito
            console.log("Realizando depósito...");
            this.banco.depositar('98765432109', '222-2', 300);
            // Transferência
            console.log("Realizando transferência...");
            this.banco.transferir('12345678901', '111-1', '98765432109', '222-2', 100);
            // Teste 5: Render Juros em Poupança
            console.log("\n--- Teste 5: Render Juros ---");
            contaPoupanca = new Poupanca_1.Poupanca('444-4', 1000, 4, 5); // Criar nova conta poupança com valores definidos
            this.banco.inserirConta(contaPoupanca);
            console.log("Saldo antes de render juros: " + contaPoupanca.getSaldo());
            this.banco.renderJuros('444-4');
            var contaAposJuros = this.banco.consultar('444-4');
            console.log("Saldo após render juros: " + contaAposJuros.getSaldo());
            // Teste 6: Tentativa de Transferência com Saldo Insuficiente
            console.log("\n--- Teste 6: Transferência com Saldo Insuficiente ---");
            try {
                this.banco.transferir('12345678901', '111-1', '98765432109', '222-2', 2000);
            }
            catch (error) {
                console.log("Erro capturado com sucesso: " + error.message);
            }
            // Teste 7: Totalizações
            console.log("\n--- Teste 7: Totalizações ---");
            console.log("Total de Contas: " + this.banco.totalDeContas());
            console.log("Total Depositado: R$" + this.banco.data.totDepositado);
            console.log("Saldo Médio: R$" + this.banco.saldoMedioContas());
            console.log("\n===== TESTES AUTOMÁTICOS CONCLUÍDOS COM SUCESSO =====");
        }
        catch (error) {
            console.error("Erro durante os testes automáticos:", error);
        }
    };
    App.prototype.exibirMenu = function () {
        console.log('\nBem-vindo! Selecione uma opção:');
        console.log('Contas:');
        console.log('1 - Inserir');
        console.log('2 - Consultar');
        console.log('3 - Sacar');
        console.log('4 - Depositar');
        console.log('5 - Excluir');
        console.log('6 - Transferir');
        console.log('7 - Totalizações');
        console.log('8 - Inserir Cliente');
        console.log('9 - Consultar Cliente');
        console.log('10 - Associar Conta');
        console.log('11 - Mudar Titularidade');
        console.log('12 - Excluir Cliente');
        console.log('13 - Listar Contas Sem Cliente');
        console.log('14 - Render Juros');
        console.log('0 - Sair');
    };
    App.prototype.isNumber = function (val) {
        while (isNaN(val)) {
            console.log("Valor inválido! Por favor, tente novamente.");
            val = Number(this.input("Digite o saldo da conta: "));
        }
        return val;
    };
    App.prototype.createIdGenerator = function () {
        var id = 0;
        return function () {
            id += 1;
            return id;
        };
    };
    App.prototype.validaValor = function (valor) {
        if (isNaN(valor) || valor <= 0) {
            throw new Error('Valor inválido. O valor deve ser um número positivo.');
        }
        return valor;
    };
    App.prototype.validarEntradaTexto = function (valor, nomeCampo) {
        if (!valor || valor.trim() === '') {
            throw new AplicacaoError_1.EntradaVaziaError(nomeCampo);
        }
        return valor.trim();
    };
    App.prototype.validarNumero = function (valor, nomeCampo) {
        var valorConvertido = typeof valor === 'string'
            ? valor.trim().replace(',', '.') // Tratar vírgulas
            : valor;
        var numero = Number(valorConvertido);
        if (isNaN(numero)) {
            throw new AplicacaoError_1.EntradaInvalidaError(nomeCampo, 'Valor não é um número válido.');
        }
        if (numero < 0) { // Alterado de <= 0 para < 0 para permitir saldo zero
            throw new AplicacaoError_1.ValorInvalidoError(numero, nomeCampo);
        }
        return numero;
    };
    App.prototype.validarNumeroConta = function (numeroConta) {
        // Regex para formato XXX-X
        var regex = /^\d{3}-\d{1}$/;
        if (!regex.test(numeroConta)) {
            throw new AplicacaoError_1.NumeroContaInvalidoError(numeroConta);
        }
        return numeroConta;
    };
    App.prototype.validarDataNascimento = function (dataString) {
        try {
            var data = new Date(dataString);
            if (isNaN(data.getTime())) {
                throw new AplicacaoError_1.EntradaInvalidaError('data de nascimento', 'Formato de data inválido.');
            }
            // Validações adicionais podem ser feitas aqui ou na classe Cliente
            return data;
        }
        catch (error) {
            throw new AplicacaoError_1.EntradaInvalidaError('data de nascimento');
        }
    };
    return App;
}());
// Iniciar a aplicação
new App();
