"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = void 0;
var Banco = /** @class */ (function () {
    function Banco() {
        this.contas = [];
        this.clientes = [];
    }
    Banco.prototype.inserirConta = function (conta) {
        if (this.contaJaExiste(conta.id_conta, conta.numero)) {
            console.error("J\u00E1 existe uma conta com o id ".concat(conta.id_conta, " ou um numero de conta ").concat(conta.numero, " cadastrado. N\u00E3o \u00E9 poss\u00EDvel adicionar."));
        }
        else {
            this.contas.push(conta);
            console.log("Conta ".concat(conta.numero, " cadastrado com sucesso"));
        }
        this.contas.push(conta);
    };
    Banco.prototype.inserirCliente = function (cliente) {
        if (this.clienteJaExiste(cliente.id_cliente, cliente.cpf)) {
            console.error("J\u00E1 existe uma conta com o id ".concat(cliente.id_cliente, " ou um cpf ").concat(cliente.cpf, " cadastrado. N\u00E3o \u00E9 poss\u00EDvel adicionar."));
        }
        else {
            this.clientes.push(cliente);
            console.log("Cliente ".concat(cliente.nome, " cadastrado com sucesso"));
        }
    };
    Banco.prototype.clienteJaExiste = function (id, cpf) {
        return this.clientes.some(function (cli) { return cli.cpf === cpf || cli.id_cliente === id; });
    };
    Banco.prototype.contaJaExiste = function (id, numeroConta) {
        return this.contas.some(function (conta) { return conta.numero === numeroConta || conta.id_conta === id; });
    };
    Banco.prototype.consultar = function (numero) {
        var contaProcurada = this.contas.filter(function (conta) { return conta.numero === numero; });
        if (!contaProcurada) {
            console.error("Conta com n\u00FAmero ".concat(numero, " n\u00E3o encontrada."));
            return null;
        }
        return contaProcurada[0];
    };
    Banco.prototype.consultaPorCpf = function (cpf) {
        var result = this.clientes.filter(function (key) { return key.cpf === cpf; });
        if (!result) {
            console.error("Cliente com CPF ".concat(cpf, " n\u00E3o encontrado."));
            return null;
        }
        return result[0];
    };
    Banco.prototype.associarContaCliente = function (numeroConta, cpfCliente) {
        var cliente = this.consultaPorCpf(cpfCliente);
        var conta = this.consultar(numeroConta);
        if (!cliente || !conta)
            return;
        if (conta.st_assosciada) {
            console.error("A conta ".concat(conta.numero, " j\u00E1 est\u00E1 associada a outro cliente."));
            return;
        }
        cliente.contas.push(conta);
        this.mudarStatusConta(conta);
        console.log("Conta ".concat(numeroConta, " associada com sucesso ao cliente ").concat(cliente.nome, "."));
    };
    Banco.prototype.mudarStatusConta = function (conta) {
        conta.st_assosciada = true;
    };
    Banco.prototype.listarContasDeUmCliente = function (cpfCliente) {
        var cliente = this.consultaPorCpf(cpfCliente);
        return cliente === null || cliente === void 0 ? void 0 : cliente.contas;
    };
    Banco.prototype.totalizadorSaldoCliente = function (cpf) {
        var contasDeCliente = this.listarContasDeUmCliente(cpf);
        var totalizador = 0;
        contasDeCliente === null || contasDeCliente === void 0 ? void 0 : contasDeCliente.forEach(function (element) {
            totalizador += element.saldo;
        });
        return totalizador;
    };
    return Banco;
}());
exports.Banco = Banco;
